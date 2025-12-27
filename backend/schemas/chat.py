from pydantic import BaseModel, EmailStr
from typing import Optional

class ChatMessageCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = None
    message: str

class ChatReply(BaseModel):
    message: str
