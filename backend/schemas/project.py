from pydantic import BaseModel
from typing import List, Optional

class ProjectCreate(BaseModel):
    title: str
    slug: Optional[str] = None
    category: str
    description: str
    image_url: str
    tech_stack: List[str] = []
    featured: bool = False
    is_private: bool = False
    live_demo_url: Optional[str] = None
    case_study_content: Optional[str] = None
    status: str = "completed"
    github_url: Optional[str] = None
    client_name: Optional[str] = None
    demo_video_url: Optional[str] = None
    gallery_images: Optional[List[str]] = []
    project_duration: Optional[str] = None
    team_size: Optional[str] = None
    key_features: Optional[List[str]] = []

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    featured: Optional[bool] = None
    is_private: Optional[bool] = None
    live_demo_url: Optional[str] = None
    case_study_content: Optional[str] = None
    status: Optional[str] = None
    github_url: Optional[str] = None
    client_name: Optional[str] = None
    demo_video_url: Optional[str] = None
    gallery_images: Optional[List[str]] = None
    project_duration: Optional[str] = None
    team_size: Optional[str] = None
    key_features: Optional[List[str]] = None

class ProjectResponse(BaseModel):
    id: str
    title: str
    slug: str
    category: str
    description: str
    image_url: str
    tech_stack: List[str]
    featured: bool
    is_private: bool
    live_demo_url: Optional[str] = None
    case_study_content: Optional[str] = None
    status: str
    github_url: Optional[str] = None
    client_name: Optional[str] = None
    demo_video_url: Optional[str] = None
    gallery_images: Optional[List[str]] = None
    project_duration: Optional[str] = None
    team_size: Optional[str] = None
    key_features: Optional[List[str]] = None
