from pydantic import BaseModel, Field
from typing import Optional, Dict
from datetime import datetime
import uuid

class Credential(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str  # e.g., "OpenAI API Key", "MongoDB URL", "Stripe Secret Key"
    key: str  # The environment variable name (e.g., "OPENAI_API_KEY")
    value: str  # The actual credential value
    category: str  # "api_key", "database", "payment", "email", "storage", "other"
    description: Optional[str] = None
    is_encrypted: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    updated_by: str = "system"
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "OpenAI API Key",
                "key": "OPENAI_API_KEY",
                "value": "sk-xxx...",
                "category": "api_key",
                "description": "API key for OpenAI GPT services"
            }
        }
