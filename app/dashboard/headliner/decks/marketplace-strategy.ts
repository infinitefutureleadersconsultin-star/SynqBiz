import { DollarSign, TrendingUp, Users, Zap, Target, Award } from "lucide-react";

export const marketplaceStrategySlides = [
  {
    id: 1,
    title: "HEADLINER",
    subtitle: "Our Marketplace Strategy & Competitive Positioning",
    type: "cover",
    gradient: "from-blue-600 via-purple-600 to-pink-600",
    tagline: "SynqBiz Strategic Positioning"
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
    cta: "Let the Marketplace Be the Engine"
  }
];
