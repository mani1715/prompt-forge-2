from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

# Client Schemas
class ClientCreate(BaseModel):
    """Schema for creating a new client"""
    name: str
    email: EmailStr
    password: str
    company: Optional[str] = None
    phone: Optional[str] = None
    is_active: bool = True

class ClientUpdate(BaseModel):
    """Schema for updating a client"""
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    company: Optional[str] = None
    phone: Optional[str] = None
    is_active: Optional[bool] = None

class ClientLogin(BaseModel):
    """Schema for client login"""
    email: EmailStr
    password: str

class ClientResponse(BaseModel):
    """Schema for client response"""
    id: str
    name: str
    email: str
    company: Optional[str] = None
    phone: Optional[str] = None
    is_active: bool
    created_at: str

class ClientTokenResponse(BaseModel):
    """Schema for client token response"""
    access_token: str
    token_type: str = "bearer"
    client: ClientResponse
