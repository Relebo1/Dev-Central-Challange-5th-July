from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
import sqlite3
import json
from ai.openai_client import OpenAIClient
from services.chat_service import ChatService
from services.order_service import OrderService
from services.inventory_service import InventoryService
from services.report_service import ReportService

app = Flask(__name__)
CORS(app)

# Initialize services
openai_client = OpenAIClient()
chat_service = ChatService(openai_client)
order_service = OrderService()
inventory_service = InventoryService()
report_service = ReportService(openai_client)

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

@app.route('/api/chat', methods=['POST'])
def handle_chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
            
        # Process chat message through AI service
        response = chat_service.process_message(user_message)
        
        return jsonify({
            'response': response,
            'timestamp': datetime.now().isoformat()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        products = inventory_service.get_all_products()
        return jsonify(products)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        orders = order_service.get_all_orders()
        return jsonify(orders)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.get_json()
        order = order_service.create_order(data)
        return jsonify(order), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders/<order_id>', methods=['PUT'])
def update_order(order_id):
    try:
        data = request.get_json()
        order = order_service.update_order(order_id, data)
        return jsonify(order)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/chats', methods=['GET'])
def get_chat_logs():
    try:
        chats = chat_service.get_chat_logs()
        return jsonify(chats)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/inventory', methods=['GET'])
def get_inventory():
    try:
        inventory = inventory_service.get_inventory()
        return jsonify(inventory)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/reports', methods=['GET'])
def get_reports():
    try:
        reports = report_service.generate_reports()
        return jsonify(reports)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/generate-report', methods=['POST'])
def generate_ai_report():
    try:
        report = report_service.generate_ai_insights()
        return jsonify(report)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Initialize database
    from database.init_db import init_database
    init_database()
    
    # Run the app
    app.run(
        host='0.0.0.0',
        port=int(os.environ.get('PORT', 5000)),
        debug=os.environ.get('FLASK_ENV') == 'development'
    )