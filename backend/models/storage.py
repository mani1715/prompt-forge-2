from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

class StorageItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: Optional[str] = ""
    type: str = "note"  # note or file
    fileUrl: Optional[str] = None
    fileName: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    visibleTo: List[str] = Field(default_factory=list)  # List of admin usernames
    created_at: datetime = Field(default_factory=datetime.utcnow)
    created_by: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "API Keys",
                "content": "SECRET_KEY=abc123",
                "type": "note",
                "tags": ["secrets", "api"]
            }
        }
