from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime
from database import db
from auth.admin_auth import get_current_admin
from models.admin import Admin
from models.credentials import Credential
from schemas.credentials import CredentialCreate, CredentialUpdate, CredentialResponse
import os

router = APIRouter(prefix="/credentials", tags=["credentials"])

# Credentials collection
credentials_collection = db['credentials']

def mask_credential_value(value: str, show_full: bool = False) -> str:
    """Mask credential value for security"""
    if show_full:
        return value
    if len(value) <= 8:
        return "*" * len(value)
    return value[:4] + "*" * (len(value) - 8) + value[-4:]

@router.get("/", response_model=List[CredentialResponse])
async def get_all_credentials(
    current_admin: Admin = Depends(get_current_admin)
):
    """Get all credentials - requires canViewCredentials permission"""
    # Check if user has permission to view credentials
    if current_admin.role != "super_admin" and not current_admin.permissions.canViewCredentials:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to view credentials"
        )
    
    # Fetch all credentials
    credentials = await credentials_collection.find().to_list(1000)
    
    # Mask values for non-super-admins
    show_full = current_admin.role == "super_admin" or current_admin.permissions.canEditCredentials
    
    for cred in credentials:
        if not show_full:
            cred["value"] = mask_credential_value(cred["value"])
        cred["created_at"] = cred["created_at"].isoformat()
        cred["updated_at"] = cred["updated_at"].isoformat()
    
    return credentials

@router.get("/{credential_id}", response_model=CredentialResponse)
async def get_credential(
    credential_id: str,
    current_admin: Admin = Depends(get_current_admin)
):
    """Get a specific credential"""
    if current_admin.role != "super_admin" and not current_admin.permissions.canViewCredentials:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to view credentials"
        )
    
    credential = await credentials_collection.find_one({"id": credential_id})
    if not credential:
        raise HTTPException(status_code=404, detail="Credential not found")
    
    # Mask values for non-super-admins
    show_full = current_admin.role == "super_admin" or current_admin.permissions.canEditCredentials
    if not show_full:
        credential["value"] = mask_credential_value(credential["value"])
    
    credential["created_at"] = credential["created_at"].isoformat()
    credential["updated_at"] = credential["updated_at"].isoformat()
    
    return credential

@router.post("/", response_model=CredentialResponse)
async def create_credential(
    credential_data: CredentialCreate,
    current_admin: Admin = Depends(get_current_admin)
):
    """Create a new credential - requires canEditCredentials permission"""
    if current_admin.role != "super_admin" and not current_admin.permissions.canEditCredentials:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to create credentials"
        )
    
    # Check if credential with same key already exists
    existing = await credentials_collection.find_one({"key": credential_data.key})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Credential with key '{credential_data.key}' already exists"
        )
    
    # Create new credential
    new_credential = Credential(
        **credential_data.dict(),
        updated_by=current_admin.username
    )
    
    await credentials_collection.insert_one(new_credential.dict())
    
    # Update environment variable (runtime only - won't persist across restarts)
    os.environ[credential_data.key] = credential_data.value
    
    result = new_credential.dict()
    result["created_at"] = result["created_at"].isoformat()
    result["updated_at"] = result["updated_at"].isoformat()
    
    return result

@router.put("/{credential_id}", response_model=CredentialResponse)
async def update_credential(
    credential_id: str,
    credential_data: CredentialUpdate,
    current_admin: Admin = Depends(get_current_admin)
):
    """Update a credential - requires canEditCredentials permission"""
    if current_admin.role != "super_admin" and not current_admin.permissions.canEditCredentials:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to edit credentials"
        )
    
    credential = await credentials_collection.find_one({"id": credential_id})
    if not credential:
        raise HTTPException(status_code=404, detail="Credential not found")
    
    # Update fields
    update_data = credential_data.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    update_data["updated_by"] = current_admin.username
    
    await credentials_collection.update_one(
        {"id": credential_id},
        {"$set": update_data}
    )
    
    # Update environment variable if value changed
    if credential_data.value:
        os.environ[credential["key"]] = credential_data.value
    
    # Fetch updated credential
    updated_credential = await credentials_collection.find_one({"id": credential_id})
    updated_credential["created_at"] = updated_credential["created_at"].isoformat()
    updated_credential["updated_at"] = updated_credential["updated_at"].isoformat()
    
    return updated_credential

@router.delete("/{credential_id}")
async def delete_credential(
    credential_id: str,
    current_admin: Admin = Depends(get_current_admin)
):
    """Delete a credential - requires canEditCredentials permission"""
    if current_admin.role != "super_admin" and not current_admin.permissions.canEditCredentials:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to delete credentials"
        )
    
    credential = await credentials_collection.find_one({"id": credential_id})
    if not credential:
        raise HTTPException(status_code=404, detail="Credential not found")
    
    await credentials_collection.delete_one({"id": credential_id})
    
    # Remove from environment
    if credential["key"] in os.environ:
        del os.environ[credential["key"]]
    
    return {"message": "Credential deleted successfully"}

@router.post("/sync-to-env")
async def sync_credentials_to_env(
    current_admin: Admin = Depends(get_current_admin)
):
    """Sync all credentials to environment variables - super admin only"""
    if current_admin.role != "super_admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only super admins can sync credentials to environment"
        )
    
    credentials = await credentials_collection.find().to_list(1000)
    
    synced_count = 0
    for cred in credentials:
        os.environ[cred["key"]] = cred["value"]
        synced_count += 1
    
    return {
        "message": f"Successfully synced {synced_count} credentials to environment",
        "count": synced_count
    }
