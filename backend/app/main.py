from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.routers import auth
from app.routers import contact
import app.models.user
import app.models.contact

Base.metadata.create_all(bind=engine)

app = FastAPI(title="MSME PCI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(contact.router, tags=["Contact"])

@app.get("/health")
def health():
    return {"status": "ok"}