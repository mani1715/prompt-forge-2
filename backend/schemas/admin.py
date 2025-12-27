from pydantic import BaseModel
from typing import Optional, Dict
from models.admin import AdminPermissions

class AdminCreate(BaseModel):
    username: str
    password: str
    role: str = "admin"
    permissions: Optional[AdminPermissions] = None

class AdminUpdate(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    permissions: Optional[AdminPermissions] = None

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminResponse(BaseModel):
    id: str
    username: str
    role: str
    permissions: AdminPermissions
    created_at: str
    created_by: str

class TokenResponse(BaseModel):
    token: str
    admin: Dict
