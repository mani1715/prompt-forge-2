from pydantic import BaseModel
from typing import Optional, List

class NoteCreate(BaseModel):
    name: str
    content: str
    tags: Optional[List[str]] = []

class NoteUpdate(BaseModel):
    name: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None

class NoteResponse(BaseModel):
    id: str
    name: str
    content: str
    created_at: str
    updated_at: str
    created_by: str
    tags: List[str]
