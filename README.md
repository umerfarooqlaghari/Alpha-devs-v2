# Alpha-devs v2

A modern, sleek website for Alpha-devs featuring cutting-edge design, full-stack functionality, and professional presentation of our products and services.

## 🚀 Features

- **Modern Design**: Sleek black, white, and gray color scheme with professional aesthetics
- **Full-Stack Architecture**: Next.js frontend with Python FastAPI backend (monolithic)
- **Product Showcase**: Complete Alpha-analytics and AI Voice Cloner product pages
- **Interactive Elements**: Working buttons, notifications, and smooth animations
- **Professional Icons**: Custom-designed SVG icons and graphics
- **Loading Animations**: Smooth transitions and loading states
- **Notification System**: Toast notifications and user feedback widgets
- **Responsive Design**: Mobile-first approach with responsive layouts

## 🛠 Tech Stack

### Frontend
- **Next.js 15** with TypeScript
- **Tailwind CSS 4** for styling
- **React 19** with modern hooks
- **Custom SVG Icons** for professional appearance

### Backend
- **FastAPI** (Python) for API endpoints
- **JWT Authentication** for secure access
- **Pydantic** for data validation
- **SQLAlchemy** ready for database integration
- **Uvicorn** ASGI server

## 📦 Project Structure

```
alpha-devs-v2/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── products/          # Product pages
│   │   │   ├── alpha-analytics/
│   │   │   └── ai-voice-cloner/
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── icons/            # Custom SVG icons
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── NotificationWidget.tsx
│   │   └── PageTransition.tsx
│   └── hooks/                # Custom React hooks
│       └── useNotifications.ts
├── backend/                  # Python FastAPI backend
│   ├── main.py              # Main FastAPI application
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example        # Environment variables template
│   └── README.md           # Backend documentation
├── public/                  # Static assets
└── package.json            # Node.js dependencies
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd alpha-devs-v2
```

2. **Install all dependencies**
```bash
npm run setup
```

3. **Set up environment variables**
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

4. **Run the full development environment**
```bash
npm run dev:full
```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Individual Commands

**Frontend only:**
```bash
npm run dev
```

**Backend only:**
```bash
npm run backend:dev
```

**Install backend dependencies:**
```bash
npm run backend:install
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Black (#000000)
- **Secondary**: White (#ffffff)
- **Accent**: Various shades of gray
- **Professional and sleek appearance**

### Components
- **AlphaDevsLogo**: Custom logo component with the new Alpha-devs branding
- **Professional Icons**: Custom SVG icons for analytics, voice, security, AI, and integration
- **Loading Animations**: Smooth page transitions and loading states
- **Notification System**: Toast notifications for user feedback
- **Card Components**: Sleek cards with hover effects and glass morphism

### Animations
- **Page Transitions**: Smooth fade-in animations between routes
- **Hover Effects**: Interactive hover states for buttons and cards
- **Loading States**: Professional loading spinners and transitions
- **Icon Animations**: Animated SVG icons for enhanced user experience

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Products
- `POST /analytics/query` - Execute analytics queries
- `GET /analytics/dashboard` - Get dashboard data
- `POST /voice/clone` - Generate voice clones
- `GET /voice/samples` - Get voice samples

### General
- `POST /contact` - Submit contact forms
- `POST /trials/request` - Request product trials

## 📱 Product Pages

### Alpha-analytics
- **Complete pricing section** with three tiers
- **Interactive feature showcase** with professional icons
- **Working trial and purchase buttons** with notifications
- **Real-time analytics simulation**

### AI Voice Cloner
- **Comprehensive feature overview** with animated icons
- **Use case demonstrations** across multiple industries
- **Interactive demo and sample buttons**
- **Professional presentation** of voice technology

## 🔒 Security Features

- **JWT-based authentication** for secure API access
- **Input validation** with Pydantic models
- **CORS configuration** for secure cross-origin requests
- **Environment variable management** for sensitive data

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel or your preferred platform
```

### Backend (Production)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Docker Deployment
```dockerfile
# See backend/README.md for Docker configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary to Alpha-devs. All rights reserved.

## 📞 Support

For support and questions:
- Email: support@alpha-devs.com
- Website: https://alpha-devs.com
- Documentation: See individual component README files

---

**Alpha-devs** - Leading Software Development & AI Solutions
