from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class Booking(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str
    preferred_date: str  # Format: "YYYY-MM-DD"
    preferred_time_slot: str  # Format: "HH:MM-HH:MM"
    message: Optional[str] = None
    status: str = "pending"  # pending, confirmed, cancelled
    meeting_type: str  # Google Meet or Phone Call
    meeting_link: Optional[str] = None  # For Google Meet
    created_at: str
    updated_at: str
    confirmed_at: Optional[str] = None
    cancelled_at: Optional[str] = None
    admin_notes: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "unique-id",
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "+91 9876543210",
                "preferred_date": "2025-01-15",
                "preferred_time_slot": "10:00-11:00",
                "message": "Looking forward to discussing my project",
                "status": "pending",
                "meeting_type": "Google Meet",
                "meeting_link": None,
                "created_at": "2025-01-01T00:00:00",
                "updated_at": "2025-01-01T00:00:00"
            }
        }
