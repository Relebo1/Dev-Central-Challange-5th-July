'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  MessageCircle,
  Bot,
  Download,
  RefreshCw,
  BarChart3
} from 'lucide-react';

interface ReportData {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface AIInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'info';
  title: string;
  description: string;
  confidence: number;
  action?: string;
}

const sampleReports: ReportData[] = [
  {
    title: 'Sales Performance',
    value: 'LSL 45,678',
    change: 12.5,
    trend: 'up',
    description: 'Revenue increased by 12.5% compared to last month'
  },
  {
    title: 'Customer Acquisition',
    value: '234',
    change: 8.2,
    trend: 'up',
    description: 'New customers grew by 8.2% this month'
  },
  {
    title: 'AI Chat Resolution',
    value: '89%',
    change: 5.1,
    trend: 'up',
    description: 'AI successfully resolved 89% of customer queries'
  },
  {
    title: 'Average Order Value',
    value: 'LSL 127.45',
    change: -3.2,
    trend: 'down',
    description: 'AOV decreased by 3.2% - investigate discount impact'
  }
];

const sampleInsights: AIInsight[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'Peak Sales Hours Identified',
    description: 'Customer activity peaks between 2-4 PM. Consider targeted promotions during these hours.',
    confidence: 94,
    action: 'Schedule promotional campaigns'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Inventory Alert',
    description: 'Smart Fitness Watch stock is running low. Based on sales trends, you may run out in 3 days.',
    confidence: 87,
    action: 'Reorder inventory'
  },
  {
    id: '3',
    type: 'info',
    title: 'Customer Satisfaction Trend',
    description: 'AI chat satisfaction scores have improved by 15% after recent updates.',
    confidence: 91
  },
  {
    id: '4',
    type: 'opportunity',
    title: 'Cross-selling Opportunity',
    description: 'Customers who buy headphones have a 67% likelihood of purchasing accessories.',
    confidence: 83,
    action: 'Create bundle offers'
  }
];

export function AIReports() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    setReports(sampleReports);
    setInsights(sampleInsights);
    setLastUpdated(new Date().toLocaleString());
  }, []);

  const generateNewReport = async () => {
    setIsGenerating(true);
    // Simulate API call to generate new AI report
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real app, this would call your Flask API
    // const response = await fetch('/api/admin/generate-report', { method: 'POST' });
    // const data = await response.json();
    
    setIsGenerating(false);
    setLastUpdated(new Date().toLocaleString());
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-4 h-4" />;
      case 'warning': return <TrendingDown className="w-4 h-4" />;
      case 'info': return <BarChart3 className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              AI-Generated Reports
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Last updated: {lastUpdated}</span>
              <Button
                onClick={generateNewReport}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Report'}
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isGenerating && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI is analyzing your data...</h3>
              <p className="text-gray-600">This may take a few moments</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{report.title}</h3>
                <div className={`p-2 rounded-full ${
                  report.trend === 'up' ? 'bg-green-100' : 
                  report.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  {report.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : report.trend === 'down' ? (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  ) : (
                    <BarChart3 className="w-4 h-4 text-gray-600" />
                  )}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">{report.value}</p>
              <p className="text-sm text-gray-600 mb-2">{report.description}</p>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${
                  report.trend === 'up' ? 'text-green-600' : 
                  report.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {report.change > 0 ? '+' : ''}{report.change}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="w-5 h-5 mr-2" />
            AI Business Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border-2 ${getInsightColor(insight.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">{insight.title}</h4>
                      <p className="text-sm mb-3">{insight.description}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-600 mr-2">Confidence:</span>
                          <Progress value={insight.confidence} className="w-20 h-2" />
                          <span className="text-xs text-gray-600 ml-2">{insight.confidence}%</span>
                        </div>
                        {insight.action && (
                          <Button size="sm" variant="outline" className="text-xs">
                            {insight.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}