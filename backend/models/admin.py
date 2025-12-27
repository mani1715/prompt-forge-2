from pydantic import BaseModel, Field
from typing import Optional, Dict, List
from datetime import datetime
import uuid

class AdminPermissions(BaseModel):
    # Admin Management
    canManageAdmins: bool = False
    
    # Content Management
    canManageAbout: bool = True
    canManagePortfolio: bool = True
    canManageBlogs: bool = True
    canManageTestimonials: bool = True
    canManageDemos: bool = True
    
    # Communication
    canViewContacts: bool = True
    canManageContactPage: bool = True
    canManageChat: bool = True
    canManageNewsletter: bool = True
    
    # Business Features
    canManageBookings: bool = True
    canManageBookingSettings: bool = False
    canManagePricing: bool = True
    canViewAnalytics: bool = True
    
    # Client Management
    canManageClients: bool = True
    canManageClientProjects: bool = True
    
    # System
    canAccessStorage: bool = False
    canManageNotes: bool = True
    canManageSettings: bool = False
    
    # Legacy permissions for backward compatibility
    canViewPrivateProjects: bool = True

class Admin(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password_hash: str
    role: str = "admin"  # admin or super_admin
    permissions: AdminPermissions = Field(default_factory=AdminPermissions)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    created_by: str = "system"
    
    class Config:
        json_schema_extra = {
            "example": {
                "username": "admin",
                "role": "super_admin"
            }
        }
