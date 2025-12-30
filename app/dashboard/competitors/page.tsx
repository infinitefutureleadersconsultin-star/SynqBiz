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
