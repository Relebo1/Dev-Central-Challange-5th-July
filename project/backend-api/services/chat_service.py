from datetime import datetime
from typing import Dict, List, Optional
import sqlite3
import json
from ai.openai_client import OpenAIClient

class ChatService:
    def __init__(self, openai_client: OpenAIClient):
        self.openai_client = openai_client
        self.db_path = 'database/phetoho.db'
    
    def process_message(self, message: str, user_id: Optional[str] = None) -> str:
        """Process a chat message and return AI response"""
        try:
            # Get user context if available
            context = None
            if user_id:
                context = self._get_user_context(user_id)
            
            # Generate AI response
            response = self.openai_client.generate_chat_response(message, context)
            
            # Log the chat interaction
            self._log_chat_interaction(user_id, message, response)
            
            return response
            
        except Exception as e:
            print(f"Chat processing error: {e}")
            return "I apologize, but I'm experiencing technical difficulties. Please try again later."
    
    def _get_user_context(self, user_id: str) -> Dict:
        """Get user context for personalized responses"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Get user's recent orders
            cursor.execute("""
                SELECT * FROM orders 
                WHERE customer_id = ? 
                ORDER BY created_at DESC 
                LIMIT 5
            """, (user_id,))
            
            orders = cursor.fetchall()
            conn.close()
            
            return {
                'recent_orders': len(orders),
                'order_history': orders
            }
            
        except Exception as e:
            print(f"Context retrieval error: {e}")
            return {}
    
    def _log_chat_interaction(self, user_id: Optional[str], message: str, response: str):
        """Log chat interaction to database"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute("""
                INSERT INTO chat_logs (user_id, message, response, created_at)
                VALUES (?, ?, ?, ?)
            """, (user_id, message, response, datetime.now()))
            
            conn.commit()
            conn.close()
            
        except Exception as e:
            print(f"Chat logging error: {e}")
    
    def get_chat_logs(self, limit: int = 50) -> List[Dict]:
        """Get recent chat logs for admin monitoring"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute("""
                SELECT id, user_id, message, response, created_at
                FROM chat_logs
                ORDER BY created_at DESC
                LIMIT ?
            """, (limit,))
            
            logs = cursor.fetchall()
            conn.close()
            
            return [
                {
                    'id': log[0],
                    'user_id': log[1],
                    'message': log[2],
                    'response': log[3],
                    'created_at': log[4]
                }
                for log in logs
            ]
            
        except Exception as e:
            print(f"Chat logs retrieval error: {e}")
            return []
    
    def get_chat_analytics(self) -> Dict:
        """Get chat analytics for admin dashboard"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Get total chats today
            cursor.execute("""
                SELECT COUNT(*) FROM chat_logs
                WHERE date(created_at) = date('now')
            """)
            today_chats = cursor.fetchone()[0]
            
            # Get average response time (mock data for now)
            # In a real app, you'd track actual response times
            avg_response_time = 2.5
            
            # Get satisfaction rate (mock data)
            satisfaction_rate = 0.89
            
            conn.close()
            
            return {
                'total_chats_today': today_chats,
                'avg_response_time': avg_response_time,
                'satisfaction_rate': satisfaction_rate,
                'ai_resolution_rate': 0.87
            }
            
        except Exception as e:
            print(f"Chat analytics error: {e}")
            return {
                'total_chats_today': 0,
                'avg_response_time': 0,
                'satisfaction_rate': 0,
                'ai_resolution_rate': 0
            }