"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/firebase";
import { getAllActionItems, toggleActionItemApproval } from "@/lib/firestore";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TaskList from "@/components/TaskList";
import SharedNotes from "@/components/SharedNotes";
import type { ActionItem, CoFounder } from "@/types";
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Target,
  Users,
  Briefcase,
  Zap,
  Smartphone,
  BarChart3,
  Globe,
  DollarSign,
  CheckCircle,
  Circle,
  MessageSquare,
  X
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
  const [userCoFounder, setUserCoFounder] = useState<'issiah' | 'soya' | null>(null);
  const [metrics, setMetrics] = useState<MetricsSummary>({
    isaiah: { totalOutreach: 0, weeklyOutreach: 0, totalMeetings: 0, weeklyMeetings: 0 },
    soya: { totalRevenue: 0, totalSignups: 0, weeklySignups: 0, weeklyTickets: 0 },
  });
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [actionItemsLoading, setActionItemsLoading] = useState(true);
  const [showNotesModal, setShowNotesModal] = useState(false);

  useEffect(() => {
    loadMetrics();
    loadActionItems();
  }, []);

  async function loadMetrics() {
    try {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.uid);
        // Determine co-founder based on email or other identifier
        const coFounder = user.email?.includes('issiah') ? 'issiah' : 'soya';
        setUserCoFounder(coFounder);
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

  async function loadActionItems() {
    try {
      const result = await getAllActionItems();
      if (result.data) {
        // Only show pending items (not completed)
        const pendingItems = result.data.filter(item => item.status !== 'completed');
        setActionItems(pendingItems);
      }
    } catch (error) {
      console.error('Error loading action items:', error);
    } finally {
      setActionItemsLoading(false);
    }
  }

  async function handleToggleApproval(itemId: string, cofounder: CoFounder) {
    try {
      const result = await toggleActionItemApproval(itemId, cofounder);
      if (result.success) {
        // Reload action items to reflect changes
        await loadActionItems();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error toggling approval:', error);
      alert('Failed to update approval status');
    }
  }

  // Group action items by priority
  const groupedActionItems = {
    high: actionItems.filter(item => item.priority === 'high'),
    medium: actionItems.filter(item => item.priority === 'medium'),
    low: actionItems.filter(item => item.priority === 'low'),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Co-Founder Dashboard</h1>
        <p className="text-gray-600 mt-1">Track progress and metrics for HEADLINER</p>
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

      {/* Strategic Action Items - Database-Driven */}
      <Card className="border-2 border-purple-600">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600">
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Strategic Action Items
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-6 italic">
            Action items managed through AI chatbot. Both Issiah and Soya must approve before items are marked complete.
          </p>

          {actionItemsLoading ? (
            <div className="text-center py-8 text-gray-500">
              Loading action items...
            </div>
          ) : actionItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No pending action items. Use the AI chatbot to add new items!
            </div>
          ) : (
            <div className="space-y-6">
              {/* HIGH PRIORITY */}
              {groupedActionItems.high.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    HIGH PRIORITY - Critical for Launch ({groupedActionItems.high.length})
                  </h3>
                  <div className="space-y-4">
                    {groupedActionItems.high.map((item) => (
                      <DatabaseActionItem
                        key={item.id}
                        item={item}
                        userCoFounder={userCoFounder}
                        onToggleApproval={handleToggleApproval}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* MEDIUM PRIORITY */}
              {groupedActionItems.medium.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    MEDIUM PRIORITY - Post-Launch Enhancements ({groupedActionItems.medium.length})
                  </h3>
                  <div className="space-y-4">
                    {groupedActionItems.medium.map((item) => (
                      <DatabaseActionItem
                        key={item.id}
                        item={item}
                        userCoFounder={userCoFounder}
                        onToggleApproval={handleToggleApproval}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* LOW PRIORITY */}
              {groupedActionItems.low.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    LOW PRIORITY - Future Revenue Streams ({groupedActionItems.low.length})
                  </h3>
                  <div className="space-y-4">
                    {groupedActionItems.low.map((item) => (
                      <DatabaseActionItem
                        key={item.id}
                        item={item}
                        userCoFounder={userCoFounder}
                        onToggleApproval={handleToggleApproval}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

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

      {/* Floating Button for Shared Notes */}
      <button
        onClick={() => setShowNotesModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-indigo-500/50 hover:scale-110 transition-all duration-200 flex items-center justify-center z-40"
        title="View Shared Notes"
      >
        <MessageSquare className="w-7 h-7" />
      </button>

      {/* Shared Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">Shared Notes & Ideas</h2>
              </div>
              <button
                onClick={() => setShowNotesModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-white rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <SharedNotes currentUser={userCoFounder || undefined} />
            </div>
          </div>
        </div>
      )}

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

function DatabaseActionItem({
  item,
  userCoFounder,
  onToggleApproval
}: {
  item: ActionItem;
  userCoFounder: CoFounder | null;
  onToggleApproval: (itemId: string, cofounder: CoFounder) => void;
}) {
  const priorityColors = {
    high: "bg-red-50 border-red-300",
    medium: "bg-yellow-50 border-yellow-300",
    low: "bg-green-50 border-green-300"
  };

  const priorityBadges = {
    high: "bg-red-600 text-white",
    medium: "bg-yellow-600 text-white",
    low: "bg-green-600 text-white"
  };

  const priorityTextColors = {
    high: "text-red-900",
    medium: "text-yellow-900",
    low: "text-green-900"
  };

  return (
    <div className={`border-2 rounded-lg p-5 ${priorityColors[item.priority]}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className={`font-bold text-lg ${priorityTextColors[item.priority]} mb-2`}>{item.title}</h4>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${priorityBadges[item.priority]}`}>
          {item.priority}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">What to Build:</p>
          <p className="text-sm text-gray-800 whitespace-pre-line">{item.task}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Strategic Context:</p>
          <p className="text-sm text-gray-700 italic">{item.context}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Business Impact:</p>
          <p className="text-sm text-gray-800 whitespace-pre-line">{item.impact}</p>
        </div>
      </div>

      {/* Approvals Section */}
      <div className="border-t border-gray-300 pt-4">
        <p className="text-xs font-semibold text-gray-600 mb-2">Approvals (Both required to complete):</p>
        <div className="flex gap-4">
          <button
            onClick={() => userCoFounder && onToggleApproval(item.id, 'issiah')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              item.approvals.issiah
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${userCoFounder !== 'issiah' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={userCoFounder !== 'issiah'}
          >
            {item.approvals.issiah ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">Issiah</span>
          </button>

          <button
            onClick={() => userCoFounder && onToggleApproval(item.id, 'soya')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              item.approvals.soya
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${userCoFounder !== 'soya' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={userCoFounder !== 'soya'}
          >
            {item.approvals.soya ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">Soya</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {item.approvals.issiah && item.approvals.soya
            ? '✓ Both approved - This item will be removed on next refresh'
            : `${item.approvals.issiah ? 'Issiah' : ''} ${item.approvals.issiah && !item.approvals.soya ? 'approved,' : ''} ${item.approvals.soya ? 'Soya approved' : ''} ${!item.approvals.issiah && !item.approvals.soya ? 'Waiting for approvals' : ''}`
          }
        </p>
      </div>
    </div>
  );
}
