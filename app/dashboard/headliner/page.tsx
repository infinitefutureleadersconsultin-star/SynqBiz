"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, DollarSign, TrendingUp, Users, Zap, Target, Award, ChevronDown, Presentation, BarChart3, Calendar } from "lucide-react";

// Marketplace Strategy Deck
const marketplaceSlides = [
  {
    id: 1,
    title: "HEADLINER",
    subtitle: "Our Marketplace Strategy & Competitive Positioning",
    type: "cover",
    gradient: "from-blue-600 via-purple-600 to-pink-600",
  },
  {
    id: 2,
    title: "We're Not a Software Company",
    subtitle: "We're a Marketplace",
    content: [
      "We connect event hosts, sponsors, attendees, and promoters",
      "Our job is to facilitate the economy between them",
      "Revenue comes from transactions, not subscriptions",
      "We enable value exchange, not just feature access"
    ],
    why: {
      title: "Why This Matters:",
      points: [
        "Software companies compete on features → endless development cycle, commoditization",
        "Marketplaces compete on network effects → the more users, the more valuable it becomes",
        "Our moat isn't code, it's the ecosystem we build between hosts and sponsors",
        "This changes how we price (transactions), how we market (purple cow), and how we grow (viral loops)"
      ]
    },
    icon: Users,
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    id: 3,
    title: "The Free Tier Strategy",
    subtitle: "No Walls. No Limits. Until You're Ready.",
    content: [
      "Unlimited events from day one",
      "Full access to core features",
      "No paywalls after first event",
      "Free tier = complete functionality, not a trial"
    ],
    why: {
      title: "Why This Is Non-Negotiable:",
      points: [
        "Competitors (Eventbrite, Posh, Partiful) offer unlimited free events → industry standard",
        "Hosts switching platforms won't tolerate MORE friction than what they left",
        "Without brand recognition, we can't justify paywalls → they'll bounce immediately",
        "At scale, paid ads bring users who decide in 30 seconds → landing page must remove ALL objections",
        "Free tier builds the network effect → more hosts = more sponsors = more value for everyone"
      ]
    },
    highlight: "The entire platform should be free with no limitations on core features until hosts are ready to scale",
    icon: Target,
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: 4,
    title: "How We Make Money",
    subtitle: "Four Revenue Streams Built Into the Ecosystem",
    content: [
      {
        title: "1. Ticket Transaction Fees",
        desc: "Processing fees (attendee-side) + platform fees (host-side)",
        why: "Host-side fees waived on Pro → incentive to upgrade while we still make money from attendee fees"
      },
      {
        title: "2. Sponsorship Transaction Cuts",
        desc: "When a sponsor buys a Bronze ($250), Silver ($500), Gold ($1,000+) package",
        why: "We take a percentage of every sponsorship deal closed through our marketplace"
      },
      {
        title: "3. Promoter Commission Splits",
        desc: "Free tier: up to 4-5 promoters. Pro tier: unlimited promoters",
        why: "We take a cut of every ticket sold by promoters. More promoters = more sales = more revenue"
      },
      {
        title: "4. Future: Venue Subscriptions",
        desc: "Venues running all events exclusively through SynqBiz",
        why: "Recurring venue revenue + guaranteed event volume on our platform"
      }
    ],
    why: {
      title: "The Key Insight:",
      points: [
        "Revenue follows transaction volume, not subscription count",
        "A host running 10 events/year with 500 tickets each generates more revenue than a $100/mo subscription",
        "Sponsorship deals ($250-$2,500 each) are high-value transactions → our cut is meaningful",
        "The free tier GENERATES revenue through transactions → it's not a loss leader, it's the engine"
      ]
    },
    icon: DollarSign,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "Why We Can't Do It Any Other Way",
    subtitle: "The Competitive Reality Check",
    content: [
      "Eventbrite, Posh, Partiful, Evite → all offer unlimited free events",
      "Hosts coming from those platforms expect no event limits",
      "We don't have the brand recognition to justify friction",
      "A paywall after one event = dead on arrival",
      "At scale, our landing page must sell itself — no personal explanations"
    ],
    why: {
      title: "What This Means for Our Platform & Landing Page:",
      points: [
        "Landing page must say 'Free Forever' → not 'Free Trial' or 'Start Free'",
        "Value prop must be 'We pay you' → not 'Try us out and see'",
        "Free tier must match competitor features 1:1 → anything less is instant friction",
        "Pro tier must focus on outcomes (make more, keep more) → not feature lists",
        "Every design choice must reduce cognitive load → trust is earned through simplicity"
      ]
    },
    icon: TrendingUp,
    gradient: "from-red-500 to-pink-600",
  },
  {
    id: 6,
    title: "What Hosts Actually Care About",
    subtitle: "It's Not Features. It's Money.",
    content: [
      "Does this platform help me keep more money?",
      "Does this platform help me make more money?",
      "That's it. Everything else is expected.",
      "Hosts feel entitled to features competitors give for free",
      "We can't charge for what others give away"
    ],
    why: {
      title: "How This Changes Our Pricing Page:",
      points: [
        "Don't list features → list financial outcomes",
        "Bad: 'Unlimited promoters' → Good: 'Scale ticket sales with unlimited promoters (avg. 40% more tickets sold)'",
        "Bad: 'Advanced analytics' → Good: 'Track which sponsors bring the most value (make smarter deals)'",
        "Bad: 'Marketing engine' → Good: 'Email 1,000+ warm leads automatically (sell out faster)'",
        "Every Pro feature needs a $ value attached → how much time saved or money made"
      ]
    },
    highlight: "Hosts don't pay for features. They pay for outcomes. Our pricing page must speak in dollars, not bullets.",
    icon: Award,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 7,
    title: "Free vs. Pro Breakdown",
    subtitle: "What Lives Where & Why They'll Upgrade",
    type: "comparison",
    free: {
      title: "FREE TIER - $0/month",
      subtitle: "Match What Competitors Offer",
      features: [
        {
          feature: "Unlimited events",
          why: "Industry standard (Eventbrite, Posh)"
        },
        {
          feature: "Full ticketing system with payouts",
          why: "Core marketplace functionality"
        },
        {
          feature: "Basic sponsor marketplace access",
          why: "Browse sponsors manually, send outreach yourself"
        },
        {
          feature: "Up to 4-5 promoters",
          why: "Enough to test the model, limited enough to want more"
        },
        {
          feature: "Standard contracts & basic analytics",
          why: "Expected baseline features"
        },
        {
          feature: "Pay platform fees on ticket sales",
          why: "This is how we monetize free users"
        }
      ]
    },
    pro: {
      title: "PRO TIER - $100/month",
      subtitle: "For Hosts Already Making Money Who Want to Scale",
      features: [
        {
          feature: "Platform fees waived",
          why: "💰 SAVE MONEY: Keep 100% of ticket revenue (minus processing). Pays for itself after ~40 tickets/month."
        },
        {
          feature: "AI-powered sponsor matching + priority visibility",
          why: "💰 MAKE MONEY: Smart recommendations match you with sponsors 3x faster. Your events show up first in sponsor searches."
        },
        {
          feature: "Unlimited promoters + deep analytics",
          why: "💰 MAKE MONEY: Scale ticket sales infinitely. See which promoters drive the most revenue. Avg. hosts see 40% more tickets sold."
        },
        {
          feature: "Collaboration tools for co-hosts",
          why: "⏱️ SAVE TIME: Run events with partners. Auto-split payouts by %. No manual math or Venmo'ing people."
        },
        {
          feature: "Expense tracking & automated splits",
          why: "⏱️ SAVE TIME: Track who owes what. Auto-calculate profit margins. No spreadsheets."
        },
        {
          feature: "Built-in marketing engine",
          why: "💰 MAKE MONEY: We email everyone who attended similar events in your city. Avg. 1,000+ warm leads per event. Sell out 2x faster."
        }
      ]
    },
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 8,
    title: "Our Purple Cow",
    subtitle: "The Message That Stops the Scroll",
    content: [
      "Every other platform takes money from hosts",
      "Eventbrite charges fees. Posh charges fees. They all take.",
      "We flip the script."
    ],
    purpleCow: "We Pay You to Throw Your Event",
    explanation: "When a sponsor pays $1,000 for a Gold package, the host keeps the majority. We bring money TO hosts instead of just taking it FROM them.",
    callout: "\"Eventbrite charges you. We pay you.\"",
    why: {
      title: "Why This Works:",
      points: [
        "It's provocative → makes people stop scrolling and ask 'wait, what?'",
        "It's true → sponsors literally pay hosts through our marketplace",
        "It's differentiated → no competitor can claim this (they don't have sponsor marketplaces)",
        "It reframes the conversation → from 'cost' to 'revenue opportunity'",
        "It's memorable → simple enough to repeat, bold enough to share"
      ]
    },
    icon: Zap,
    gradient: "from-fuchsia-500 to-purple-600",
  },
  {
    id: 9,
    title: "The Psychology Behind the Funnel",
    subtitle: "How This Works in Practice",
    content: [
      {
        step: "1. Purple Cow Stops the Scroll",
        desc: "\"We pay you to throw your event\" → Curiosity click. They land on our page."
      },
      {
        step: "2. Landing Page Removes All Friction",
        desc: "Free forever. No credit card. Unlimited events. They sign up because there's no risk."
      },
      {
        step: "3. Product Experience Exceeds Expectations",
        desc: "They discover cleaner UI than Eventbrite, better tools than Posh, and a sponsor marketplace no one else has."
      },
      {
        step: "4. First Sponsor Match = Aha Moment",
        desc: "A sponsor reaches out or they close their first $500 deal. Now they believe the purple cow wasn't hype."
      },
      {
        step: "5. They Stay Because It Actually Works",
        desc: "Platform is better + they're making money. Switching back to Eventbrite feels like a downgrade."
      },
      {
        step: "6. Revenue Flows Through the Ecosystem",
        desc: "Ticket fees. Sponsorship cuts. Promoter commissions. Money is moving. We take our percentage."
      }
    ],
    why: {
      title: "Why This Matters for the Landing Page:",
      points: [
        "Step 1 & 2 are CRITICAL → if the landing page doesn't convert, nothing else matters",
        "Purple cow must be above the fold → biggest, boldest text on the page",
        "CTA must say 'Start Free Forever' → not 'Try Free' or 'Get Started'",
        "Social proof must show sponsor success stories → not just event success",
        "Every section must remove objections → 'Is this really free?' 'Will I get spammed?' 'Is setup hard?'"
      ]
    },
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    id: 10,
    title: "This Is How We Compete",
    subtitle: "Our Strategic Edge",
    content: [
      "✓ Match the free entry every competitor offers → remove friction",
      "✓ Give hosts a built-in sponsor marketplace → our unique moat",
      "✓ Position as 'we pay you' instead of 'we charge you' → reframe the narrative",
      "✓ Let people in without walls or limits → build network effects",
      "✓ Let the marketplace generate revenue → transactions, not subscriptions"
    ],
    why: {
      title: "What This Means for Development Priorities:",
      points: [
        "Sponsor marketplace must be visible on day 1 → not hidden behind a menu",
        "Free tier must be feature-complete → no artificial limitations that feel cheap",
        "Onboarding must showcase sponsor opportunities → not just 'create your first event'",
        "Pro tier upgrade prompts must focus on $$ outcomes → not 'unlock more features'",
        "Analytics must show 'potential sponsor revenue' → make the money visible"
      ]
    },
    highlight: "The purple cow opens the door. The product keeps them in the room. The marketplace generates the money.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 11,
    title: "The Engine",
    subtitle: "What Drives Everything",
    type: "final",
    message: "We don't need to charge people to walk in. We just need to make sure that once they're in, money is moving — and we get a cut of every transaction that happens.",
    why: {
      title: "Final Strategic Imperatives:",
      points: [
        "Every product decision must ask: 'Does this increase transaction volume?'",
        "Every landing page change must ask: 'Does this remove friction or add value perception?'",
        "Every pricing page update must ask: 'Does this speak in outcomes, not features?'",
        "Every email, ad, or campaign must lead with: 'We pay you to throw your event'",
        "Success = hosts making money through sponsors. Everything else is a distraction."
      ]
    },
    gradient: "from-purple-600 via-pink-600 to-red-600",
  }
];

