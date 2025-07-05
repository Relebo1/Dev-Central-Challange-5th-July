# Phetoho Architecture Documentation

## Overview
Phetoho is a full-stack AI-powered business portal designed for small and medium businesses. The architecture follows a clean separation of concerns with a React frontend, Flask backend, and SQLite database.

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │   Flask API     │    │   SQLite DB     │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │Client Portal│ │    │ │    Routes   │ │    │ │   Products  │ │
│ │             │ │    │ │             │ │    │ │             │ │
│ │- Product    │ │    │ │- Chat       │ │    │ │   Orders    │ │
│ │  Catalog    │ │    │ │- Orders     │ │    │ │             │ │
│ │- AI Chat    │ │    │ │- Products   │ │    │ │   Chat Logs │ │
│ │- Orders     │ │    │ │- Admin      │ │    │ │             │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ │   Users     │ │
│                 │    │                 │    │ └─────────────┘ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    └─────────────────┘
│ │Admin Portal │ │    │ │AI Services  │ │
│ │             │ │    │ │             │ │    ┌─────────────────┐
│ │- Dashboard  │ │    │ │- OpenAI     │ │    │   OpenAI API    │
│ │- Orders     │ │    │ │  Client     │ │    │                 │
│ │- Chat Mon.  │ │    │ │- Chat       │ │    │ ┌─────────────┐ │
│ │- Inventory  │ │    │ │  Service    │ │    │ │  GPT-3.5    │ │
│ │- Reports    │ │    │ │- Report     │ │    │ │  Turbo      │ │
│ └─────────────┘ │    │ │  Service    │ │    │ └─────────────┘ │
└─────────────────┘    │ └─────────────┘ │    └─────────────────┘
                       └─────────────────┘
```

## Frontend (Next.js)

### Client Portal
- **Product Catalog**: Browse products with filtering and search
- **AI Chatbot**: 24/7 customer support using OpenAI
- **Order Management**: Place and track orders
- **Responsive Design**: Mobile-first approach

### Admin Dashboard
- **Order Management**: View and update order status
- **Chat Monitoring**: Real-time chat oversight
- **Inventory Tracking**: Stock levels and alerts
- **AI Reports**: Business insights and analytics

### Key Technologies
- **Next.js 13+**: App Router, Server Components
- **TypeScript**: Type safety throughout
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern UI components
- **React Hooks**: State management

## Backend (Flask)

### API Structure
```
/api/
├── health              # Health check endpoint
├── chat               # AI chat interactions
├── products           # Product catalog
├── orders             # Order management
└── admin/
    ├── chats          # Chat monitoring
    ├── inventory      # Inventory management
    └── reports        # AI-generated reports
```

### Services Layer
- **ChatService**: Handles AI interactions and logging
- **OrderService**: Manages order lifecycle
- **InventoryService**: Product and stock management
- **ReportService**: AI-powered analytics

### AI Integration
- **OpenAI Client**: Centralized AI service wrapper
- **Chat Processing**: Natural language understanding
- **Business Insights**: Data analysis and recommendations
- **Sentiment Analysis**: Customer satisfaction tracking

## Database (SQLite)

### Schema Design
```sql
-- Core business entities
products (id, name, sku, category, price, stock, ...)
orders (id, customer_info, items, total, status, ...)
chat_logs (id, user_id, message, response, sentiment, ...)
users (id, email, password_hash, role, ...)
```

### Key Features
- **Lightweight**: Perfect for SMB deployment
- **Zero Configuration**: No database server required
- **ACID Compliant**: Reliable transactions
- **Backup Friendly**: Single file database

## Security Architecture

### Authentication
- **Role-Based Access**: Customer vs Admin permissions
- **Secure Sessions**: JWT-based authentication
- **Password Hashing**: bcrypt for password security

### API Security
- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Sanitized user inputs
- **Rate Limiting**: Prevents abuse
- **Error Handling**: Secure error responses

### Data Protection
- **Encrypted Storage**: Sensitive data encryption
- **API Key Management**: Secure credential handling
- **Audit Logging**: User action tracking

## Deployment Architecture

### Development
```
Frontend: localhost:3000 (Next.js dev server)
Backend:  localhost:5000 (Flask dev server)
Database: ./database/phetoho.db (Local SQLite)
```

### Production
```
Frontend: Vercel/Netlify (Static hosting)
Backend:  Railway/Heroku (Container hosting)
Database: Persistent volume (SQLite file)
```

## Performance Considerations

### Frontend Optimization
- **Code Splitting**: Lazy loading components
- **Image Optimization**: Next.js Image component
- **Static Generation**: Pre-rendered pages
- **Caching**: API response caching

### Backend Optimization
- **Database Indexing**: Query optimization
- **Connection Pooling**: Efficient database access
- **Async Processing**: Non-blocking operations
- **Caching Layer**: Redis for frequently accessed data

### AI Performance
- **Response Caching**: Common query caching
- **Streaming Responses**: Real-time chat updates
- **Token Management**: Efficient API usage
- **Fallback Responses**: Graceful degradation

## Monitoring and Analytics

### Application Monitoring
- **Health Checks**: Automated system monitoring
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Response time tracking
- **User Analytics**: Interaction tracking

### Business Intelligence
- **AI Reports**: Automated insights generation
- **Dashboard Metrics**: Real-time KPIs
- **Trend Analysis**: Historical data analysis
- **Predictive Analytics**: Future trend forecasting

## Scalability Considerations

### Horizontal Scaling
- **Load Balancing**: Multiple backend instances
- **Database Sharding**: Distributed data storage
- **CDN Integration**: Global content delivery
- **Microservices**: Service decomposition

### Vertical Scaling
- **Resource Optimization**: CPU/Memory tuning
- **Database Optimization**: Query performance
- **Caching Strategy**: Multi-level caching
- **Connection Pooling**: Efficient resource usage

## Future Enhancements

### Phase 2 Features
- **Multi-tenant Support**: Multiple business accounts
- **Advanced Analytics**: ML-powered insights
- **Mobile App**: React Native implementation
- **Real-time Notifications**: WebSocket integration

### Phase 3 Features
- **Marketplace Integration**: Third-party platforms
- **Advanced AI**: Custom model training
- **Enterprise Features**: SSO, advanced security
- **API Ecosystem**: Third-party integrations