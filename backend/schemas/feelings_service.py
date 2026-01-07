from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List

class FeelingsServiceCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=200)
    event_type: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=10)
    features: List[str] = []
    original_price: float = Field(..., gt=0)
    offer_price: float = Field(..., gt=0)
    currency: str = "₹"
    images: List[str] = []
    demo_url: Optional[str] = None
    is_active: bool = True
    display_order: int = 0

class FeelingsServiceUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=3, max_length=200)
    event_type: Optional[str] = Field(None, min_length=3, max_length=100)
    description: Optional[str] = Field(None, min_length=10)
    features: Optional[List[str]] = None
    original_price: Optional[float] = Field(None, gt=0)
    offer_price: Optional[float] = Field(None, gt=0)
    currency: Optional[str] = None
    images: Optional[List[str]] = None
    is_active: Optional[bool] = None
    display_order: Optional[int] = None

class ServiceRequestCreate(BaseModel):
    service_id: str
    customer_name: str = Field(..., min_length=2, max_length=200)
    customer_email: EmailStr
    customer_phone: str = Field(..., min_length=10, max_length=20)
    customer_whatsapp: Optional[str] = Field(None, min_length=10, max_length=20)
    event_date: Optional[str] = None
    recipient_name: Optional[str] = Field(None, max_length=200)
    message: Optional[str] = Field(None, max_length=2000)
    special_instructions: Optional[str] = Field(None, max_length=1000)
    uploaded_files: List[str] = []

class ServiceRequestUpdate(BaseModel):
    status: Optional[str] = Field(None, pattern="^(pending|in_progress|completed|cancelled)$")
    admin_notes: Optional[str] = None
    generated_link_id: Optional[str] = None

class GeneratedLinkCreate(BaseModel):
    request_id: str
    link_url: str
    expiry_hours: int = Field(default=24, ge=1, le=168)  # 1 hour to 7 days
    notes: Optional[str] = None

class GeneratedLinkUpdate(BaseModel):
    is_active: Optional[bool] = None
    notes: Optional[str] = None
    expiry_hours: Optional[int] = Field(None, ge=1, le=168)
