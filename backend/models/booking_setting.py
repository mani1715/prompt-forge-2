from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class TimeSlot(BaseModel):
    start_time: str  # Format: "HH:MM" (24-hour)
    end_time: str    # Format: "HH:MM" (24-hour)
    max_bookings: int = 1

class BookingSetting(BaseModel):
    id: str
    available_days: List[str]  # ["Monday", "Tuesday", etc.]
    time_slots: List[TimeSlot]
    meeting_type: str  # "Google Meet" or "Phone Call"
    timezone: str = "Asia/Kolkata"  # IST
    is_active: bool = True
    created_at: str
    updated_at: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "unique-id",
                "available_days": ["Monday", "Tuesday", "Wednesday"],
                "time_slots": [
                    {"start_time": "10:00", "end_time": "11:00", "max_bookings": 2},
                    {"start_time": "14:00", "end_time": "15:00", "max_bookings": 1}
                ],
                "meeting_type": "Google Meet",
                "timezone": "Asia/Kolkata",
                "is_active": True,
                "created_at": "2025-01-01T00:00:00",
                "updated_at": "2025-01-01T00:00:00"
            }
        }
