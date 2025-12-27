from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class BookingCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    preferred_date: str = Field(..., description="Date in YYYY-MM-DD format")
    preferred_time_slot: str = Field(..., description="Time slot in HH:MM-HH:MM format")
    message: Optional[str] = Field(None, max_length=500)

class BookingUpdate(BaseModel):
    status: Optional[str] = Field(None, pattern="^(pending|confirmed|cancelled)$")
    meeting_link: Optional[str] = None
    admin_notes: Optional[str] = None

class BookingResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    preferred_date: str
    preferred_time_slot: str
    message: Optional[str]
    status: str
    meeting_type: str
    meeting_link: Optional[str]
    created_at: str
    updated_at: str
    confirmed_at: Optional[str]
    cancelled_at: Optional[str]
    admin_notes: Optional[str]

class AvailableSlot(BaseModel):
    date: str
    time_slot: str
    available_spots: int
    is_available: bool
