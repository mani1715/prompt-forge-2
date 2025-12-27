from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from datetime import datetime, timedelta
import uuid
import pytz
from database import bookings_collection, booking_settings_collection
from schemas.booking import BookingCreate, BookingUpdate, BookingResponse, AvailableSlot
from auth.admin_auth import get_current_admin

router = APIRouter(prefix="/bookings", tags=["bookings"])

# IST timezone
IST = pytz.timezone('Asia/Kolkata')

def get_ist_now():
    """Get current time in IST"""
    return datetime.now(IST)

def get_ist_datetime(date_str: str, time_str: str = "00:00"):
    """Convert date string to IST datetime"""
    dt = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
    return IST.localize(dt)

async def check_slot_availability(date: str, time_slot: str) -> dict:
    """Check if a time slot is available on a given date"""
    # Get booking settings
    settings = await booking_settings_collection.find_one({"is_active": True})
    if not settings:
        return {"available": False, "reason": "Booking system is not active"}
    
    # Parse date and get day of week
    try:
        booking_date = datetime.strptime(date, "%Y-%m-%d")
        day_name = booking_date.strftime("%A")
    except ValueError:
        return {"available": False, "reason": "Invalid date format"}
    
    # Check if day is available
    if day_name not in settings.get("available_days", []):
        return {"available": False, "reason": f"{day_name} is not available"}
    
    # Check if time slot exists in settings
    time_slots = settings.get("time_slots", [])
    slot_info = None
    for slot in time_slots:
        slot_range = f"{slot['start_time']}-{slot['end_time']}"
        if slot_range == time_slot:
            slot_info = slot
            break
    
    if not slot_info:
        return {"available": False, "reason": "Time slot not found"}
    
    # Check existing bookings for this slot
    existing_bookings = await bookings_collection.count_documents({
        "preferred_date": date,
        "preferred_time_slot": time_slot,
        "status": {"$in": ["pending", "confirmed"]}
    })
    
    max_bookings = slot_info.get("max_bookings", 1)
    available_spots = max_bookings - existing_bookings
    
    if available_spots <= 0:
        return {"available": False, "reason": "Slot is fully booked"}
    
    return {
        "available": True,
        "available_spots": available_spots,
        "max_bookings": max_bookings,
        "meeting_type": settings.get("meeting_type", "Google Meet")
    }

# PUBLIC ENDPOINTS

