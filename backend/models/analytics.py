from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AnalyticsEvent(BaseModel):
    """Analytics event model for MongoDB"""
    id: str = Field(alias="_id")
    event_type: str  # 'page_view', 'contact_submission', 'calculator_opened', 'calculator_estimate', 'blog_view'
    page_name: Optional[str] = None  # For page views: 'home', 'services', 'portfolio', 'blog', 'contact'
    blog_id: Optional[str] = None  # For blog views
    blog_title: Optional[str] = None  # For blog views
    timestamp: datetime
    
    class Config:
        populate_by_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
