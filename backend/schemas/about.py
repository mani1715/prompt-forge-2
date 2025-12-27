from pydantic import BaseModel
from typing import List, Optional

class AboutValueSchema(BaseModel):
    """Schema for value/principle"""
    id: Optional[str] = None
    icon: str
    title: str
    description: str

class AboutAchievementSchema(BaseModel):
    """Schema for achievement/number"""
    id: Optional[str] = None
    icon: str
    value: str
    label: str

class AboutContentUpdate(BaseModel):
    """Schema for updating About page content"""
    # Hero Section
    hero_title: str
    hero_subtitle: str
    hero_description: str
    hero_badge: Optional[str] = "Premium Web Development Agency"
    
    # Story Section
    story_title: str
    story_paragraphs: List[str]
    story_expertise: List[str]
    
    # Values Section
    values_badge: Optional[str] = "Our Values"
    values_title: str
    values_description: str
    values: List[AboutValueSchema]
    
    # Achievements Section (Numbers That Speak)
    achievements_badge: Optional[str] = "Achievements"
    achievements_title: str
    achievements: List[AboutAchievementSchema]
    
    # Founder Section
    founder_badge: Optional[str] = "Meet the Founder"
    founder_title: str
    founder_name: str
    founder_role: str
    founder_bio: str
    founder_skills: List[str]
    founder_show_image: Optional[bool] = False
    founder_image_url: Optional[str] = None
    
    # CTA Section
    cta_title: str
    cta_description: str
    cta_button_text: str
    cta_button_link: Optional[str] = "/contact"

class AboutContentResponse(BaseModel):
    """Response schema for About content"""
    id: str
    hero_title: str
    hero_subtitle: str
    hero_description: str
    hero_badge: str
    story_title: str
    story_paragraphs: List[str]
    story_expertise: List[str]
    values_badge: str
    values_title: str
    values_description: str
    values: List[AboutValueSchema]
    achievements_badge: str
    achievements_title: str
    achievements: List[AboutAchievementSchema]
    founder_badge: str
    founder_title: str
    founder_name: str
    founder_role: str
    founder_bio: str
    founder_skills: List[str]
    founder_show_image: bool
    founder_image_url: Optional[str]
    cta_title: str
    cta_description: str
    cta_button_text: str
    cta_button_link: str
    updated_at: str
    updated_by: Optional[str]
