from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from datetime import datetime, timedelta
import uuid
import secrets

from database import (
    feelings_services_collection,
    service_requests_collection,
    generated_links_collection
)
from schemas.feelings_service import (
    FeelingsServiceCreate,
    FeelingsServiceUpdate,
    ServiceRequestCreate,
    ServiceRequestUpdate,
    GeneratedLinkCreate,
    GeneratedLinkUpdate
)
from models.feelings_service import FeelingsService
from models.service_request import ServiceRequest
from models.generated_link import GeneratedLink
from auth.admin_auth import get_current_admin

router = APIRouter(prefix="/feelings-services", tags=["Feelings Services"])

# ============================================
# FEELINGS SERVICES (Admin Only)
# ============================================

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_feelings_service(
    service: FeelingsServiceCreate,
    admin=Depends(get_current_admin)
):
    """Create a new feelings service (Admin only)"""
    service_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    
    service_doc = {
        "id": service_id,
        **service.model_dump(),
        "created_at": now,
        "updated_at": now,
        "created_by": admin.get("id")
    }
    
    await feelings_services_collection.insert_one(service_doc)
    return {"message": "Feelings service created successfully", "id": service_id}


@router.get("/", response_model=List[FeelingsService])
async def get_all_feelings_services(
    active_only: bool = False
):
    """Get all feelings services (public endpoint)"""
    query = {"is_active": True} if active_only else {}
    services = await feelings_services_collection.find(query).sort("display_order", 1).to_list(100)
    
    for service in services:
        service.pop("_id", None)
    
    return services


@router.get("/{service_id}", response_model=FeelingsService)
async def get_feelings_service(service_id: str):
    """Get a specific feelings service"""
    service = await feelings_services_collection.find_one({"id": service_id})
    
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    service.pop("_id", None)
    return service


@router.put("/{service_id}")
async def update_feelings_service(
    service_id: str,
    service_update: FeelingsServiceUpdate,
    admin=Depends(get_current_admin)
):
    """Update a feelings service (Admin only)"""
    existing_service = await feelings_services_collection.find_one({"id": service_id})
    
    if not existing_service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    update_data = service_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    await feelings_services_collection.update_one(
        {"id": service_id},
        {"$set": update_data}
    )
    
    return {"message": "Service updated successfully"}


