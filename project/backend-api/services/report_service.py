from datetime import datetime, timedelta
from typing import Dict, List
import sqlite3
import json
from ai.openai_client import OpenAIClient

class ReportService:
    def __init__(self, openai_client: OpenAIClient):
        self.openai_client = openai_client
        self.db_path = 'database/phetoho.db'
    
    def generate_reports(self) -> Dict:
        """Generate comprehensive business reports"""
        try:
            sales_data = self._get_sales_data()
            customer_data = self._get_customer_data()
            inventory_data = self._get_inventory_data()
            chat_data = self._get_chat_data()
            
            return {
                'sales_performance': sales_data,
                'customer_metrics': customer_data,
                'inventory_status': inventory_data,
                'chat_analytics': chat_data,
                'generated_at': datetime.now().isoformat()
            }
            
        except Exception as e:
            print(f"Report generation error: {e}")
            return {}
    
    def _get_sales_data(self) -> Dict:
        """Get sales performance data"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Sales this month
            cursor.execute("""
                SELECT SUM(total) FROM orders 
                WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
                AND status != 'cancelled'
            """)
            this_month_sales = cursor.fetchone()[0] or 0
            
            # Sales last month
            cursor.execute("""
                SELECT SUM(total) FROM orders 
                WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now', '-1 month')
                AND status != 'cancelled'
            """)
            last_month_sales = cursor.fetchone()[0] or 0
            
            # Calculate growth
            growth = ((this_month_sales - last_month_sales) / last_month_sales * 100) if last_month_sales > 0 else 0
            
            conn.close()
            
            return {
                'current_month': this_month_sales,
                'previous_month': last_month_sales,
                'growth_percentage': growth,
                'trend': 'up' if growth > 0 else 'down' if growth < 0 else 'stable'
            }
            
        except Exception as e:
            print(f"Sales data error: {e}")
            return {}
    
    def _get_customer_data(self) -> Dict:
        """Get customer analytics"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Total customers
            cursor.execute("SELECT COUNT(DISTINCT customer_email) FROM orders")
            total_customers = cursor.fetchone()[0]
            
            # New customers this month
            cursor.execute("""
                SELECT COUNT(DISTINCT customer_email) FROM orders
                WHERE strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
            """)
            new_customers = cursor.fetchone()[0]
            
            conn.close()
            
            return {
                'total_customers': total_customers,
                'new_customers_this_month': new_customers,
                'customer_retention_rate': 0.78  # Mock data
            }
            
        except Exception as e:
            print(f"Customer data error: {e}")
            return {}
    
    def _get_inventory_data(self) -> Dict:
        """Get inventory analytics"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Total products
            cursor.execute("SELECT COUNT(*) FROM products WHERE active = 1")
            total_products = cursor.fetchone()[0]
            
            # Low stock items
            cursor.execute("SELECT COUNT(*) FROM products WHERE stock <= min_stock AND active = 1")
            low_stock = cursor.fetchone()[0]
            
            conn.close()
            
            return {
                'total_products': total_products,
                'low_stock_items': low_stock,
                'inventory_turnover': 4.2  # Mock data
            }
            
        except Exception as e:
            print(f"Inventory data error: {e}")
            return {}
    
    def _get_chat_data(self) -> Dict:
        """Get chat analytics"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Total chats
            cursor.execute("SELECT COUNT(*) FROM chat_logs")
            total_chats = cursor.fetchone()[0]
            
            # Chats today
            cursor.execute("SELECT COUNT(*) FROM chat_logs WHERE date(created_at) = date('now')")
            chats_today = cursor.fetchone()[0]
            
            conn.close()
            
            return {
                'total_chats': total_chats,
                'chats_today': chats_today,
                'ai_resolution_rate': 0.89,  # Mock data
                'avg_response_time': 2.3  # Mock data
            }
            
        except Exception as e:
            print(f"Chat data error: {e}")
            return {}
    
    def generate_ai_insights(self) -> Dict:
        """Generate AI-powered business insights"""
        try:
            # Get business data
            business_data = self._get_business_data_for_ai()
            
            # Generate insights using OpenAI
            insights = self.openai_client.generate_business_insights(business_data)
            
            return {
                'insights': insights,
                'generated_at': datetime.now().isoformat(),
                'data_period': '30_days'
            }
            
        except Exception as e:
            print(f"AI insights error: {e}")
            return {'insights': [], 'generated_at': datetime.now().isoformat()}
    
    def _get_business_data_for_ai(self) -> Dict:
        """Get business data for AI analysis"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Get key metrics
            cursor.execute("SELECT COUNT(*) FROM orders WHERE status != 'cancelled'")
            total_orders = cursor.fetchone()[0]
            
            cursor.execute("SELECT SUM(total) FROM orders WHERE status != 'cancelled'")
            total_revenue = cursor.fetchone()[0] or 0
            
            cursor.execute("SELECT COUNT(DISTINCT customer_email) FROM orders")
            total_customers = cursor.fetchone()[0]
            
            # Get top products
            cursor.execute("""
                SELECT p.name, COUNT(o.id) as order_count
                FROM products p
                JOIN orders o ON json_extract(o.items, '$[0].id') = p.id
                GROUP BY p.id
                ORDER BY order_count DESC
                LIMIT 5
            """)
            top_products = [row[0] for row in cursor.fetchall()]
            
            conn.close()
            
            return {
                'orders': total_orders,
                'revenue': total_revenue,
                'customers': total_customers,
                'top_products': top_products
            }
            
        except Exception as e:
            print(f"Business data error: {e}")
            return {}