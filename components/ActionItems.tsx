"use client";

import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function ActionItems() {
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
                <p className="text-sm text-gray-900 mb-2 whitespace-pre-line"><strong>Task:</strong> {item.task}</p>
                <p className="text-sm text-gray-700 whitespace-pre-line"><strong>Why:</strong> {item.why}</p>
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
                <p className="text-sm text-gray-900 mb-2 whitespace-pre-line"><strong>Task:</strong> {item.task}</p>
                <p className="text-sm text-gray-700 whitespace-pre-line"><strong>Why:</strong> {item.why}</p>
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
                <p className="text-sm text-gray-900 mb-2 whitespace-pre-line"><strong>Task:</strong> {item.task}</p>
                <p className="text-sm text-gray-700 whitespace-pre-line"><strong>Why:</strong> {item.why}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
