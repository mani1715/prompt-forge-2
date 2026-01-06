from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class GeneratedLink(BaseModel):
    """
    Model for Generated Mini-Site Links with Expiry
    """
    id: str
    request_id: str  # Reference to service_request
    service_name: str
    customer_name: str
    recipient_name: Optional[str] = None
    
    # Link Details
    link_url: str  # The actual mini-site URL or unique code
    short_code: str  # Short code for the link (e.g., "ABC123")
    
    # Expiry Settings
    expiry_hours: int = 24  # How many hours the link is active
    created_at: str
    expires_at: str  # Calculated expiry timestamp
    
    # Status
    is_active: bool = True
    is_expired: bool = False
    views_count: int = 0
    last_viewed_at: Optional[str] = None
    
    # Admin Info
    created_by: str  # Admin who generated the link
    notes: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "link-123",
                "request_id": "req-123",
                "service_name": "Birthday Special",
                "customer_name": "Rahul Kumar",
                "recipient_name": "Priya",
                "link_url": "https://untold.example.com/ABC123",
                "short_code": "ABC123",
                "expiry_hours": 24,
                "created_at": "2025-01-05T10:00:00Z",
                "expires_at": "2025-01-06T10:00:00Z",
                "is_active": True,
                "is_expired": False,
                "views_count": 5,
                "last_viewed_at": "2025-01-05T15:30:00Z",
                "created_by": "admin-123",
                "notes": "Sent via WhatsApp"
            }
        }
