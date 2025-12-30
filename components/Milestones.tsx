"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/firebase";
import { createMilestone, getAllMilestones, updateMilestone } from "@/lib/firestore";
import type { Milestone } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Target, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react";

// Pre-defined 6-month productivity milestones
const SIX_MONTH_MILESTONES_ISSIAH = [
  {
    title: "Contact 450+ Event Hosts",
    description: "Reach out to minimum 450 event hosts over 6 months (Month 1-2: 100, Month 3-4: 150, Month 5-6: 200)",
    owner: "issiah" as const,
    category: "outreach" as const,
    target_value: 450,
    unit: "contacts",
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    title: "Schedule 40+ Meetings",
    description: "Schedule and conduct minimum 40 discovery meetings with prospects",
    owner: "issiah" as const,
    category: "outreach" as const,
    target_value: 40,
    unit: "meetings",
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    title: "Secure 10+ Signed Partnerships",
    description: "Close minimum 10 signed event host partnerships",
    owner: "issiah" as const,
    category: "revenue" as const,
    target_value: 10,
    unit: "partnerships",
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    title: "Build LinkedIn Presence (1,000+ followers)",
    description: "Grow personal brand to 1,000+ engaged LinkedIn followers through consistent posting",
    owner: "issiah" as const,
    category: "operations" as const,
    target_value: 1000,
    unit: "followers",
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    title: "Complete 50+ Enterprise Outreach",
    description: "Conduct minimum 50 outreach calls to enterprise sponsors",
    owner: "issiah" as const,
    category: "outreach" as const,
    target_value: 50,
    unit: "calls",
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
];

const SIX_MONTH_MILESTONES_SOYA = [
  {
    title: "Ship 40+ Features",
    description: "Develop and deploy minimum 40 product features over 6 months",
    owner: "soya" as const,
    category: "development" as const,
    target_value: 40,
    unit: "features",
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    title: "Achieve 500+ Active Users",
    description: "Grow user base to minimum 500 active users",
    owner: "soya" as const,
    category: "product" as const,
    target_value: 500,
    unit: "users",
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    title: "Maintain 99.9% Platform Uptime",
    description: "Achieve and maintain 99.9% platform uptime across 6 months",
    owner: "soya" as const,
    category: "operations" as const,
    target_value: 99.9,
    unit: "percent",
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    title: "Achieve 60%+ Onboarding Completion",
    description: "Optimize onboarding flow to achieve 60%+ completion rate",
    owner: "soya" as const,
    category: "product" as const,
    target_value: 60,
    unit: "percent",
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  {
    title: "Complete 10+ A/B Tests",
    description: "Run and analyze minimum 10 A/B tests for product optimization",
    owner: "soya" as const,
    category: "product" as const,
    target_value: 10,
    unit: "tests",
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
];

export default function Milestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'issiah' | 'soya'>('issiah');
  const [filter, setFilter] = useState<'all' | 'my' | 'both'>('all');

  useEffect(() => {
    loadUserAndMilestones();
  }, []);

  async function loadUserAndMilestones() {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (user) {
        setUserRole((user.user_metadata?.role || 'issiah') as 'issiah' | 'soya');
      }

      const { data } = await getAllMilestones();
      if (data) {
        setMilestones(data);

        // If no milestones exist, create the default 6-month milestones
        if (data.length === 0) {
          await initializeDefaultMilestones();
        }
      }
    } catch (error) {
      console.error('Error loading milestones:', error);
    } finally {
      setLoading(false);
    }
  }

  async function initializeDefaultMilestones() {
    const allDefaultMilestones = [
      ...SIX_MONTH_MILESTONES_ISSIAH,
      ...SIX_MONTH_MILESTONES_SOYA,
    ];

    for (const milestone of allDefaultMilestones) {
      await createMilestone({
        ...milestone,
        current_value: 0,
        status: 'not_started',
      });
    }

    await loadUserAndMilestones();
  }

  const handleUpdateProgress = async (milestone: Milestone, newValue: number) => {
    await updateMilestone(milestone.id, {
      current_value: newValue,
    });
    await loadUserAndMilestones();
  };

  const filteredMilestones = milestones.filter(m => {
    if (filter === 'my') return m.owner === userRole;
    if (filter === 'both') return m.owner === 'both';
    return true; // 'all'
  });

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'missed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700';
      case 'missed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const days = Math.floor((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-primary-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-primary-600" />
              <div>
                <CardTitle>6-Month Productivity Milestones</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Track effort and work completed (not market results)
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('my')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'my' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                My Milestones
              </button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Total Milestones</p>
              <p className="text-4xl font-bold text-gray-900">{milestones.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">In Progress</p>
              <p className="text-4xl font-bold text-blue-600">
                {milestones.filter(m => m.status === 'in_progress').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Completed</p>
              <p className="text-4xl font-bold text-green-600">
                {milestones.filter(m => m.status === 'completed').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-600 py-8">Loading milestones...</p>
        ) : filteredMilestones.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Target className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-600">No milestones found. Initializing defaults...</p>
            </CardContent>
          </Card>
        ) : (
          filteredMilestones.map((milestone) => {
            const daysRemaining = getDaysRemaining(milestone.deadline);
            const isOverdue = daysRemaining < 0;

            return (
              <Card key={milestone.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(milestone.status)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                            {milestone.status.replace('_', ' ')}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                            {milestone.owner === 'issiah' ? 'Issiah' : milestone.owner === 'soya' ? 'Soya' : 'Both'}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Progress: {milestone.current_value} / {milestone.target_value} {milestone.unit}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {milestone.completion_percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              milestone.completion_percentage === 100
                                ? 'bg-green-500'
                                : milestone.completion_percentage >= 70
                                ? 'bg-blue-500'
                                : milestone.completion_percentage >= 40
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(100, milestone.completion_percentage)}%` }}
                          />
                        </div>
                      </div>

                      {/* Deadline and Update */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className={`text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                            {isOverdue
                              ? `${Math.abs(daysRemaining)} days overdue`
                              : `${daysRemaining} days remaining`}
                          </span>
                        </div>

                        {milestone.owner === userRole && milestone.status !== 'completed' && (
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min="0"
                              max={milestone.target_value}
                              value={milestone.current_value}
                              onChange={(e) => handleUpdateProgress(milestone, parseInt(e.target.value) || 0)}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-600">/ {milestone.target_value}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
