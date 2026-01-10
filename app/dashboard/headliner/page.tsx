"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, DollarSign, TrendingUp, Users, Zap, Target, Award, ChevronDown, Video, Megaphone, Network, Calendar, AlertCircle } from "lucide-react";

const slides = [
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
  },
  // Content Marketing Strategy & Video Scripts
  {
    id: 12,
    title: "Content Marketing Strategy",
    subtitle: "Strategic Content for Three Distinct Audiences",
    type: "cover",
    gradient: "from-orange-600 via-red-600 to-pink-600",
  },
  {
    id: 13,
    title: "Executive Summary",
    subtitle: "B2B Marketplace Content Strategy",
    content: [
      "HEADLINER is a two-sided B2B marketplace executing city-by-city rollout",
      "Sponsor-first acquisition model solves the marketplace chicken-and-egg problem",
      "Three distinct audiences require tailored messaging, platforms, and content formats",
      "Content speaks directly to sponsors seeking ROI, hosts seeking revenue, affiliates seeking passive income"
    ],
    why: {
      title: "Why This Approach Works:",
      points: [
        "Unlike consumer apps, B2B marketplaces require strategic content for decision makers",
        "Each audience has different motivations, platform preferences, and content consumption patterns",
        "Sponsor-first model ensures hosts see immediate value when they join",
        "Content strategy adapts to each phase of the city-by-city rollout"
      ]
    },
    icon: Megaphone,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: 14,
    title: "The Rollout Model",
    subtitle: "8-Week City Domination Cycle",
    content: [
      {
        title: "Weeks 1-4: Sponsor Acquisition",
        desc: "Build pool of local businesses eager to reach event audiences",
        why: "Creates supply-side value before hosts arrive"
      },
      {
        title: "Weeks 5-8: Host Acquisition",
        desc: "Present event creators with sponsors already waiting to fund events",
        why: "Hosts see immediate value the moment they join"
      },
      {
        title: "Ongoing: Affiliate Layer",
        desc: "Affiliates earn commissions referring both hosts and sponsors",
        why: "Force multiplier for platform growth throughout rollout"
      }
    ],
    why: {
      title: "The Strategic Advantage:",
      points: [
        "Sponsor-first approach solves classic marketplace chicken-and-egg problem",
        "Hosts never arrive to an empty marketplace with no sponsors",
        "Affiliates create ongoing acquisition momentum across both sides",
        "8-week cycle is repeatable across every new city launch"
      ]
    },
    icon: Calendar,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 15,
    title: "Audience Deep Dive: Sponsors",
    subtitle: "The Business Decision Makers",
    content: [
      "Restaurant operators, boutique retailers, automotive dealership marketing managers",
      "Credit union community outreach coordinators, service business owners",
      "Busy professionals who don't scroll TikTok for business opportunities",
      "Consume content on LinkedIn (work hours), Instagram business accounts, local Facebook groups"
    ],
    why: {
      title: "What Sponsors Care About:",
      points: [
        "Return on investment, not entertainment or trends",
        "Exactly what they're paying for and exactly what results they'll receive",
        "Value proposition: We found the events, you just pick which ones to sponsor",
        "Every sponsorship comes with receipt proving it worked",
        "Respond to professionalism, clarity, and proof of performance"
      ]
    },
    highlight: "Most effective content: 15-30 second dashboard demos, static image ads with clear value props, carousel posts explaining 3-step process",
    icon: DollarSign,
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: 16,
    title: "Audience Deep Dive: Hosts",
    subtitle: "The Event Creators",
    content: [
      "Party promoters, cookout organizers, pop-up market founders, college event planners",
      "Festival creators transforming gatherings into experiences",
      "Younger audience, lives on social media, makes decisions based on visual content",
      "Active on TikTok, Instagram Reels, Twitter, group chats and DMs"
    ],
    why: {
      title: "What Hosts Respond To:",
      points: [
        "Value proposition that contradicts existing experience: We PAY you vs everyone else CHARGES you",
        "Trend-based content, authentic founder stories, peer validation",
        "UGC-style content showing sponsor payments hitting accounts",
        "Behind-the-scenes platform building, trend-format videos adapted to HEADLINER",
        "Raw, direct, and genuine content (polished commercial kills authenticity)"
      ]
    },
    highlight: "The hook that stops the scroll: Every other platform takes money from you to throw your event, but we pay you",
    icon: Users,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 17,
    title: "Audience Deep Dive: Affiliates",
    subtitle: "The Network Builders",
    content: [
      "Micro-influencers, event promoters with existing audiences",
      "Content creators seeking additional revenue streams",
      "Networkers who know everyone in their city",
      "Motivated by passive income opportunities"
    ],
    why: {
      title: "The Earnings Model:",
      points: [
        "1% of ticket sales from every host they refer (ongoing, forever)",
        "3% of deal value from every sponsor they refer (ongoing, forever)",
        "Single referral action creates ongoing passive income stream",
        "Affiliates are content creators themselves → will amplify HEADLINER messaging organically",
        "Force multiplier for platform growth once activated"
      ]
    },
    highlight: "Content focus: Screen recordings of referral dashboards, earnings math breakdowns, testimonials from successful affiliates",
    icon: Network,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 18,
    title: "Content Calendar by Launch Phase",
    subtitle: "Strategic Posting Through Each Stage",
    content: [
      {
        title: "Phase 1: Pre-Launch",
        desc: "Build anticipation, capture waitlist signups. Founder talking head videos 2-3x/week. Daily Stories/Twitter teasers. Weekly carousel explainers.",
        why: "No paid ads yet - no proof to support claims"
      },
      {
        title: "Phase 2: Sponsor Acquisition (Weeks 1-4)",
        desc: "Static image ads targeting local businesses ($10-20/day). 15-sec dashboard demos on LinkedIn/Instagram. Daily DM outreach with personalized videos.",
        why: "Focus on sponsor value prop: discovery solved, results tracked, no minimums"
      },
      {
        title: "Phase 3: Host Acquisition (Weeks 5-8)",
        desc: "\"We pay you\" video 3-5x weekly on TikTok/Reels. UGC-style content 2x weekly. Real-time milestone celebrations. Affiliate recruitment 1-2x weekly.",
        why: "Volume increases on host-preferred platforms with authentic content"
      },
      {
        title: "Phase 4: Post-First-Success",
        desc: "Case study videos with hosts and sponsors. Earnings screenshots. Scale paid advertising with proven social proof.",
        why: "Shift to proof-based marketing with real results"
      }
    ],
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 19,
    title: "The Universal Content Formula",
    subtitle: "Hook → Problem → Solution → Action",
    content: [
      {
        title: "Seconds 0-3: Hook",
        desc: "Pattern interrupt with bold claim. Stop the scroll.",
        why: "Make viewer ask 'wait, what?'"
      },
      {
        title: "Seconds 3-8: Problem",
        desc: "Articulate pain viewer currently experiences",
        why: "Create recognition and resonance"
      },
      {
        title: "Seconds 8-15: Solution",
        desc: "Present HEADLINER as the answer",
        why: "Position platform as problem solver"
      },
      {
        title: "Seconds 15-20: Call to Action",
        desc: "One clear next step",
        why: "Drive specific action (waitlist, sign up, get code)"
      }
    ],
    why: {
      title: "Why This Formula Works:",
      points: [
        "Applies across all audiences and platforms with tailored messaging",
        "Hook must be audience-specific pain point or provocative claim",
        "Problem section validates viewer's current frustration",
        "Solution positions HEADLINER as differentiated answer",
        "Single CTA removes decision paralysis"
      ]
    },
    icon: Video,
    gradient: "from-red-500 to-pink-600",
  },
  {
    id: 20,
    title: "Content Mistakes to Avoid",
    subtitle: "What Kills Conversion",
    content: [
      "Long explainer videos → no one watches past 15 seconds",
      "Polished commercial content early → claims lack proof, feels corporate",
      "Generic entrepreneur motivation → HEADLINER sells a platform, not inspiration",
      "Paid ads before proof → budget burns without conversion data",
      "Identical content for sponsors and hosts → completely different motivations and platforms"
    ],
    why: {
      title: "The Reality Check:",
      points: [
        "Sponsors consume business content on LinkedIn, hosts consume social content on TikTok",
        "Sponsors care about ROI metrics, hosts care about peer validation and trends",
        "Early-stage platforms need authentic founder content, not agency-produced commercials",
        "Paid advertising only works when you have case studies to prove claims",
        "Each audience segment requires its own content strategy and platform focus"
      ]
    },
    icon: AlertCircle,
    gradient: "from-red-600 to-orange-600",
  },
  {
    id: 21,
    title: "Video Scripts: Ready to Film",
    subtitle: "Complete Scripts for Each Audience",
    content: [
      {
        title: "Event Hosts (5 scripts)",
        desc: "Core value prop, POV trend format, math breakdown, objection handler, social proof tease",
        why: "TikTok/Reels optimized, 15-25 seconds, authentic talking head style"
      },
      {
        title: "Sponsors (5 scripts)",
        desc: "Core value prop, discovery problem, small business angle, ROI comparison, how it works explainer",
        why: "LinkedIn/Instagram optimized, professional but not corporate, 20-25 seconds"
      },
      {
        title: "Affiliates (5 scripts)",
        desc: "Passive income hook, math breakdown, network play, side hustle angle, specific target callout",
        why: "Focus on earnings potential, screen recordings, 16-22 seconds"
      }
    ],
    why: {
      title: "Scripts Are Production-Ready:",
      points: [
        "Exact timing breakdowns for each section (hook, problem, solution, CTA)",
        "Format recommendations (talking head, screen recording, trend-style)",
        "Platform-specific optimization (TikTok vs LinkedIn vs Instagram)",
        "All scripts follow universal formula adapted to each audience",
        "No fancy production needed - authenticity beats polish for early-stage content"
      ]
    },
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    id: 22,
    title: "Platform Strategy Summary",
    subtitle: "Where to Post What",
    type: "comparison",
    free: {
      title: "SPONSORS",
      subtitle: "Professional Platforms & Direct Outreach",
      features: [
        {
          feature: "LinkedIn (primary)",
          why: "Professional reach during work hours"
        },
        {
          feature: "Instagram business accounts",
          why: "Secondary reach with visual content"
        },
        {
          feature: "Local Facebook business groups",
          why: "Community engagement and credibility"
        },
        {
          feature: "Direct email outreach",
          why: "Personalized high-touch communication"
        },
        {
          feature: "Content: Professional, ROI-focused",
          why: "15-30 sec demos, static ads, clear value props"
        }
      ]
    },
    pro: {
      title: "HOSTS & AFFILIATES",
      subtitle: "Social Platforms & Peer Networks",
      features: [
        {
          feature: "TikTok (primary for hosts)",
          why: "Organic reach and viral potential"
        },
        {
          feature: "Instagram Reels (primary for hosts)",
          why: "Engagement and trend participation"
        },
        {
          feature: "Twitter/X (secondary)",
          why: "Real-time updates and community building"
        },
        {
          feature: "DMs and group chats",
          why: "Direct peer-to-peer communication"
        },
        {
          feature: "Content: Authentic, trend-aware",
          why: "UGC-style, founder stories, earnings proofs"
        }
      ]
    },
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    id: 23,
    title: "The Content Engine",
    subtitle: "Execution Strategy",
    type: "final",
    message: "Content strategy follows the rollout model. Sponsors get LinkedIn and professionalism. Hosts get TikTok and authenticity. Affiliates get earnings proofs and passive income breakdowns. Each audience gets what they need to say yes.",
    why: {
      title: "Success Metrics to Track:",
      points: [
        "Waitlist signups per content piece → identify highest-performing hooks",
        "Cost per waitlist signup → optimize paid campaign efficiency",
        "Affiliate code generation and usage rates → measure referral momentum",
        "Conversion from waitlist to active user → validate content-to-platform fit",
        "Double down on what works, cut what doesn't → ruthless optimization"
      ]
    },
    gradient: "from-orange-600 via-pink-600 to-purple-600",
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
