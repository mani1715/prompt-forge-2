from pydantic import BaseModel
from typing import List, Optional

class WebsiteTypeSchema(BaseModel):
    name: str
    price: float

class TechnologySchema(BaseModel):
    name: str
    price: float

class FeatureSchema(BaseModel):
    name: str
    price: float

class TimelineMultiplierSchema(BaseModel):
    range: str
    multiplier: float

class PricingUpdate(BaseModel):
    website_types: Optional[List[WebsiteTypeSchema]] = None
    technologies: Optional[List[TechnologySchema]] = None
    features: Optional[List[FeatureSchema]] = None
    timeline_multipliers: Optional[List[TimelineMultiplierSchema]] = None
    currency: Optional[str] = None
    currency_symbol: Optional[str] = None

class PricingResponse(BaseModel):
    id: str
    website_types: List[WebsiteTypeSchema]
    technologies: List[TechnologySchema]
    features: List[FeatureSchema]
    timeline_multipliers: List[TimelineMultiplierSchema]
    currency: str
    currency_symbol: str
