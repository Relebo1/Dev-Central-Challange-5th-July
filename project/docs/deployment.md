# Deployment Guide

## Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Git
- OpenAI API key

## Local Development Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd phetoho

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend-api
pip install -r requirements.txt
```

### 2. Environment Configuration

Create `.env.local` in the project root:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key
FLASK_API_URL=http://localhost:5000
```

Create `.env` in the `backend-api` directory:
```env
OPENAI_API_KEY=your-openai-api-key
DATABASE_URL=sqlite:///./database/phetoho.db
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
```

### 3. Initialize Database

```bash
cd backend-api
python create_db.py
```

### 4. Start Development Servers

Terminal 1 (Backend):
```bash
cd backend-api
python app.py
```

Terminal 2 (Frontend):
```bash
npm run dev
```

Access the application at `http://localhost:3000`

## Production Deployment

### Option 1: Vercel (Frontend) + Railway (Backend)

#### Deploy Backend to Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and deploy:
```bash
cd backend-api
railway login
railway init
railway up
```

3. Set environment variables in Railway dashboard:
```env
OPENAI_API_KEY=your-openai-api-key
DATABASE_URL=sqlite:///./database/phetoho.db
FLASK_ENV=production
SECRET_KEY=your-production-secret-key
```

#### Deploy Frontend to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
```env
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-api-key
FLASK_API_URL=https://your-backend.railway.app
```

### Option 2: Docker Deployment

#### Backend Dockerfile

Create `backend-api/Dockerfile`:
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python create_db.py

EXPOSE 5000

CMD ["python", "app.py"]
```

#### Frontend Dockerfile

Create `Dockerfile` in project root:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend-api
    ports:
      - "5000:5000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - FLASK_ENV=production
    volumes:
      - ./backend-api/database:/app/database

  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXTAUTH_URL=http://localhost:3000
      - FLASK_API_URL=http://backend:5000
    depends_on:
      - backend
```

Deploy with:
```bash
docker-compose up -d
```

### Option 3: Traditional VPS Deployment

#### Server Setup (Ubuntu 20.04+)

1. Install dependencies:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python
sudo apt install python3 python3-pip python3-venv -y

# Install nginx
sudo apt install nginx -y

# Install PM2 for process management
sudo npm install -g pm2
```

2. Clone and setup application:
```bash
git clone <repository-url>
cd phetoho

# Setup backend
cd backend-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python create_db.py

# Setup frontend
cd ..
npm install
npm run build
```

3. Configure PM2:

Create `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: 'phetoho-backend',
      script: 'backend-api/app.py',
      interpreter: 'backend-api/venv/bin/python',
      env: {
        FLASK_ENV: 'production',
        OPENAI_API_KEY: 'your-api-key'
      }
    },
    {
      name: 'phetoho-frontend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        FLASK_API_URL: 'http://localhost:5000'
      }
    }
  ]
};
```

4. Start applications:
```bash
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

5. Configure Nginx:

Create `/etc/nginx/sites-available/phetoho`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/phetoho /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

6. Setup SSL with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## Environment Variables Reference

### Frontend (.env.local)
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-api-key
FLASK_API_URL=http://localhost:5000
```

### Backend (.env)
```env
OPENAI_API_KEY=your-openai-api-key
DATABASE_URL=sqlite:///./database/phetoho.db
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=http://localhost:3000
```

## Database Migration

### Backup Database
```bash
cp backend-api/database/phetoho.db backend-api/database/phetoho.db.backup
```

### Restore Database
```bash
cp backend-api/database/phetoho.db.backup backend-api/database/phetoho.db
```

## Monitoring and Maintenance

### Log Management
```bash
# View PM2 logs
pm2 logs

# View specific app logs
pm2 logs phetoho-backend
pm2 logs phetoho-frontend

# Clear logs
pm2 flush
```

### Performance Monitoring
```bash
# Monitor processes
pm2 monit

# Check system resources
htop

# Monitor disk usage
df -h
```

### Updates
```bash
# Update application
git pull origin main

# Update backend dependencies
cd backend-api
source venv/bin/activate
pip install -r requirements.txt

# Update frontend dependencies
cd ..
npm install
npm run build

# Restart services
pm2 restart all
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check database file permissions
   - Verify DATABASE_URL environment variable
   - Ensure database directory exists

2. **API Connection Error**
   - Verify FLASK_API_URL is correct
   - Check backend server is running
   - Verify CORS settings

3. **OpenAI API Error**
   - Check API key is valid
   - Verify account has sufficient credits
   - Check rate limits

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all environment variables are set

### Performance Optimization

1. **Database Optimization**
   - Add indexes for frequently queried columns
   - Regular database maintenance
   - Monitor query performance

2. **API Optimization**
   - Implement response caching
   - Use connection pooling
   - Optimize database queries

3. **Frontend Optimization**
   - Enable compression
   - Use CDN for static assets
   - Implement lazy loading

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong SECRET_KEY
- [ ] Enable CORS restrictions
- [ ] Implement rate limiting
- [ ] Regular security updates
- [ ] Monitor access logs
- [ ] Use secure headers
- [ ] Implement input validation
- [ ] Regular backup procedures
- [ ] Monitor for vulnerabilities