from datetime import datetime
from typing import Dict, List, Optional
import sqlite3
import json

class InventoryService:
    def __init__(self):
        self.db_path = 'database/phetoho.db'
    
    def get_all_products(self) -> List[Dict]:
        """Get all products for the client portal"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT id, name, price, category, description, image_url, stock, rating
                FROM products
                WHERE active = 1
                ORDER BY name
            """)
            
            products = cursor.fetchall()
            conn.close()
            
            return [
                {
                    'id': product[0],
                    'name': product[1],
                    'price': product[2],
                    'category': product[3],
                    'description': product[4],
                    'image': product[5],
                    'inStock': product[6] > 0,
                    'rating': product[7]
                }
                for product in products
            ]
            
        except Exception as e:
            print(f"Products retrieval error: {e}")
            return []
    
    def get_inventory(self) -> List[Dict]:
        """Get detailed inventory for admin dashboard"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT id, name, sku, category, stock, min_stock, price, last_updated
                FROM products
                ORDER BY name
            """)
            
            products = cursor.fetchall()
            conn.close()
            
            return [
                {
                    'id': product[0],
                    'name': product[1],
                    'sku': product[2],
                    'category': product[3],
                    'stock': product[4],
                    'minStock': product[5],
                    'price': product[6],
                    'status': self._get_stock_status(product[4], product[5]),
                    'lastUpdated': product[7]
                }
                for product in products
            ]
            
        except Exception as e:
            print(f"Inventory retrieval error: {e}")
            return []
    
    def _get_stock_status(self, stock: int, min_stock: int) -> str:
        """Determine stock status based on current and minimum stock"""
        if stock == 0:
            return 'out-of-stock'
        elif stock <= min_stock:
            return 'low-stock'
        else:
            return 'in-stock'
    
    def update_product_stock(self, product_id: int, new_stock: int) -> bool:
        """Update product stock level"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute("""
                UPDATE products 
                SET stock = ?, last_updated = ?
                WHERE id = ?
            """, (new_stock, datetime.now(), product_id))
            
            conn.commit()
            conn.close()
            
            return True
            
        except Exception as e:
            print(f"Stock update error: {e}")
            return False
    
    def get_low_stock_alerts(self) -> List[Dict]:
        """Get products with low stock levels"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT id, name, sku, stock, min_stock
                FROM products
                WHERE stock <= min_stock AND active = 1
                ORDER BY stock ASC
            """)
            
            alerts = cursor.fetchall()
            conn.close()
            
            return [
                {
                    'id': alert[0],
                    'name': alert[1],
                    'sku': alert[2],
                    'stock': alert[3],
                    'minStock': alert[4],
                    'status': 'low-stock' if alert[3] > 0 else 'out-of-stock'
                }
                for alert in alerts
            ]
            
        except Exception as e:
            print(f"Low stock alerts error: {e}")
            return []
    
    def get_inventory_statistics(self) -> Dict:
        """Get inventory statistics for dashboard"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Total products
            cursor.execute("SELECT COUNT(*) FROM products WHERE active = 1")
            total_products = cursor.fetchone()[0]
            
            # Low stock items
            cursor.execute("SELECT COUNT(*) FROM products WHERE stock <= min_stock AND active = 1")
            low_stock_items = cursor.fetchone()[0]
            
            # Out of stock items
            cursor.execute("SELECT COUNT(*) FROM products WHERE stock = 0 AND active = 1")
            out_of_stock_items = cursor.fetchone()[0]
            
            # Total inventory value
            cursor.execute("SELECT SUM(price * stock) FROM products WHERE active = 1")
            total_value = cursor.fetchone()[0] or 0
            
            conn.close()
            
            return {
                'total_products': total_products,
                'low_stock_items': low_stock_items,
                'out_of_stock_items': out_of_stock_items,
                'total_value': total_value
            }
            
        except Exception as e:
            print(f"Inventory statistics error: {e}")
            return {
                'total_products': 0,
                'low_stock_items': 0,
                'out_of_stock_items': 0,
                'total_value': 0
            }