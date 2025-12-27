from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class Testimonial(BaseModel):
    """Testimonial model for storing client testimonials"""
    id: str
    name: str
    role: Optional[str] = None
    company: Optional[str] = None
    email: Optional[str] = None
    message: str
    rating: int = Field(ge=1, le=5)  # Rating between 1 and 5
    image: Optional[str] = None
    status: str = "pending"  # "pending" or "approved"
    source: str = "admin_created"  # "customer_submitted", "admin_created", "email", "social_media"
    verified: bool = False  # True if from verified customer
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "name": "John Doe",
                "role": "CEO",
                "company": "Tech Company",
                "email": "john@example.com",
                "message": "Excellent service and professional work!",
                "rating": 5,
                "image": "https://example.com/avatar.jpg",
                "status": "approved",
                "source": "customer_submitted",
                "verified": True,
                "created_at": "2024-01-01T00:00:00",
                "updated_at": "2024-01-01T00:00:00"
            }
        }
