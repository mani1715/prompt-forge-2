from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(__import__('uuid').uuid4()))
    title: str
    slug: str
    category: str
    description: str
    image_url: str
    tech_stack: List[str] = []
    featured: bool = False
    is_private: bool = False
    live_demo_url: Optional[str] = None
    case_study_content: Optional[str] = None
    status: str = "completed"  # completed or in-progress
    github_url: Optional[str] = None
    client_name: Optional[str] = None
    demo_video_url: Optional[str] = None
    gallery_images: Optional[List[str]] = []
    project_duration: Optional[str] = None
    team_size: Optional[str] = None
    key_features: Optional[List[str]] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "E-commerce Platform",
                "slug": "ecommerce-platform",
                "category": "E-commerce",
                "description": "Full-featured online store",
                "image_url": "https://example.com/image.jpg",
                "tech_stack": ["React", "Node.js", "MongoDB"],
                "featured": True,
                "live_demo_url": "/demo/ecommerce",
                "status": "completed",
                "github_url": "https://github.com/user/repo",
                "client_name": "ABC Corp",
                "project_duration": "3 months",
                "team_size": "5 developers"
            }
        }