// Revenue Projections Deck
const revenueProjectionsSlides = [
  {
    id: 1,
    title: "Revenue Projections",
    subtitle: "2026 Growth Scenarios, Valuation Models, and Exit Strategies",
    type: "cover",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
  },
  {
    id: 2,
    title: "How We Make Money",
    subtitle: "6 Revenue Streams | We Win When Money Moves",
    content: [
      {
        title: "Sponsorship Commission (12%)",
        desc: "Cut of every sponsorship deal ($250-$2,500+)",
        why: "We take a percentage of every sponsorship deal closed through our marketplace"
      },
      {
        title: "Ticket Sales Fee (5%)",
        desc: "Platform fee on all ticket sales (waived for Pro)",
        why: "Host-side fees waived on Pro → incentive to upgrade while we still make money from attendee fees"
      },
      {
        title: "Processing Fee Profit (~$1/ticket)",
        desc: "We charge fee to cover Stripe + keep $1 profit",
        why: "Additional margin on every ticket transaction"
      },
      {
        title: "Promoter Commission (20%)",
        desc: "Cut of promoter-driven ticket sales",
        why: "We take a cut of every ticket sold by promoters. More promoters = more sales = more revenue"
      },
      {
        title: "Instant Payout Fee (1.5%, max $15)",
        desc: "Same-day payout option for hosts",
        why: "Premium service for hosts who want immediate access to funds"
      },
      {
        title: "Pro Subscription ($100/month)",
        desc: "Premium tier for high-volume hosts",
        why: "Recurring revenue + guaranteed event volume on our platform"
      }
    ],
    why: {
      title: "Key Insight:",
      points: [
        "We're not a SaaS company. We're a marketplace.",
        "Every transaction = multiple revenue streams stacking.",
        "FREE events still generate sponsorship revenue.",
        "Revenue follows transaction volume, not subscription count"
      ]
    },
    icon: DollarSign,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    title: "Year 1 Projections",
    subtitle: "Conservative | Moderate | Aggressive",
    type: "scenarios",
    scenarios: [
      {
        name: "CONSERVATIVE",
        tagline: "Slower growth, lower sponsor adoption",
        data: [
          { label: "Total Events", value: "62,678" },
          { label: "Sponsored Events", value: "20,056 (32%)" },
          { label: "Total Sponsorships", value: "36,100" },
          { label: "Tickets Sold", value: "1,212,019" },
          { label: "Estimated Hosts", value: "7,835" },
          { label: "Sponsorship GMV", value: "$16.2M" },
          { label: "Ticket GMV", value: "$26.7M" },
          { label: "TOTAL GMV", value: "$42.9M", highlight: true },
          { label: "PLATFORM REVENUE", value: "$5.5M", highlight: true }
        ]
      },
      {
        name: "MODERATE",
        tagline: "We hit our targets consistently",
        data: [
          { label: "Total Events", value: "89,541" },
          { label: "Sponsored Events", value: "35,816 (40%)" },
          { label: "Total Sponsorships", value: "64,468" },
          { label: "Tickets Sold", value: "2,037,035" },
          { label: "Estimated Hosts", value: "11,193" },
          { label: "Sponsorship GMV", value: "$29.0M" },
          { label: "Ticket GMV", value: "$44.8M" },
          { label: "TOTAL GMV", value: "$73.8M", highlight: true },
          { label: "PLATFORM REVENUE", value: "$9.4M", highlight: true }
        ]
      },
      {
        name: "AGGRESSIVE",
        tagline: "Viral growth, high sponsor adoption",
        data: [
          { label: "Total Events", value: "125,357" },
          { label: "Sponsored Events", value: "62,678 (50%)" },
          { label: "Total Sponsorships", value: "112,820" },
          { label: "Tickets Sold", value: "3,279,581" },
          { label: "Estimated Hosts", value: "15,670" },
          { label: "Sponsorship GMV", value: "$50.8M" },
          { label: "Ticket GMV", value: "$72.2M" },
          { label: "TOTAL GMV", value: "$122.9M", highlight: true },
          { label: "PLATFORM REVENUE", value: "$15.5M", highlight: true }
        ]
      }
    ],
    why: {
      title: "What Determines Which Scenario:",
      points: [
        "Conservative: Slower city exits, 32% sponsor rate, modest viral growth",
        "Moderate: Consistent execution, 40% sponsor rate, steady TikTok traction",
        "Aggressive: Fast exits, 50% sponsor rate, viral moment, inbound demand"
      ]
    },
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    id: 4,
    title: "Revenue Breakdown (Moderate)",
    subtitle: "Where The $9.4M Comes From",
    type: "breakdown",
    breakdown: [
      { stream: "Sponsorship Commission (12%)", calculation: "64K sponsorships × $450 × 12%", total: "$3,481,272" },
      { stream: "Ticket Sales Fee (5%)", calculation: "$44.8M ticket GMV × 5%", total: "$2,128,702" },
      { stream: "Processing Profit ($1/tix)", calculation: "2.04M tickets × $1", total: "$2,037,035" },
      { stream: "Promoter Commission (20%)", calculation: "12% promoter-driven × 20%", total: "$1,075,554" },
      { stream: "Pro Subscriptions", calculation: "560 Pro hosts × $100 × 6mo", total: "$335,779" },
      { stream: "Instant Payout Fees (1.5%)", calculation: "30% adoption", total: "$296,382" }
    ],
    total: "$9,354,724",
    takeRate: "12.7%",
    why: {
      title: "Quarterly Progression:",
      points: [
        "Q1: $151,407 (1,555 events)",
        "Q2: $1,288,970 (13,233 events)",
        "Q3: $3,185,220 (32,698 events)",
        "Q4: $4,096,745 (42,055 events)",
        "Key Insight: Q4 revenue ($4.1M) is 27x Q1 ($151K). That's compounding growth."
      ]
    },
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 5,
    title: "The Real Upside (Year 2+)",
    subtitle: "Year 1 Is Just The Foundation",
    type: "upside",
    content: [
      {
        title: "Regional/National Sponsors",
        desc: "$5K-$50K deals (vs. $450 avg)",
        impact: "Year 2+ Impact"
      },
      {
        title: "Enterprise Tier",
        desc: "Venues, festivals, agencies ($500+/mo)",
        impact: "Recurring revenue expansion"
      },
      {
        title: "Sponsor Subscriptions",
        desc: "Monthly plans ($200-$1K/mo)",
        impact: "Predictable revenue stream"
      },
      {
        title: "Data/Insights Products",
        desc: "Audience analytics for brands",
        impact: "High-margin add-on"
      },
      {
        title: "Premium Placements",
        desc: "Featured sponsor spots (auction)",
        impact: "Premium pricing tier"
      },
      {
        title: "Geographic Expansion",
        desc: "West Coast, Midwest, International",
        impact: "TAM expansion"
      }
    ],
    projections: {
      year2: {
        title: "Year 2 Projection (Moderate Path):",
        items: [
          "200,000+ events",
          "$150M+ GMV",
          "$20M+ platform revenue",
          "Series A at $50M+ valuation"
        ]
      },
      year3: {
        title: "Year 3+:",
        items: [
          "National presence",
          "$500M+ GMV potential",
          "IPO/Acquisition pathway"
        ]
      }
    },
    highlight: "Year 1 proves the model. Year 2+ scales it exponentially.",
    gradient: "from-blue-600 via-purple-600 to-pink-600",
  }
];

