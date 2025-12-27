from pydantic import BaseModel
from typing import Optional, List

class StorageItemCreate(BaseModel):
    title: str
    content: Optional[str] = ""
    type: str = "note"
    fileUrl: Optional[str] = None
    fileName: Optional[str] = None
    tags: Optional[List[str]] = []
    visibleTo: Optional[List[str]] = []

class StorageItemUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    type: Optional[str] = None
    fileUrl: Optional[str] = None
    fileName: Optional[str] = None
    tags: Optional[List[str]] = None
    visibleTo: Optional[List[str]] = None
