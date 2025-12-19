"use client";

import { useState } from "react";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
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
    { label: "Outreach Contacts Made", icon: Target, value: 0, color: "blue" },
    { label: "Meetings Scheduled", icon: Users, value: 0, color: "purple" },
    { label: "Partnership Emails Sent", icon: Mail, value: 0, color: "green" },
    { label: "Business Concepts Explored", icon: Lightbulb, value: 0, color: "amber" },
    { label: "College Outreach Activities", icon: GraduationCap, value: 0, color: "indigo" },
    { label: "Personal Brand Posts", icon: Share2, value: 0, color: "pink" },
    { label: "Event Host Outreach", icon: Building2, value: 0, color: "cyan" },
    { label: "Enterprise Outreach", icon: TrendingUp, value: 0, color: "emerald" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Isaiah's Dashboard</h1>
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
