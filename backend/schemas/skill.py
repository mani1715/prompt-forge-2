from pydantic import BaseModel
from typing import Optional

class SkillCreate(BaseModel):
    name: str
    icon: str = "⭐"

class SkillUpdate(BaseModel):
    name: Optional[str] = None
    icon: Optional[str] = None
