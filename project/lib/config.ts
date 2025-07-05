export const config = {
  flaskApiUrl: process.env.FLASK_API_URL || 'http://localhost:5000',
  openaiApiKey: process.env.OPENAI_API_KEY,
  environment: process.env.NODE_ENV || 'development',
  
  // Database configuration
  database: {
    url: process.env.DATABASE_URL || 'sqlite:///./database/phetoho.db',
  },
  
  // API endpoints
  api: {
    chat: '/api/chat',
    products: '/api/products',
    orders: '/api/orders',
    admin: {
      orders: '/api/admin/orders',
      chats: '/api/admin/chats',
      inventory: '/api/admin/inventory',
      reports: '/api/admin/reports',
    }
  }
};