"use client";

import { useState } from "react";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FileSpreadsheet, TrendingUp, Target, Award, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function CompetitorsPage() {
  const [activeTab, setActiveTab] = useState<"quick" | "revenue" | "differentiators" | "summary" | "actions">("quick");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Competitor Analysis</h1>
          <p className="text-gray-600 mt-1">SponsorSynq vs Eventbrite & Market Competitors</p>
        </div>
        <a
          href="/SponsorSynq_Competitor_Comparison.xlsx"
          download
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Download Full Spreadsheet
        </a>
      </div>

      {/* Core Message Card */}
      <Card className="border-2 border-red-600 bg-red-50">
        <CardContent className="py-6">
          <h2 className="text-2xl font-bold text-red-900 mb-4 text-center">THE CORE MESSAGE</h2>
          <div className="space-y-2 text-center">
            <p className="text-lg font-bold text-red-700">We are NOT a cheaper Eventbrite.</p>
            <p className="text-lg font-bold text-red-700">We are a REVENUE GENERATION platform.</p>
            <p className="text-base font-semibold text-gray-900">Eventbrite is just a TICKETING platform.</p>
            <p className="text-base font-semibold text-gray-900">Hosts who use us make more money because sponsors find them automatically.</p>
            <p className="text-lg font-bold text-red-700 mt-3">That's the story. That's how we win.</p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex flex-wrap gap-2">
          <TabButton
            active={activeTab === "quick"}
            onClick={() => setActiveTab("quick")}
            icon={<CheckCircle2 className="w-4 h-4" />}
          >
            Quick Comparison
          </TabButton>
          <TabButton
            active={activeTab === "revenue"}
            onClick={() => setActiveTab("revenue")}
            icon={<TrendingUp className="w-4 h-4" />}
          >
            Revenue Streams
          </TabButton>
          <TabButton
            active={activeTab === "differentiators"}
            onClick={() => setActiveTab("differentiators")}
            icon={<Award className="w-4 h-4" />}
          >
            Differentiators
          </TabButton>
          <TabButton
            active={activeTab === "summary"}
            onClick={() => setActiveTab("summary")}
            icon={<Target className="w-4 h-4" />}
          >
            Revenue Summary
          </TabButton>
          <TabButton
            active={activeTab === "actions"}
            onClick={() => setActiveTab("actions")}
            icon={<AlertCircle className="w-4 h-4" />}
          >
            Action Items
          </TabButton>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "quick" && <QuickComparisonTab />}
        {activeTab === "revenue" && <RevenueStreamsTab />}
        {activeTab === "differentiators" && <DifferentiatorsTab />}
        {activeTab === "summary" && <RevenueSummaryTab />}
        {activeTab === "actions" && <ActionItemsTab />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
  icon
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
        active
          ? "bg-white text-primary-700 border-t-2 border-x-2 border-primary-600"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function QuickComparisonTab() {
  const comparisons = [
    { feature: "Processing Fee", us: "~3% + $0.30", them: "~6.6% + $1.79", winner: "us" },
    { feature: "Platform Fee", us: "5% (waivable)", them: "~6.6% + $1.79 (not waivable)", winner: "us" },
    { feature: "First Event", us: "FREE", them: "Fees apply", winner: "us" },
    { feature: "Subscription Waives Fees?", us: "YES", them: "NO (double-dip)", winner: "us" },
    { feature: "Sponsor Marketplace", us: "YES (built-in)", them: "NO", winner: "us" },
    { feature: "Sponsor Matching AI", us: "YES", them: "NO", winner: "us" },
    { feature: "Instant Payout", us: "YES (1.5%)", them: "NO", winner: "us" },
    { feature: "Pricing Changes Since 2007", us: "0 (we're new)", them: "11 times", winner: "us" },
    { feature: "Referral Program Cap", us: "UNLIMITED + rev share", them: "$50 max", winner: "us" },
    { feature: "Free Event Posting", us: "YES", them: "YES (restored after backlash)", winner: "tie" },
    { feature: "Brand Recognition", us: "New/Unknown", them: "Industry Leader", winner: "them" },
    { feature: "Enterprise Clients", us: "Building", them: "Established", winner: "them" },
    { feature: "Global Infrastructure", us: "Building", them: "180+ countries", winner: "them" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Head-to-Head: SponsorSynq vs Eventbrite</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                <th className="text-left py-3 px-4 font-semibold text-primary-700">SponsorSynq</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Eventbrite</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Winner</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((comp, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{comp.feature}</td>
                  <td className="py-3 px-4 text-gray-700">{comp.us}</td>
                  <td className="py-3 px-4 text-gray-700">{comp.them}</td>
                  <td className="py-3 px-4 text-center">
                    {comp.winner === "us" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        Us
                      </span>
                    )}
                    {comp.winner === "them" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                        <XCircle className="w-3 h-3" />
                        Them
                      </span>
                    )}
                    {comp.winner === "tie" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        Tie
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-700">9</div>
            <div className="text-sm text-green-600 font-medium">We Win</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-3xl font-bold text-yellow-700">1</div>
            <div className="text-sm text-yellow-600 font-medium">Tie</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-3xl font-bold text-red-700">3</div>
            <div className="text-sm text-red-600 font-medium">They Win</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RevenueStreamsTab() {
  const streams = [
    {
      name: "Processing Fee",
      us: "~3% + $0.30 per ticket\nPassed to attendee",
      eventbrite: "3.7% + $1.79 service fee\nPLUS 2.9% processing\nTotal: ~6.6% + $1.79",
      win: "Significantly cheaper\nTransparent pricing\nNo hidden fees"
    },
    {
      name: "Platform Fee",
      us: "5% of ticket revenue\nOnly on 2nd+ events\n1st event FREE\nWaived with $19/mo",
      eventbrite: "~6.6% + $1.79 per ticket\nChanged pricing 11 times\nRemoved free tier in 2023",
      win: "Simple & transparent\nFirst event free builds trust\nSubscription waives entirely"
    },
    {
      name: "Sponsor Commission",
      us: "12% of sponsor allocations\nTaken before host payout\n$100 = $12 to us, $88 to host",
      eventbrite: "NOTHING\nNo sponsor marketplace\nHosts find sponsors alone",
      win: "ONLY platform with sponsor marketplace\nEventbrite can't compete here\n12% vs 15-25% agencies"
    },
    {
      name: "Instant Payout",
      us: "1.5% of payout amount\nSame-day deposit\nStandard (3-5 days) is free",
      eventbrite: "Standard: 5 business days\nNO instant option\nNeed money faster? Too bad",
      win: "We offer it - Eventbrite doesn't\nCompetitive with PayPal\nMeaningful differentiation"
    }
  ];

  return (
    <div className="grid gap-6">
      {streams.map((stream, index) => (
        <Card key={index}>
          <CardHeader className="bg-gradient-to-r from-primary-50 to-primary-100">
            <CardTitle>{stream.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mt-4">
              <div>
                <h4 className="font-semibold text-primary-700 mb-2">What We Charge</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{stream.us}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">What Eventbrite Charges</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{stream.eventbrite}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Where We Win</h4>
                <p className="text-sm text-green-700 whitespace-pre-line">{stream.win}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DifferentiatorsTab() {
  const differentiators = [
    {
      name: "SPONSOR MARKETPLACE",
      means: "We have one. They don't.",
      matters: "• Hosts make money they'd never find otherwise\n• This is our #1 differentiator\n• Eventbrite literally cannot compete"
    },
    {
      name: "REVENUE PLATFORM vs TICKETING PLATFORM",
      means: "We help hosts MAKE money\nThey just help hosts SELL tickets",
      matters: "• Different value proposition entirely\n• We're not a cheaper Eventbrite\n• We're a different category"
    },
    {
      name: "SUBSCRIPTION ACTUALLY SAVES MONEY",
      means: "Our $19/mo waives fees\nTheir $15-100/mo doesn't",
      matters: "• Eventbrite double-dips\n• We reward active hosts\n• Clear economic value"
    },
    {
      name: "FIRST EVENT FREE",
      means: "Zero risk to try\nExperience value before paying",
      matters: "• Builds trust\n• Removes 'what if it doesn't work' anxiety\n• Converts skeptics"
    },
    {
      name: "PRICING STABILITY",
      means: "We won't surprise users\nThey've changed 11 times",
      matters: "• Eventbrite destroyed trust\n• We can win on reliability\n• Public commitment matters"
    },
    {
      name: "AMBASSADOR PROGRAM",
      means: "Tiered rewards + revenue share\nTheirs caps at $50",
      matters: "• Creates true evangelists\n• Ongoing stake in platform success\n• Organic growth engine"
    }
  ];

  return (
    <div className="grid gap-6">
      {differentiators.map((diff, index) => (
        <Card key={index} className="border-l-4 border-l-primary-600">
          <CardHeader className="bg-primary-600">
            <CardTitle className="text-white">{diff.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">What It Means</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{diff.means}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Why It Matters</h4>
                <p className="text-sm text-blue-700 whitespace-pre-line">{diff.matters}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function RevenueSummaryTab() {
  const revenues = [
    { stream: "Processing Fee", whoPays: "Attendee", amount: "~3% + $0.30", trigger: "Every ticket", competitive: "YES - but higher", unique: false },
    { stream: "Platform Fee", whoPays: "Host", amount: "5%", trigger: "2nd+ event, non-subscriber", competitive: "YES - but not waivable", unique: false },
    { stream: "Subscription", whoPays: "Host", amount: "$19/month", trigger: "Optional, waives 5% fee", competitive: "YES - but doesn't waive fees", unique: false },
    { stream: "Sponsor Commission", whoPays: "Sponsor", amount: "12%", trigger: "Every sponsorship deal", competitive: "NO - we're the only one", unique: true },
    { stream: "Featured Placement", whoPays: "Sponsor", amount: "$29", trigger: "Optional add-on", competitive: "NO - unique product", unique: true },
    { stream: "Instant Payout", whoPays: "Host", amount: "1.5%", trigger: "Optional, on-demand", competitive: "NO - Eventbrite doesn't offer", unique: true },
    { stream: "Premium Analytics", whoPays: "Host", amount: "$7/month", trigger: "Optional (free w/ Pro)", competitive: "PARTIAL - bundled only", unique: false },
    { stream: "Event Boost", whoPays: "Host", amount: "$15", trigger: "Optional, per event", competitive: "NO - unique to sponsors", unique: true },
    { stream: "Enterprise License", whoPays: "University", amount: "$10K-25K/year", trigger: "Annual contract", competitive: "YES - but no sponsor integration", unique: false },
    { stream: "Ambassador Program", whoPays: "N/A (we pay)", amount: "Credits + rev share", trigger: "Successful referrals", competitive: "WEAK - Eventbrite caps at $50", unique: false },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Revenue Streams Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Stream</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Who Pays</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">When It Triggers</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Competitors Have This?</th>
              </tr>
            </thead>
            <tbody>
              {revenues.map((rev, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{rev.stream}</td>
                  <td className="py-3 px-4 text-gray-700">{rev.whoPays}</td>
                  <td className="py-3 px-4 text-gray-700">{rev.amount}</td>
                  <td className="py-3 px-4 text-gray-700">{rev.trigger}</td>
                  <td className="py-3 px-4">
                    {rev.unique ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        <Award className="w-3 h-3" />
                        {rev.competitive}
                      </span>
                    ) : (
                      <span className="text-gray-700">{rev.competitive}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionItemsTab() {
  const highPriority = [
    {
      area: "Event Collaboration/Co-hosting",
      task: "Multi-host event collaboration system:\n• Primary & secondary event hosts\n• Real-time ticket revenue tracking for all hosts\n• Customizable revenue split (50/50, 60/40, etc.)\n• Primary host controls fund distribution\n• Venue payment tracking/metrics\n• Multi-city tour dashboard\n• Track all events under one tour umbrella",
      why: "Game-changer for large-scale events and tours. Creates network effects - hosts bring other hosts. Differentiates us from all competitors who only support single-host events."
    },
    {
      area: "Promoter Referral System",
      task: "Role-based promoter program:\n• Event hosts assign 'promoter' roles\n• Unique tracking links/QR codes per promoter\n• Track ticket sales by promoter link\n• Automatic commission payouts\n• Works like affiliate program but for event promotion\n• Promoters share on Instagram/TikTok stories",
      why: "Viral growth engine. Turns every event into distributed sales team. Promoters are incentivized to drive ticket sales. Event hosts get free marketing."
    },
    {
      area: "Landing Page Overhaul",
      task: "PRICING: Only 2 tiers:\n• Free: Unlimited events, basic features\n• $100/mo: Money-making features (was $19)\n\nMESSAGING:\n• Focus on ROI, not features\n• 'Save X, Make Y' psychology\n• Fewer words, clearer value\n• Show savings/earnings potential per feature\n\nCOMPETITOR COMPARISON:\n• REMOVE from landing page entirely\n• Move to post-signup dashboard\n• Only show after they're already users\n• Prevent competitors from copying our strategy",
      why: "Simplicity converts better. People don't want subscriptions - they want to 'pay when they get paid' or see clear ROI. Hiding competitor intel protects our competitive advantage."
    },
    {
      area: "Venue Partnership System",
      task: "Venue integration features:\n• Venues can create accounts\n• Event hosts connect their venue\n• Transparent revenue sharing dashboard\n• Track bar/food/door splits in real-time\n• Simple fund distribution\n\nVENUE LOCK-IN STRATEGY:\n• Partner with venues to require SponsorSynq\n• 'Want to use our venue? Use SponsorSynq'\n• Creates vendor lock-in\n• Eliminates competition with Eventbrite/Posh\n• Market domination through venue partnerships",
      why: "This is the ULTIMATE competitive moat. If venues require SponsorSynq, event hosts have no choice. We stop competing on features and own the distribution channel. Venue adoption = market domination."
    },
    {
      area: "Revenue Stream Documentation",
      task: "Comprehensive revenue analysis:\n• Document ALL current revenue streams\n• Platform fee, processing, sponsorship commission, etc.\n• Strategy for free events (no ticket sales)\n• How to monetize users who don't charge for tickets?\n• Options: Sponsorship-only commission, require subscription, tiered free limits\n• Question: Is free platform usage okay if it brings brand awareness?\n• Alternative revenue from free event hosts?",
      why: "Need clarity on business model edge cases. Free events still have value (brand awareness, sponsor discovery) but need strategy to ensure sustainable revenue. Must balance growth with monetization."
    },
  ];

  const mediumPriority = [
    {
      area: "Performance Tracking",
      task: "WHAT: Analytics dashboard tracking ROI of paid features\n\nWHERE: Event host dashboard - 'Marketing Performance' section\n\nWHEN: After event hosts use Event Boost ($15) or Featured Placement ($29)\n\nHOW IT WORKS:\n• Track views, clicks, sponsor offers received\n• Compare boosted vs non-boosted events\n• Show ROI: 'You spent $15, received 3 sponsor offers worth $500'\n• Export performance reports\n\nWHY: Event hosts won't pay for Boost/Featured unless they see proof it works. Need data to justify these upgrades and show clear ROI.",
      why: "Users need proof that paying for Boost/Featured actually brings more sponsors. Without tracking, they won't trust these features are worth the money. Data-driven justification drives adoption."
    },
    {
      area: "Instant Payout Cap",
      task: "WHAT: Maximum fee limit on instant payout feature\n\nWHERE: Payout settings page when event host requests instant transfer\n\nWHEN: Event host clicks 'Get Paid Now' instead of waiting 3-5 days\n\nHOW IT WORKS:\n• Current: 1.5% of payout (unlimited)\n• Updated: 1.5% of payout, capped at $15 max\n• Example: $10,000 payout = $15 fee (not $150)\n• Small payouts: $500 = $7.50 (still 1.5%)\n\nWHY: Large event hosts avoid instant payout because 1.5% of $10K = $150 fee. With a $15 cap, they'll actually use it. Makes feature attractive to high-revenue events.",
      why: "Without a cap, high-earning event hosts see instant payout as too expensive ($150 on $10K). A $15 cap makes it affordable for large events while maintaining revenue on smaller payouts."
    },
    {
      area: "Annual Subscription",
      task: "WHAT: Yearly payment option for Pro subscription\n\nWHERE: Pricing page and subscription settings\n\nWHEN: Event hosts choose subscription plan (currently $19/month only)\n\nHOW IT WORKS:\n• Current: $19/month only ($228/year)\n• Add option: $190/year (save $38, ~17% discount)\n• Locks in user for 12 months\n• Same benefits: Waives 5% platform fee, includes Premium Analytics\n• Auto-renewal with option to cancel\n\nWHY: Annual commitments improve revenue predictability and reduce churn. Users who pay annually are more invested in the platform. Industry standard pricing psychology.",
      why: "Annual subscriptions lock in committed hosts, reduce monthly churn, and improve financial predictability. Users who pay upfront are more likely to actively use the platform to justify their investment."
    },
    {
      area: "Tiered Boost Options",
      task: "WHAT: Multiple Event Boost pricing tiers based on duration\n\nWHERE: Event creation/editing page - 'Promote Your Event' section\n\nWHEN: Event host wants to attract sponsors faster\n\nHOW IT WORKS:\n• Current: $15 for 7 days only\n• Add tiers:\n  - Quick Boost: $10 for 3 days (last-minute events)\n  - Standard Boost: $15 for 7 days (current option)\n  - Extended Boost: $25 for 14 days (early planning)\n• Shows estimated sponsor reach per tier\n• Can purchase multiple boosts per event\n\nWHY: Different events have different timelines. Club events (short notice) need 3-day boost. Corporate events (planned ahead) benefit from 14-day visibility. Flexibility increases adoption.",
      why: "One-size-fits-all doesn't work. Last-minute events need short boosts, planned events need extended visibility. Tiered pricing captures different customer segments and increases total boost revenue."
    },
  ];

  const lowPriority = [
    {
      area: "Enterprise Compliance",
      task: "WHAT: University-specific admin features for event oversight\n\nWHERE: Admin dashboard for university administrators\n\nWHEN: Universities require institutional control before allowing student event hosting\n\nHOW IT WORKS:\n• Approval Workflows: Student org submits event → admin reviews/approves before going live\n• Audit Trails: Track who created/edited/approved each event, timestamp everything\n• SIS Integration: Connect to Student Information System to verify student status, majors, orgs\n• Budget Controls: Set spending limits per org, require multi-level approval for large events\n• Compliance Reports: Export event data for Title IX, liability, budget reviews\n\nWHY: Universities won't adopt without institutional oversight. Legal/compliance departments require approval chains and audit capabilities. This unlocks $10K-25K/year enterprise contracts.",
      why: "Universities have strict compliance requirements (Title IX, budget accountability, liability). Without admin controls and audit trails, they legally cannot let students use the platform. Required for enterprise sales."
    },
    {
      area: "Leaderboards",
      task: "WHAT: Public rankings of top-performing ambassadors\n\nWHERE: Ambassador dashboard and public leaderboard page\n\nWHEN: Ambassadors view their stats and compare performance\n\nHOW IT WORKS:\n• Real-time rankings based on:\n  - Total referrals (new event hosts brought in)\n  - Revenue generated from referrals\n  - Active users (referrals still using platform)\n  - Tier status (Starter, Rising, Elite, Founding)\n• Show top 10 globally, top 3 in user's region\n• Display earnings: 'Top ambassador earned $2,450 this month'\n• Gamification: Badges for milestones (10 referrals, $1K earned, etc.)\n• Monthly resets with Hall of Fame for all-time leaders\n\nWHY: Shows ambassadors what's possible ('If they earned $2K, I can too'). Creates competitive motivation. Proves the program is real and lucrative. Drives ambassador recruitment and activity.",
      why: "Social proof drives action. When potential ambassadors see others earning $1K+/month, they're motivated to join. Competition pushes existing ambassadors to recruit harder. Makes program feel legitimate and achievable."
    },
  ];

  return (
    <div className="space-y-6">
      {/* High Priority */}
      <Card className="border-2 border-red-600">
        <CardHeader className="bg-red-600">
          <CardTitle className="text-white">HIGH PRIORITY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-4">
            {highPriority.map((item, index) => (
              <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-red-900">{item.area}</h4>
                  <span className="px-2 py-1 bg-red-200 text-red-800 text-xs font-bold rounded">HIGH</span>
                </div>
                <p className="text-sm text-gray-900 mb-2"><strong>Task:</strong> {item.task}</p>
                <p className="text-sm text-gray-700"><strong>Why:</strong> {item.why}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Medium Priority */}
      <Card className="border-2 border-yellow-600">
        <CardHeader className="bg-yellow-600">
          <CardTitle className="text-white">MEDIUM PRIORITY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-4">
            {mediumPriority.map((item, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-yellow-900">{item.area}</h4>
                  <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs font-bold rounded">MEDIUM</span>
                </div>
                <p className="text-sm text-gray-900 mb-2"><strong>Task:</strong> {item.task}</p>
                <p className="text-sm text-gray-700"><strong>Why:</strong> {item.why}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Low Priority */}
      <Card className="border-2 border-green-600">
        <CardHeader className="bg-green-600">
          <CardTitle className="text-white">LOW PRIORITY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-4">
            {lowPriority.map((item, index) => (
              <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-green-900">{item.area}</h4>
                  <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-bold rounded">LOW</span>
                </div>
                <p className="text-sm text-gray-900 mb-2"><strong>Task:</strong> {item.task}</p>
                <p className="text-sm text-gray-700"><strong>Why:</strong> {item.why}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
