# Alpha-devs Backend API

A FastAPI-based backend for the Alpha-devs platform providing APIs for authentication, analytics, voice cloning, and more.

## Features

- **Authentication**: JWT-based user authentication
- **Alpha Analytics API**: Data analytics and dashboard endpoints
- **AI Voice Cloner API**: Voice synthesis and cloning endpoints
- **Contact Management**: Contact form submissions
- **Trial Management**: Free trial requests and management
- **Admin Panel**: Administrative endpoints for managing users and data

## Quick Start

### Prerequisites

- Python 3.8+
- pip or poetry

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Run the development server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### API Documentation

Once the server is running, you can access:
- **Interactive API docs**: http://localhost:8000/docs
- **ReDoc documentation**: http://localhost:8000/redoc

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login

### Contact & Trials
- `POST /contact` - Submit contact form
- `POST /trials/request` - Request a free trial

### Alpha Analytics
- `POST /analytics/query` - Execute analytics query
- `GET /analytics/dashboard` - Get dashboard data

### AI Voice Cloner
- `POST /voice/clone` - Generate cloned voice
- `GET /voice/samples` - Get available voice samples

### Admin
- `GET /admin/contacts` - Get all contact submissions
- `GET /admin/trials` - Get all trial requests

## Development

### Project Structure
```
backend/
├── main.py              # Main FastAPI application
├── requirements.txt     # Python dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

### Adding New Features

1. Define Pydantic models for request/response
2. Add route handlers in main.py
3. Implement business logic
4. Add authentication if required
5. Test the endpoints

### Database Integration

Currently using in-memory storage for simplicity. To add database support:

1. Install database dependencies (already in requirements.txt)
2. Set up SQLAlchemy models
3. Configure database connection
4. Replace in-memory storage with database operations

## Deployment

### Production Setup

1. Set up a production database (PostgreSQL recommended)
2. Configure environment variables for production
3. Set up Redis for caching and sessions
4. Use a production WSGI server like Gunicorn
5. Set up reverse proxy with Nginx

### Docker Deployment

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Security Considerations

- Change the SECRET_KEY in production
- Use HTTPS in production
- Implement rate limiting
- Add input validation and sanitization
- Set up proper CORS policies
- Use environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
