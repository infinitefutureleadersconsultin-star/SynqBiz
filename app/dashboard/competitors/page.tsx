"use client";

import { useState } from "react";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { FileSpreadsheet, TrendingUp, Target, Award, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function CompetitorsPage() {
  const [activeTab, setActiveTab] = useState<"quick" | "revenue" | "differentiators" | "summary">("quick");

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
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "quick" && <QuickComparisonTab />}
        {activeTab === "revenue" && <RevenueStreamsTab />}
        {activeTab === "differentiators" && <DifferentiatorsTab />}
        {activeTab === "summary" && <RevenueSummaryTab />}
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
