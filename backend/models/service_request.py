from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime

class ServiceRequest(BaseModel):
    """
    Model for Customer Service Requests
    """
    id: str
    service_id: str  # Reference to feelings_service
    service_name: str
    event_type: str
    
    # Customer Details
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    customer_whatsapp: Optional[str] = None
    
    # Event Details
    event_date: Optional[str] = None
    recipient_name: Optional[str] = None
    message: Optional[str] = None
    special_instructions: Optional[str] = None
    
    # Uploaded files by customer
    uploaded_files: List[str] = []  # URLs of uploaded photos/videos
    
    # Request Status
    status: str = "pending"  # pending, in_progress, completed, cancelled
    admin_notes: Optional[str] = None
    
    # Generated Link Info
    generated_link_id: Optional[str] = None
    
    created_at: str
    updated_at: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "req-123",
                "service_id": "feeling-service-123",
                "service_name": "Birthday Special",
                "event_type": "Birthday",
                "customer_name": "Rahul Kumar",
                "customer_email": "rahul@example.com",
                "customer_phone": "+91-9876543210",
                "customer_whatsapp": "+91-9876543210",
                "event_date": "2025-02-14",
                "recipient_name": "Priya",
                "message": "Happy Birthday to my best friend!",
                "special_instructions": "Please use pink theme",
                "uploaded_files": ["/uploads/photo1.jpg"],
                "status": "pending",
                "created_at": "2025-01-05T10:00:00Z",
                "updated_at": "2025-01-05T10:00:00Z"
            }
        }
