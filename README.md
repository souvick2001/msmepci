# MSME PCI — Full Stack Web App

A platform for India's MSME ecosystem.

## Tech Stack
- **Frontend**: Angular 17+ (Standalone Components, Signals)
- **Backend**: FastAPI + SQLite + SQLAlchemy
- **Auth**: JWT tokens via python-jose + passlib/bcrypt

---

## Project Structure
cat > backend/.env.example << 'EOF'
SECRET_KEY=change-this-to-a-random-secret-key
DATABASE_URL=sqlite:///./msmepci.db
ACCESS_TOKEN_EXPIRE_MINUTES=10080
ALLOWED_ORIGINS=["http://localhost:4200"]
