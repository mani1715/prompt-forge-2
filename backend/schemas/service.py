from pydantic import BaseModel
from typing import List, Optional

class ServiceCreate(BaseModel):
    title: str
    description: str
    icon: str
    features: List[str] = []
    price: Optional[str] = None
    active: bool = True
    order: int = 0

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    features: Optional[List[str]] = None
    price: Optional[str] = None
    active: Optional[bool] = None
    order: Optional[int] = None

class ServiceResponse(BaseModel):
    id: str
    title: str
    description: str
    icon: str
    features: List[str]
    price: Optional[str] = None
    price_range: Optional[str] = None  # Support legacy field
    active: bool = True
    order: int = 0
    slug: Optional[str] = None  # Add slug field
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
