"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/firebase";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import TaskList from "@/components/TaskList";
import SharedNotes from "@/components/SharedNotes";
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
  DollarSign
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

  useEffect(() => {
    loadMetrics();
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

      {/* Shared Notes & Ideas */}
      <SharedNotes currentUser={userCoFounder || undefined} />

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

      {/* Strategic Action Items - From HEADLINER */}
      <Card className="border-2 border-purple-600">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600">
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Strategic Action Items - HEADLINER Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-6 italic">
            These action items are informed by our complete marketplace strategy in the HEADLINER presentation. Each one directly supports our purple cow positioning, Sponsor-to-Pocket invention, and two-sided marketplace model.
          </p>

          {/* HIGH PRIORITY */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                HIGH PRIORITY - Critical for Launch
              </h3>
              <div className="space-y-4">
                <ActionItem
                  priority="high"
                  icon={<Target className="w-5 h-5" />}
                  title="Sponsor Marketplace Visibility"
                  task="Make sponsor marketplace visible on day 1 - not hidden behind menus or settings"
                  context="From HEADLINER Slide 16: 'Sponsor marketplace must be visible on day 1 → not hidden behind a menu'"
                  impact="Our #1 differentiator vs Eventbrite. Hosts need to SEE sponsor opportunities immediately to understand our purple cow: 'We pay you to throw your event'"
                />
                <ActionItem
                  priority="high"
                  icon={<Smartphone className="w-5 h-5" />}
                  title="Sponsor-to-Pocket QR/NFC System"
                  task="Auto-generate QR code for every sponsorship deal. Track scans, conversions, email capture, retargeting pixel."
                  context="From HEADLINER Slide 11: 'Our Netflix Moment' - trackable sponsorship with receipts"
                  impact="This is our invention. Changes sponsorship from 'brand awareness' to 'direct response marketing.' Sponsors get exact customer counts, not just impressions. Justifies $250-$2,500 pricing tiers."
                />
                <ActionItem
                  priority="high"
                  icon={<Globe className="w-5 h-5" />}
                  title="Free Tier Feature Parity"
                  task="Match Eventbrite 1:1 on core features: unlimited events, ticketing, payouts, basic analytics, contracts"
                  context="From HEADLINER Slide 3, 5: Without brand recognition, we can't justify friction. Competitors offer unlimited free events = industry standard."
                  impact="A paywall after 1 event = dead on arrival. At scale, paid ads bring users who decide in 30 seconds. Landing page must remove ALL objections."
                />
                <ActionItem
                  priority="high"
                  icon={<Zap className="w-5 h-5" />}
                  title="Two Landing Pages - Purple Cow Messaging"
                  task="Build separate landing pages: (1) Hosts: 'We Pay You to Throw Your Event' (2) Sponsors: 'We Found the Events. You Just Pick Which Ones to Sponsor.'"
                  context="From HEADLINER Slide 8, 9, 15: Purple cow messaging stops the scroll. Different value props for each side of marketplace."
                  impact="Provocative, true, differentiated, memorable. Reframes conversation from 'cost' to 'revenue opportunity' for hosts. Solves 'discovery problem' for sponsors."
                />
              </div>
            </div>

            {/* MEDIUM PRIORITY */}
            <div>
              <h3 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                MEDIUM PRIORITY - Post-Launch Enhancements
              </h3>
              <div className="space-y-4">
                <ActionItem
                  priority="medium"
                  icon={<BarChart3 className="w-5 h-5" />}
                  title="AI Sponsor Matching Algorithm"
                  task="Build smart matching: analyze event type, demographics, location, past sponsor success. Recommend top 5 sponsors for each event."
                  context="From HEADLINER Slide 7: Pro tier feature - 'AI-powered sponsor matching + priority visibility → 3x faster matches'"
                  impact="Justifies our 12% commission. Free tier = browse manually. Pro tier = AI does the work. Avg. $100/mo Pro subscription pays for itself with 1 sponsorship deal."
                />
                <ActionItem
                  priority="medium"
                  icon={<Smartphone className="w-5 h-5" />}
                  title="Sponsor Analytics Dashboard"
                  task="Real-time dashboard for sponsors: exact scan count, conversion rate, customer emails captured, retargeting pixel stats, cost-per-acquisition"
                  context="From HEADLINER Slide 11, 13: 'Sponsorship with a receipt. Know exactly how many customers you got.'"
                  impact="Solves ROI problem. Traditional sponsorships = 'pay and pray.' Our sponsorships = trackable. Sponsors can prove: 'I paid $1,000, got 40 customers, $25 CAC' → cheaper than Facebook ads ($30-50 CAC)."
                />
                <ActionItem
                  priority="medium"
                  icon={<DollarSign className="w-5 h-5" />}
                  title="Outcome-Based Pricing Page"
                  task="Rewrite pricing page: don't list features, list financial outcomes. Every Pro feature needs $ value or time saved."
                  context="From HEADLINER Slide 6: 'Hosts don't pay for features. They pay for outcomes. Our pricing page must speak in dollars, not bullets.'"
                  impact="Example: Bad: 'Unlimited promoters' → Good: 'Scale ticket sales with unlimited promoters (avg. 40% more tickets sold).' Increases Pro conversions."
                />
                <ActionItem
                  priority="medium"
                  icon={<Globe className="w-5 h-5" />}
                  title="Self-Serve Sponsor Checkout"
                  task="Build Bronze/Silver/Gold/Platinum checkout flow. Sponsors pick tier, select events, pay instantly. No sales calls needed until $10K+ deals."
                  context="From HEADLINER Slide 15, 16: 'Landing page removes all friction → Self-serve browse for sponsors. No sales calls. Easy checkout.'"
                  impact="Reduces sales friction. Small/local brands can afford $250-$2,500 sponsorships without agency. Democratizes experiential marketing (agencies charge $50K+)."
                />
                <ActionItem
                  priority="medium"
                  icon={<Users className="w-5 h-5" />}
                  title="Marketing Engine - Warm Leads"
                  task="Email everyone who attended similar events in the host's city. 'You went to [similar event], you'll love this.' Avg. 1,000+ warm leads per event."
                  context="From HEADLINER Slide 7: Pro tier feature - 'Built-in marketing engine → Sell out 2x faster'"
                  impact="💰 MAKE MONEY: Hosts on Pro tier sell more tickets faster. Network effects: more events = more attendee data = better recommendations = more ticket sales."
                />
              </div>
            </div>

            {/* LOW PRIORITY */}
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                LOW PRIORITY - Future Revenue Streams
              </h3>
              <div className="space-y-4">
                <ActionItem
                  priority="low"
                  icon={<Users className="w-5 h-5" />}
                  title="Promoter Commission Management"
                  task="Free tier: up to 4-5 promoters. Pro tier: unlimited promoters. Track which promoters drive most revenue. Auto-split commissions."
                  context="From HEADLINER Slide 4, 7: Revenue stream #3 - We take a cut of every ticket sold by promoters. More promoters = more sales."
                  impact="Avg. hosts see 40% more tickets sold with unlimited promoters. Pro tier pays for itself. We earn from increased transaction volume."
                />
                <ActionItem
                  priority="low"
                  icon={<Briefcase className="w-5 h-5" />}
                  title="Venue Subscription Model"
                  task="Venues running ALL events exclusively through SynqBiz. Monthly subscription for priority placement + analytics."
                  context="From HEADLINER Slide 4: Revenue stream #4 - Recurring venue revenue + guaranteed event volume on our platform"
                  impact="Predictable MRR. Venues book 10-50 events/year. Lock in transaction volume. Builds moat vs competitors."
                />
                <ActionItem
                  priority="low"
                  icon={<DollarSign className="w-5 h-5" />}
                  title="Expense Tracking & Auto-Splits"
                  task="Track who owes what. Auto-calculate profit margins. Split payouts by % for co-hosts. No spreadsheets, no manual Venmo."
                  context="From HEADLINER Slide 7: Pro tier feature - '⏱️ SAVE TIME: Run events with partners. Auto-split payouts by %.'"
                  impact="Removes friction for hosts running events with multiple organizers. Keeps more hosts on platform (sticky feature)."
                />
              </div>
            </div>
          </div>

          {/* Strategic Summary */}
          <div className="mt-8 bg-purple-50 border-2 border-purple-600 rounded-lg p-6">
            <h3 className="text-lg font-bold text-purple-900 mb-3">Strategic North Star (From HEADLINER Slide 17)</h3>
            <p className="text-gray-800 mb-2">
              <strong>Every product decision must ask:</strong> "Does this increase transaction volume?"
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Every landing page change must ask:</strong> "Does this remove friction or add value perception?"
            </p>
            <p className="text-gray-800">
              <strong>Success = </strong> Hosts making money through sponsors + sponsors getting customers. Everything else is a distraction.
            </p>
          </div>
        </CardContent>
      </Card>

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

function ActionItem({
  priority,
  icon,
  title,
  task,
  context,
  impact
}: {
  priority: "high" | "medium" | "low";
  icon: React.ReactNode;
  title: string;
  task: string;
  context: string;
  impact: string;
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
    <div className={`border-2 rounded-lg p-5 ${priorityColors[priority]}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className={priorityTextColors[priority]}>{icon}</div>
          <h4 className={`font-bold text-lg ${priorityTextColors[priority]}`}>{title}</h4>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${priorityBadges[priority]}`}>
          {priority}
        </span>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">What to Build:</p>
          <p className="text-sm text-gray-800">{task}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Strategic Context:</p>
          <p className="text-sm text-gray-700 italic">{context}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">Business Impact:</p>
          <p className="text-sm text-gray-800">{impact}</p>
        </div>
      </div>
    </div>
  );
}
