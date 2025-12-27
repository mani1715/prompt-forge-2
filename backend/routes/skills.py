from fastapi import APIRouter, HTTPException, status, Depends
from schemas.skill import SkillCreate, SkillUpdate
from database import skills_collection
from auth.admin_auth import get_current_admin
from models.skill import Skill

router = APIRouter(prefix="/skills", tags=["skills"])

@router.get("")
async def get_skills():
    """Get all skills (public endpoint)"""
    skills = await skills_collection.find({}).to_list(length=100)
    
    result = []
    for skill in skills:
        result.append({
            "id": skill['id'],
            "name": skill['name'],
            "icon": skill.get('icon', '⭐')
        })
    
    return {"skills": result}

@router.post("")
async def create_skill(
    skill_data: SkillCreate,
    current_admin: dict = Depends(get_current_admin)
):
    """Create new skill (admin only)"""
    skill = Skill(
        name=skill_data.name,
        icon=skill_data.icon
    )
    
    skill_dict = skill.model_dump()
    skill_dict['created_at'] = skill_dict['created_at'].isoformat()
    
    await skills_collection.insert_one(skill_dict)
    
    return {"id": skill.id, "message": "Skill created successfully"}

@router.put("/{skill_id}")
async def update_skill(
    skill_id: str,
    skill_data: SkillUpdate,
    current_admin: dict = Depends(get_current_admin)
):
    """Update skill (admin only)"""
    skill = await skills_collection.find_one({"id": skill_id})
    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )
    
    update_data = {}
    if skill_data.name is not None:
        update_data['name'] = skill_data.name
    if skill_data.icon is not None:
        update_data['icon'] = skill_data.icon
    
    if update_data:
        await skills_collection.update_one(
            {"id": skill_id},
            {"$set": update_data}
        )
    
    return {"message": "Skill updated successfully"}

@router.delete("/{skill_id}")
async def delete_skill(
    skill_id: str,
    current_admin: dict = Depends(get_current_admin)
):
    """Delete skill (admin only)"""
    result = await skills_collection.delete_one({"id": skill_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )
    
    return {"message": "Skill deleted successfully"}
