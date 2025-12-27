from fastapi import APIRouter, HTTPException, status, Depends, UploadFile, File
from typing import List
from schemas.storage import StorageItemCreate, StorageItemUpdate
from database import storage_collection
from auth.admin_auth import get_current_admin, check_permission
from models.storage import StorageItem
from datetime import datetime
import os
import shutil
from pathlib import Path

router = APIRouter(prefix="/storage", tags=["storage"])

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path("/app/public/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@router.get("/items")
async def get_storage_items(current_admin: dict = Depends(get_current_admin)):
    """Get all storage items visible to current admin"""
    # Super admin can see all, others need canAccessStorage permission
    if current_admin['role'] == 'super_admin':
        query = {}
    else:
        # Check if admin has storage access permission
        if not check_permission(current_admin, 'canAccessStorage'):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to access storage. Contact super admin."
            )
        query = {
            "$or": [
                {"created_by": current_admin['username']},
                {"visibleTo": current_admin['username']},
                {"visibleTo": []}  # Public items
            ]
        }
    
    items = await storage_collection.find(query).to_list(length=1000)
    
    result = []
    for item in items:
        result.append({
            "id": item['id'],
            "title": item['title'],
            "content": item.get('content', ''),
            "type": item.get('type', 'note'),
            "fileUrl": item.get('fileUrl'),
            "fileName": item.get('fileName'),
            "tags": item.get('tags', []),
            "visibleTo": item.get('visibleTo', []),
            "createdAt": item['created_at'],
            "createdBy": item['created_by'],
            "updatedAt": item.get('updated_at', item['created_at'])
        })
    
    return {"items": result}

@router.post("/items")
async def create_storage_item(
    item_data: StorageItemCreate,
    current_admin: dict = Depends(get_current_admin)
):
    """Create new storage item"""
    if not check_permission(current_admin, 'canAccessPrivateStorage') and current_admin['role'] != 'super_admin':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    item = StorageItem(
        title=item_data.title,
        content=item_data.content,
        type=item_data.type,
        fileUrl=item_data.fileUrl,
        fileName=item_data.fileName,
        tags=item_data.tags or [],
        visibleTo=item_data.visibleTo or [],
        created_by=current_admin['username']
    )
    
    item_dict = item.model_dump()
    item_dict['created_at'] = item_dict['created_at'].isoformat()
    item_dict['updated_at'] = item_dict['updated_at'].isoformat()
    
    await storage_collection.insert_one(item_dict)
    
    return {"id": item.id, "message": "Storage item created successfully"}

@router.put("/items/{item_id}")
async def update_storage_item(
    item_id: str,
    item_data: StorageItemUpdate,
    current_admin: dict = Depends(get_current_admin)
):
    """Update storage item"""
    # Find item
    item = await storage_collection.find_one({"id": item_id})
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Storage item not found"
        )
    
    # Check access
    if current_admin['role'] != 'super_admin' and item['created_by'] != current_admin['username']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    # Prepare update data
    update_data = {"updated_at": datetime.utcnow().isoformat()}
    if item_data.title is not None:
        update_data['title'] = item_data.title
    if item_data.content is not None:
        update_data['content'] = item_data.content
    if item_data.type is not None:
        update_data['type'] = item_data.type
    if item_data.fileUrl is not None:
        update_data['fileUrl'] = item_data.fileUrl
    if item_data.fileName is not None:
        update_data['fileName'] = item_data.fileName
    if item_data.tags is not None:
        update_data['tags'] = item_data.tags
    if item_data.visibleTo is not None:
        update_data['visibleTo'] = item_data.visibleTo
    
    await storage_collection.update_one(
        {"id": item_id},
        {"$set": update_data}
    )
    
    return {"message": "Storage item updated successfully"}

@router.delete("/items/{item_id}")
async def delete_storage_item(
    item_id: str,
    current_admin: dict = Depends(get_current_admin)
):
    """Delete storage item"""
    # Find item
    item = await storage_collection.find_one({"id": item_id})
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Storage item not found"
        )
    
    # Check access
    if current_admin['role'] != 'super_admin' and item['created_by'] != current_admin['username']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    await storage_collection.delete_one({"id": item_id})
    return {"message": "Storage item deleted successfully"}

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    current_admin: dict = Depends(get_current_admin)
):
    """Upload file for storage"""
    if not check_permission(current_admin, 'canAccessPrivateStorage') and current_admin['role'] != 'super_admin':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied"
        )
    
    try:
        # Generate unique filename
        import uuid
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / unique_filename
        
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Return URL
        file_url = f"/uploads/{unique_filename}"
        return {"url": file_url, "filename": file.filename}
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"File upload failed: {str(e)}"
        )
