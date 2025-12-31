"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, DollarSign, TrendingUp, Users, Zap, Target, Award, ChevronDown } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "HEADLINER 2026",
    subtitle: "Revenue Projections & Growth Strategy",
    type: "cover",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
  },
  {
    id: 2,
    title: "The Core Insight",
    subtitle: "The Math That Makes VCs Salivate",
    content: [
      "On any given Saturday night, thousands of events are happening simultaneously",
      "Every single one is a potential transaction on our platform",
      "We're not getting paid once — we earn from MULTIPLE revenue streams per event",
      "Each event = a mini revenue machine"
    ],
    why: {
      title: "Why This Changes Everything:",
      points: [
        "Traditional platforms charge one fee → we stack multiple revenue streams",
        "More events = exponential revenue growth, not linear",
        "Every event creates value for hosts AND sponsors → self-reinforcing cycle",
        "At scale, Saturday nights alone can generate $400K+ in revenue"
      ]
    },
    icon: Zap,
    gradient: "from-purple-600 to-fuchsia-600",
  },
  {
    id: 3,
    title: "Revenue Streams Per Event",
    subtitle: "How We Get Paid Multiple Times",
    type: "table",
    tableData: {
      headers: ["Revenue Stream", "How We Earn", "Avg Per Event"],
      rows: [
        ["Ticket Platform Fee", "5% of ticket sales (Free tier)", "$75"],
        ["Payment Processing", "~0.5% spread on processing", "$15"],
        ["Sponsor Commission", "12% of sponsor packages", "$60 - $300"],
        ["Promoter Commission", "20% of promoter payouts", "$20"],
        ["Pro Subscriptions", "$100/month amortized", "$25"],
        ["Instant Payout Fees", "1.5% capped at $15", "$10"]
      ],
      total: "$205 - $445 per event"
    },
    highlight: "Conservative Average: $250 per event across all revenue streams",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 4,
    title: "2026 Growth Scenarios",
    subtitle: "Three Paths to Success",
    content: [
      {
        title: "Scenario 1: Conservative Growth",
        desc: "We execute okay, grow steadily, nothing viral",
        result: "2026 Revenue: $5.4M | December ARR: $11.5M"
      },
      {
        title: "Scenario 2: Moderate Growth",
        desc: "We nail the HBCU market, expand to 20 cities, sponsors start recurring",
        result: "2026 Revenue: $13.8M | December ARR: $28.8M"
      },
      {
        title: "Scenario 3: Aggressive Growth",
        desc: "Venue lock-in works, viral TikTok growth, sponsors addicted to data",
        result: "2026 Revenue: $38.7M | December ARR: $84M"
      }
    ],
    why: {
      title: "The Reality Check:",
      points: [
        "Even 'aggressive' scenario = 0.03% market penetration of US events",
        "Conservative scenario requires just 3,500 events/month by December",
        "Moderate scenario = capturing 10% of HBCUs + 1% of venues",
        "All three scenarios are achievable with proper execution"
      ]
    },
    icon: TrendingUp,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 5,
    title: "Scenario 1: Conservative",
    subtitle: "$5.4M Annual Revenue",
    type: "table",
    tableData: {
      headers: ["Quarter", "Events/Month (End)", "Avg Revenue/Event", "Quarterly Revenue"],
      rows: [
        ["Q1 2026", "500", "$200", "$300K"],
        ["Q2 2026", "1,000", "$225", "$675K"],
        ["Q3 2026", "2,000", "$250", "$1.5M"],
        ["Q4 2026", "3,500", "$275", "$2.9M"]
      ],
      total: "2026 Total: $5.4M | December Run Rate: $11.5M ARR"
    },
    why: {
      title: "What 'Conservative' Means:",
      points: [
        "Manual host recruitment, no viral growth",
        "Limited sponsor participation (20-30% of events)",
        "Slow venue adoption",
        "Still generates VC-worthy metrics"
      ]
    },
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 6,
    title: "Scenario 2: Moderate",
    subtitle: "$13.8M Annual Revenue",
    type: "table",
    tableData: {
      headers: ["Quarter", "Events/Month (End)", "Avg Revenue/Event", "Quarterly Revenue"],
      rows: [
        ["Q1 2026", "1,000", "$225", "$675K"],
        ["Q2 2026", "2,500", "$250", "$1.9M"],
        ["Q3 2026", "5,000", "$275", "$4.1M"],
        ["Q4 2026", "8,000", "$300", "$7.2M"]
      ],
      total: "2026 Total: $13.8M | December Run Rate: $28.8M ARR"
    },
    why: {
      title: "What Drives Moderate Growth:",
      points: [
        "HBCU market penetration (50+ schools)",
        "20-25 cities with active host networks",
        "Recurring sponsor relationships (40-50%)",
        "Some venue partnerships (10-15 venues)"
      ]
    },
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 7,
    title: "Scenario 3: Aggressive",
    subtitle: "$38.7M Annual Revenue",
    type: "table",
    tableData: {
      headers: ["Quarter", "Events/Month (End)", "Avg Revenue/Event", "Quarterly Revenue"],
      rows: [
        ["Q1 2026", "2,000", "$250", "$1.5M"],
        ["Q2 2026", "5,000", "$300", "$4.5M"],
        ["Q3 2026", "12,000", "$325", "$11.7M"],
        ["Q4 2026", "20,000", "$350", "$21M"]
      ],
      total: "2026 Total: $38.7M | December Run Rate: $84M ARR"
    },
    why: {
      title: "What Aggressive Requires:",
      points: [
        "Viral TikTok/social growth (100K+ views per video)",
        "Venue lock-in (50+ exclusive venue partners)",
        "Sponsor marketplace becomes primary sponsor discovery tool",
        "Brand partnership deals ($50K-100K packages)"
      ]
    },
    gradient: "from-pink-500 to-red-600",
  },
  {
    id: 8,
    title: "20,000 Events/Month Reality Check",
    subtitle: "Is 'Aggressive' Actually Achievable?",
    content: [
      "20,000 events/month = ~667 events per day",
      "5,300+ colleges in US → 10% running 1 event/week = 2,120/month",
      "60,000+ bars/clubs in US → 1% using us for 2 events/month = 1,200/month",
      "300+ cities over 100K population → 20 events each = 6,000/month"
    ],
    highlight: "20,000 events/month = 0.03% market penetration. It's not aggressive — it's conservative for a platform that works.",
    why: {
      title: "The Math:",
      points: [
        "We only need 0.03% of US events to hit 'aggressive' scenario",
        "If product works, growth becomes organic through word-of-mouth",
        "Venue partnerships create lock-in effect (guaranteed volume)",
        "Every successful event creates 3-5 referrals on average"
      ]
    },
    icon: Target,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 9,
    title: "A Saturday in December 2026",
    subtitle: "Daily Revenue Snapshot (Aggressive Scenario)",
    type: "dashboard",
    dashboardData: {
      liveEvents: "1,847",
      ticketsSold: "142,580 × $35 avg = $4,990,300 GMV",
      platformFees: "$249,515",
      processingMargin: "$24,951",
      sponsorships: "1,284 sponsors × $642K spend",
      sponsorCommission: "$77,040",
      promoterSales: "38,450 tickets",
      promoterCut: "$19,225",
      instantPayouts: "847 hosts × $2.1M",
      payoutFees: "$12,705",
      dailyRevenue: "$383,436",
      mtdRevenue: "$4.2M (12 days)",
      projectedMonth: "$10.5M"
    },
    highlight: "That's $383K in revenue from a single Saturday",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    id: 10,
    title: "Sponsor Revenue Multiplier",
    subtitle: "Why Sponsorship Scales Independently",
    type: "table",
    tableData: {
      headers: ["Event Size", "Ticket Revenue (5%)", "Sponsor Revenue (12%)"],
      rows: [
        ["100 attendees × $20", "$100", "$60 (Bronze $500)"],
        ["300 attendees × $30", "$450", "$120 (Silver $1,000)"],
        ["500 attendees × $35", "$875", "$300 (Gold $2,500)"],
        ["1,000 attendees × $40", "$2,000", "$600 (Platinum $5,000)"]
      ]
    },
    why: {
      title: "Why Sponsors Pay More on HEADLINER:",
      points: [
        "Traditional: 'Here's $500, hope it works' → No data, no accountability",
        "HEADLINER: 'Here's $500, here's exactly how many customers you got' → Proven ROI",
        "When sponsors can prove ROI to their bosses, budgets increase",
        "At scale, sponsor revenue equals or exceeds ticket revenue"
      ]
    },
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    id: 11,
    title: "The Compounding Effects",
    subtitle: "Network Effects Kick In",
    content: [
      {
        title: "Year 1 (2025)",
        desc: "You manually recruit hosts and sponsors. Hard work. Slow grind."
      },
      {
        title: "Year 2 (2026)",
        desc: "Hosts tell other hosts: 'I made $2K from sponsors on HEADLINER'"
      },
      {
        title: "Sponsors tell sponsors",
        desc: "'I got 40 customers at $25 CAC through HEADLINER'"
      },
      {
        title: "Venues require HEADLINER",
        desc: "'Want to host here? Use HEADLINER for ticketing and sponsors'"
      },
      {
        title: "Attendees expect HEADLINER",
        desc: "'I want those sponsor discounts and perks'"
      }
    ],
    highlight: "Once the flywheel spins, growth becomes organic and costs decrease",
    icon: Users,
    gradient: "from-indigo-600 to-purple-600",
  },
  {
    id: 12,
    title: "Comparison to Funded Competitors",
    subtitle: "Where We Stand",
    type: "table",
    tableData: {
      headers: ["Company", "Last Valuation", "Annual Revenue (Est.)", "Multiple"],
      rows: [
        ["Eventbrite", "$1.5B (2023)", "$300M", "5x"],
        ["Posh", "$100M+ (2022)", "$20-30M", "4-5x"],
        ["Partiful", "$100M+ (2023)", "$5-10M", "10-20x"],
        ["HEADLINER (2026)", "?", "$14-39M", "?"]
      ]
    },
    why: {
      title: "What Multiple Could HEADLINER Command?",
      points: [
        "Pure ticketing gets 3-5x revenue",
        "Marketplace gets 5-10x revenue",
        "Performance marketing/AdTech gets 10-20x revenue",
        "We're all three → ticketing + marketplace + performance marketing"
      ]
    },
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: 13,
    title: "Valuation Scenarios",
    subtitle: "What We Could Be Worth",
    content: [
      {
        title: "At $30M ARR (Moderate-to-Aggressive)",
        desc: "5x multiple = $150M | 10x multiple = $300M | 15x multiple = $450M"
      }
    ],
    highlight: "A $300M valuation at $30M ARR is realistic for a category-creating company with proven sponsor ROI",
    why: {
      title: "Why These Multiples Are Justified:",
      points: [
        "We're not competing with Eventbrite on features — we're creating a new category",
        "Sponsor marketplace has never existed at scale in events",
        "Performance marketing for live events = entirely new ad channel",
        "Data moat: We know what sponsors work for which events → defensible"
      ]
    },
    icon: Award,
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: 14,
    title: "What Acquirers Would Pay For",
    subtitle: "Four Potential Buyers",
    content: [
      {
        title: "Eventbrite: $200-400M",
        desc: "4M event creators with ZERO sponsor monetization. Bolt HEADLINER on = instant new revenue stream."
      },
      {
        title: "Live Nation: $300-500M",
        desc: "They control venues but have no self-serve sponsor platform. We give them grassroots data."
      },
      {
        title: "Marketing Holding Co (WPP/Publicis): $150-300M",
        desc: "They need new channels for clients. 'Performance marketing for live events' is a new pitch."
      },
      {
        title: "Stripe or Block: $200-400M",
        desc: "They want to own more of the event payment stack. HEADLINER = payments + marketplace + data."
      }
    ],
    gradient: "from-green-600 to-teal-600",
  },
  {
    id: 15,
    title: "2026 Milestones That Trigger Interest",
    subtitle: "The Checkpoints That Matter",
    type: "table",
    tableData: {
      headers: ["Milestone", "Why It Matters", "Target"],
      rows: [
        ["5,000 events/month", "Proves product-market fit", "Q2 2026"],
        ["$1M monthly revenue", "Proves business model", "Q3 2026"],
        ["50 venue partnerships", "Proves moat/lock-in", "Q3 2026"],
        ["500 recurring sponsors", "Proves sponsor retention", "Q4 2026"],
        ["$3M monthly revenue", "Triggers acquisition interest", "Q4 2026"]
      ]
    },
    highlight: "Once you hit $3M/month with 50+ venue partnerships, you'll have inbound acquisition interest",
    gradient: "from-red-500 to-pink-600",
  },
  {
    id: 16,
    title: "The Bottom Line",
    subtitle: "Your Equity at 40%",
    content: [
      {
        title: "Conservative (Scenario 1)",
        desc: "2026 Revenue: $5.4M | Exit Valuation: $25-50M",
        result: "Your equity: $10-20M"
      },
      {
        title: "Moderate (Scenario 2)",
        desc: "2026 Revenue: $13.8M | Exit Valuation: $70-140M",
        result: "Your equity: $28-56M"
      },
      {
        title: "Aggressive (Scenario 3)",
        desc: "2026 Revenue: $38.7M | Exit Valuation: $200-400M",
        result: "Your equity: $80-160M"
      }
    ],
    highlight: "Even the conservative scenario puts you at $10-20M in equity value",
    icon: DollarSign,
    gradient: "from-yellow-600 to-amber-600",
  },
  {
    id: 17,
    title: "Month-by-Month Execution",
    subtitle: "The Marketing & Growth Plan",
    content: [
      "The numbers above are achievable with disciplined execution",
      "What follows is the exact monthly breakdown:",
      "→ Events needed per month",
      "→ Marketing volume required",
      "→ Daily outreach targets",
      "→ Budget allocation"
    ],
    why: {
      title: "The Formula:",
      points: [
        "Every 100 cold outreach messages = 1-2 active hosts",
        "Each host averages 3-4 events per year",
        "Each event generates $250-350 in revenue",
        "Viral content: 10K views = 5-15 new hosts"
      ]
    },
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    id: 18,
    title: "Q1 2026: Foundation",
    subtitle: "January - March",
    type: "quarterly",
    months: [
      {
        month: "January 2026",
        events: "150",
        revenue: "$30,000",
        marketing: [
          "2,000 host DMs",
          "1,000 host emails",
          "20 TikTok videos",
          "500 sponsor emails",
          "2 HBCU campus visits"
        ],
        daily: "100 outreach/day + 1 video every 1-2 days"
      },
      {
        month: "February 2026",
        events: "300",
        revenue: "$63,000",
        marketing: [
          "3,000 host DMs",
          "1,500 host emails",
          "25 TikTok videos",
          "15 Instagram Reels",
          "1,000 sponsor emails",
          "10 campus ambassadors"
        ],
        daily: "150 outreach/day + 1 content piece/day"
      },
      {
        month: "March 2026",
        events: "500",
        revenue: "$110,000",
        marketing: [
          "4,000 host DMs",
          "2,000 host emails",
          "30 TikTok videos",
          "20 Instagram Reels",
          "1,500 sponsor emails",
          "25 campus ambassadors",
          "$2K paid ads"
        ],
        daily: "200 outreach/day + 1-2 content pieces/day"
      }
    ],
    highlight: "Q1 Goal: Prove the system works. Hit $100K month by March.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 19,
    title: "Q2 2026: Scale What Works",
    subtitle: "April - June",
    type: "quarterly",
    months: [
      {
        month: "April 2026",
        events: "850",
        revenue: "$200,000",
        marketing: [
          "5,000 host DMs",
          "2,500 host emails",
          "30 TikTok videos",
          "2,000 sponsor emails",
          "50 campus ambassadors",
          "8 venue partnerships",
          "$4K paid ads"
        ],
        daily: "250 outreach/day + 2 content pieces/day"
      },
      {
        month: "May 2026",
        events: "1,200",
        revenue: "$300,000",
        marketing: [
          "5,000 host DMs",
          "3,000 host emails",
          "30 TikTok + Reels",
          "2,500 sponsor emails",
          "75 campus ambassadors",
          "15 venue partnerships",
          "$7.5K paid ads"
        ],
        daily: "265 outreach/day + 2-3 content pieces/day"
      },
      {
        month: "June 2026",
        events: "1,800",
        revenue: "$477,000",
        marketing: [
          "6,000 host DMs",
          "3,500 host emails",
          "100 content pieces",
          "3,000 sponsor emails",
          "100 campus ambassadors",
          "25 venue partnerships",
          "$12K paid ads",
          "5 influencer deals"
        ],
        daily: "315 outreach/day + 3-4 content pieces/day"
      }
    ],
    highlight: "Q2 Goal: Cross $250K month. Sponsors start recurring.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 20,
    title: "Q3 2026: Summer + Back-to-School",
    subtitle: "July - September",
    type: "quarterly",
    months: [
      {
        month: "July 2026",
        events: "2,500",
        revenue: "$700,000",
        marketing: [
          "12,000 host outreach",
          "120 content pieces",
          "3,500 sponsor emails",
          "125 campus ambassadors",
          "35 venue partnerships",
          "$18K paid ads"
        ],
        daily: "400 outreach/day + 4 content pieces/day"
      },
      {
        month: "August 2026 🎉",
        events: "3,500",
        revenue: "$1,015,000",
        marketing: [
          "15,000 host outreach",
          "150 content pieces",
          "4,000 sponsor emails",
          "200 campus ambassadors",
          "50 venue partnerships",
          "$25K paid ads",
          "HBCU Homecoming prep"
        ],
        daily: "500 outreach/day + 5 content pieces/day",
        milestone: "FIRST $1M MONTH"
      },
      {
        month: "September 2026",
        events: "5,000",
        revenue: "$1,500,000",
        marketing: [
          "15,000 host outreach",
          "150 content pieces",
          "4,500 sponsor emails",
          "250 campus ambassadors",
          "60 venue partnerships",
          "$30K paid ads",
          "3 brand partnerships"
        ],
        daily: "500 outreach/day + 5 content pieces/day"
      }
    ],
    highlight: "Q3 Goal: First $1M month. HBCU homecoming season.",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: 21,
    title: "Q4 2026: Peak Season",
    subtitle: "October - December",
    type: "quarterly",
    months: [
      {
        month: "October 2026",
        events: "7,000",
        revenue: "$2,205,000",
        marketing: [
          "12,000 host outreach (less needed, organic growth)",
          "120 content pieces",
          "4,000 sponsor emails",
          "300 campus ambassadors",
          "75 venue partnerships",
          "$35K paid ads",
          "$150K brand deals"
        ],
        milestone: "Peak homecoming"
      },
      {
        month: "November 2026",
        events: "6,000",
        revenue: "$1,920,000",
        marketing: [
          "10,000 host outreach",
          "100 content pieces",
          "3,500 sponsor emails",
          "Holiday event push",
          "$30K paid ads"
        ]
      },
      {
        month: "December 2026",
        events: "8,000",
        revenue: "$2,800,000",
        marketing: [
          "8,000 host outreach",
          "100 content pieces",
          "3,000 sponsor emails",
          "NYE premium packages",
          "$35K paid ads"
        ],
        milestone: "Strong finish, NYE premium pricing"
      }
    ],
    highlight: "Q4 Goal: Maintain post-homecoming momentum. Finish strong with NYE.",
    gradient: "from-red-600 to-orange-600",
  },
  {
    id: 22,
    title: "2026 Annual Summary",
    subtitle: "Moderate Growth Scenario",
    type: "table",
    tableData: {
      headers: ["Month", "Events", "Revenue", "Cumulative"],
      rows: [
        ["Jan", "150", "$30K", "$30K"],
        ["Feb", "300", "$63K", "$93K"],
        ["Mar", "500", "$110K", "$203K"],
        ["Apr", "850", "$200K", "$403K"],
        ["May", "1,200", "$300K", "$703K"],
        ["Jun", "1,800", "$477K", "$1.18M"],
        ["Jul", "2,500", "$700K", "$1.88M"],
        ["Aug", "3,500", "$1.01M", "$2.90M"],
        ["Sep", "5,000", "$1.50M", "$4.40M"],
        ["Oct", "7,000", "$2.21M", "$6.60M"],
        ["Nov", "6,000", "$1.92M", "$8.52M"],
        ["Dec", "8,000", "$2.80M", "$11.32M"]
      ],
      total: "2026 Total: $11.32M | December ARR: $33.6M"
    },
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    id: 23,
    title: "Total Marketing Activity 2026",
    subtitle: "What It Actually Takes",
    type: "table",
    tableData: {
      headers: ["Activity", "Annual Total"],
      rows: [
        ["Host Cold DMs", "~85,000"],
        ["Host Cold Emails", "~40,000"],
        ["TikTok Videos", "~350"],
        ["Instagram Reels", "~250"],
        ["YouTube Shorts", "~150"],
        ["Sponsor Outreach", "~35,000"],
        ["Campus Ambassadors", "300 active"],
        ["Venue Partnerships", "75 signed"],
        ["Paid Ads Spend", "~$230,000"],
        ["Influencer Deals", "~20"],
        ["PR/Media Features", "~15"]
      ]
    },
    highlight: "Marketing spend: $280K total | ROI: 40x ($11.3M revenue / $280K spend)",
    gradient: "from-blue-600 to-purple-600",
  },
  {
    id: 24,
    title: "Marketing Budget Breakdown",
    subtitle: "Where the Money Goes",
    type: "table",
    tableData: {
      headers: ["Quarter", "Paid Ads", "Tools/Software", "Contractors/VAs", "Total"],
      rows: [
        ["Q1", "$3,000", "$500", "$1,500", "$5,000"],
        ["Q2", "$23,500", "$1,500", "$9,000", "$34,000"],
        ["Q3", "$73,000", "$3,000", "$24,000", "$100,000"],
        ["Q4", "$100,000", "$5,000", "$36,000", "$141,000"]
      ],
      total: "2026 Total: $280,000"
    },
    why: {
      title: "Why This Is Incredibly Efficient:",
      points: [
        "Marketing spend = 2.5% of revenue (industry standard is 15-30%)",
        "Most growth comes from organic referrals and word-of-mouth",
        "By Q4, 40-50% of new hosts come from existing host referrals",
        "Paid ads mostly for testing and scaling what already works"
      ]
    },
    gradient: "from-green-600 to-lime-600",
  },
  {
    id: 25,
    title: "Daily Activity Requirements",
    subtitle: "What You Need to Do Each Day",
    content: [
      {
        title: "Jan-Mar (Just You): 6 hours/day",
        desc: "100 host DMs (2h) + 50 emails (1h) + 30 sponsor outreach (1h) + 1 video (1h) + respond to inbounds (1h)"
      },
      {
        title: "Apr-Jun (You + 1 VA): Split workload",
        desc: "VA handles outreach (5h) | You do content, sales, strategy (5h)"
      },
      {
        title: "Jul-Dec (You + 2-3 Team): Delegate",
        desc: "Team handles outreach & content | You focus on sales, partnerships, strategy"
      }
    ],
    why: {
      title: "The Math:",
      points: [
        "For every 100 people you reach out to → 1-2 active hosts",
        "Each host averages 3-4 events per year",
        "Each event generates $250-350 revenue",
        "Start solo, hire help at $100K/month revenue milestone"
      ]
    },
    icon: Target,
    gradient: "from-orange-600 to-red-600",
  },
  {
    id: 26,
    title: "Systems You Need",
    subtitle: "Tools & Infrastructure",
    content: [
      {
        title: "Outreach Tools ($225/month)",
        desc: "Instantly.ai ($97) + PhantomBuster ($59) + Apollo.io ($49) + Notion ($20)"
      },
      {
        title: "Content Tools ($55/month)",
        desc: "Canva Pro ($13) + Later ($18) + Descript ($24)"
      },
      {
        title: "Analytics ($125-425/month)",
        desc: "Mixpanel ($25) + Triple Whale/Hyros ($100-300)"
      }
    ],
    highlight: "Total Tools Budget: $400-600/month",
    why: {
      title: "Why These Tools:",
      points: [
        "Outreach automation = 10x your daily volume",
        "Content tools = professional quality without hiring editors",
        "Analytics = know what's working, double down on winners",
        "Total cost < 1% of revenue"
      ]
    },
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    id: 27,
    title: "Key Milestones Timeline",
    subtitle: "The Checkpoints That Matter",
    type: "table",
    tableData: {
      headers: ["Milestone", "Target Date", "Why It Matters"],
      rows: [
        ["100 events/month", "End of Jan", "Proves system works"],
        ["$100K month", "March", "Proves business model"],
        ["1,000 events/month", "May", "Product-market fit"],
        ["First $1M month", "August", "VC-ready metrics"],
        ["50 venue partnerships", "September", "Moat established"],
        ["500 recurring sponsors", "October", "Retention proven"],
        ["$10M cumulative", "November", "Acquisition conversations"]
      ]
    },
    gradient: "from-violet-600 to-purple-600",
  },
  {
    id: 28,
    title: "The Closing Pitch",
    subtitle: "This Is a System, Not a Guess",
    type: "final",
    message: "On any given Saturday, there are 2,000 events happening on our platform. Each one generates $300+ in revenue across tickets, sponsors, and promoters. That's $600K every Saturday, $2.4M every month, $30M a year — and our cost to service each event is $6. That's 98% gross margin on a marketplace that hasn't existed before.",
    purpleCow: "That's why VCs will fund us and that's why someone will buy us.",
    why: {
      title: "The Math Is Undeniable:",
      points: [
        "January: 6 hours/day → 150 events → $30K revenue",
        "December: Team running → 8,000 events → $2.8M revenue",
        "Marketing ROI: 40x ($11.3M / $280K)",
        "Gross margin: 98% (near-zero marginal cost)",
        "Exit multiple: 10-15x on $30M ARR = $300-450M valuation"
      ]
    },
    gradient: "from-purple-600 via-fuchsia-600 to-pink-600",
  }
];

