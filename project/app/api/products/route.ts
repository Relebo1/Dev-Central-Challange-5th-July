import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Call Flask backend
    const flaskApiUrl = process.env.FLASK_API_URL || 'http://localhost:5000';
    const response = await fetch(`${flaskApiUrl}/api/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await response.json();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Products API error:', error);
    
    // Fallback data
    return NextResponse.json([
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        category: 'Electronics',
        description: 'High-quality wireless headphones with noise cancellation',
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
        inStock: true,
        rating: 4.8
      }
    ]);
  }
}