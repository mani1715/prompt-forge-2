from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime

class NewsletterSubscriber(BaseModel):
    id: str = Field(default_factory=lambda: str(__import__('uuid').uuid4()))
    email: EmailStr
    status: str = "subscribed"  # "subscribed" | "unsubscribed"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "status": "subscribed"
            }
        }
