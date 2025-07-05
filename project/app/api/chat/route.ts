import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Call Flask backend
    const flaskApiUrl = process.env.FLASK_API_URL || 'http://localhost:5000';
    const response = await fetch(`${flaskApiUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI service');
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      response: data.response,
      timestamp: data.timestamp 
    });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback response
    return NextResponse.json({
      response: "I'm here to help! I can assist you with product information, order tracking, and general inquiries. How can I help you today?",
      timestamp: new Date().toISOString()
    });
  }
}