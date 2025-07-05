'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Bot, User, Clock, Search } from 'lucide-react';

interface ChatSession {
  id: string;
  customer: string;
  status: 'active' | 'resolved' | 'waiting';
  lastMessage: string;
  timestamp: string;
  messagesCount: number;
  aiHandled: boolean;
}

const sampleChats: ChatSession[] = [
  {
    id: 'CHAT-001',
    customer: 'Thabang Monne',
    status: 'active',
    lastMessage: 'Can you help me track my order?',
    timestamp: '2 min ago',
    messagesCount: 5,
    aiHandled: true
  },
  {
    id: 'CHAT-002',
    customer: 'Kananelo Joel',
    status: 'waiting',
    lastMessage: 'I need to return an item',
    timestamp: '15 min ago',
    messagesCount: 3,
    aiHandled: false
  },
  {
    id: 'CHAT-003',
    customer: 'Relebohile Sekutlu',
    status: 'resolved',
    lastMessage: 'Thank you for your help!',
    timestamp: '1 hour ago',
    messagesCount: 8,
    aiHandled: true
  }
];

export function ChatMonitoring() {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  useEffect(() => {
    setChats(sampleChats);
  }, []);

  const filteredChats = chats.filter(chat =>
    chat.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Chat List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Active Chats
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Chat List */}
          <div className="space-y-3">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedChat === chat.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{chat.customer}</span>
                  <Badge className={getStatusColor(chat.status)}>
                    {chat.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2 truncate">{chat.lastMessage}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {chat.timestamp}
                  </span>
                  <span className="flex items-center">
                    {chat.aiHandled ? (
                      <Bot className="w-3 h-3 mr-1 text-blue-600" />
                    ) : (
                      <User className="w-3 h-3 mr-1 text-gray-600" />
                    )}
                    {chat.messagesCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Details */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Chat Details</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedChat ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  {chats.find(c => c.id === selectedChat)?.customer}
                </h3>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Take Over</Button>
                  <Button size="sm">Resolve</Button>
                </div>
              </div>
              
              {/* Mock Chat Messages */}
              <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3" />
                    </div>
                    <div className="bg-white p-2 rounded-lg">
                      <p className="text-sm">Hello, I need help with my order</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <p className="text-sm">I'd be happy to help! Could you provide your order number?</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3" />
                    </div>
                    <div className="bg-white p-2 rounded-lg">
                      <p className="text-sm">My order number is ORD-001</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">AI Suggestions</h4>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="mr-2">
                    Send tracking info
                  </Button>
                  <Button size="sm" variant="outline" className="mr-2">
                    Offer refund
                  </Button>
                  <Button size="sm" variant="outline">
                    Escalate to human
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a chat</h3>
              <p className="text-gray-600">Choose a chat from the list to view details</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}