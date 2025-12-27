from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class Note(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str  # Name/title for easy searching
    content: str  # The actual text content
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    created_by: str = "admin"
    tags: list[str] = Field(default_factory=list)  # Optional tags for categorization
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Meeting Notes",
                "content": "Discussed project timeline and deliverables...",
                "tags": ["meeting", "project"]
            }
        }
