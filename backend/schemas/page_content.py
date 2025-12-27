from pydantic import BaseModel
from typing import Dict, Any, Optional

class PageContentCreate(BaseModel):
    page: str
    section: str
    content: Dict[str, Any]
    visible: bool = True

class PageContentUpdate(BaseModel):
    content: Optional[Dict[str, Any]] = None
    visible: Optional[bool] = None

class PageContentResponse(BaseModel):
    id: str
    page: str
    section: str
    content: Dict[str, Any]
    visible: bool
