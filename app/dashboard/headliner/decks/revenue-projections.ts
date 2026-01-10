import { DollarSign, TrendingUp, PieChart, BarChart3, Calculator, Target } from "lucide-react";

export const revenueProjectionsSlides = [
  {
    id: 1,
    title: "HEADLINER",
    subtitle: "Revenue Projections & Financial Model",
    type: "cover",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    tagline: "Path to Profitability"
  },
  {
    id: 2,
    title: "Revenue Streams Overview",
    subtitle: "Four Primary Revenue Sources",
    content: [
      {
        title: "1. Ticket Transaction Fees",
        desc: "Processing fees (attendee-side) + platform fees (host-side)",
        revenue: "2.5% + $0.50 per ticket (attendee) + 1.5% (host - waived on Pro)"
      },
      {
        title: "2. Sponsorship Marketplace Commission",
        desc: "Percentage of every sponsorship deal closed through platform",
        revenue: "15% commission on Bronze ($250), Silver ($500), Gold ($1,000+) packages"
      },
      {
        title: "3. Pro Subscriptions",
        desc: "Monthly subscription for high-volume hosts",
        revenue: "$100/month - waives platform fees, unlocks premium features"
      },
      {
        title: "4. Promoter Network Revenue Share",
        desc: "Commission from promoter-driven ticket sales",
        revenue: "0.5% of all promoter-driven sales (hosts keep remainder)"
      }
    ],
    icon: DollarSign,
    gradient: "from-green-600 to-emerald-600",
  },
  {
    id: 3,
    title: "Year 1 Projections",
    subtitle: "Conservative Growth Model",
    content: [
      "Month 1-3: Platform launch, initial host acquisition (50 hosts)",
      "Month 4-6: First sponsor deals close, revenue begins (150 hosts, 10 sponsors)",
      "Month 7-9: Pro tier launches, conversion funnel optimized (300 hosts, 25 sponsors)",
      "Month 10-12: Scaling phase, marketplace effects compound (500 hosts, 50 sponsors)"
    ],
    why: {
      title: "Year 1 Revenue Breakdown:",
      points: [
        "Ticket fees: $45,000 (500 hosts × avg 100 tickets/month × $0.75 net fee)",
        "Sponsorship commissions: $90,000 (50 sponsors × $500 avg deal × 15% × 24 deals/year)",
        "Pro subscriptions: $36,000 (30 Pro subscribers × $100/month × 12 months)",
        "Promoter revenue share: $8,000 (20% of hosts using promoters heavily)",
        "Total Year 1: $179,000 ARR"
      ]
    },
    icon: Calculator,
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: 4,
    title: "Year 2-3 Scaling",
    subtitle: "Network Effects & Market Expansion",
    content: [
      {
        title: "Year 2 Targets",
        desc: "3,000 active hosts, 200 active sponsors, 15% Pro conversion",
        revenue: "$850,000 ARR"
      },
      {
        title: "Year 3 Targets",
        desc: "10,000 active hosts, 600 active sponsors, 20% Pro conversion",
        revenue: "$2.8M ARR"
      }
    ],
    why: {
      title: "Growth Drivers:",
      points: [
        "Sponsor marketplace creates competitive moat - hosts can't get this elsewhere",
        "Pro tier conversion increases as hosts see ROI from sponsor revenue",
        "Promoter network expands organically - affiliates recruit more hosts/sponsors",
        "City-by-city rollout de-risks growth, ensures local sponsor supply before host demand"
      ]
    },
    highlight: "Revenue scales non-linearly as marketplace effects compound. Each new sponsor increases platform value for all hosts.",
    icon: TrendingUp,
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: 5,
    title: "Unit Economics",
    subtitle: "Per-Host Revenue Model",
    content: [
      {
        title: "Average Free Tier Host",
        desc: "Ticket fees only",
        revenue: "$90/year (10 events × 100 tickets × $0.09 net)"
      },
      {
        title: "Average Pro Tier Host",
        desc: "Subscription + sponsorship commissions",
        revenue: "$1,500/year ($1,200 subscription + $300 sponsor commissions)"
      },
      {
        title: "High-Volume Pro Host",
        desc: "Monthly events, multiple sponsors",
        revenue: "$5,000+/year (top 10% of Pro hosts)"
      }
    ],
    why: {
      title: "Why Pro Conversion Matters:",
      points: [
        "Free hosts generate $90/year → Pro hosts generate $1,500/year (16.7x increase)",
        "Pro hosts close more sponsor deals due to priority visibility",
        "Pro hosts throw more events (avg 2x frequency) due to better tools",
        "Target: 20% Pro conversion by Year 3 = $2.3M ARR from Pro tier alone"
      ]
    },
    icon: PieChart,
    gradient: "from-amber-600 to-orange-600",
  },
  {
    id: 6,
    title: "Cost Structure",
    subtitle: "Lean Operations, High Margins",
    content: [
      "Stripe processing fees: 2.9% + $0.30 per transaction (passed to attendees)",
      "Platform hosting & infrastructure: $2,000/month ($24K/year)",
      "Customer acquisition cost (CAC): $50 per host (Year 1), $30 per host (Year 2+)",
      "Team: Founder + 1 developer Year 1, +2 team members Year 2"
    ],
    why: {
      title: "Margin Profile:",
      points: [
        "Gross margin: 85%+ (software business, minimal variable costs)",
        "CAC payback: 3-4 months for Pro hosts, 12 months for free hosts",
        "LTV:CAC ratio target: 5:1 by Year 2",
        "Break-even: Month 18 at current growth trajectory"
      ]
    },
    highlight: "Marketplace model = high margins. Hosts and sponsors pay for access to each other, not software features.",
    icon: BarChart3,
    gradient: "from-red-600 to-pink-600",
  },
  {
    id: 7,
    title: "Path to $10M ARR",
    subtitle: "3-5 Year Vision",
    content: [
      {
        title: "Year 4: Multi-City Dominance",
        desc: "20 cities, 30,000 hosts, 2,000 sponsors",
        revenue: "$6.5M ARR"
      },
      {
        title: "Year 5: National Footprint",
        desc: "50 cities, 75,000 hosts, 5,000 sponsors",
        revenue: "$12M ARR"
      }
    ],
    why: {
      title: "Strategic Milestones:",
      points: [
        "First profitable month: Month 18",
        "First $1M ARR: End of Year 2",
        "Series A fundraise: Year 3 ($3M raise at $15M valuation)",
        "$10M ARR: Year 5 (exit opportunity or continued growth)",
        "Target exit: Acquisition by Eventbrite, StubHub, or Live Nation for $80-120M"
      ]
    },
    icon: Target,
    gradient: "from-green-600 to-teal-600",
  },
  {
    id: 8,
    title: "The Financial Engine",
    subtitle: "Why This Model Works",
    type: "final",
    message: "We don't charge for software. We charge for access to the marketplace. Every new sponsor makes every host more valuable. Every new host makes every sponsor more valuable. Revenue compounds as network effects scale.",
    why: {
      title: "Key Financial Principles:",
      points: [
        "Transaction-based revenue scales with platform usage, not headcount",
        "Sponsor marketplace = differentiated revenue stream competitors can't replicate",
        "Pro tier targets power users who already see ROI from free tier",
        "City-by-city rollout ensures sponsor supply meets host demand = sustainable growth",
        "85%+ gross margins = capital-efficient path to profitability"
      ]
    },
    cta: "Build the Marketplace, Revenue Follows",
    gradient: "from-emerald-600 via-cyan-600 to-blue-600",
  }
];