@router.delete("/{service_id}")
async def delete_feelings_service(
    service_id: str,
    admin=Depends(get_current_admin)
):
    """Delete a feelings service (Admin only)"""
    result = await feelings_services_collection.delete_one({"id": service_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    
    return {"message": "Service deleted successfully"}


# ============================================
# SERVICE REQUESTS (Customer + Admin)
# ============================================

@router.post("/requests", status_code=status.HTTP_201_CREATED)
async def create_service_request(request: ServiceRequestCreate):
    """Create a new service request (Public endpoint - customers)"""
    # Verify service exists
    service = await feelings_services_collection.find_one({"id": request.service_id})
    
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    
    request_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    
    request_doc = {
        "id": request_id,
        "service_name": service["name"],
        "event_type": service["event_type"],
        **request.model_dump(),
        "status": "pending",
        "created_at": now,
        "updated_at": now
    }
    
    await service_requests_collection.insert_one(request_doc)
    
    return {
        "message": "Service request submitted successfully! We will contact you soon.",
        "request_id": request_id
    }


@router.get("/requests", response_model=List[ServiceRequest])
async def get_all_service_requests(
    status_filter: str = None,
    admin=Depends(get_current_admin)
):
    """Get all service requests (Admin only)"""
    query = {}
    if status_filter:
        query["status"] = status_filter
    
    requests = await service_requests_collection.find(query).sort("created_at", -1).to_list(1000)
    
    for req in requests:
        req.pop("_id", None)
    
    return requests


@router.get("/requests/{request_id}", response_model=ServiceRequest)
async def get_service_request(
    request_id: str,
    admin=Depends(get_current_admin)
):
    """Get a specific service request (Admin only)"""
    request = await service_requests_collection.find_one({"id": request_id})
    
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    request.pop("_id", None)
    return request


@router.put("/requests/{request_id}")
async def update_service_request(
    request_id: str,
    request_update: ServiceRequestUpdate,
    admin=Depends(get_current_admin)
):
    """Update a service request (Admin only)"""
    existing_request = await service_requests_collection.find_one({"id": request_id})
    
    if not existing_request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    update_data = request_update.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow().isoformat()
    
    await service_requests_collection.update_one(
        {"id": request_id},
        {"$set": update_data}
    )
    
    return {"message": "Request updated successfully"}


# ============================================
# GENERATED LINKS (Admin Only)
# ============================================

@router.post("/links", status_code=status.HTTP_201_CREATED)
async def generate_link(
    link_data: GeneratedLinkCreate,
    admin=Depends(get_current_admin)
):
    """Generate a mini-site link for a service request (Admin only)"""
    # Verify request exists
    request = await service_requests_collection.find_one({"id": link_data.request_id})
    
    if not request:
        raise HTTPException(status_code=404, detail="Service request not found")
    
    link_id = str(uuid.uuid4())
    short_code = secrets.token_urlsafe(8).replace("-", "").replace("_", "")[:8].upper()
    now = datetime.utcnow()
    expires_at = now + timedelta(hours=link_data.expiry_hours)
    
    link_doc = {
        "id": link_id,
        "request_id": link_data.request_id,
        "service_name": request["service_name"],
        "customer_name": request["customer_name"],
        "recipient_name": request.get("recipient_name"),
        "link_url": link_data.link_url,
        "short_code": short_code,
        "expiry_hours": link_data.expiry_hours,
        "created_at": now.isoformat(),
        "expires_at": expires_at.isoformat(),
        "is_active": True,
        "is_expired": False,
        "views_count": 0,
        "created_by": admin.get("id"),
        "notes": link_data.notes
    }
    
    await generated_links_collection.insert_one(link_doc)
    
    # Update service request with generated link ID
    await service_requests_collection.update_one(
        {"id": link_data.request_id},
        {"$set": {
            "generated_link_id": link_id,
            "status": "completed",
            "updated_at": now.isoformat()
        }}
    )
    
    return {
        "message": "Link generated successfully",
        "link_id": link_id,
        "short_code": short_code,
        "link_url": link_data.link_url,
        "expires_at": expires_at.isoformat()
    }


@router.get("/links", response_model=List[GeneratedLink])
async def get_all_generated_links(
    active_only: bool = False,
    admin=Depends(get_current_admin)
):
    """Get all generated links (Admin only)"""
    query = {}
    if active_only:
        query["is_active"] = True
        query["is_expired"] = False
    
    links = await generated_links_collection.find(query).sort("created_at", -1).to_list(1000)
    
    # Check and update expired links
    now = datetime.utcnow()
    for link in links:
        link.pop("_id", None)
        expires_at = datetime.fromisoformat(link["expires_at"])
        if not link["is_expired"] and expires_at < now:
            link["is_expired"] = True
            await generated_links_collection.update_one(
                {"id": link["id"]},
                {"$set": {"is_expired": True}}
            )
    
    return links


@router.get("/links/{link_id}", response_model=GeneratedLink)
async def get_generated_link(
    link_id: str,
    admin=Depends(get_current_admin)
):
    """Get a specific generated link (Admin only)"""
    link = await generated_links_collection.find_one({"id": link_id})
    
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    
    link.pop("_id", None)
    
    # Check if expired
    now = datetime.utcnow()
    expires_at = datetime.fromisoformat(link["expires_at"])
    if not link["is_expired"] and expires_at < now:
        link["is_expired"] = True
        await generated_links_collection.update_one(
            {"id": link_id},
            {"$set": {"is_expired": True}}
        )
    
    return link


@router.put("/links/{link_id}")
async def update_generated_link(
    link_id: str,
    link_update: GeneratedLinkUpdate,
    admin=Depends(get_current_admin)
):
    """Update a generated link (Admin only)"""
    existing_link = await generated_links_collection.find_one({"id": link_id})
    
    if not existing_link:
        raise HTTPException(status_code=404, detail="Link not found")
    
    update_data = link_update.model_dump(exclude_unset=True)
    
    # If expiry hours changed, recalculate expires_at
    if "expiry_hours" in update_data:
        created_at = datetime.fromisoformat(existing_link["created_at"])
        new_expires_at = created_at + timedelta(hours=update_data["expiry_hours"])
        update_data["expires_at"] = new_expires_at.isoformat()
        update_data["is_expired"] = False
    
    await generated_links_collection.update_one(
        {"id": link_id},
        {"$set": update_data}
    )
    
    return {"message": "Link updated successfully"}


@router.delete("/links/{link_id}")
async def delete_generated_link(
    link_id: str,
    admin=Depends(get_current_admin)
):
    """Delete a generated link (Admin only)"""
    result = await generated_links_collection.delete_one({"id": link_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Link not found")
    
    return {"message": "Link deleted successfully"}


# ============================================
# PUBLIC LINK ACCESS
# ============================================

@router.get("/public/{short_code}")
async def access_public_link(short_code: str):
    """Access a mini-site using short code (Public endpoint)"""
    link = await generated_links_collection.find_one({"short_code": short_code})
    
    if not link:
        raise HTTPException(status_code=404, detail="Link not found")
    
    # Check if expired
    now = datetime.utcnow()
    expires_at = datetime.fromisoformat(link["expires_at"])
    
    if expires_at < now:
        await generated_links_collection.update_one(
            {"id": link["id"]},
            {"$set": {"is_expired": True}}
        )
        raise HTTPException(status_code=410, detail="This link has expired")
    
    if not link["is_active"]:
        raise HTTPException(status_code=403, detail="This link is no longer active")
    
    # Increment view count
    await generated_links_collection.update_one(
        {"id": link["id"]},
        {
            "$inc": {"views_count": 1},
            "$set": {"last_viewed_at": now.isoformat()}
        }
    )
    
    link.pop("_id", None)
    return {
        "link_url": link["link_url"],
        "service_name": link["service_name"],
        "recipient_name": link.get("recipient_name")
    }
