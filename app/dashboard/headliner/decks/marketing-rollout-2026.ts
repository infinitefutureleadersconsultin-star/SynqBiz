import { Target, Users, TrendingUp, Zap, Award, DollarSign, Instagram, Linkedin, Video, Mail, Globe } from "lucide-react";

export const marketingRolloutSlides = [
  {
    id: 1,
    title: "HEADLINER",
    subtitle: "Marketing Rollout 2026",
    type: "cover",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    tagline: "Brand Strategy & Go-To-Market Execution"
  },
  {
    id: 2,
    title: "Our Logo Analysis",
    subtitle: "Understanding the HEADLINER Brand Identity",
    type: "logo-analysis",
    gradient: "from-purple-500 to-indigo-600",
    analysis: [
      {
        aspect: "Typography",
        insight: "Bold, all-caps lettering with modern spacing creates authority and confidence. The unconventional letter styling makes it memorable and distinctive in a crowded market."
      },
      {
        aspect: "Rainbow Gradient Underline",
        insight: "The vibrant multi-color gradient (pink → blue → green → yellow) represents diversity, inclusivity, and energy. It signals that HEADLINER is for ALL events — from nightlife to corporate, street parties to festivals."
      },
      {
        aspect: "Color Psychology",
        insight: "Pink = creativity & youth culture. Blue = trust & professionalism. Green = growth & money. Yellow = optimism & energy. Together, they communicate: 'We're fun, trustworthy, and will make you money.'"
      },
      {
        aspect: "Positioning",
        insight: "The name 'HEADLINER' positions event hosts as stars, not vendors. You're not 'listing an event' — you're THE HEADLINER. This elevates host identity and creates aspirational brand equity."
      },
      {
        aspect: "Market Differentiation",
        insight: "Eventbrite = corporate blue. Posh = minimalist black. Partiful = playful pastels. HEADLINER = bold rainbow energy. We stand out visually and psychologically."
      },
      {
        aspect: "Mobile-First Design",
        insight: "Clean, high-contrast logo reads perfectly on phone screens. The gradient catches scrolling attention. This is built for TikTok, Instagram Stories, and app icons."
      }
    ],
    recommendation: "Lean INTO the rainbow gradient. Make it our signature. Every touchpoint — app, website, ads, merchandise — should feature this gradient. It's our Nike swoosh. Own it."
  },
  {
    id: 3,
    title: "Our Target Customers",
    subtitle: "Who We're Building For",
    icon: Target,
    gradient: "from-blue-500 to-cyan-600",
    content: [
      {
        title: "Event Hosts (Primary)",
        desc: "College students, nightlife promoters, community organizers, pop-up creators, tour organizers",
        why: "They need money to throw events. We bring sponsors to them. They keep more, make more."
      },
      {
        title: "Sponsors (Secondary)",
        desc: "Local brands, regional beverage companies, streetwear brands, tech startups, food & beverage brands",
        why: "They want to reach real people at real events but can't find them. We curate events and prove ROI."
      }
    ],
    why: {
      title: "Why This Two-Sided Marketplace Works:",
      points: [
        "Hosts need sponsors → we bring them",
        "Sponsors need events → we curate them",
        "Both sides get what competitors can't provide",
        "Network effects: more hosts = more sponsors = more value",
        "We're the only platform solving both problems simultaneously"
      ]
    }
  },
  {
    id: 4,
    title: "2026 Brand Strategy",
    subtitle: "How We Own the Market",
    icon: Zap,
    gradient: "from-purple-500 to-pink-600",
    content: [
      "Position HEADLINER as the platform that PAYS event hosts instead of charging them",
      "Build brand recognition through bold, provocative messaging ('We pay you to throw your event')",
      "Become THE platform college students, nightlife promoters, and event creators use by default",
      "Create viral moments through influencer partnerships and user-generated content",
      "Establish trust with sponsors by proving ROI through QR tracking and conversion data"
    ],
    why: {
      title: "Strategic Pillars:",
      points: [
        "Awareness: Get HEADLINER in front of 1M+ event creators via social media",
        "Trust: Prove the purple cow isn't hype — share real host earnings and sponsor ROI stories",
        "Adoption: Make sign-up frictionless (free forever, no credit card, instant value)",
        "Retention: First sponsorship match creates 'aha moment' → they never leave",
        "Advocacy: Happy hosts and sponsors become our marketing engine (word of mouth)"
      ]
    },
    highlight: "We're not selling software. We're selling a revolution: event hosts getting paid instead of paying."
  },
  {
    id: 5,
    title: "Marketing Channels 2026",
    subtitle: "Where We'll Win",
    type: "channels-grid",
    gradient: "from-green-500 to-teal-600",
    channels: [
      {
        name: "TikTok",
        icon: Video,
        gradient: "from-pink-500 to-purple-600",
        strategy: "Short-form viral content targeting college students and event promoters",
        tactics: [
          "Behind-the-scenes of events using HEADLINER",
          "Host testimonials: 'I made $2,500 from sponsors using this app'",
          "Purple cow messaging: 'Eventbrite charges you. We pay you.'",
          "Day-in-the-life of event hosts using HEADLINER",
          "Sponsor success stories: 'We got 300 scans at this event'"
        ],
        kpi: "1M+ views per month by Q4 2026"
      },
      {
        name: "Instagram",
        icon: Instagram,
        gradient: "from-purple-500 to-pink-500",
        strategy: "Visual storytelling through Stories, Reels, and carousel posts",
        tactics: [
          "Event highlight reels from HEADLINER-powered events",
          "Sponsor banner showcases (professional design inspiration)",
          "Host earnings screenshots (redacted for privacy, show $ amounts)",
          "Influencer takeovers (local promoters showing their event setup)",
          "Educational carousels: 'How to get sponsors for your event'"
        ],
        kpi: "50K followers by Q4 2026, 10% engagement rate"
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        gradient: "from-blue-600 to-cyan-500",
        strategy: "B2B thought leadership targeting sponsors and corporate event planners",
        tactics: [
          "Case studies: 'How [Brand] got 500 conversions at a $500 event'",
          "Founder posts about marketplace economics and sponsorship ROI",
          "Sponsor testimonials and data-driven results",
          "Industry trends: 'Why experiential marketing beats digital ads'",
          "Partnership announcements with venues and brands"
        ],
        kpi: "10K followers by Q4 2026, 5 inbound sponsor leads per month"
      },
      {
        name: "Twitter/X",
        icon: Globe,
        gradient: "from-blue-400 to-blue-600",
        strategy: "Real-time engagement, hot takes, and community building",
        tactics: [
          "Purple cow one-liners that spark conversation",
          "Live-tweeting events powered by HEADLINER",
          "Engage with event industry influencers and thought leaders",
          "Share sponsor success metrics in real-time",
          "Meme culture and viral trend participation"
        ],
        kpi: "20K followers by Q4 2026, 100+ mentions per month"
      },
      {
        name: "Email Marketing",
        icon: Mail,
        gradient: "from-orange-500 to-red-500",
        strategy: "Nurture leads and retain users through value-driven email sequences",
        tactics: [
          "Welcome series for new hosts (explain sponsor marketplace)",
          "Weekly sponsor match alerts for event hosts",
          "Monthly success stories newsletter",
          "Re-engagement campaigns for inactive users",
          "Sponsor onboarding and education emails"
        ],
        kpi: "25% open rate, 5% click-through rate"
      },
      {
        name: "Partnerships & Influencers",
        icon: Users,
        gradient: "from-yellow-500 to-orange-500",
        strategy: "Leverage existing event creator audiences to drive adoption",
        tactics: [
          "Partner with top college event promoters (10-50K followers)",
          "Ambassador program: promoters earn $ for referrals",
          "Co-branded events with local nightlife brands",
          "Venue partnerships (require HEADLINER for all events)",
          "Podcast sponsorships in event/entrepreneurship space"
        ],
        kpi: "50 active ambassadors by Q4 2026, 500+ referrals"
      }
    ]
  },
  {
    id: 6,
    title: "Content Pillars",
    subtitle: "What We Talk About (and Why)",
    icon: Award,
    gradient: "from-indigo-500 to-purple-600",
    content: [
      {
        title: "1. Host Success Stories",
        desc: "Real hosts making real money through sponsorships",
        why: "Social proof. Shows the purple cow is real, not marketing hype."
      },
      {
        title: "2. Sponsor ROI Proof",
        desc: "Data-driven results from sponsorships (scans, conversions, cost-per-acquisition)",
        why: "Builds trust with sponsors. Proves we're not just another ad platform."
      },
      {
        title: "3. Event Culture & Lifestyle",
        desc: "Celebrate event creators, party culture, nightlife, community gatherings",
        why: "Positions HEADLINER as part of the culture, not just a tool. We're WITH them, not selling TO them."
      },
      {
        title: "4. Educational Content",
        desc: "How to get sponsors, how to price tickets, how to market your event",
        why: "Builds authority. Hosts see us as partners in success, not just a platform."
      },
      {
        title: "5. Platform Updates & Features",
        desc: "New features, success metrics, milestone celebrations",
        why: "Keeps users engaged. Shows momentum and growth."
      }
    ],
    why: {
      title: "Content Strategy Rules:",
      points: [
        "70% value-driven (education, inspiration, stories) / 30% promotional",
        "Every post must answer: 'Why should the audience care?'",
        "Lead with outcomes, not features ('Made $5K' not 'New dashboard released')",
        "Use real user content (UGC) wherever possible — authenticity beats polish",
        "Test, iterate, double down on what works. Kill what doesn't."
      ]
    }
  },
  {
    id: 7,
    title: "Paid Advertising Strategy",
    subtitle: "Where We Spend & Why",
    icon: DollarSign,
    gradient: "from-green-500 to-emerald-600",
    content: [
      {
        title: "Meta Ads (Facebook & Instagram)",
        desc: "Target event hosts aged 18-35 in major cities",
        why: "Best for precise targeting. Retarget event creator communities, nightlife pages, college groups."
      },
      {
        title: "TikTok Ads",
        desc: "Short-form video ads with hook: 'Stop paying to throw events. Get paid instead.'",
        why: "Highest viral potential. Younger audience. Low CPM compared to Meta."
      },
      {
        title: "Google Search Ads",
        desc: "Target keywords: 'event ticketing platform,' 'how to get event sponsors,' 'Eventbrite alternative'",
        why: "Capture high-intent users actively searching for solutions."
      },
      {
        title: "LinkedIn Ads",
        desc: "Target sponsors: marketing managers at local/regional brands, event marketing professionals",
        why: "B2B focus. Reach decision-makers at brands who sponsor events."
      }
    ],
    why: {
      title: "Budget Allocation (Monthly):",
      points: [
        "Q1 2026: $5K/month testing (find best channels and messaging)",
        "Q2 2026: $10K/month scaling winners from Q1",
        "Q3 2026: $15K/month aggressive growth before peak event season",
        "Q4 2026: $20K/month peak event season (Sept-Dec)",
        "Focus on CAC < $50 for hosts, CAC < $200 for sponsors"
      ]
    }
  },
  {
    id: 8,
    title: "2026 Rollout Timeline",
    subtitle: "Quarter-by-Quarter Execution Plan",
    type: "timeline",
    gradient: "from-orange-500 to-red-600",
    phases: [
      {
        name: "Q1: Foundation & Testing",
        timeframe: "Jan - Mar 2026",
        description: "Build brand awareness, test messaging, establish content rhythm",
        actions: [
          "Launch TikTok & Instagram accounts with daily content",
          "Publish 2-3 LinkedIn thought leadership posts per week",
          "Run $5K in test ads to identify best channels",
          "Secure first 10 influencer/ambassador partnerships",
          "Launch email welcome series and weekly newsletter",
          "Create content library (templates, success stories, graphics)"
        ]
      },
      {
        name: "Q2: Growth & Partnerships",
        timeframe: "Apr - Jun 2026",
        description: "Scale what worked in Q1, build strategic partnerships, drive user acquisition",
        actions: [
          "Scale ad spend to $10K/month on winning channels",
          "Host 'HEADLINER Ambassador Summit' (virtual or in-person)",
          "Partner with 5 venues to require HEADLINER for events",
          "Launch referral program for hosts ($50 credit per referral)",
          "Publish 10+ case studies on sponsor ROI",
          "Achieve 50K Instagram followers, 20K TikTok followers"
        ]
      },
      {
        name: "Q3: Scaling & Awareness",
        timeframe: "Jul - Sep 2026",
        description: "Aggressive growth before peak event season, maximize brand visibility",
        actions: [
          "Scale ad spend to $15K/month",
          "Launch 'HEADLINER Fest' — branded event series in 3 major cities",
          "Secure podcast sponsorships in event/entrepreneurship space",
          "Publish viral content series: '30 Days of Event Hosts Getting Paid'",
          "Launch PR campaign: pitch founder story to TechCrunch, Forbes, Hypebeast",
          "Hit 100K total social media followers across platforms"
        ]
      },
      {
        name: "Q4: Dominance & Retention",
        timeframe: "Oct - Dec 2026",
        description: "Capitalize on peak event season, retain users, close year strong",
        actions: [
          "Scale ad spend to $20K/month (peak season)",
          "Launch 'Year in Review' campaign (total $ paid to hosts, total events, etc.)",
          "Host appreciation campaign: feature top hosts and sponsors",
          "Release 2027 product roadmap to build excitement",
          "Secure enterprise partnerships with universities and venue networks",
          "Publish annual impact report (jobs created, money moved, events powered)"
        ]
      }
    ]
  },
  {
    id: 9,
    title: "Success Metrics & KPIs",
    subtitle: "How We Measure Winning",
    icon: TrendingUp,
    gradient: "from-cyan-500 to-blue-600",
    content: [
      {
        title: "Brand Awareness",
        desc: "Total social media followers, website traffic, brand search volume",
        why: "Measures if people know we exist. Target: 200K followers by EOY, 50K monthly site visitors."
      },
      {
        title: "User Acquisition",
        desc: "New host signups, new sponsor signups, CAC (customer acquisition cost)",
        why: "Measures growth rate. Target: 10K hosts, 500 sponsors by EOY. CAC < $50 hosts, < $200 sponsors."
      },
      {
        title: "Engagement",
        desc: "Events created, sponsorships closed, tickets sold, platform GMV (gross merchandise volume)",
        why: "Measures if platform is being used. Target: $1M GMV by EOY, 5K events created."
      },
      {
        title: "Content Performance",
        desc: "Average engagement rate, viral post count (>100K views), content reach",
        why: "Measures content effectiveness. Target: 5% avg engagement, 10 viral posts in 2026."
      },
      {
        title: "Revenue",
        desc: "Transaction fees, subscription revenue, promoter commissions",
        why: "Measures business viability. Target: $100K revenue by EOY."
      }
    ],
    why: {
      title: "North Star Metric:",
      points: [
        "Total sponsorship dollars moved through platform",
        "Why? It proves the purple cow works. Hosts are getting paid. Sponsors are getting ROI.",
        "Target: $500K in sponsorship deals closed through HEADLINER by EOY 2026",
        "This metric proves we're a real marketplace, not just another ticketing platform.",
        "Everything we do should drive this number up."
      ]
    }
  },
  {
    id: 10,
    title: "Competitive Positioning",
    subtitle: "How We Talk About Ourselves vs. Them",
    icon: Award,
    gradient: "from-purple-500 to-pink-600",
    content: [
      {
        title: "vs. Eventbrite",
        desc: "Eventbrite = corporate, expensive, no sponsorship help. HEADLINER = built for creators, free forever, brings sponsors to you.",
        why: "We're the anti-Eventbrite. They charge you. We pay you."
      },
      {
        title: "vs. Posh",
        desc: "Posh = ticketing only, no sponsor marketplace. HEADLINER = ticketing + sponsorships + promoter tools.",
        why: "Posh helps you sell tickets. We help you make money beyond tickets."
      },
      {
        title: "vs. Partiful",
        desc: "Partiful = casual, free invites, no monetization. HEADLINER = free + helps you monetize through sponsors.",
        why: "Partiful is for fun. HEADLINER is for creators building businesses."
      }
    ],
    why: {
      title: "Positioning Statement:",
      points: [
        "HEADLINER is the first event sponsorship marketplace that pays hosts to throw events.",
        "We're not 'another ticketing platform' — we're the platform that brings money TO event creators.",
        "Competitors help you manage events. We help you PROFIT from events.",
        "Our messaging ALWAYS emphasizes: free, sponsor marketplace, hosts get paid.",
        "Never compare features 1:1. Always compare outcomes: they charge, we pay."
      ]
    }
  },
  {
    id: 11,
    title: "Let's Own 2026",
    subtitle: "The Year HEADLINER Becomes Inevitable",
    type: "final",
    gradient: "from-purple-600 via-pink-600 to-orange-600",
    message: "2026 is the year we prove the purple cow isn't hype. We're going to pay event hosts, prove sponsor ROI, and become the default platform for anyone throwing an event. We're not competing on features. We're rewriting the rules.",
    why: {
      title: "What Success Looks Like:",
      points: [
        "Event hosts default to HEADLINER the same way designers default to Figma",
        "Sponsors see HEADLINER as the proven, data-driven alternative to blind ad spend",
        "Our brand becomes synonymous with 'getting paid to throw events'",
        "We create jobs, power local economies, and prove marketplaces beat software",
        "By EOY 2026: 10K hosts, 500 sponsors, $500K in sponsorship deals, $100K revenue"
      ]
    },
    cta: "Let's Build the Future of Events"
  }
];
