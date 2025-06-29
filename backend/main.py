from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import uvicorn
import os
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Alpha-devs API",
    description="Backend API for Alpha-devs platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"

# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class TrialRequest(BaseModel):
    email: EmailStr
    product: str
    full_name: str
    company: Optional[str] = None

class VoiceCloneRequest(BaseModel):
    text: str
    voice_id: str
    settings: Optional[dict] = {}

class AnalyticsQuery(BaseModel):
    query: str
    filters: Optional[dict] = {}
    date_range: Optional[dict] = {}

# In-memory storage (replace with database in production)
users_db = {}
contacts_db = []
trials_db = []

# Utility functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return email
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Routes
@app.get("/")
async def root():
    return {"message": "Alpha-devs API is running", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# Authentication routes
@app.post("/auth/register")
async def register(user: UserCreate):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    users_db[user.email] = {
        "email": user.email,
        "hashed_password": hashed_password,
        "full_name": user.full_name,
        "created_at": datetime.utcnow(),
        "is_active": True
    }
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "message": "User registered successfully"}

@app.post("/auth/login")
async def login(user: UserLogin):
    if user.email not in users_db:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    stored_user = users_db[user.email]
    if not verify_password(user.password, stored_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer", "message": "Login successful"}

# Contact form
@app.post("/contact")
async def submit_contact_form(contact: ContactForm):
    contact_entry = {
        "id": len(contacts_db) + 1,
        "name": contact.name,
        "email": contact.email,
        "subject": contact.subject,
        "message": contact.message,
        "submitted_at": datetime.utcnow(),
        "status": "new"
    }
    contacts_db.append(contact_entry)
    
    logger.info(f"New contact form submission from {contact.email}")
    return {"message": "Contact form submitted successfully", "id": contact_entry["id"]}

# Trial requests
@app.post("/trials/request")
async def request_trial(trial: TrialRequest):
    trial_entry = {
        "id": len(trials_db) + 1,
        "email": trial.email,
        "product": trial.product,
        "full_name": trial.full_name,
        "company": trial.company,
        "requested_at": datetime.utcnow(),
        "status": "pending",
        "trial_end_date": datetime.utcnow() + timedelta(days=14)
    }
    trials_db.append(trial_entry)
    
    logger.info(f"New trial request for {trial.product} from {trial.email}")
    return {"message": "Trial request submitted successfully", "trial_id": trial_entry["id"], "trial_end_date": trial_entry["trial_end_date"]}

# Alpha Analytics API
@app.post("/analytics/query")
async def analytics_query(query: AnalyticsQuery, current_user: str = Depends(get_current_user)):
    # Simulate analytics processing
    result = {
        "query": query.query,
        "results": [
            {"metric": "users", "value": 1250, "change": "+12%"},
            {"metric": "revenue", "value": 45000, "change": "+8%"},
            {"metric": "conversion", "value": 3.2, "change": "+0.5%"}
        ],
        "processed_at": datetime.utcnow(),
        "user": current_user
    }
    return result

@app.get("/analytics/dashboard")
async def get_dashboard_data(current_user: str = Depends(get_current_user)):
    # Simulate dashboard data
    dashboard_data = {
        "overview": {
            "total_users": 15420,
            "active_users": 8930,
            "revenue": 125000,
            "growth_rate": 15.2
        },
        "charts": [
            {"name": "User Growth", "data": [100, 120, 140, 160, 180, 200]},
            {"name": "Revenue", "data": [5000, 6000, 7500, 8200, 9100, 10500]}
        ],
        "user": current_user
    }
    return dashboard_data

# AI Voice Cloner API
@app.post("/voice/clone")
async def clone_voice(request: VoiceCloneRequest, current_user: str = Depends(get_current_user)):
    # Simulate voice cloning process
    result = {
        "text": request.text,
        "voice_id": request.voice_id,
        "audio_url": f"/audio/generated/{request.voice_id}_{datetime.utcnow().timestamp()}.mp3",
        "duration": len(request.text) * 0.1,  # Rough estimate
        "generated_at": datetime.utcnow(),
        "user": current_user
    }
    return result

@app.get("/voice/samples")
async def get_voice_samples():
    # Return sample voices
    samples = [
        {"id": "voice_1", "name": "Professional Male", "language": "en-US", "sample_url": "/samples/voice_1.mp3"},
        {"id": "voice_2", "name": "Friendly Female", "language": "en-US", "sample_url": "/samples/voice_2.mp3"},
        {"id": "voice_3", "name": "Narrator", "language": "en-UK", "sample_url": "/samples/voice_3.mp3"}
    ]
    return {"samples": samples}

# Admin routes
@app.get("/admin/contacts")
async def get_contacts(current_user: str = Depends(get_current_user)):
    return {"contacts": contacts_db}

@app.get("/admin/trials")
async def get_trials(current_user: str = Depends(get_current_user)):
    return {"trials": trials_db}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
