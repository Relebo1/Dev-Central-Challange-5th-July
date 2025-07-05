'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Users, 
  ShoppingCart, 
  MessageCircle, 
  TrendingUp,
  Package,
  Activity,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { OrderManagement } from '@/components/admin/order-management';
import { ChatMonitoring } from '@/components/admin/chat-monitoring';
import { InventoryTracking } from '@/components/admin/inventory-tracking';
import { AIReports } from '@/components/admin/ai-reports';

interface DashboardStats {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  activeChats: number;
  lowStock: number;
  ordersTrend: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    activeChats: 0,
    lowStock: 0,
    ordersTrend: 0
  });

  useEffect(() => {
    // Simulate API call to fetch dashboard stats
    const fetchStats = async () => {
      // In a real app, this would be an API call
      setStats({
        totalOrders: 1234,
        totalCustomers: 567,
        totalRevenue: 45678.90,
        activeChats: 12,
        lowStock: 5,
        ordersTrend: 12.5
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: `+LSL {stats.ordersTrend}%`
    },
    {
      title: 'Active Customers',
      value: stats.totalCustomers.toLocaleString(),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+8.2%'
    },
    {
      title: 'Revenue',
      value: `LSL ${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: '+15.3%'
    },
    {
      title: 'Active Chats',
      value: stats.activeChats.toString(),
      icon: MessageCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '+2'
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStock.toString(),
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      trend: '-3'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Activity className="w-3 h-3 mr-1" />
                System Online
              </Badge>
              <Button size="sm">Settings</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="chats">Chat Monitoring</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="reports">AI Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="chats">
            <ChatMonitoring />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryTracking />
          </TabsContent>

          <TabsContent value="reports">
            <AIReports />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}