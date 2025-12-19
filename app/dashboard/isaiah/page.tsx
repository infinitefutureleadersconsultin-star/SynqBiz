"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/firebase";
import { saveIssiahMetrics, getAllIssiahMetrics } from "@/lib/firestore";
import type { IsaiahMetrics } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ChatInterface from "@/components/ChatInterface";
import MetricsHistory from "@/components/MetricsHistory";
import {
  Target,
  Users,
  Mail,
  Lightbulb,
  GraduationCap,
  Share2,
  Building2,
  TrendingUp
} from "lucide-react";

export default function IsaiahDashboard() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [allMetrics, setAllMetrics] = useState<IsaiahMetrics[]>([]);
  const [todayMetrics, setTodayMetrics] = useState<IsaiahMetrics | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    outreach_contacts: '',
    meetings_scheduled: '',
    partnership_emails: '',
    business_concepts: '',
    college_outreach: '',
    personal_brand_posts: '',
    event_host_outreach: '',
    enterprise_outreach: '',
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
    const { data } = await getAllIssiahMetrics(uid, 30);
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
      const result = await saveIssiahMetrics(userId, formData.date, {
        outreach_contacts: parseInt(formData.outreach_contacts) || 0,
        meetings_scheduled: parseInt(formData.meetings_scheduled) || 0,
        partnership_emails: parseInt(formData.partnership_emails) || 0,
        business_concepts: parseInt(formData.business_concepts) || 0,
        college_outreach: parseInt(formData.college_outreach) || 0,
        personal_brand_posts: parseInt(formData.personal_brand_posts) || 0,
        event_host_outreach: parseInt(formData.event_host_outreach) || 0,
        enterprise_outreach: parseInt(formData.enterprise_outreach) || 0,
        notes: formData.notes,
      });

      if (result.success) {
        alert('Metrics saved successfully! 🎉');
        setShowForm(false);
        setFormData({
          date: new Date().toISOString().split('T')[0],
          outreach_contacts: '',
          meetings_scheduled: '',
          partnership_emails: '',
          business_concepts: '',
          college_outreach: '',
          personal_brand_posts: '',
          event_host_outreach: '',
          enterprise_outreach: '',
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
  const calculateTotal = (key: keyof Omit<IsaiahMetrics, 'id' | 'user_id' | 'date' | 'notes' | 'created_at' | 'updated_at'>) => {
    return allMetrics.reduce((sum, m) => sum + (Number(m[key]) || 0), 0);
  };

  const metrics = [
    { label: "Outreach Contacts Made", icon: Target, value: calculateTotal('outreach_contacts'), color: "blue" },
    { label: "Meetings Scheduled", icon: Users, value: calculateTotal('meetings_scheduled'), color: "purple" },
    { label: "Partnership Emails Sent", icon: Mail, value: calculateTotal('partnership_emails'), color: "green" },
    { label: "Business Concepts Explored", icon: Lightbulb, value: calculateTotal('business_concepts'), color: "amber" },
    { label: "College Outreach Activities", icon: GraduationCap, value: calculateTotal('college_outreach'), color: "indigo" },
    { label: "Personal Brand Posts", icon: Share2, value: calculateTotal('personal_brand_posts'), color: "pink" },
    { label: "Event Host Outreach", icon: Building2, value: calculateTotal('event_host_outreach'), color: "cyan" },
    { label: "Enterprise Outreach", icon: TrendingUp, value: calculateTotal('enterprise_outreach'), color: "emerald" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Issiah's Dashboard</h1>
          <p className="text-gray-600 mt-1">Business & Outreach Metrics</p>
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
                  label="Outreach Contacts Made"
                  placeholder="0"
                  min="0"
                  value={formData.outreach_contacts}
                  onChange={(e) => handleInputChange('outreach_contacts', e.target.value)}
                />

                <Input
                  type="number"
                  label="Meetings Scheduled"
                  placeholder="0"
                  min="0"
                  value={formData.meetings_scheduled}
                  onChange={(e) => handleInputChange('meetings_scheduled', e.target.value)}
                />

                <Input
                  type="number"
                  label="Partnership Emails Sent"
                  placeholder="0"
                  min="0"
                  value={formData.partnership_emails}
                  onChange={(e) => handleInputChange('partnership_emails', e.target.value)}
                />

                <Input
                  type="number"
                  label="Business Concepts Explored"
                  placeholder="0"
                  min="0"
                  value={formData.business_concepts}
                  onChange={(e) => handleInputChange('business_concepts', e.target.value)}
                />

                <Input
                  type="number"
                  label="College Outreach Activities"
                  placeholder="0"
                  min="0"
                  value={formData.college_outreach}
                  onChange={(e) => handleInputChange('college_outreach', e.target.value)}
                />

                <Input
                  type="number"
                  label="Personal Brand Posts"
                  placeholder="0"
                  min="0"
                  value={formData.personal_brand_posts}
                  onChange={(e) => handleInputChange('personal_brand_posts', e.target.value)}
                />

                <Input
                  type="number"
                  label="Event Host Outreach"
                  placeholder="0"
                  min="0"
                  value={formData.event_host_outreach}
                  onChange={(e) => handleInputChange('event_host_outreach', e.target.value)}
                />

                <Input
                  type="number"
                  label="Enterprise Outreach"
                  placeholder="0"
                  min="0"
                  value={formData.enterprise_outreach}
                  onChange={(e) => handleInputChange('enterprise_outreach', e.target.value)}
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
                    <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                    <p className="text-xs text-gray-500 mt-1">All time</p>
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
      <MetricsHistory metrics={allMetrics} type="issiah" />
    </div>
  );
}