export default function HeadlinerPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
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
                    <h3 className="text-2xl font-bold mb-2 text-center">{slide.free?.title}</h3>
                    <p className="text-sm opacity-75 text-center mb-6">{slide.free?.subtitle}</p>
                    <ul className="space-y-4">
                      {slide.free?.features.map((item: any, idx: number) => (
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
                    <h3 className="text-2xl font-bold mb-2 text-center text-yellow-200">{slide.pro?.title}</h3>
                    <p className="text-sm opacity-75 text-center mb-6">{slide.pro?.subtitle}</p>
                    <ul className="space-y-4">
                      {slide.pro?.features.map((item: any, idx: number) => (
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
                    {slide.message}
                  </p>
                </div>

                {slide.purpleCow && (
                  <div className="mt-8">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-3xl p-10 shadow-2xl transform hover:scale-105 transition-transform max-w-4xl mx-auto">
                      <p className="text-3xl font-black text-center">{slide.purpleCow}</p>
                    </div>
                  </div>
                )}

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
                    This Isn't a Pitch. This Is Math.
                  </div>
                </div>
              </div>
            )}

            {slide.type === "table" && (
              <div className="text-white space-y-8 animate-fade-in pb-8">
                <div className="text-center mb-6">
                  <h2 className="text-5xl font-bold">{slide.title}</h2>
                  <p className="text-xl opacity-90 mt-2">{slide.subtitle}</p>
                </div>

                {slide.tableData && (
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-white/30">
                            {slide.tableData.headers.map((header: string, idx: number) => (
                              <th key={idx} className="px-4 py-3 text-left text-sm font-bold text-yellow-300 uppercase tracking-wider">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {slide.tableData.rows.map((row: string[], idx: number) => (
                            <tr key={idx} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                              {row.map((cell: string, cellIdx: number) => (
                                <td key={cellIdx} className="px-4 py-4 text-base font-light">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {slide.tableData.total && (
                      <div className="mt-6 pt-6 border-t-2 border-yellow-300/30">
                        <p className="text-xl font-bold text-yellow-300 text-center">{slide.tableData.total}</p>
                      </div>
                    )}
                  </div>
                )}

                {slide.highlight && (
                  <div className="bg-yellow-400/20 backdrop-blur-md border-2 border-yellow-300/50 rounded-2xl p-6">
                    <p className="text-xl font-semibold text-yellow-100">{slide.highlight}</p>
                  </div>
                )}

                {slide.why && (
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20">
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
              </div>
            )}

            {slide.type === "dashboard" && (
              <div className="text-white space-y-8 animate-fade-in pb-8">
                <div className="text-center mb-6">
                  <h2 className="text-5xl font-bold">{slide.title}</h2>
                  <p className="text-xl opacity-90 mt-2">{slide.subtitle}</p>
                </div>

                {slide.dashboardData && (
                  <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-3xl p-8 border-2 border-white/30 font-mono">
                    <div className="space-y-6">
                      <div className="text-center border-b border-white/20 pb-4">
                        <h3 className="text-2xl font-bold">HEADLINER DAILY DASHBOARD</h3>
                        <p className="text-sm opacity-75">Saturday, December 12, 2026</p>
                      </div>

                      <div className="grid gap-4">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="text-sm opacity-75 mb-1">LIVE EVENTS TODAY</div>
                          <div className="text-3xl font-bold text-green-400">{slide.dashboardData.liveEvents}</div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="text-sm opacity-75 mb-2">TICKETS SOLD TODAY</div>
                          <div className="text-base mb-2">{slide.dashboardData.ticketsSold}</div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Platform fees: <span className="text-green-400 font-bold">{slide.dashboardData.platformFees}</span></div>
                            <div>Processing: <span className="text-green-400 font-bold">{slide.dashboardData.processingMargin}</span></div>
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="text-sm opacity-75 mb-2">SPONSORSHIPS ACTIVE</div>
                          <div className="text-base mb-2">{slide.dashboardData.sponsorships}</div>
                          <div className="text-sm">Our commission (12%): <span className="text-green-400 font-bold">{slide.dashboardData.sponsorCommission}</span></div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="text-sm opacity-75 mb-2">PROMOTER SALES</div>
                          <div className="text-base mb-2">{slide.dashboardData.promoterSales}</div>
                          <div className="text-sm">Our cut (20%): <span className="text-green-400 font-bold">{slide.dashboardData.promoterCut}</span></div>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="text-sm opacity-75 mb-2">INSTANT PAYOUTS</div>
                          <div className="text-base mb-2">{slide.dashboardData.instantPayouts}</div>
                          <div className="text-sm">Fees collected: <span className="text-green-400 font-bold">{slide.dashboardData.payoutFees}</span></div>
                        </div>

                        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-6 border-2 border-green-400/50 mt-4">
                          <div className="text-sm opacity-90 mb-2">TODAY'S TOTAL REVENUE</div>
                          <div className="text-4xl font-bold text-green-400 mb-4">{slide.dashboardData.dailyRevenue}</div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>MTD: <span className="font-bold">{slide.dashboardData.mtdRevenue}</span></div>
                            <div>Projected: <span className="font-bold">{slide.dashboardData.projectedMonth}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {slide.highlight && (
                  <div className="bg-yellow-400/20 backdrop-blur-md border-2 border-yellow-300/50 rounded-2xl p-6">
                    <p className="text-xl font-semibold text-yellow-100 text-center">{slide.highlight}</p>
                  </div>
                )}
              </div>
            )}

            {slide.type === "quarterly" && (
              <div className="text-white space-y-8 animate-fade-in pb-8">
                <div className="text-center mb-6">
                  <h2 className="text-5xl font-bold">{slide.title}</h2>
                  <p className="text-xl opacity-90 mt-2">{slide.subtitle}</p>
                </div>

                {slide.months && (
                  <div className="space-y-6">
                    {slide.months.map((monthData: any, idx: number) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-yellow-300">{monthData.month}</h3>
                          <div className="text-right">
                            <div className="text-sm opacity-75">Revenue</div>
                            <div className="text-2xl font-bold text-green-400">{monthData.revenue}</div>
                          </div>
                        </div>

                        {monthData.milestone && (
                          <div className="bg-yellow-400/20 border border-yellow-300/50 rounded-xl p-3 mb-4">
                            <p className="text-base font-bold text-yellow-200">🎯 {monthData.milestone}</p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-white/5 rounded-xl p-3">
                            <div className="text-xs opacity-75 mb-1">Events</div>
                            <div className="text-xl font-bold">{monthData.events}</div>
                          </div>
                          {monthData.daily && (
                            <div className="bg-white/5 rounded-xl p-3">
                              <div className="text-xs opacity-75 mb-1">Daily Activity</div>
                              <div className="text-sm font-semibold">{monthData.daily}</div>
                            </div>
                          )}
                        </div>

                        <div className="bg-white/5 rounded-xl p-4">
                          <div className="text-sm font-bold mb-2 text-cyan-300">Marketing Activities:</div>
                          <ul className="space-y-1">
                            {monthData.marketing.map((item: string, i: number) => (
                              <li key={i} className="text-sm opacity-90 flex items-start gap-2">
                                <span className="text-cyan-300 mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {slide.highlight && (
                  <div className="bg-yellow-400/20 backdrop-blur-md border-2 border-yellow-300/50 rounded-2xl p-6">
                    <p className="text-xl font-semibold text-yellow-100 text-center">{slide.highlight}</p>
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
                            {item.result && <p className="text-base font-bold text-green-400 mt-2">{item.result}</p>}
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

                {slide.highlight && (
                  <div className="bg-yellow-400/20 backdrop-blur-md border-2 border-yellow-300/50 rounded-2xl p-6 mt-8">
                    <p className="text-xl font-semibold text-yellow-100">{slide.highlight}</p>
                  </div>
                )}

                {slide.purpleCow && (
                  <div className="mt-10 space-y-6">
                    <div className="bg-white text-purple-600 rounded-3xl p-10 shadow-2xl transform hover:scale-105 transition-transform">
                      <p className="text-4xl font-black text-center">{slide.purpleCow}</p>
                    </div>
                    {slide.explanation && (
                      <p className="text-lg text-center opacity-90">{slide.explanation}</p>
                    )}
                    {slide.callout && (
                      <div className="text-center">
                        <div className="inline-block bg-white/20 backdrop-blur-md px-8 py-4 rounded-full border-2 border-white/30">
                          <p className="text-xl font-bold">{slide.callout}</p>
                        </div>
                      </div>
                    )}
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
