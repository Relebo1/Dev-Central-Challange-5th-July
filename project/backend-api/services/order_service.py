from datetime import datetime
from typing import Dict, List, Optional
import sqlite3
import json
import uuid

class OrderService:
    def __init__(self):
        self.db_path = 'database/phetoho.db'
    
    def create_order(self, order_data: Dict) -> Dict:
        """Create a new order"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            order_id = f"ORD-{uuid.uuid4().hex[:8].upper()}"
            
            cursor.execute("""
                INSERT INTO orders (
                    id, customer_id, customer_name, customer_email,
                    items, total, status, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                order_id,
                order_data.get('customer_id', 'guest'),
                order_data.get('customer_name', ''),
                order_data.get('customer_email', ''),
                json.dumps(order_data.get('items', [])),
                order_data.get('total', 0),
                'pending',
                datetime.now()
            ))
            
            conn.commit()
            conn.close()
            
            return {
                'id': order_id,
                'status': 'pending',
                'created_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Order creation error: {e}")
            raise e
    
    def get_all_orders(self, limit: int = 100) -> List[Dict]:
        """Get all orders with pagination"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT id, customer_name, customer_email, items, total, status, created_at
                FROM orders
                ORDER BY created_at DESC
                LIMIT ?
            """, (limit,))
            
            orders = cursor.fetchall()
            conn.close()
            
            return [
                {
                    'id': order[0],
                    'customer': order[1],
                    'email': order[2],
                    'items': len(json.loads(order[3])) if order[3] else 0,
                    'total': order[4],
                    'status': order[5],
                    'date': order[6]
                }
                for order in orders
            ]
            
        except Exception as e:
            print(f"Orders retrieval error: {e}")
            return []
    
    def get_order_by_id(self, order_id: str) -> Optional[Dict]:
        """Get a specific order by ID"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT * FROM orders WHERE id = ?
            """, (order_id,))
            
            order = cursor.fetchone()
            conn.close()
            
            if order:
                return {
                    'id': order[0],
                    'customer_id': order[1],
                    'customer_name': order[2],
                    'customer_email': order[3],
                    'items': json.loads(order[4]) if order[4] else [],
                    'total': order[5],
                    'status': order[6],
                    'created_at': order[7]
                }
            
            return None
            
        except Exception as e:
            print(f"Order retrieval error: {e}")
            return None
    
    def update_order(self, order_id: str, update_data: Dict) -> Dict:
        """Update an existing order"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Build update query dynamically
            update_fields = []
            values = []
            
            for field, value in update_data.items():
                if field in ['status', 'total', 'items']:
                    update_fields.append(f"{field} = ?")
                    if field == 'items':
                        values.append(json.dumps(value))
                    else:
                        values.append(value)
            
            if update_fields:
                query = f"UPDATE orders SET {', '.join(update_fields)} WHERE id = ?"
                values.append(order_id)
                
                cursor.execute(query, values)
                conn.commit()
            
            conn.close()
            
            return self.get_order_by_id(order_id) or {}
            
        except Exception as e:
            print(f"Order update error: {e}")
            raise e
    
    def get_order_statistics(self) -> Dict:
        """Get order statistics for dashboard"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Total orders
            cursor.execute("SELECT COUNT(*) FROM orders")
            total_orders = cursor.fetchone()[0]
            
            # Total revenue
            cursor.execute("SELECT SUM(total) FROM orders WHERE status != 'cancelled'")
            total_revenue = cursor.fetchone()[0] or 0
            
            # Orders today
            cursor.execute("SELECT COUNT(*) FROM orders WHERE date(created_at) = date('now')")
            orders_today = cursor.fetchone()[0]
            
            # Average order value
            cursor.execute("SELECT AVG(total) FROM orders WHERE status != 'cancelled'")
            avg_order_value = cursor.fetchone()[0] or 0
            
            conn.close()
            
            return {
                'total_orders': total_orders,
                'total_revenue': total_revenue,
                'orders_today': orders_today,
                'avg_order_value': avg_order_value
            }
            
        except Exception as e:
            print(f"Order statistics error: {e}")
            return {
                'total_orders': 0,
                'total_revenue': 0,
                'orders_today': 0,
                'avg_order_value': 0
            }