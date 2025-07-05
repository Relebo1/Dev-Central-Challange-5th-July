'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  BarChart3,
  Calculator,
  Target,
  AlertTriangle,
  Download,
  RefreshCw,
  CreditCard,
  Wallet
} from 'lucide-react';

interface FinancialMetric {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
  target?: number;
  current?: number;
}

interface FinancialInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'info' | 'critical';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  action?: string;
  value?: string;
}

const sampleMetrics: FinancialMetric[] = [
  {
    title: 'Monthly Revenue',
    value: 'LSL 45,678',
    change: 12.5,
    trend: 'up',
    description: 'Revenue increased by 12.5% compared to last month',
    target: 50000,
    current: 45678
  },
  {
    title: 'Profit Margin',
    value: '23.4%',
    change: 2.1,
    trend: 'up',
    description: 'Profit margin improved by 2.1 percentage points',
    target: 25,
    current: 23.4
  },
  {
    title: 'Cash Flow',
    value: 'LSL 12,345',
    change: -5.2,
    trend: 'down',
    description: 'Cash flow decreased by 5.2% - monitor closely',
    target: 15000,
    current: 12345
  },
  {
    title: 'Customer LTV',
    value: 'LSL 892',
    change: 8.7,
    trend: 'up',
    description: 'Customer lifetime value increased by 8.7%',
    target: 1000,
    current: 892
  },
  {
    title: 'Operating Costs',
    value: 'LSL 34,567',
    change: 3.2,
    trend: 'down',
    description: 'Operating costs reduced by 3.2% through optimization',
    target: 30000,
    current: 34567
  },
  {
    title: 'ROI',
    value: '156%',
    change: 15.3,
    trend: 'up',
    description: 'Return on investment improved significantly',
    target: 200,
    current: 156
  }
];

const sampleInsights: FinancialInsight[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'Revenue Optimization Opportunity',
    description: 'AI analysis shows potential for 18% revenue increase by adjusting pricing strategy for premium products during peak hours.',
    confidence: 92,
    impact: 'high',
    action: 'Implement dynamic pricing',
    value: '+LSL 8,200/month'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Cash Flow Alert',
    description: 'Current cash flow trend indicates potential shortage in 45 days. Consider accelerating receivables collection.',
    confidence: 87,
    impact: 'high',
    action: 'Review payment terms'
  },
  {
    id: '3',
    type: 'critical',
    title: 'Cost Spike Detected',
    description: 'Shipping costs have increased 23% over the past 2 weeks. Investigate supplier changes or market conditions.',
    confidence: 95,
    impact: 'medium',
    action: 'Audit shipping costs',
    value: '-LSL 1,450/week'
  },
  {
    id: '4',
    type: 'info',
    title: 'Seasonal Trend Analysis',
    description: 'Historical data suggests 35% revenue increase expected in the next quarter. Prepare inventory accordingly.',
    confidence: 78,
    impact: 'medium',
    action: 'Scale inventory',
    value: '+LSL 15,800 projected'
  },
  {
    id: '5',
    type: 'opportunity',
    title: 'Customer Segment Insight',
    description: 'Premium customers show 67% higher retention when offered personalized service. Consider expanding premium tier.',
    confidence: 84,
    impact: 'high',
    action: 'Expand premium services'
  }
];

export function AIFinancial() {
  const [metrics, setMetrics] = useState<FinancialMetric[]>([]);
  const [insights, setInsights] = useState<FinancialInsight[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    setMetrics(sampleMetrics);
    setInsights(sampleInsights);
    setLastUpdated(new Date().toLocaleString());
  }, []);

  const runFinancialAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 4000));
    setIsAnalyzing(false);
    setLastUpdated(new Date().toLocaleString());
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <BarChart3 className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[impact as keyof typeof colors] || colors.low;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              AI Financial Analysis
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Last updated: {lastUpdated}</span>
              <Button
                onClick={runFinancialAnalysis}
                disabled={isAnalyzing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isAnalyzing ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Calculator className="w-4 h-4 mr-2" />
                )}
                {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isAnalyzing && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-green-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI is analyzing your financial data...</h3>
              <p className="text-gray-600">Processing revenue, costs, and market trends</p>
              <div className="mt-4 max-w-xs mx-auto">
                <Progress value={75} className="h-2" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Financial Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                <div className={`p-2 rounded-full ${
                  metric.trend === 'up' ? 'bg-green-100' : 
                  metric.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  ) : (
                    <DollarSign className="w-4 h-4 text-gray-600" />
                  )}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
              <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
              
              {metric.target && metric.current && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress to Target</span>
                    <span>{Math.round((metric.current / metric.target) * 100)}%</span>
                  </div>
                  <Progress value={(metric.current / metric.target) * 100} className="h-2" />
                </div>
              )}
              
              <div className="flex items-center mt-3">
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
                <span className="text-xs text-gray-500 ml-2">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Financial Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            AI Financial Insights & Recommendations
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
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge className={getImpactBadge(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                        {insight.value && (
                          <Badge variant="outline" className="font-mono text-xs">
                            {insight.value}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm mb-3">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <span className="text-xs text-gray-600 mr-2">Confidence:</span>
                            <Progress value={insight.confidence} className="w-20 h-2" />
                            <span className="text-xs text-gray-600 ml-2">{insight.confidence}%</span>
                          </div>
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

      {/* Financial Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="w-5 h-5 mr-2" />
              Cash Flow Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Next 30 Days</span>
                <span className="text-lg font-bold text-green-600">+LSL 8,450</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">Next 60 Days</span>
                <span className="text-lg font-bold text-blue-600">+LSL 15,200</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium">Next 90 Days</span>
                <span className="text-lg font-bold text-yellow-600">+LSL 22,800</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Financial Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Monthly Revenue Target</span>
                  <span>91% achieved</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Profit Margin Goal</span>
                  <span>78% achieved</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Cost Reduction Target</span>
                  <span>65% achieved</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}