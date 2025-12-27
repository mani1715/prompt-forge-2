from pydantic import BaseModel, Field
from datetime import datetime
import uuid

class Skill(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    icon: str = "⭐"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "JavaScript",
                "icon": "🚀"
            }
        }
