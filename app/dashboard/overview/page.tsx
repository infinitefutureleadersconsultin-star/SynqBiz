"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/firebase";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TaskList from "@/components/TaskList";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Target,
  Users,
  Briefcase
} from "lucide-react";

interface MetricsSummary {
  isaiah: {
    totalOutreach: number;
    weeklyOutreach: number;
    totalMeetings: number;
    weeklyMeetings: number;
  };
  soya: {
    totalRevenue: number;
    totalSignups: number;
    weeklySignups: number;
    weeklyTickets: number;
  };
}

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const [metrics, setMetrics] = useState<MetricsSummary>({
    isaiah: { totalOutreach: 0, weeklyOutreach: 0, totalMeetings: 0, weeklyMeetings: 0 },
    soya: { totalRevenue: 0, totalSignups: 0, weeklySignups: 0, weeklyTickets: 0 },
  });

  useEffect(() => {
    loadMetrics();
  }, []);

  async function loadMetrics() {
    try {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.uid);
      }

      // This will be replaced with actual database queries once Supabase is set up
      // For now, using placeholder data
      setMetrics({
        isaiah: {
          totalOutreach: 0,
          weeklyOutreach: 0,
          totalMeetings: 0,
          weeklyMeetings: 0,
        },
        soya: {
          totalRevenue: 0,
          totalSignups: 0,
          weeklySignups: 0,
          weeklyTickets: 0,
        },
      });
    } catch (error) {
      console.error("Error loading metrics:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Co-Founder Dashboard</h1>
        <p className="text-gray-600 mt-1">Track progress and metrics for SponsorSynq</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Outreach</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics.isaiah.totalOutreach}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  +{metrics.isaiah.weeklyOutreach} this week
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Meetings Scheduled</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics.isaiah.totalMeetings}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  +{metrics.isaiah.weeklyMeetings} this week
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">User Signups</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics.soya.totalSignups}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  +{metrics.soya.weeklySignups} this week
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue Milestone</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${metrics.soya.totalRevenue}
                </p>
                <p className="text-xs text-gray-500 mt-1">Current progress</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Tasks - All Co-Founders */}
      {userId && (
        <TaskList
          userId={userId}
          title="All Tasks This Week (Issiah & Soya)"
        />
      )}

      {/* Co-Founder Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issiah Section */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Issiah's Progress</CardTitle>
              <span className="px-3 py-1 bg-blue-200 text-blue-800 text-xs font-semibold rounded-full">
                Business
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 pt-4">
              <MetricRow label="Outreach Contacts" value={metrics.isaiah.totalOutreach} />
              <MetricRow label="Meetings Scheduled" value={metrics.isaiah.totalMeetings} />
              <MetricRow label="This Week" value={metrics.isaiah.weeklyOutreach} />
            </div>
            <Link href="/dashboard/isaiah">
              <Button variant="outline" className="w-full mt-4">
                View Full Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Soya Section */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Soya's Progress</CardTitle>
              <span className="px-3 py-1 bg-purple-200 text-purple-800 text-xs font-semibold rounded-full">
                Technical
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 pt-4">
              <MetricRow label="User Signups" value={metrics.soya.totalSignups} />
              <MetricRow label="Revenue" value={`$${metrics.soya.totalRevenue}`} />
              <MetricRow label="Support Tickets" value={metrics.soya.weeklyTickets} />
            </div>
            <Link href="/dashboard/soya">
              <Button variant="outline" className="w-full mt-4">
                View Full Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Guide */}
      {!loading && metrics.isaiah.totalOutreach === 0 && metrics.soya.totalSignups === 0 && (
        <Card className="border-2 border-primary-200 bg-primary-50">
          <CardContent className="py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              👋 Welcome to SynqBiz!
            </h3>
            <p className="text-gray-700 mb-4">
              Start tracking your progress by visiting your individual dashboard and logging your first metrics.
            </p>
            <div className="flex gap-3">
              <Link href="/dashboard/isaiah">
                <Button size="sm">Issiah's Dashboard</Button>
              </Link>
              <Link href="/dashboard/soya">
                <Button size="sm" variant="outline">Soya's Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
  );
}
