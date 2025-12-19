"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/firebase";
import { saveSoyaMetrics, getAllSoyaMetrics } from "@/lib/firestore";
import type { SoyaMetrics } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ChatInterface from "@/components/ChatInterface";
import MetricsHistory from "@/components/MetricsHistory";
import {
  DollarSign,
  Users,
  HeadphonesIcon,
  Activity,
  CheckCircle,
  MessageSquare,
  TrendingUp,
  Code
} from "lucide-react";

export default function SoyaDashboard() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [allMetrics, setAllMetrics] = useState<SoyaMetrics[]>([]);
  const [todayMetrics, setTodayMetrics] = useState<SoyaMetrics | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    revenue_milestone: '',
    ui_improvements: '',
    user_signups: '',
    support_tickets_resolved: '',
    app_uptime_percentage: '',
    onboarding_completion_rate: '',
    feedback_collected: '',
    retention_rate: '',
    facebook_ads_spent: '',
    features_shipped: '',
    notes: '',
  });

  useEffect(() => {
    loadUserAndMetrics();
  }, []);

  async function loadUserAndMetrics() {
    const user = await getCurrentUser();
    if (user) {
      setUserId(user.uid);
      await loadMetrics(user.uid);
    }
  }

  async function loadMetrics(uid: string) {
    const { data } = await getAllSoyaMetrics(uid, 30);
    if (data) {
      setAllMetrics(data);
      // Find today's metrics
      const today = new Date().toISOString().split('T')[0];
      const todaysData = data.find(m => m.date === today);
      setTodayMetrics(todaysData || null);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert('Please log in first');
      return;
    }

    setLoading(true);

    try {
      const result = await saveSoyaMetrics(userId, formData.date, {
        revenue_milestone: parseFloat(formData.revenue_milestone) || 0,
        ui_improvements: parseInt(formData.ui_improvements) || 0,
        user_signups: parseInt(formData.user_signups) || 0,
        support_tickets_resolved: parseInt(formData.support_tickets_resolved) || 0,
        app_uptime_percentage: parseFloat(formData.app_uptime_percentage) || 0,
        onboarding_completion_rate: parseFloat(formData.onboarding_completion_rate) || 0,
        feedback_collected: parseInt(formData.feedback_collected) || 0,
        retention_rate: parseFloat(formData.retention_rate) || 0,
        facebook_ads_spent: parseFloat(formData.facebook_ads_spent) || 0,
        features_shipped: parseInt(formData.features_shipped) || 0,
        notes: formData.notes,
      });

      if (result.success) {
        alert('Metrics saved successfully! 🎉');
        setShowForm(false);
        setFormData({
          date: new Date().toISOString().split('T')[0],
          revenue_milestone: '',
          ui_improvements: '',
          user_signups: '',
          support_tickets_resolved: '',
          app_uptime_percentage: '',
          onboarding_completion_rate: '',
          feedback_collected: '',
          retention_rate: '',
          facebook_ads_spent: '',
          features_shipped: '',
          notes: '',
        });
        // Reload metrics
        await loadMetrics(userId);
      } else {
        alert(`Failed to save: ${result.error}`);
      }
    } catch (error) {
      console.error('Error saving metrics:', error);
      alert('Failed to save metrics');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate totals for display
  const calculateTotal = (key: keyof Omit<SoyaMetrics, 'id' | 'user_id' | 'date' | 'notes' | 'created_at' | 'updated_at'>) => {
    return allMetrics.reduce((sum, m) => sum + (Number(m[key]) || 0), 0);
  };

  // Calculate average for percentage metrics
  const calculateAverage = (key: keyof Omit<SoyaMetrics, 'id' | 'user_id' | 'date' | 'notes' | 'created_at' | 'updated_at'>) => {
    if (allMetrics.length === 0) return 0;
    const total = allMetrics.reduce((sum, m) => sum + (Number(m[key]) || 0), 0);
    return Math.round((total / allMetrics.length) * 10) / 10;
  };

  const metrics = [
    { label: "Revenue Milestone", icon: DollarSign, value: calculateTotal('revenue_milestone'), prefix: "$", color: "green" },
    { label: "User Signups", icon: Users, value: calculateTotal('user_signups'), color: "blue" },
    { label: "Features Shipped", icon: Code, value: calculateTotal('features_shipped'), color: "purple" },
    { label: "Support Tickets Resolved", icon: HeadphonesIcon, value: calculateTotal('support_tickets_resolved'), color: "amber" },
    { label: "App Uptime", icon: Activity, value: calculateAverage('app_uptime_percentage'), suffix: "%", color: "emerald" },
    { label: "Onboarding Completion", icon: CheckCircle, value: calculateAverage('onboarding_completion_rate'), suffix: "%", color: "indigo" },
    { label: "Feedback Collected", icon: MessageSquare, value: calculateTotal('feedback_collected'), color: "cyan" },
    { label: "Retention Rate", icon: TrendingUp, value: calculateAverage('retention_rate'), suffix: "%", color: "pink" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Soya's Dashboard</h1>
          <p className="text-gray-600 mt-1">Technical & Product Metrics</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Log Today\'s Metrics'}
        </Button>
      </div>

      {/* Log Metrics Form */}
      {showForm && (
        <Card className="border-2 border-primary-200">
          <CardHeader className="bg-primary-50">
            <CardTitle>Log Your Daily Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="date"
                  label="Date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />

                <Input
                  type="number"
                  label="Revenue Milestone ($)"
                  placeholder="0"
                  min="0"
                  value={formData.revenue_milestone}
                  onChange={(e) => handleInputChange('revenue_milestone', e.target.value)}
                />

                <Input
                  type="number"
                  label="User Signups"
                  placeholder="0"
                  min="0"
                  value={formData.user_signups}
                  onChange={(e) => handleInputChange('user_signups', e.target.value)}
                />

                <Input
                  type="number"
                  label="Features Shipped"
                  placeholder="0"
                  min="0"
                  value={formData.features_shipped}
                  onChange={(e) => handleInputChange('features_shipped', e.target.value)}
                />

                <Input
                  type="number"
                  label="Support Tickets Resolved"
                  placeholder="0"
                  min="0"
                  value={formData.support_tickets_resolved}
                  onChange={(e) => handleInputChange('support_tickets_resolved', e.target.value)}
                />

                <Input
                  type="number"
                  label="UI Improvements Made"
                  placeholder="0"
                  min="0"
                  value={formData.ui_improvements}
                  onChange={(e) => handleInputChange('ui_improvements', e.target.value)}
                />

                <Input
                  type="number"
                  label="App Uptime (%)"
                  placeholder="99.9"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.app_uptime_percentage}
                  onChange={(e) => handleInputChange('app_uptime_percentage', e.target.value)}
                />

                <Input
                  type="number"
                  label="Onboarding Completion Rate (%)"
                  placeholder="75"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.onboarding_completion_rate}
                  onChange={(e) => handleInputChange('onboarding_completion_rate', e.target.value)}
                />

                <Input
                  type="number"
                  label="Feedback Items Collected"
                  placeholder="0"
                  min="0"
                  value={formData.feedback_collected}
                  onChange={(e) => handleInputChange('feedback_collected', e.target.value)}
                />

                <Input
                  type="number"
                  label="Retention Rate (%)"
                  placeholder="80"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.retention_rate}
                  onChange={(e) => handleInputChange('retention_rate', e.target.value)}
                />

                <Input
                  type="number"
                  label="Facebook Ads Spent ($)"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  value={formData.facebook_ads_spent}
                  onChange={(e) => handleInputChange('facebook_ads_spent', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Notes (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Any additional notes about today's progress..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" isLoading={loading}>
                  Save Metrics
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Chat Interface */}
      {userId && (
        <ChatInterface
          userId={userId}
          onMetricsSaved={() => loadMetrics(userId)}
        />
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: "bg-blue-100 text-blue-600",
            purple: "bg-purple-100 text-purple-600",
            green: "bg-green-100 text-green-600",
            amber: "bg-amber-100 text-amber-600",
            indigo: "bg-indigo-100 text-indigo-600",
            pink: "bg-pink-100 text-pink-600",
            cyan: "bg-cyan-100 text-cyan-600",
            emerald: "bg-emerald-100 text-emerald-600",
          };

          return (
            <Card key={metric.label}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {metric.prefix}{metric.value}{metric.suffix}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {metric.suffix === '%' ? 'Average' : 'All time'}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <MetricsHistory metrics={allMetrics} type="soya" />
    </div>
  );
}
