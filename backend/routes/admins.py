from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from schemas.admin import AdminCreate, AdminUpdate, AdminLogin, AdminResponse, TokenResponse
from database import admins_collection
from auth import hash_password, verify_password, create_access_token
from auth.admin_auth import get_current_admin, require_super_admin
from models.admin import Admin, AdminPermissions
from utils import serialize_document

router = APIRouter(prefix="/admins", tags=["admins"])

@router.post("/login", response_model=TokenResponse)
async def admin_login(credentials: AdminLogin):
    """Admin login endpoint - supports both username and email"""
    # Find admin by username or email
    admin_doc = await admins_collection.find_one({
        "$or": [
            {"username": credentials.username},
            {"email": credentials.username}  # Allow login with email too
        ]
    })
    if not admin_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Verify password - handle both password and password_hash fields
    password_hash = admin_doc.get('password_hash', admin_doc.get('password'))
    if not password_hash or not verify_password(credentials.password, password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Determine role - handle both role and is_super_admin fields
    role = admin_doc.get("role")
    if not role:
        role = "super_admin" if admin_doc.get("is_super_admin", False) else "admin"
    
    # Create access token
    token_data = {
        "id": admin_doc['id'],
        "username": admin_doc.get('username', admin_doc.get('email', '')),
        "role": role,
        "permissions": admin_doc.get('permissions', {})
    }
    access_token = create_access_token(data=token_data)
    
    return TokenResponse(
        token=access_token,
        admin={
            "id": admin_doc['id'],
            "username": admin_doc.get('username', admin_doc.get('email', '')),
            "role": role,
            "permissions": admin_doc.get('permissions', {})
        }
    )

@router.get("/verify")
async def verify_token(current_admin: dict = Depends(get_current_admin)):
    """Verify JWT token"""
    return {"user": current_admin}

@router.post("/init")
async def initialize_super_admin():
    """Initialize first super admin (only works if no super admin exists)"""
    existing = await admins_collection.find_one({"role": "super_admin"})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Super admin already exists"
        )
    
    # Create default super admin with all permissions
    admin = Admin(
        username="admin",
        password_hash=hash_password("admin123"),
        role="super_admin",
        permissions=AdminPermissions(
            canManageAdmins=True,
            canManageAbout=True,
            canManagePortfolio=True,
            canManageBlogs=True,
            canManageTestimonials=True,
            canManageDemos=True,
            canViewContacts=True,
            canManageContactPage=True,
            canManageChat=True,
            canManageNewsletter=True,
            canManageBookings=True,
            canManageBookingSettings=True,
            canManagePricing=True,
            canViewAnalytics=True,
            canManageClients=True,
            canManageClientProjects=True,
            canAccessStorage=True,
            canManageNotes=True,
            canManageSettings=True,
            canViewPrivateProjects=True
        ),
        created_by="system"
    )
    
    admin_dict = admin.model_dump()
    admin_dict['created_at'] = admin_dict['created_at'].isoformat()
    
    await admins_collection.insert_one(admin_dict)
    
    # Create token
    token_data = {
        "id": admin.id,
        "username": admin.username,
        "role": admin.role,
        "permissions": admin.permissions.model_dump()
    }
    access_token = create_access_token(data=token_data)
    
    return TokenResponse(
        token=access_token,
        admin={
            "id": admin.id,
            "username": admin.username,
            "role": admin.role,
            "permissions": admin.permissions.model_dump()
        }
    )

@router.get("/list")
async def list_admins(current_admin: dict = Depends(require_super_admin)):
    """List all admins (super admin only)"""
    admins = await admins_collection.find({}).to_list(length=100)
    
    result = []
    for admin in admins:
        result.append({
            "id": admin['id'],
            "username": admin['username'],
            "role": admin['role'],
            "permissions": admin.get('permissions', {}),
            "created_at": admin['created_at'],
            "created_by": admin.get('created_by', 'system')
        })
    
    return {"admins": result}

@router.post("/create")
async def create_admin(
    admin_data: AdminCreate,
    current_admin: dict = Depends(require_super_admin)
):
    """Create new admin (super admin only)"""
    # Check if username exists
    existing = await admins_collection.find_one({"username": admin_data.username})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists"
        )
    
    # Set default permissions based on role
    if admin_data.role == "super_admin":
        permissions = AdminPermissions(
            canManageAdmins=True,
            canManageAbout=True,
            canManagePortfolio=True,
            canManageBlogs=True,
            canManageTestimonials=True,
            canManageDemos=True,
            canViewContacts=True,
            canManageContactPage=True,
            canManageChat=True,
            canManageNewsletter=True,
            canManageBookings=True,
            canManageBookingSettings=True,
            canManagePricing=True,
            canViewAnalytics=True,
            canManageClients=True,
            canManageClientProjects=True,
            canAccessStorage=True,
            canManageNotes=True,
            canManageSettings=True,
            canViewPrivateProjects=True
        )
    else:
        permissions = admin_data.permissions or AdminPermissions()
    
    # Create admin
    admin = Admin(
        username=admin_data.username,
        password_hash=hash_password(admin_data.password),
        role=admin_data.role,
        permissions=permissions,
        created_by=current_admin['username']
    )
    
    admin_dict = admin.model_dump()
    admin_dict['created_at'] = admin_dict['created_at'].isoformat()
    admin_dict['permissions'] = admin_dict['permissions'].model_dump() if hasattr(admin_dict['permissions'], 'model_dump') else admin_dict['permissions']
    
    await admins_collection.insert_one(admin_dict)
    
    return {
        "id": admin.id,
        "username": admin.username,
        "role": admin.role,
        "permissions": admin.permissions.model_dump()
    }

@router.put("/{admin_id}")
async def update_admin(
    admin_id: str,
    admin_data: AdminUpdate,
    current_admin: dict = Depends(require_super_admin)
):
    """Update admin (super admin only)"""
    # Find admin
    admin = await admins_collection.find_one({"id": admin_id})
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin not found"
        )
    
    # Prepare update data
    update_data = {}
    if admin_data.username:
        # Check if new username is available
        existing = await admins_collection.find_one({
            "username": admin_data.username,
            "id": {"$ne": admin_id}
        })
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already exists"
            )
        update_data['username'] = admin_data.username
    
    if admin_data.password:
        update_data['password_hash'] = hash_password(admin_data.password)
    
    if admin_data.permissions:
        update_data['permissions'] = admin_data.permissions.model_dump()
    
    if update_data:
        await admins_collection.update_one(
            {"id": admin_id},
            {"$set": update_data}
        )
    
    return {"message": "Admin updated successfully"}

@router.delete("/{admin_id}")
async def delete_admin(
    admin_id: str,
    current_admin: dict = Depends(require_super_admin)
):
    """Delete admin (super admin only, cannot delete super admins)"""
    # Find admin
    admin = await admins_collection.find_one({"id": admin_id})
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin not found"
        )
    
    # Cannot delete super admin
    if admin['role'] == 'super_admin':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot delete super admin"
        )
    
    # Cannot delete self
    if admin_id == current_admin['id']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot delete your own account"
        )
    
    await admins_collection.delete_one({"id": admin_id})
    return {"message": "Admin deleted successfully"}
