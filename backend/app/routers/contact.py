from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.contact import Contact
from ..schemas.contact import ContactCreate, ContactResponse

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("/", response_model=ContactResponse)
def submit_contact(data: ContactCreate, db: Session = Depends(get_db)):
    contact = Contact(
        full_name=data.full_name,
        email=data.email,
        phone=data.phone,
        message=data.message
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact