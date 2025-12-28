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
          <p className="text-gray-600 mt-1">SponsorSynq vs Eventbrite, Posh & Market Competitors</p>
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
    { feature: "Processing Fee", us: "~3% + $0.30", eventbrite: "~6.6% + $1.79", posh: "10% + $0.99", winner: "us" },
    { feature: "Platform Fee", us: "5% (waivable)", eventbrite: "Included in 6.6%", posh: "Included in 10%", winner: "us" },
    { feature: "Subscription to Waive Fees", us: "$100/mo waives 5%", eventbrite: "NO fee waiver", posh: "No subscription", winner: "us" },
    { feature: "Sponsor Marketplace", us: "YES (AI-powered)", eventbrite: "NO", posh: "NO", winner: "us" },
    { feature: "Sponsor Matching AI", us: "YES", eventbrite: "NO", posh: "NO", winner: "us" },
    { feature: "Event Collaboration", us: "YES (multi-host)", eventbrite: "NO", posh: "NO", winner: "us" },
    { feature: "Venue Partnerships", us: "YES (lock-in strategy)", eventbrite: "NO", posh: "NO", winner: "us" },
    { feature: "Promoter/Affiliate System", us: "YES ($100 tier)", eventbrite: "NO", posh: "YES (Kickback)", winner: "tie" },
    { feature: "Daily Payouts", us: "NO (3-5 days)", eventbrite: "NO (5 days)", posh: "YES (automatic)", winner: "posh" },
    { feature: "SMS Marketing", us: "Planned ($100 tier)", eventbrite: "Limited", posh: "YES (all users)", winner: "posh" },
    { feature: "Mobile App", us: "NO (web)", eventbrite: "YES", posh: "YES (social)", winner: "them" },
    { feature: "Team Permissions", us: "Planned", eventbrite: "YES", posh: "YES (role-based)", winner: "them" },
    { feature: "Tables/Bottle Service", us: "NO", eventbrite: "NO", posh: "YES", winner: "posh" },
    { feature: "Brand Recognition", us: "New/Unknown", eventbrite: "Industry Leader", posh: "Nightlife Leader", winner: "them" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Head-to-Head: SponsorSynq vs Eventbrite & Posh</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                <th className="text-left py-3 px-4 font-semibold text-primary-700">SponsorSynq</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Eventbrite</th>
                <th className="text-left py-3 px-4 font-semibold text-purple-700">Posh</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Winner</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((comp, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{comp.feature}</td>
                  <td className="py-3 px-4 text-gray-700">{comp.us}</td>
                  <td className="py-3 px-4 text-gray-700">{comp.eventbrite}</td>
                  <td className="py-3 px-4 text-gray-700">{comp.posh}</td>
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
                    {comp.winner === "posh" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                        <AlertCircle className="w-3 h-3" />
                        Posh
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
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-3xl font-bold text-green-700">7</div>
            <div className="text-sm text-green-600 font-medium">We Win</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-700">3</div>
            <div className="text-sm text-purple-600 font-medium">Posh Wins</div>
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
      name: "Total Fees Comparison",
      us: "Free tier: ~8% + $0.30 total\n$100 tier: ~3% + $0.30 total\nOn $20 ticket: $1.90 (Free) or $0.90 (Paid)",
      eventbrite: "~6.6% + $1.79 total\nOn $20 ticket: $3.11\nNever gets cheaper",
      posh: "10% + $0.99 total\nOn $20 ticket: $2.99\nNever gets cheaper",
      win: "We're cheapest on Free tier\nEVEN CHEAPER on $100 tier\n500 tickets at $30 = save $845 vs Posh"
    },
    {
      name: "Sponsor Marketplace (BIGGEST DIFFERENTIATOR)",
      us: "12% commission on sponsor deals\n$100 sponsor = $12 to us, $88 to host\nAI matching, automated offers\nBoth Free & $100 tiers",
      eventbrite: "NOTHING\nNo sponsor marketplace\nHosts cold email alone",
      posh: "NOTHING\nNo sponsor marketplace\nHosts find sponsors manually",
      win: "ONLY PLATFORM with sponsor marketplace\nNeither competitor can match\n12% vs 15-25% traditional agencies\nThis is our moat"
    },
    {
      name: "Subscription Value",
      us: "$100/month\nWaives 5% platform fee entirely\nIncludes re-engagement, promoters, collaboration\nBreakeven: $2K/mo, saves more above that",
      eventbrite: "$15-100/month\nDoes NOT waive fees\nDouble-dipping\nPay subscription AND all fees",
      posh: "NO SUBSCRIPTION\nCannot reduce 10% fee\nNo way to save money",
      win: "We reward high-volume hosts\nPosh locks everyone at 10% forever\nEventbrite charges both subscription + fees"
    },
    {
      name: "Event Collaboration Revenue",
      us: "Multi-host events with revenue splits\nAutomatic fund distribution\nTour dashboard grouping\nVenue payment tracking",
      eventbrite: "NO collaboration features\nManual coordination required",
      posh: "NO collaboration features\nManual coordination required",
      win: "ONLY PLATFORM with native collaboration\nCreates network effects\nHosts bring other hosts"
    },
    {
      name: "Promoter/Affiliate Commission",
      us: "Planned for $100 tier\nHost-set commission rates\nAutomatic tracking & payout\nQR codes + links",
      eventbrite: "NOTHING\nManual tracking only",
      posh: "Kickback system (mature)\nPublic + private affiliates\nAuto payouts 1-2 days\n20% platform fee on commissions",
      win: "POSH WINS HERE (for now)\nThey have 11% avg revenue from Kickback\nWe need to match or exceed"
    },
    {
      name: "Payout Speed",
      us: "Standard: 3-5 days (free)\nInstant: 1.5% capped at $15 (optional)",
      eventbrite: "Standard: 5 days only\nNo instant option",
      posh: "DAILY automatic payouts\nAs tickets sell\nCash flow advantage",
      win: "POSH WINS HERE\nDaily payouts critical for hosts\nWe need to add this feature"
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
            <div className="grid md:grid-cols-4 gap-4 mt-4">
              <div>
                <h4 className="font-semibold text-primary-700 mb-2">SponsorSynq</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{stream.us}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Eventbrite</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{stream.eventbrite}</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 mb-2">Posh</h4>
                <p className="text-sm text-gray-700 whitespace-pre-line">{stream.posh}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Analysis</h4>
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
      matters: "• Hosts make money they'd never find otherwise\n• This is our #1 differentiator\n• Eventbrite literally cannot compete\n• 12% commission vs 15-25% traditional agencies"
    },
    {
      name: "REVENUE PLATFORM vs TICKETING PLATFORM",
      means: "We help hosts MAKE money\nThey just help hosts SELL tickets",
      matters: "• Different value proposition entirely\n• We're not a cheaper Eventbrite\n• We're a different category\n• Sponsors + tickets + collaboration + promoters"
    },
    {
      name: "PAY WHEN YOU GET PAID",
      means: "Free tier = pay nothing upfront\nOnly pay when money flows through platform",
      matters: "• Zero risk to try unlimited events\n• Perfect for occasional hosts\n• No subscription anxiety\n• We succeed when they succeed"
    },
    {
      name: "SUBSCRIPTION THAT ACTUALLY SAVES MONEY",
      means: "$100/mo waives 5% platform fee entirely\nBreakeven at $2,000/mo in ticket sales\nEventbrite's subscription doesn't waive fees",
      matters: "• Sell $5K/mo = save $250, pay $100 = net $150 savings\n• Eventbrite double-dips (subscription + fees)\n• We reward active hosts\n• Clear ROI, not just features"
    },
    {
      name: "PROMOTER REFERRAL SYSTEM",
      means: "Turn host's network into distributed sales team\nUnique tracking links, QR codes, auto commissions\nOnly $100/mo tier",
      matters: "• Viral growth engine for events\n• Free marketing that only costs when sales happen\n• Eventbrite has nothing like this\n• Unlocks Instagram/TikTok promotion"
    },
    {
      name: "VENUE LOCK-IN STRATEGY",
      means: "Partner with venues to require SponsorSynq\n'Want our venue? Use our platform'\nOwn the distribution channel",
      matters: "• Ultimate competitive moat\n• Eliminates choice, creates necessity\n• Eventbrite/Posh can't compete\n• We own infrastructure, not just features"
    },
    {
      name: "PRICING STABILITY",
      means: "We won't surprise users\nThey've changed 11 times since 2007",
      matters: "• Eventbrite destroyed trust\n• We can win on reliability\n• Public commitment matters\n• Hosts need predictability"
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
    { stream: "Processing Fee", whoPays: "Attendee", amount: "~3% + $0.30", trigger: "Every ticket (both tiers)", competitive: "YES - but higher", unique: false },
    { stream: "Platform Fee", whoPays: "Host (Free tier)", amount: "5% of revenue", trigger: "All ticket sales on Free tier", competitive: "YES - but not waivable", unique: false },
    { stream: "Subscription", whoPays: "Host", amount: "$100/month", trigger: "Optional upgrade, waives 5% fee entirely", competitive: "YES - but theirs doesn't waive fees", unique: false },
    { stream: "Sponsor Commission", whoPays: "Sponsor", amount: "12%", trigger: "Every sponsorship deal (both tiers)", competitive: "NO - we're the only one", unique: true },
    { stream: "Promoter Commission", whoPays: "Event sales via promoter", amount: "% of sale", trigger: "When promoter link/QR code used ($100 tier only)", competitive: "NO - unique automated system", unique: true },
    { stream: "Instant Payout Fee", whoPays: "Host", amount: "1.5% (max $15)", trigger: "Optional same-day payout (both tiers)", competitive: "NO - Eventbrite doesn't offer", unique: true },
    { stream: "Event Boost", whoPays: "Host (Free tier)", amount: "$15/7 days", trigger: "Optional sponsor visibility boost", competitive: "NO - unique to sponsor discovery", unique: true },
    { stream: "Featured Placement", whoPays: "Sponsor", amount: "$29/14 days", trigger: "Optional priority placement", competitive: "NO - unique product", unique: true },
    { stream: "Enterprise License", whoPays: "University", amount: "$10K-25K/year", trigger: "Annual contract with compliance features", competitive: "YES - but no sponsor integration", unique: false },
    { stream: "Ambassador Program", whoPays: "N/A (we pay)", amount: "Credits + rev share", trigger: "Successful host referrals", competitive: "WEAK - Eventbrite caps at $50", unique: false },
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
      area: "Daily Payouts (CRITICAL - Posh Has This)",
      task: "Automatic daily payouts as tickets sell:\n• Hosts receive money daily instead of waiting 3-5 days\n• Critical cash flow advantage for hosts paying vendors/venues upfront\n• Include in $100/mo tier or offer as separate option\n• Posh has this as standard - hosts will see our 3-5 day as downgrade\n\nIMPLEMENTATION:\n• Integrate with Stripe's scheduled payouts\n• Allow hosts to choose daily vs standard\n• Track payout history and show next payout date",
      why: "CRITICAL GAP vs Posh. Their hosts get money daily. Ours wait 3-5 days. This is a major switching barrier. Without this, Posh hosts won't move to us even with sponsor marketplace advantage."
    },
    {
      area: "SMS Marketing (CRITICAL - Posh Has This)",
      task: "SMS broadcast capabilities matching Posh:\n• Send SMS blasts to past attendees about new events\n• Segment by event category, location, purchase history\n• Track conversion rates (Posh claims 32% of inventory sold via SMS)\n• Automated notifications when new events match attendee interests\n• Include in $100/mo tier\n\nIMPLEMENTATION:\n• Integrate Twilio or similar SMS API\n• Build audience segmentation tools\n• Track SMS → ticket conversion",
      why: "CRITICAL GAP vs Posh. They sell 32% of tickets through SMS blasts. This is a proven, high-ROI re-engagement channel. Without it, our $100 tier is incomplete compared to Posh's free features."
    },
    {
      area: "Promoter System Enhancement (Match Posh Kickback)",
      task: "Enhanced promoter/affiliate system matching Posh Kickback:\n• PUBLIC Kickback: All ticket buyers get referral link automatically\n• PRIVATE Kickback: Invite-only for influencers/partners\n• Automatic commission tracking via unique links + QR codes\n• Automatic payouts every 1-2 business days\n• Detailed analytics showing sales/conversions per promoter\n• Host sets commission (flat fee or %)\n\nNOTE: Posh gets 11% avg additional revenue from Kickback\nNOTE: Posh charges 20% platform fee on Kickback commissions",
      why: "Posh's Kickback is mature and proven ($35K additional revenue for top events). Our planned promoter system must match or exceed this. Public kickback (all buyers become affiliates) is genius for viral growth."
    },
    {
      area: "Event Collaboration/Co-hosting",
      task: "Multi-host event collaboration system:\n• Primary & secondary event hosts\n• Real-time ticket revenue tracking for all hosts\n• Customizable revenue split (50/50, 60/40, etc.)\n• Primary host controls fund distribution\n• Venue payment tracking/metrics\n• Multi-city tour dashboard\n• Track all events under one tour umbrella",
      why: "UNIQUE DIFFERENTIATOR. Neither Eventbrite nor Posh have this. Creates network effects - hosts bring other hosts. Game-changer for tours and large-scale events."
    },
    {
      area: "Venue Partnership System (ULTIMATE MOAT)",
      task: "Venue integration + lock-in strategy:\n• Venues can create accounts\n• Event hosts connect their venue\n• Transparent revenue sharing dashboard\n• Track bar/food/door splits in real-time\n• Simple fund distribution\n\nVENUE LOCK-IN STRATEGY:\n• Partner with venues to require SponsorSynq\n• 'Want to use our venue? Use SponsorSynq'\n• Creates vendor lock-in\n• Eliminates competition with Eventbrite/Posh",
      why: "ULTIMATE COMPETITIVE MOAT. Neither competitor has this. If venues require SponsorSynq, hosts have no choice. We stop competing on features and own the distribution channel. Market domination strategy."
    },
    {
      area: "Team Permissions (CRITICAL - Both Competitors Have This)",
      task: "Role-based team access:\n• Admin: Full access to everything\n• Finance: Revenue, payouts, refunds only\n• Marketing: SMS, promotions, analytics only\n• Door Staff: Check-in only\n• Custom roles with granular permissions\n\nUSE CASE: Large events have teams - promoters, door staff, marketing, finance\nPosh and Eventbrite both have robust team management",
      why: "TABLE STAKES feature both competitors have. Professional events need team collaboration. Without this, we look amateur compared to Posh/Eventbrite."
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
      task: "WHAT: Yearly payment option for $100/mo subscription\n\nWHERE: Pricing page and subscription settings\n\nWHEN: Event hosts choose subscription plan (currently $100/month only)\n\nHOW IT WORKS:\n• Current: $100/month only ($1,200/year)\n• Add option: $1,000/year (save $200, ~17% discount)\n• Locks in user for 12 months\n• Same benefits: Waives 5% platform fee, re-engagement, promoters, collaboration, premium analytics\n• Auto-renewal with option to cancel\n\nWHY: Annual commitments improve revenue predictability and reduce churn. Users who pay upfront are more invested in the platform. Industry standard pricing psychology.",
      why: "Annual subscriptions lock in committed hosts, reduce monthly churn, and improve financial predictability. $200 discount incentivizes yearly commitment while maintaining strong revenue per customer."
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