@router.get("/available-slots", response_model=List[AvailableSlot])
async def get_available_slots(start_date: str, days: int = 14):
    """
    Get available time slots for the next N days
    Query params:
    - start_date: YYYY-MM-DD format
    - days: number of days to check (default 14)
    """
    settings = await booking_settings_collection.find_one({"is_active": True})
    if not settings:
        raise HTTPException(status_code=404, detail="Booking system is not active")
    
    try:
        current_date = datetime.strptime(start_date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    available_slots = []
    
    for i in range(days):
        check_date = current_date + timedelta(days=i)
        date_str = check_date.strftime("%Y-%m-%d")
        day_name = check_date.strftime("%A")
        
        # Skip if day is not available
        if day_name not in settings.get("available_days", []):
            continue
        
        # Check each time slot
        for slot in settings.get("time_slots", []):
            time_slot_str = f"{slot['start_time']}-{slot['end_time']}"
            
            # Check availability
            availability = await check_slot_availability(date_str, time_slot_str)
            
            available_slots.append({
                "date": date_str,
                "time_slot": time_slot_str,
                "available_spots": availability.get("available_spots", 0) if availability.get("available") else 0,
                "is_available": availability.get("available", False)
            })
    
    return available_slots

@router.post("/", response_model=BookingResponse)
async def create_booking(booking: BookingCreate):
    """Create a new booking (PUBLIC)"""
    # Validate slot availability
    availability = await check_slot_availability(
        booking.preferred_date,
        booking.preferred_time_slot
    )
    
    if not availability.get("available"):
        raise HTTPException(
            status_code=400,
            detail=availability.get("reason", "Slot not available")
        )
    
    # Get booking settings for meeting type
    settings = await booking_settings_collection.find_one({"is_active": True})
    meeting_type = settings.get("meeting_type", "Google Meet") if settings else "Google Meet"
    
    # Create booking
    now = get_ist_now().isoformat()
    booking_id = str(uuid.uuid4())
    
    booking_data = {
        "id": booking_id,
        "name": booking.name,
        "email": booking.email,
        "phone": booking.phone,
        "preferred_date": booking.preferred_date,
        "preferred_time_slot": booking.preferred_time_slot,
        "message": booking.message,
        "status": "pending",
        "meeting_type": meeting_type,
        "meeting_link": None,
        "created_at": now,
        "updated_at": now,
        "confirmed_at": None,
        "cancelled_at": None,
        "admin_notes": None
    }
    
    await bookings_collection.insert_one(booking_data)
    
    # Send email notification to admin (async, non-blocking)
    try:
        from utils.email_service import send_booking_notification
        await send_booking_notification(booking_data)
    except Exception as e:
        # Log error but don't fail the booking
        print(f"Failed to send email notification: {str(e)}")
    
    return booking_data

@router.get("/check-availability")
async def check_availability(date: str, time_slot: str):
    """Check if a specific slot is available"""
    availability = await check_slot_availability(date, time_slot)
    return availability

# ADMIN ENDPOINTS

@router.get("/admin/all", response_model=List[BookingResponse])
async def get_all_bookings(
    status: Optional[str] = None,
    date: Optional[str] = None,
    _: dict = Depends(get_current_admin)
):
    """Get all bookings (ADMIN)"""
    query = {}
    
    if status:
        query["status"] = status
    
    if date:
        query["preferred_date"] = date
    
    bookings = await bookings_collection.find(query).sort("created_at", -1).to_list(1000)
    return bookings

@router.get("/admin/upcoming", response_model=List[BookingResponse])
async def get_upcoming_bookings(_: dict = Depends(get_current_admin)):
    """Get upcoming confirmed bookings (ADMIN)"""
    today = get_ist_now().strftime("%Y-%m-%d")
    
    bookings = await bookings_collection.find({
        "status": "confirmed",
        "preferred_date": {"$gte": today}
    }).sort("preferred_date", 1).to_list(1000)
    
    return bookings

@router.get("/admin/{booking_id}", response_model=BookingResponse)
async def get_booking(booking_id: str, _: dict = Depends(get_current_admin)):
    """Get a specific booking (ADMIN)"""
    booking = await bookings_collection.find_one({"id": booking_id})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.put("/admin/{booking_id}", response_model=BookingResponse)
async def update_booking(
    booking_id: str,
    booking_update: BookingUpdate,
    _: dict = Depends(get_current_admin)
):
    """Update a booking (ADMIN)"""
    booking = await bookings_collection.find_one({"id": booking_id})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    update_data = {
        "updated_at": get_ist_now().isoformat()
    }
    
    if booking_update.status:
        update_data["status"] = booking_update.status
        
        if booking_update.status == "confirmed" and not booking.get("confirmed_at"):
            update_data["confirmed_at"] = get_ist_now().isoformat()
        
        if booking_update.status == "cancelled" and not booking.get("cancelled_at"):
            update_data["cancelled_at"] = get_ist_now().isoformat()
    
    if booking_update.meeting_link is not None:
        update_data["meeting_link"] = booking_update.meeting_link
    
    if booking_update.admin_notes is not None:
        update_data["admin_notes"] = booking_update.admin_notes
    
    await bookings_collection.update_one(
        {"id": booking_id},
        {"$set": update_data}
    )
    
    updated_booking = await bookings_collection.find_one({"id": booking_id})
    return updated_booking

@router.delete("/admin/{booking_id}")
async def delete_booking(booking_id: str, _: dict = Depends(get_current_admin)):
    """Delete a booking (ADMIN)"""
    result = await bookings_collection.delete_one({"id": booking_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking deleted successfully"}

@router.get("/admin/stats/summary")
async def get_booking_stats(_: dict = Depends(get_current_admin)):
    """Get booking statistics (ADMIN)"""
    total = await bookings_collection.count_documents({})
    pending = await bookings_collection.count_documents({"status": "pending"})
    confirmed = await bookings_collection.count_documents({"status": "confirmed"})
    cancelled = await bookings_collection.count_documents({"status": "cancelled"})
    
    today = get_ist_now().strftime("%Y-%m-%d")
    upcoming = await bookings_collection.count_documents({
        "status": "confirmed",
        "preferred_date": {"$gte": today}
    })
    
    return {
        "total": total,
        "pending": pending,
        "confirmed": confirmed,
        "cancelled": cancelled,
        "upcoming": upcoming
    }
