from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class FeelingsService(BaseModel):
    """
    Model for Feelings Expression Services (Birthday, Engagement, Proposal, etc.)
    """
    id: str
    name: str  # e.g., "Birthday Special", "Proposal Magic"
    event_type: str  # e.g., "Birthday", "Engagement", "Proposal", "Wedding", "Anniversary"
    description: str
    features: List[str] = []  # List of features included
    original_price: float
    offer_price: float
    currency: str = "₹"
    images: List[str] = []  # URLs of service images
    is_active: bool = True
    display_order: int = 0
    created_at: str
    updated_at: str
    created_by: str

    class Config:
        json_schema_extra = {
            "example": {
                "id": "feeling-service-123",
                "name": "Untold Story - Birthday Special",
                "event_type": "Birthday",
                "description": "Create a beautiful mini-site to share birthday memories and feelings",
                "features": [
                    "Custom photo gallery",
                    "Personal message section",
                    "24-hour active link",
                    "Beautiful floral design"
                ],
                "original_price": 499,
                "offer_price": 299,
                "currency": "₹",
                "images": ["/uploads/birthday-service.jpg"],
                "is_active": True,
                "display_order": 1,
                "created_at": "2025-01-05T10:00:00Z",
                "updated_at": "2025-01-05T10:00:00Z",
                "created_by": "admin-123"
            }
        }
