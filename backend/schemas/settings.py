from pydantic import BaseModel, EmailStr
from typing import Optional, Dict

class SettingsUpdate(BaseModel):
    agency_name: Optional[str] = None
    owner_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    description: Optional[str] = None
    tagline: Optional[str] = None
    social_links: Optional[Dict[str, str]] = None
    theme: Optional[Dict[str, str]] = None
    whatsapp_number: Optional[str] = None
    enable_share_buttons: Optional[bool] = None

class SettingsResponse(BaseModel):
    id: str
    agency_name: str
    owner_name: str
    email: EmailStr
    phone: str
    address: Optional[str]
    description: Optional[str]
    tagline: Optional[str]
    social_links: Dict[str, str]
    theme: Dict[str, str]
    whatsapp_number: Optional[str] = None
    enable_share_buttons: bool = True
