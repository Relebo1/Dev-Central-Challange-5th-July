'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package, Search, AlertTriangle, Plus, Edit } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

const sampleInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    sku: 'PWH-001',
    category: 'Electronics',
    stock: 45,
    minStock: 10,
    price: 299.99,
    status: 'in-stock',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    sku: 'SFW-002',
    category: 'Electronics',
    stock: 8,
    minStock: 15,
    price: 199.99,
    status: 'low-stock',
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    sku: 'EOC-003',
    category: 'Furniture',
    stock: 0,
    minStock: 5,
    price: 449.99,
    status: 'out-of-stock',
    lastUpdated: '2024-01-13'
  },
  {
    id: '4',
    name: 'Organic Coffee Beans',
    sku: 'OCB-004',
    category: 'Food',
    stock: 120,
    minStock: 25,
    price: 24.99,
    status: 'in-stock',
    lastUpdated: '2024-01-12'
  }
];

export function InventoryTracking() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setInventory(sampleInventory);
  }, []);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low-stock':
      case 'out-of-stock':
        return <AlertTriangle className="w-4 h-4 mr-1" />;
      default:
        return <Package className="w-4 h-4 mr-1" />;
    }
  };

  const lowStockItems = inventory.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock');

  return (
    <div className="space-y-6">
      {/* Alert Cards */}
      {lowStockItems.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Stock Alerts ({lowStockItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.sku}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{item.stock} left</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Inventory Management
            </CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'in-stock' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('in-stock')}
              >
                In Stock
              </Button>
              <Button
                variant={statusFilter === 'low-stock' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('low-stock')}
              >
                Low Stock
              </Button>
              <Button
                variant={statusFilter === 'out-of-stock' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('out-of-stock')}
              >
                Out of Stock
              </Button>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-gray-600">{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {item.stock <= item.minStock && (
                          <AlertTriangle className="w-4 h-4 text-yellow-600 mr-1" />
                        )}
                        {item.stock} / {item.minStock}
                      </div>
                    </TableCell>
                    <TableCell>LSL {item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInventory.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}