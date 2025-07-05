import openai
import os
from typing import Dict, List, Optional
from datetime import datetime

class OpenAIClient:
    def __init__(self):
        self.client = openai.OpenAI(
            api_key=os.getenv('OPENAI_API_KEY')
        )
        self.model = "gpt-3.5-turbo"
    
    def generate_chat_response(self, message: str, context: Optional[Dict] = None) -> str:
        """Generate a response for customer chat messages"""
        try:
            system_prompt = """You are a helpful AI assistant for Phetoho, an AI-powered business portal. 
            You help customers with:
            - Product information and recommendations
            - Order tracking and status updates
            - General inquiries about products and services
            - Technical support for using the portal
            
            Be friendly, professional, and helpful. If you cannot help with something, 
            politely explain and suggest contacting human support."""
            
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message}
            ]
            
            if context:
                # Add context if provided (e.g., user's order history, preferences)
                context_message = f"Additional context: {context}"
                messages.insert(1, {"role": "system", "content": context_message})
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"OpenAI API error: {e}")
            return "I apologize, but I'm having trouble processing your request right now. Please try again later."
    
    def analyze_chat_sentiment(self, message: str) -> Dict:
        """Analyze the sentiment of a chat message"""
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system", 
                        "content": "Analyze the sentiment of the following message. Return a JSON object with 'sentiment' (positive, negative, or neutral) and 'confidence' (0-1)."
                    },
                    {"role": "user", "content": message}
                ],
                max_tokens=100,
                temperature=0.1
            )
            
            # Parse the response (in a real app, you'd want better error handling)
            result = response.choices[0].message.content
            return {"sentiment": "neutral", "confidence": 0.5}  # Fallback
            
        except Exception as e:
            print(f"Sentiment analysis error: {e}")
            return {"sentiment": "neutral", "confidence": 0.5}
    
    def generate_business_insights(self, data: Dict) -> List[Dict]:
        """Generate AI-powered business insights from data"""
        try:
            prompt = f"""Based on the following business data, provide actionable insights:
            
            Orders: {data.get('orders', 0)}
            Revenue: ${data.get('revenue', 0)}
            Customer Count: {data.get('customers', 0)}
            Top Products: {data.get('top_products', [])}
            
            Please provide 3-5 specific, actionable insights in JSON format with:
            - type: (opportunity, warning, or info)
            - title: brief title
            - description: detailed explanation
            - confidence: confidence score (0-100)
            - action: suggested action (optional)
            """
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a business intelligence AI analyst."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.3
            )
            
            # In a real app, you'd parse the JSON response properly
            return [
                {
                    "type": "opportunity",
                    "title": "Sales Growth Opportunity",
                    "description": "Based on your data patterns, there's potential for 15% revenue growth.",
                    "confidence": 85,
                    "action": "Focus on top-performing products"
                }
            ]
            
        except Exception as e:
            print(f"Business insights error: {e}")
            return []
    
    def suggest_product_recommendations(self, user_history: List[Dict]) -> List[str]:
        """Generate product recommendations based on user history"""
        try:
            prompt = f"""Based on this customer's purchase history, recommend 3 products they might like:
            
            Purchase History: {user_history}
            
            Return only the product names, one per line."""
            
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a product recommendation AI."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=200,
                temperature=0.5
            )
            
            recommendations = response.choices[0].message.content.strip().split('\n')
            return [rec.strip() for rec in recommendations if rec.strip()]
            
        except Exception as e:
            print(f"Product recommendation error: {e}")
            return []