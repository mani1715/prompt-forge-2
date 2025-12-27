from pydantic import BaseModel
from typing import Optional

class CredentialCreate(BaseModel):
    name: str
    key: str
    value: str
    category: str
    description: Optional[str] = None

class CredentialUpdate(BaseModel):
    name: Optional[str] = None
    key: Optional[str] = None
    value: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None

class CredentialResponse(BaseModel):
    id: str
    name: str
    key: str
    value: str  # Will be masked for non-super-admins
    category: str
    description: Optional[str] = None
    created_at: str
    updated_at: str
    updated_by: str
