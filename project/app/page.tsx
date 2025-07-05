import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, ChartBar, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Phetoho
              </h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/portal" className="text-gray-600 hover:text-blue-600 transition-colors">
                Portal
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
                Admin
              </Link>
              <Button asChild>
                <Link href="/portal">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Transform Your Business with AI
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Phetoho brings intelligent automation to small and medium businesses through 
            AI-powered customer support, smart inventory management, and real-time analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/portal">
                Explore Portal <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/admin">Admin Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose Phetoho?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">AI-Powered Support</h4>
              <p className="text-gray-600">
                24/7 intelligent chatbot handles customer inquiries, order tracking, and support tickets automatically.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <ChartBar className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Smart Analytics</h4>
              <p className="text-gray-600">
                AI-generated reports and insights help you make data-driven decisions for your business growth.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Secure & Reliable</h4>
              <p className="text-gray-600">
                Enterprise-grade security with role-based access control and encrypted data storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Business?</h3>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of businesses already using Phetoho to automate their operations and delight their customers.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/portal">
              Start Your Journey <Zap className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold">Phetoho</h4>
              </div>
              <p className="text-gray-400">
                Transforming businesses through intelligent automation and AI-powered solutions.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/portal" className="hover:text-white transition-colors">Client Portal</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Phetoho. All rights reserved. </p><br></br>
            <p> Developed  By Relebohile Sekutlu & Thebe Nkhasi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}