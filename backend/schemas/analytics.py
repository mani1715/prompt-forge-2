from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class AnalyticsEventCreate(BaseModel):
    """Schema for creating analytics events"""
    event_type: str  # 'page_view', 'contact_submission', 'calculator_opened', 'calculator_estimate', 'blog_view'
    page_name: Optional[str] = None
    blog_id: Optional[str] = None
    blog_title: Optional[str] = None

class AnalyticsEventResponse(BaseModel):
    """Response schema for analytics events"""
    id: str
    event_type: str
    page_name: Optional[str] = None
    blog_id: Optional[str] = None
    blog_title: Optional[str] = None
    timestamp: datetime

class PageViewStats(BaseModel):
    """Page view statistics"""
    page_name: str
    count: int

class BlogViewStats(BaseModel):
    """Blog view statistics"""
    blog_id: str
    blog_title: str
    count: int

class AnalyticsSummary(BaseModel):
    """Summary of analytics data"""
    total_page_views: int
    contact_submissions: int
    calculator_opened: int
    calculator_estimates: int
    page_views_by_page: List[PageViewStats]
    blog_views: List[BlogViewStats]
    period: str  # 'today', '7days', '30days'
