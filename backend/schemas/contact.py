from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: Optional[str] = None
    message: str

class ContactUpdate(BaseModel):
    read: bool

class ContactResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: Optional[str]
    service: Optional[str]
    message: str
    read: bool
    created_at: datetime
