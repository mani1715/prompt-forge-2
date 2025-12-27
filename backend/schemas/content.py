from pydantic import BaseModel
from typing import Optional

class ContentUpdate(BaseModel):
    # Hero Section
    hero_headline: Optional[str] = None
    hero_subheadline: Optional[str] = None
    hero_description: Optional[str] = None
    hero_cta1_text: Optional[str] = None
    hero_cta2_text: Optional[str] = None
    
    # Stats Section
    stat_projects_value: Optional[str] = None
    stat_projects_label: Optional[str] = None
    stat_clients_value: Optional[str] = None
    stat_clients_label: Optional[str] = None
    stat_experience_value: Optional[str] = None
    stat_experience_label: Optional[str] = None
    stat_satisfaction_value: Optional[str] = None
    stat_satisfaction_label: Optional[str] = None
    
    # Services Section
    services_badge: Optional[str] = None
    services_title: Optional[str] = None
    services_description: Optional[str] = None
    
    # Projects Section
    projects_badge: Optional[str] = None
    projects_title: Optional[str] = None
    projects_description: Optional[str] = None
    
    # Testimonials Section
    testimonials_badge: Optional[str] = None
    testimonials_title: Optional[str] = None
    testimonials_description: Optional[str] = None
    
    # CTA Section
    cta_heading: Optional[str] = None
    cta_description: Optional[str] = None
    cta_button_text: Optional[str] = None
    
    # About Page
    about_title: Optional[str] = None
    about_description: Optional[str] = None
    about_mission: Optional[str] = None
    about_vision: Optional[str] = None
    
    # Contact Page
    contact_title: Optional[str] = None
    contact_description: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    contact_address: Optional[str] = None

class ContentResponse(BaseModel):
    id: str
    
    # Hero Section
    hero_headline: str
    hero_subheadline: str
    hero_description: str
    hero_cta1_text: str
    hero_cta2_text: str
    
    # Stats Section
    stat_projects_value: str
    stat_projects_label: str
    stat_clients_value: str
    stat_clients_label: str
    stat_experience_value: str
    stat_experience_label: str
    stat_satisfaction_value: str
    stat_satisfaction_label: str
    
    # Services Section
    services_badge: str
    services_title: str
    services_description: str
    
    # Projects Section
    projects_badge: str
    projects_title: str
    projects_description: str
    
    # Testimonials Section
    testimonials_badge: str
    testimonials_title: str
    testimonials_description: str
    
    # CTA Section
    cta_heading: str
    cta_description: str
    cta_button_text: str
    
    # About Page
    about_title: str
    about_description: str
    about_mission: str
    about_vision: str
    
    # Contact Page
    contact_title: str
    contact_description: str
    contact_email: str
    contact_phone: str
    contact_address: str