// Marketing Rollout Deck
const marketingRolloutSlides = [
  {
    id: 1,
    title: "Marketing Rollout",
    subtitle: "Month-by-Month Execution Plan, Daily Activities, and Growth Tactics",
    type: "cover",
    gradient: "from-orange-600 via-red-600 to-pink-600",
  },
  {
    id: 2,
    title: "The Strategy",
    subtitle: "One City. One Spark. Statewide Fire.",
    content: [
      "We do NOT spread thin across an entire state",
      "We DOMINATE one major city",
      "Create undeniable proof",
      "Let results pull the rest of the state in naturally"
    ],
    formula: {
      title: "The Formula:",
      steps: [
        "Pick one 'ignition city' per state",
        "Load it with sponsors (money first)",
        "Fill it with event hosts (inventory second)",
        "Activate sponsorships (proof third)",
        "Document wins and move on",
        "Let organic growth spread statewide"
      ]
    },
    why: {
      title: "Why This Works:",
      points: [
        "When Charlotte promoters post 'Just got $500 from sponsors on HEADLINER' → Raleigh promoters see it",
        "They sign up → Fire spreads WITHOUT manual effort",
        "Depth beats breadth. Proof beats promises.",
        "Each city we dominate creates 50%+ organic growth in surrounding areas"
      ]
    },
    icon: Zap,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 3,
    title: "12-Month Expansion Roadmap",
    subtitle: "12 States. 12 Cities. 12 Months.",
    type: "roadmap",
    roadmap: [
      { month: 1, state: "North Carolina", city: "Charlotte", why: "Largest city, strong event scene" },
      { month: 2, state: "South Carolina", city: "Columbia", why: "College town (USC), central" },
      { month: 3, state: "Georgia", city: "Atlanta", why: "Massive event economy" },
      { month: 4, state: "Virginia", city: "Richmond", why: "Young professionals, colleges" },
      { month: 5, state: "Tennessee", city: "Nashville", why: "Music/entertainment capital" },
      { month: 6, state: "Florida", city: "Miami", why: "Event capital of the South" },
      { month: 7, state: "Texas", city: "Houston", why: "Largest TX city, diverse" },
      { month: 8, state: "Maryland", city: "Baltimore", why: "Underserved, hungry market" },
      { month: 9, state: "Alabama", city: "Birmingham", why: "Central hub, HBCU presence" },
      { month: 10, state: "Louisiana", city: "New Orleans", why: "Built-in event culture" },
      { month: 11, state: "Mississippi", city: "Jackson", why: "HBCU hub (Jackson State)" },
      { month: 12, state: "Arkansas", city: "Little Rock", why: "State capital, central" }
    ],
    flywheel: {
      title: "The Flywheel Effect:",
      points: [
        "City 1 (Charlotte): Hardest - no proof yet",
        "City 2-3: Show previous city results",
        "City 4-6: Inbound starts happening",
        "City 7-9: Regional brands reach out",
        "City 10-12: National credibility"
      ]
    },
    gradient: "from-red-500 to-pink-600",
  },
  {
    id: 4,
    title: "Daily Operating Cadence",
    subtitle: "The Daily Rhythm",
    type: "schedule",
    schedule: {
      morning: {
        title: "Morning Block (8am-12pm): OUTREACH",
        activities: [
          "8:00-9:00 → Sponsor DMs (batch 1)",
          "9:00-10:00 → Sponsor DMs (batch 2) + emails",
          "10:00-11:00 → Follow-ups from yesterday",
          "11:00-12:00 → Demo calls (2-3 sponsors)"
        ]
      },
      afternoon: {
        title: "Afternoon Block (1pm-5pm): HOSTS + OPS",
        activities: [
          "1:00-2:30 → Host DMs (50-70)",
          "2:30-3:30 → Host demo calls (2-3)",
          "3:30-4:30 → Manual matchmaking (connect sponsors to events)",
          "4:30-5:00 → CRM updates, plan tomorrow"
        ]
      },
      evening: {
        title: "Evening Block (7pm-9pm): ENGAGEMENT",
        activities: [
          "7:00-8:00 → Respond to all DMs",
          "8:00-9:00 → Engage local hashtags, build relationships"
        ]
      }
    },
    sprint: {
      title: "30-Day City Sprint:",
      weeks: [
        { week: 1, focus: "SPONSOR LOADING", ratio: "80% Sponsors / 20% Hosts", target: "40 sponsors signed" },
        { week: 2, focus: "BALANCED PUSH", ratio: "50% Sponsors / 50% Hosts", target: "70 sponsors, 35 hosts, 10 events" },
        { week: 3, focus: "HOST HEAVY", ratio: "30% Sponsors / 70% Hosts", target: "85 sponsors, 60 hosts, 30 events, 5 sponsorships" },
        { week: 4, focus: "ACTIVATION & HANDOFF", ratio: "20% New / 60% Activation", target: "All metrics hit" }
      ]
    },
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: 5,
    title: "Content Strategy",
    subtitle: "TikTok as the Growth Engine",
    content: [
      "Daily Output: 2 TikToks per day",
      "Content Split: 70% City-Specific / 30% Universal",
      "Best Posting Times: 7am, 12pm, 6pm"
    ],
    themes: {
      hosts: {
        title: "For Hosts:",
        content: [
          "How I got paid $500 to throw my party",
          "Event hosts are leaving money on the table",
          "Sponsors are BEGGING to fund local events"
        ]
      },
      sponsors: {
        title: "For Sponsors:",
        content: [
          "Stop wasting money on Facebook ads",
          "Your customers are at local events",
          "This is how smart brands do local marketing"
        ]
      }
    },
    viralMechanic: "When Raleigh sees Charlotte wins → 'When is this coming to Raleigh?' → 'Sign up now, we're already there'",
    roles: {
      title: "Team Role Alignment:",
      issiah: {
        title: "Issiah's Focus: Event Host Growth & Market Buzz",
        channels: ["TikTok (primary growth engine)", "Word-of-mouth activation", "HBCU & PWI campus outreach", "Local news & publicity"],
        metric: "75+ hosts per city, 3+ case studies, viral TikTok content"
      },
      soya: {
        title: "Soya's Focus: Sponsor Growth & Platform Visibility",
        channels: ["Facebook Ads", "Email campaigns (Instantly.io)", "Sponsor data & analytics (Google Analytics)", "Search & AI visibility"],
        metric: "100+ sponsors per city, 50+ active offers, consistent inbound inquiries"
      }
    },
    gradient: "from-rose-500 to-orange-600",
  }
];

