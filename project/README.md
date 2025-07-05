# Phetoho - AI-Powered Business Portal

**Phetoho** (Sesotho for "Change" or "Transformation") is a comprehensive web application that transforms how small and medium businesses interact with their customers and manage their operations through AI-powered automation.

## Features

### Client Web Portal
- **Product Browsing**: SEO-optimized product catalog with advanced filtering
- **AI Chatbot**: 24/7 customer support powered by OpenAI
- **Order Management**: Real-time order placement and tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Admin Dashboard
- **Chat Monitoring**: Real-time chat oversight and AI interaction logs
- **Order Management**: Comprehensive order processing and fulfillment
- **Inventory Tracking**: Real-time stock management and alerts
- **AI Reports**: Automated insights and business intelligence
- **Role-Based Access**: Secure authentication with NextAuth.js

### Backend API
- **Flask RESTful API**: Robust server handling all business logic
- **AI Integration**: OpenAI API integration for chatbot and reports
- **SQLite Database**: Lightweight, easy-to-deploy data storage
- **Security**: CORS, input validation, and secure endpoints

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Flask, Python, SQLAlchemy
- **Database**: SQLite
- **AI**: OpenAI API
- **Authentication**: NextAuth.js
- **Deployment**: Vercel (frontend), Railway/Heroku (backend)

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- OpenAI API key

### Installation

1. **Clone and setup the project**
```bash
git clone <repository-url>
cd phetoho
npm install
```

2. **Setup Backend**
```bash
cd backend-api
pip install -r requirements.txt
python create_db.py
python app.py
```

3. **Setup Frontend**
```bash
# In project root
npm run dev
```

4. **Environment Variables**
Create `.env.local` in root:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-key
FLASK_API_URL=http://localhost:5000
```

Create `.env` in backend-api/:
```
OPENAI_API_KEY=your-openai-key
DATABASE_URL=sqlite:///./phetoho.db
FLASK_ENV=development
```

## Project Structure

```
phetoho/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication pages
│   ├── admin/                    # Admin dashboard
│   ├── api/                      # API routes
│   └── (client)/                 # Client portal
├── backend-api/                  # Flask backend
│   ├── routes/                   # API endpoints
│   ├── models/                   # Database models
│   ├── services/                 # Business logic
│   └── ai/                       # AI integration
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components
│   ├── client/                   # Client portal components
│   └── admin/                    # Admin dashboard components
├── database/                     # Database schema and seeds
├── docs/                         # Documentation
└── lib/                          # Utility functions
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Client Portal
- `GET /api/products` - Get product catalog
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `POST /api/chat` - AI chatbot interaction

### Admin Dashboard
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/chats` - Get chat logs
- `GET /api/admin/reports` - Get AI-generated reports
- `PUT /api/admin/orders/:id` - Update order status

## Deployment

### Frontend (Vercel)
```bash
npm run build
vercel deploy
```

### Backend (Railway)
```bash
railway login
railway init
railway up
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.