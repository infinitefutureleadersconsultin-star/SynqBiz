"use client";

import { useState } from "react";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Save to Supabase once database is set up
      console.log('Saving metrics:', formData);

      // Show success message
      alert('Metrics saved successfully!');
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

  const metrics = [
    { label: "Revenue Milestone", icon: DollarSign, value: 0, prefix: "$", color: "green" },
    { label: "User Signups", icon: Users, value: 0, color: "blue" },
    { label: "Features Shipped", icon: Code, value: 0, color: "purple" },
    { label: "Support Tickets Resolved", icon: HeadphonesIcon, value: 0, color: "amber" },
    { label: "App Uptime", icon: Activity, value: 0, suffix: "%", color: "emerald" },
    { label: "Onboarding Completion", icon: CheckCircle, value: 0, suffix: "%", color: "indigo" },
    { label: "Feedback Collected", icon: MessageSquare, value: 0, color: "cyan" },
    { label: "Retention Rate", icon: TrendingUp, value: 0, suffix: "%", color: "pink" },
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
                    <p className="text-xs text-gray-500 mt-1">Current</p>
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
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <p>No activity logged yet. Click "Log Today's Metrics" to get started!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