const decks = [
  {
    id: "marketplace",
    name: "Marketplace Strategy",
    description: "Our competitive positioning, purple cow messaging, and strategic edge",
    slides: marketplaceSlides,
    slideCount: 11,
    icon: Presentation,
    gradient: "from-blue-500 to-purple-600"
  },
  {
    id: "revenue",
    name: "Revenue Projections",
    description: "2026 growth scenarios, valuation models, and exit strategies",
    slides: revenueProjectionsSlides,
    slideCount: 5,
    icon: BarChart3,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: "marketing",
    name: "Marketing Rollout",
    description: "Month-by-month execution plan, daily activities, and growth tactics",
    slides: marketingRolloutSlides,
    slideCount: 5,
    icon: Calendar,
    gradient: "from-orange-500 to-red-600"
  }
];

export default function HeadlinerPage() {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const currentDeck = decks.find(d => d.id === selectedDeck);
  const slides = currentDeck?.slides || [];
  const slide = slides[currentSlide];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const selectDeck = (deckId: string) => {
    setSelectedDeck(deckId);
    setCurrentSlide(0);
  };

  const backToSelection = () => {
    setSelectedDeck(null);
    setCurrentSlide(0);
  };

  // Deck Selection View
  if (!selectedDeck) {
    return (
      <div className="min-h-screen -m-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-7xl font-black text-white mb-4 tracking-tight">HEADLINER</h1>
            <p className="text-2xl text-gray-400 font-light">Select a Pitch Deck to View</p>
          </div>

          {/* Deck Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {decks.map((deck) => (
              <button
                key={deck.id}
                onClick={() => selectDeck(deck.id)}
                className={`group relative bg-gradient-to-br ${deck.gradient} rounded-3xl p-8 border-4 border-transparent hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <div className="text-center space-y-6">
                  {/* Icon */}
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <deck.icon className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{deck.name}</h2>
                    <p className="text-base text-white/80 font-light leading-relaxed min-h-[60px]">
                      {deck.description}
                    </p>
                  </div>

                  {/* Slide Count */}
                  <div className="pt-4">
                    <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                      <span className="text-lg font-semibold text-white">{deck.slideCount} slides</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Presentation View
  return (
    <div className="min-h-screen -m-8 bg-gray-900">
      {/* Presentation Container */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Slide Content - SCROLLABLE */}
        <div className={`w-full h-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center transition-all duration-500`}>
          <div className="max-w-6xl w-full h-full overflow-y-auto py-12 px-8 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
            {/* Scroll Indicator */}
            {slide.type !== "cover" && (
              <div className="flex justify-center mb-4 animate-bounce">
                <ChevronDown className="w-6 h-6 text-white/60" />
              </div>
            )}

            {slide.type === "cover" && (
              <div className="text-center text-white space-y-8 animate-fade-in min-h-[calc(100vh-6rem)] flex flex-col justify-center">
                <h1 className="text-8xl font-black tracking-tight drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-3xl font-light opacity-90">
                  {slide.subtitle}
                </p>
                <div className="pt-8">
                  <div className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full text-xl font-medium">
                    SynqBiz Strategic Positioning
                  </div>
                </div>
              </div>
            )}

            {slide.type === "comparison" && (
              <div className="text-white space-y-8 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-5xl font-bold mb-3">{slide.title}</h2>
                  <p className="text-xl opacity-90">{slide.subtitle}</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {/* Free Tier */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20">
                    <h3 className="text-2xl font-bold mb-2 text-center">{(slide as any).free?.title}</h3>
                    <p className="text-sm opacity-75 text-center mb-6">{(slide as any).free?.subtitle}</p>
                    <ul className="space-y-4">
                      {(slide as any).free?.features.map((item: any, idx: number) => (
                        <li key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="flex items-start gap-3 mb-2">
                            <span className="text-green-300 mt-1 flex-shrink-0">✓</span>
                            <span className="font-semibold text-base">{item.feature}</span>
                          </div>
                          <p className="text-sm opacity-75 ml-6">{item.why}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Pro Tier */}
                  <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border-2 border-yellow-300/50 shadow-2xl">
                    <h3 className="text-2xl font-bold mb-2 text-center text-yellow-200">{(slide as any).pro?.title}</h3>
                    <p className="text-sm opacity-75 text-center mb-6">{(slide as any).pro?.subtitle}</p>
                    <ul className="space-y-4">
                      {(slide as any).pro?.features.map((item: any, idx: number) => (
                        <li key={idx} className="bg-white/10 rounded-xl p-4 border border-yellow-300/30">
                          <div className="flex items-start gap-3 mb-2">
                            <span className="text-yellow-300 mt-1 flex-shrink-0">★</span>
                            <span className="font-bold text-base">{item.feature}</span>
                          </div>
                          <p className="text-sm opacity-90 ml-6 font-medium text-yellow-100">{item.why}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {slide.type === "final" && (
              <div className="text-center text-white space-y-10 animate-fade-in">
                <h2 className="text-6xl font-black">{slide.title}</h2>
                <p className="text-2xl font-light opacity-90">{slide.subtitle}</p>
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-10 max-w-4xl mx-auto border-2 border-white/30">
                  <p className="text-2xl font-medium leading-relaxed">
                    {(slide as any).message}
                  </p>
                </div>

                {/* Why Section for Final Slide */}
                {slide.why && (
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 mt-8 text-left max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold mb-6 text-yellow-300 text-center">{slide.why.title}</h3>
                    <ul className="space-y-4">
                      {slide.why.points.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span className="text-yellow-300 font-bold mt-1 flex-shrink-0">→</span>
                          <span className="text-lg font-light">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-8">
                  <div className="inline-block px-12 py-4 bg-white text-purple-600 rounded-full text-2xl font-bold shadow-2xl">
                    Let the Marketplace Be the Engine
                  </div>
                </div>
              </div>
            )}

            {slide.type === "scenarios" && (
              <div className="text-white space-y-8 animate-fade-in pb-8">
                <div className="text-center mb-8">
                  <h2 className="text-5xl font-bold mb-3">{slide.title}</h2>
                  <p className="text-xl opacity-90">{slide.subtitle}</p>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {(slide as any).scenarios?.map((scenario: any, idx: number) => (
                    <div key={idx} className={`bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 ${idx === 1 ? 'border-yellow-300/50 shadow-xl' : 'border-white/20'}`}>
                      <h3 className={`text-2xl font-bold mb-2 text-center ${idx === 1 ? 'text-yellow-300' : 'text-white'}`}>{scenario.name}</h3>
                      <p className="text-sm opacity-75 text-center mb-6 italic">{scenario.tagline}</p>
                      <div className="space-y-3">
                        {scenario.data.map((item: any, i: number) => (
                          <div key={i} className={`${item.highlight ? 'bg-white/20 border-2 border-yellow-300/50 font-bold' : 'bg-white/5 border border-white/10'} rounded-lg p-3`}>
                            <div className="flex justify-between items-center">
                              <span className="text-sm opacity-90">{item.label}</span>
                              <span className={`text-base font-semibold ${item.highlight ? 'text-yellow-300' : 'text-white'}`}>{item.value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {slide.why && (
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 mt-8">
                    <h3 className="text-xl font-bold mb-4 text-yellow-300">{slide.why.title}</h3>
                    <ul className="space-y-2">
                      {slide.why.points.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-yellow-300 mt-1 flex-shrink-0">→</span>
                          <span className="text-base">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {slide.type === "breakdown" && (
              <div className="text-white space-y-8 animate-fade-in pb-8">
                <div className="flex items-center gap-6 mb-6">
                  <div>
                    <h2 className="text-5xl font-bold">{slide.title}</h2>
                    <p className="text-xl opacity-90 mt-2">{slide.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {(slide as any).breakdown?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-lg font-bold">{item.stream}</span>
                        <span className="text-2xl font-bold text-yellow-300">{item.total}</span>
                      </div>
                      <p className="text-sm opacity-75 italic">{item.calculation}</p>
                    </div>
                  ))}
                  <div className="bg-yellow-400/20 backdrop-blur-md border-2 border-yellow-300/50 rounded-2xl p-6 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">TOTAL YEAR 1 REVENUE</span>
                      <span className="text-4xl font-black text-yellow-300">{(slide as any).total}</span>
                    </div>
                    <p className="text-base opacity-90 mt-2">Effective Take Rate: <span className="font-bold">{(slide as any).takeRate} of GMV</span></p>
                  </div>
                </div>
                {slide.why && (
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 mt-8">
                    <h3 className="text-xl font-bold mb-4 text-yellow-300">{slide.why.title}</h3>
                    <ul className="space-y-2">
                      {slide.why.points.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-yellow-300 mt-1 flex-shrink-0">→</span>
                          <span className="text-base">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {slide.type === "upside" && (
              <div className="text-white space-y-8 animate-fade-in pb-8">
                <div className="text-center mb-6">
                  <h2 className="text-5xl font-bold mb-3">{slide.title}</h2>
                  <p className="text-xl opacity-90">{slide.subtitle}</p>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {slide.content?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90 mb-2">{item.desc}</p>
                      <p className="text-xs opacity-75 italic text-yellow-300">{item.impact}</p>
                    </div>
                  ))}
                </div>
                {(slide as any).projections && (
                  <div className="space-y-6 mt-8">
                    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/30">
                      <h3 className="text-2xl font-bold mb-4 text-yellow-300">{(slide as any).projections.year2.title}</h3>
                      <ul className="space-y-2">
                        {(slide as any).projections.year2.items.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-lg">
                            <span className="text-yellow-300 mt-1">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/30">
                      <h3 className="text-2xl font-bold mb-4 text-yellow-300">{(slide as any).projections.year3.title}</h3>
                      <ul className="space-y-2">
                        {(slide as any).projections.year3.items.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-lg">
                            <span className="text-yellow-300 mt-1">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                {(slide as any).highlight && (
                  <div className="bg-yellow-400/20 backdrop-blur-md border-2 border-yellow-300/50 rounded-2xl p-6 mt-6">
                    <p className="text-xl font-semibold text-yellow-100 text-center">{(slide as any).highlight}</p>
                  </div>
                )}
              </div>
            )}

            {slide.type === "roadmap" && (
              <div className="text-white space-y-8 animate-fade-in pb-8">
                <div className="text-center mb-6">
                  <h2 className="text-5xl font-bold mb-3">{slide.title}</h2>
                  <p className="text-xl opacity-90">{slide.subtitle}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {(slide as any).roadmap?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                      <div className="flex items-start gap-4">
                        <div className="bg-yellow-400/20 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-yellow-300">{item.month}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-yellow-300">{item.city}, {item.state}</h3>
                          <p className="text-sm opacity-75 mt-1">{item.why}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {(slide as any).flywheel && (
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 mt-8">
                    <h3 className="text-xl font-bold mb-4 text-yellow-300">{(slide as any).flywheel.title}</h3>
                    <ul className="space-y-2">
                      {(slide as any).flywheel.points.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-yellow-300 mt-1 flex-shrink-0">→</span>
                          <span className="text-base">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {slide.type === "schedule" && (
              <div className="text-white space-y-8 animate-fade-in pb-8">
                <div className="flex items-center gap-6 mb-6">
                  <div>
                    <h2 className="text-5xl font-bold">{slide.title}</h2>
                    <p className="text-xl opacity-90 mt-2">{slide.subtitle}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {(slide as any).schedule && (
                    <>
                      {Object.entries((slide as any).schedule).map(([key, block]: any, idx: number) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <h3 className="text-xl font-bold mb-4 text-yellow-300">{block.title}</h3>
                          <ul className="space-y-2">
                            {block.activities.map((activity: string, i: number) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="text-yellow-300 mt-1 flex-shrink-0">→</span>
                                <span className="text-base font-light">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {(slide as any).sprint && (
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 mt-8">
                    <h3 className="text-2xl font-bold mb-6 text-yellow-300 text-center">{(slide as any).sprint.title}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {(slide as any).sprint.weeks.map((week: any, idx: number) => (
                        <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="text-lg font-bold text-yellow-300 mb-2">Week {week.week}: {week.focus}</div>
                          <div className="text-sm opacity-90 mb-2">Ratio: {week.ratio}</div>
                          <div className="text-sm opacity-75 italic">Target: {week.target}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!slide.type && (
              <div className="text-white space-y-8 animate-fade-in pb-8">
                <div className="flex items-center gap-6 mb-6">
                  {slide.icon && <slide.icon className="w-16 h-16 opacity-90 flex-shrink-0" />}
                  <div>
                    <h2 className="text-5xl font-bold">{slide.title}</h2>
                    <p className="text-xl opacity-90 mt-2">{slide.subtitle}</p>
                  </div>
                </div>

                {slide.content && Array.isArray(slide.content) && (
                  <div className="space-y-5 pl-4">
                    {typeof slide.content[0] === 'string' ? (
                      <ul className="space-y-4">
                        {(slide.content as string[]).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-xl">
                            <span className="text-yellow-300 font-bold mt-1 flex-shrink-0">→</span>
                            <span className="font-light">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="grid gap-5">
                        {(slide.content as any[]).map((item, idx) => (
                          <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                            {item.title && <h3 className="text-xl font-bold mb-2">{item.title}</h3>}
                            {item.desc && <p className="text-base opacity-90 mb-2">{item.desc}</p>}
                            {item.why && <p className="text-sm opacity-75 italic mt-2 border-l-2 border-yellow-300/50 pl-4">Why: {item.why}</p>}
                            {item.step && (
                              <div>
                                <div className="text-xl font-bold text-yellow-300 mb-2">{item.step}</div>
                                <div className="text-base opacity-90">{item.desc}</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Why Section */}
                {slide.why && (
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 mt-8">
                    <h3 className="text-2xl font-bold mb-6 text-yellow-300">{slide.why.title}</h3>
                    <ul className="space-y-4">
                      {slide.why.points.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span className="text-yellow-300 font-bold mt-1 flex-shrink-0">→</span>
                          <span className="text-lg font-light">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(slide as any).highlight && (
                  <div className="bg-yellow-400/20 backdrop-blur-md border-2 border-yellow-300/50 rounded-2xl p-6 mt-8">
                    <p className="text-xl font-semibold text-yellow-100">{(slide as any).highlight}</p>
                  </div>
                )}

                {(slide as any).purpleCow && (
                  <div className="mt-10 space-y-6">
                    <div className="bg-white text-purple-600 rounded-3xl p-10 shadow-2xl transform hover:scale-105 transition-transform">
                      <p className="text-4xl font-black text-center">{(slide as any).purpleCow}</p>
                    </div>
                    {(slide as any).explanation && (
                      <p className="text-lg text-center opacity-90">{(slide as any).explanation}</p>
                    )}
                    {(slide as any).callout && (
                      <div className="text-center">
                        <div className="inline-block bg-white/20 backdrop-blur-md px-8 py-4 rounded-full border-2 border-white/30">
                          <p className="text-xl font-bold">{(slide as any).callout}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {(slide as any).formula && (
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 mt-8">
                    <h3 className="text-2xl font-bold mb-6 text-yellow-300">{(slide as any).formula.title}</h3>
                    <ol className="space-y-3">
                      {(slide as any).formula.steps.map((step: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-4">
                          <span className="bg-yellow-400/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-yellow-300 font-bold">{idx + 1}</span>
                          <span className="text-lg font-light mt-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {(slide as any).themes && (
                  <div className="mt-8 space-y-6">
                    {(slide as any).themes.hosts && (
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <h3 className="text-xl font-bold mb-4 text-yellow-300">{(slide as any).themes.hosts.title}</h3>
                        <ul className="space-y-2">
                          {(slide as any).themes.hosts.content.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-yellow-300 mt-1 flex-shrink-0">→</span>
                              <span className="text-base font-light">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {(slide as any).themes.sponsors && (
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <h3 className="text-xl font-bold mb-4 text-yellow-300">{(slide as any).themes.sponsors.title}</h3>
                        <ul className="space-y-2">
                          {(slide as any).themes.sponsors.content.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-yellow-300 mt-1 flex-shrink-0">→</span>
                              <span className="text-base font-light">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {(slide as any).viralMechanic && (
                  <div className="bg-yellow-400/20 backdrop-blur-md border-2 border-yellow-300/50 rounded-2xl p-6 mt-8">
                    <p className="text-lg font-semibold text-yellow-100 text-center">{(slide as any).viralMechanic}</p>
                  </div>
                )}

                {(slide as any).roles && (
                  <div className="mt-8 space-y-6">
                    <h3 className="text-2xl font-bold text-yellow-300 text-center">{(slide as any).roles.title}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      {(slide as any).roles.issiah && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <h4 className="text-lg font-bold mb-4 text-yellow-300">{(slide as any).roles.issiah.title}</h4>
                          <ul className="space-y-2 mb-4">
                            {(slide as any).roles.issiah.channels.map((channel: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-yellow-300 mt-1 flex-shrink-0">→</span>
                                <span className="text-sm font-light">{channel}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-sm opacity-75 italic">Metric: {(slide as any).roles.issiah.metric}</p>
                        </div>
                      )}
                      {(slide as any).roles.soya && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <h4 className="text-lg font-bold mb-4 text-yellow-300">{(slide as any).roles.soya.title}</h4>
                          <ul className="space-y-2 mb-4">
                            {(slide as any).roles.soya.channels.map((channel: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="text-yellow-300 mt-1 flex-shrink-0">→</span>
                                <span className="text-sm font-light">{channel}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="text-sm opacity-75 italic">Metric: {(slide as any).roles.soya.metric}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md rounded-full flex items-center justify-center transition-all group z-10"
        >
          <ChevronLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md rounded-full flex items-center justify-center transition-all group z-10"
        >
          <ChevronRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Back Button */}
        <button
          onClick={backToSelection}
          className="absolute top-8 left-8 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white font-semibold transition-all z-10 flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Decks
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full z-10">
          <span className="text-white font-semibold">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CSS for animations and scrollbar */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        /* Custom scrollbar styling */
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          border: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
