from pydantic import BaseModel, Field
from typing import Dict, List
from datetime import datetime

class WebsiteType(BaseModel):
    name: str
    price: float

class Technology(BaseModel):
    name: str
    price: float

class Feature(BaseModel):
    name: str
    price: float

class TimelineMultiplier(BaseModel):
    range: str
    multiplier: float

class Pricing(BaseModel):
    id: str = Field(default="pricing_config")
    website_types: List[WebsiteType] = []
    technologies: List[Technology] = []
    features: List[Feature] = []
    timeline_multipliers: List[TimelineMultiplier] = []
    currency: str = "INR"
    currency_symbol: str = "₹"
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        json_schema_extra = {
            "example": {
                "website_types": [
                    {"name": "Business Website", "price": 25000},
                    {"name": "E-commerce Website", "price": 50000},
                    {"name": "Portfolio Website", "price": 15000},
                    {"name": "SaaS / Web App", "price": 100000}
                ],
                "technologies": [
                    {"name": "HTML/CSS", "price": 0},
                    {"name": "React", "price": 15000},
                    {"name": "Next.js", "price": 20000},
                    {"name": "Node.js", "price": 12000},
                    {"name": "FastAPI", "price": 12000},
                    {"name": "MongoDB", "price": 8000},
                    {"name": "MySQL", "price": 8000}
                ],
                "features": [
                    {"name": "Admin Panel", "price": 15000},
                    {"name": "Blog System", "price": 10000},
                    {"name": "Authentication", "price": 8000},
                    {"name": "Payment Gateway", "price": 12000},
                    {"name": "SEO Optimization", "price": 5000}
                ],
                "timeline_multipliers": [
                    {"range": "7-15 days", "multiplier": 1.5},
                    {"range": "15-30 days", "multiplier": 1.0},
                    {"range": "30-60 days", "multiplier": 0.8}
                ],
                "currency": "INR",
                "currency_symbol": "₹"
            }
        }
