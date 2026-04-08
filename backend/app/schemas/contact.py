from pydantic import BaseModel, EmailStr

class ContactCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    message: str

class ContactResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    message: str

    class Config:
        from_attributes = True
