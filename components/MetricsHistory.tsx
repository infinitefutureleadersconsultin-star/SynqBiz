"use client";

import { useState } from "react";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { IsaiahMetrics, SoyaMetrics } from "@/types";

interface MetricsHistoryProps {
  metrics: (IsaiahMetrics | SoyaMetrics)[];
  type: 'issiah' | 'soya';
}

export default function MetricsHistory({ metrics, type }: MetricsHistoryProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (metrics.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No activity logged yet. Start logging your metrics!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const getMetricKeys = (metric: IsaiahMetrics | SoyaMetrics) => {
    const excludeKeys = ['id', 'user_id', 'date', 'notes', 'created_at', 'updated_at'];
    return Object.keys(metric).filter(key => !excludeKeys.includes(key));
  };

  const calculateTrend = (currentValue: number, previousValue: number) => {
    if (previousValue === 0) return 'new';
    const change = ((currentValue - previousValue) / previousValue) * 100;
    if (change > 0) return 'up';
    if (change < 0) return 'down';
    return 'same';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity ({metrics.length} entries)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {metrics.map((metric, index) => {
            const isExpanded = expandedIndex === index;
            const metricKeys = getMetricKeys(metric);
            const totalValue = metricKeys.reduce((sum, key) => sum + (Number(metric[key as keyof typeof metric]) || 0), 0);

            // Calculate trend if there's a previous entry
            const previousMetric = metrics[index + 1];
            let trend = 'new';
            if (previousMetric) {
              const previousTotal = metricKeys.reduce((sum, key) => sum + (Number(previousMetric[key as keyof typeof previousMetric]) || 0), 0);
              trend = calculateTrend(totalValue, previousTotal);
            }

            return (
              <div
                key={metric.id || index}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full px-4 py-3 bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{formatDate(metric.date)}</p>
                      <p className="text-sm text-gray-500">
                        {metricKeys.length} metrics logged
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(trend)}
                    <span className="text-2xl font-bold text-gray-700">{totalValue}</span>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                      {metricKeys.map(key => {
                        const value = metric[key as keyof typeof metric];
                        if (value == null || value === undefined || value === '' || (typeof value === 'number' && value === 0)) return null;

                        return (
                          <div key={key} className="bg-white px-3 py-2 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-600 capitalize">
                              {key.replace(/_/g, ' ')}
                            </p>
                            <p className="text-lg font-bold text-gray-900">
                              {typeof value === 'number' ? (
                                key.includes('percentage') || key.includes('rate') ? `${value}%` :
                                key.includes('revenue') || key.includes('spent') ? `$${value}` :
                                value
                              ) : value}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {metric.notes && (
                      <div className="bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg">
                        <p className="text-xs font-semibold text-blue-900 mb-1">Notes:</p>
                        <p className="text-sm text-blue-800">{metric.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
