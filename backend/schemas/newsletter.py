from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class NewsletterSubscribe(BaseModel):
    email: EmailStr

class NewsletterResponse(BaseModel):
    id: str
    email: EmailStr
    status: str
    created_at: datetime

class NewsletterUpdate(BaseModel):
    status: str
