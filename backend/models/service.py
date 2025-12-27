from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(__import__('uuid').uuid4()))
    title: str
    description: str
    icon: str
    features: List[str] = []
    price: Optional[str] = None
    active: bool = True
    order: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "Web Development",
                "description": "Custom web applications",
                "icon": "Code",
                "features": ["Responsive Design", "SEO Optimized"],
                "price": "Starting at $2,999",
                "active": True,
                "order": 1
            }
        }
