import sqlite3
import os
from datetime import datetime

def init_database():
    """Initialize the SQLite database with required tables"""
    db_path = 'database/phetoho.db'
    
    # Create database directory if it doesn't exist
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create tables
    create_tables(cursor)
    
    # Insert sample data
    insert_sample_data(cursor)
    
    conn.commit()
    conn.close()
    
    print("Database initialized successfully!")

def create_tables(cursor):
    """Create all required tables"""
    
    # Products table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            sku TEXT UNIQUE NOT NULL,
            category TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            stock INTEGER NOT NULL DEFAULT 0,
            min_stock INTEGER NOT NULL DEFAULT 5,
            image_url TEXT,
            rating REAL DEFAULT 5.0,
            active BOOLEAN DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Orders table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            customer_id TEXT,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            items TEXT NOT NULL,
            total REAL NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Chat logs table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS chat_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            message TEXT NOT NULL,
            response TEXT NOT NULL,
            sentiment TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Users table (for authentication)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'customer',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

def insert_sample_data(cursor):
    """Insert sample data for testing"""
    
    # Sample products
    sample_products = [
        ('Premium Wireless Headphones', 'PWH-001', 'Electronics', 'High-quality wireless headphones with noise cancellation', 299.99, 45, 10, 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400', 4.8),
        ('Smart Fitness Watch', 'SFW-002', 'Electronics', 'Track your fitness goals with this advanced smartwatch', 199.99, 8, 15, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400', 4.6),
        ('Ergonomic Office Chair', 'EOC-003', 'Furniture', 'Comfortable office chair with lumbar support', 449.99, 0, 5, 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400', 4.9),
        ('Organic Coffee Beans', 'OCB-004', 'Food', 'Premium organic coffee beans from sustainable farms', 24.99, 120, 25, 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400', 4.7),
        ('Minimalist Desk Lamp', 'MDL-005', 'Home', 'Modern LED desk lamp with adjustable brightness', 79.99, 32, 8, 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400', 4.5),
        ('Yoga Mat Premium', 'YMP-006', 'Sports', 'Non-slip yoga mat with extra cushioning', 89.99, 18, 10, 'https://images.pexels.com/photos/4327024/pexels-photo-4327024.jpeg?auto=compress&cs=tinysrgb&w=400', 4.8)
    ]
    
    cursor.executemany('''
        INSERT OR IGNORE INTO products (name, sku, category, description, price, stock, min_stock, image_url, rating)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', sample_products)
    
    # Sample orders
    sample_orders = [
        ('ORD-001', 'customer1', 'John Doe', 'john@example.com', '[{"id": 1, "quantity": 2}]', 599.98, 'processing'),
        ('ORD-002', 'customer2', 'Jane Smith', 'jane@example.com', '[{"id": 2, "quantity": 1}]', 199.99, 'shipped'),
        ('ORD-003', 'customer3', 'Bob Johnson', 'bob@example.com', '[{"id": 3, "quantity": 1}]', 449.99, 'delivered'),
        ('ORD-004', 'customer4', 'Alice Brown', 'alice@example.com', '[{"id": 5, "quantity": 1}]', 79.99, 'pending')
    ]
    
    cursor.executemany('''
        INSERT OR IGNORE INTO orders (id, customer_id, customer_name, customer_email, items, total, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', sample_orders)
    
    # Sample chat logs
    sample_chats = [
        ('customer1', 'Hello, I need help with my order', 'Hi! I\'d be happy to help you with your order. Could you please provide your order number?'),
        ('customer2', 'Can you track my package?', 'Of course! Your package is currently in transit and should arrive within 2-3 business days.'),
        ('customer3', 'What is your return policy?', 'We offer a 30-day return policy for all items. You can return any item within 30 days of purchase for a full refund.')
    ]
    
    cursor.executemany('''
        INSERT OR IGNORE INTO chat_logs (user_id, message, response)
        VALUES (?, ?, ?)
    ''', sample_chats)

if __name__ == '__main__':
    init_database()