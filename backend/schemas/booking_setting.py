from pydantic import BaseModel, Field
from typing import List, Optional

class TimeSlotSchema(BaseModel):
    start_time: str = Field(..., description="Start time in HH:MM format")
    end_time: str = Field(..., description="End time in HH:MM format")
    max_bookings: int = Field(default=1, ge=1, description="Maximum bookings per slot")

class BookingSettingCreate(BaseModel):
    available_days: List[str] = Field(..., description="List of available days")
    time_slots: List[TimeSlotSchema] = Field(..., description="Available time slots")
    meeting_type: str = Field(..., description="Type of meeting")
    is_active: bool = Field(default=True)

class BookingSettingUpdate(BaseModel):
    available_days: Optional[List[str]] = None
    time_slots: Optional[List[TimeSlotSchema]] = None
    meeting_type: Optional[str] = None
    is_active: Optional[bool] = None

class BookingSettingResponse(BaseModel):
    id: str
    available_days: List[str]
    time_slots: List[TimeSlotSchema]
    meeting_type: str
    timezone: str
    is_active: bool
    created_at: str
    updated_at: str
