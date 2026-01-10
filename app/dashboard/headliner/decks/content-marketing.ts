import { Video, Megaphone, Users, DollarSign, Calendar, TrendingUp, AlertCircle, Target, BarChart } from "lucide-react";

export const contentMarketingSlides = [
  {
    id: 1,
    title: "HEADLINER",
    subtitle: "Content Marketing Strategy & Video Scripts",
    type: "cover",
    gradient: "from-orange-600 via-red-600 to-pink-600",
    tagline: "Strategic Content for Three Distinct Audiences"
  },
  {
    id: 2,
    title: "Executive Summary",
    subtitle: "B2B Marketplace Content Requires Precision",
    content: [
      "HEADLINER is a two-sided B2B marketplace executing city-by-city rollout",
      "Sponsor-first acquisition model solves marketplace chicken-and-egg problem",
      "Three distinct audiences require tailored messaging, platforms, and content formats",
      "Unlike consumer apps chasing viral moments, we need strategic content for decision makers"
    ],
    why: {
      title: "Why This Approach Works:",
      points: [
        "Sponsors seek measurable ROI - they don't scroll TikTok for business opportunities",
        "Event hosts seek revenue - they respond to peer validation and authentic founder stories",
        "Affiliates seek passive income - they amplify messaging organically once activated",
        "Each audience gets what they need to say yes on their preferred platform"
      ]
    },
    icon: Megaphone,
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    id: 3,
    title: "The 8-Week City Rollout Model",
    subtitle: "Sponsor-First Acquisition Strategy",
    content: [
      {
        title: "Weeks 1-4: Sponsor Acquisition",
        desc: "Build pool of local businesses eager to reach event audiences before hosts arrive",
        why: "Creates supply-side value first - sponsors are waiting when hosts join"
      },
      {
        title: "Weeks 5-8: Host Acquisition",
        desc: "Present event creators with sponsors already waiting to fund their events",
        why: "Hosts see immediate value the moment they join - no empty marketplace"
      },
      {
        title: "Ongoing: Affiliate Layer",
        desc: "Affiliates earn 1% of host ticket sales + 3% of sponsor deals they refer",
        why: "Force multiplier for platform growth - creates ongoing acquisition momentum"
      }
    ],
    icon: Calendar,
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: 4,
    title: "Audience Deep Dive: Sponsors",
    subtitle: "The Business Decision Makers",
    content: [
      "Restaurant operators, boutique retailers, automotive dealership marketing managers",
      "Credit union community outreach coordinators, service business owners",
      "Busy professionals who don't scroll TikTok looking for business opportunities",
      "Consume content on LinkedIn (work hours), Instagram business accounts, local Facebook groups"
    ],
    why: {
      title: "What Sponsors Care About:",
      points: [
        "Return on investment, not entertainment or trends",
        "Exactly what they're paying for and exactly what results they'll receive",
        "Value proposition: We found the events, you just pick which ones to sponsor",
        "Every sponsorship comes with a receipt proving it worked",
        "Respond to professionalism, clarity, and proof of performance"
      ]
    },
    highlight: "Most effective content: 15-30 second dashboard demos, static image ads with clear value props, carousel posts explaining 3-step process",
    icon: DollarSign,
    gradient: "from-green-600 to-teal-600",
  },
  {
    id: 5,
    title: "Audience Deep Dive: Hosts",
    subtitle: "The Event Creators",
    content: [
      "Party promoters, cookout organizers, pop-up market founders, college event planners",
      "Festival creators transforming gatherings into experiences",
      "Younger audience, lives on social media, makes decisions based on visual content",
      "Active on TikTok, Instagram Reels, Twitter - communicate through group chats and DMs"
    ],
    why: {
      title: "What Hosts Respond To:",
      points: [
        "Value proposition that contradicts existing experience: We PAY you vs everyone else CHARGES you",
        "Trend-based content, authentic founder stories, peer validation",
        "UGC-style content showing sponsor payments hitting accounts",
        "Behind-the-scenes platform building, trend-format videos adapted to HEADLINER",
        "Raw, direct, and genuine content - polished commercial kills authenticity"
      ]
    },
    highlight: "The hook that stops the scroll: Every other platform takes money from you to throw your event, but we pay you",
    icon: Users,
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    id: 6,
    title: "Audience Deep Dive: Affiliates",
    subtitle: "The Network Builders",
    content: [
      "Micro-influencers, event promoters with existing audiences",
      "Content creators seeking additional revenue streams",
      "Networkers who know everyone in their city",
      "Motivated by passive income opportunities and real earnings potential"
    ],
    why: {
      title: "The Earnings Model:",
      points: [
        "1% of ticket sales from every host they refer (ongoing, forever)",
        "3% of deal value from every sponsor they refer (ongoing, forever)",
        "Single referral action creates ongoing passive income stream",
        "Affiliates are content creators themselves - will amplify HEADLINER messaging organically",
        "Force multiplier for platform growth once activated"
      ]
    },
    highlight: "Content focus: Screen recordings of referral dashboards, earnings math breakdowns, testimonials from successful affiliates",
    icon: TrendingUp,
    gradient: "from-amber-600 to-orange-600",
  },
  {
    id: 7,
    title: "Content Calendar by Launch Phase",
    subtitle: "Strategic Posting Through Each Stage",
    content: [
      {
        title: "Phase 1: Pre-Launch",
        desc: "Founder talking head videos 2-3x/week. Daily Stories/Twitter teasers. Weekly carousel explainers. Behind-the-scenes content 1-2x/week.",
        why: "No paid ads yet - no proof to support claims. Build anticipation organically."
      },
      {
        title: "Phase 2: Sponsor Acquisition (Weeks 1-4)",
        desc: "Static image ads targeting local businesses ($10-20/day). 15-sec dashboard demos on LinkedIn/Instagram. Daily DM outreach with personalized videos.",
        why: "Focus on sponsor value prop: discovery solved, results tracked, no minimums required"
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
    gradient: "from-violet-600 to-purple-600",
  },
  {
    id: 8,
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
        why: "Drive specific action: waitlist, sign up, get code"
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
    gradient: "from-red-600 to-pink-600",
  },
  {
    id: 9,
    title: "Content Mistakes to Avoid",
    subtitle: "What Kills Conversion",
    content: [
      "Long explainer videos → no one watches past 15 seconds",
      "Polished commercial content early → claims lack proof, feels corporate",
      "Generic entrepreneur motivation → HEADLINER sells a platform, not inspiration",
      "Paid ads before proof → budget burns without conversion data to optimize against",
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
    id: 10,
    title: "Ready-to-Film Video Scripts",
    subtitle: "15 Production-Ready Scripts Across All Audiences",
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
      title: "Scripts Include:",
      points: [
        "Exact timing breakdowns for each section (hook, problem, solution, CTA)",
        "Format recommendations (talking head, screen recording, trend-style)",
        "Platform-specific optimization (TikTok vs LinkedIn vs Instagram)",
        "All scripts follow universal formula adapted to each audience",
        "No fancy production needed - authenticity beats polish for early-stage content"
      ]
    },
    highlight: "All 15 scripts available in full detail - ready to shoot today",
    gradient: "from-fuchsia-600 to-pink-600",
  },
  {
    id: 11,
    title: "Platform Strategy by Audience",
    subtitle: "Where to Post What",
    type: "comparison",
    free: {
      title: "SPONSORS",
      subtitle: "Professional Platforms & Direct Outreach",
      features: [
        {
          feature: "LinkedIn (primary)",
          why: "Professional reach during work hours - where decision makers are"
        },
        {
          feature: "Instagram business accounts",
          why: "Secondary reach with visual content for local businesses"
        },
        {
          feature: "Local Facebook business groups",
          why: "Community engagement and credibility building"
        },
        {
          feature: "Direct email outreach",
          why: "Personalized high-touch communication for larger sponsors"
        },
        {
          feature: "Content: Professional, ROI-focused",
          why: "15-30 sec dashboard demos, static ads, clear value props, proof-based"
        }
      ]
    },
    pro: {
      title: "HOSTS & AFFILIATES",
      subtitle: "Social Platforms & Peer Networks",
      features: [
        {
          feature: "TikTok (primary for hosts)",
          why: "Organic reach and viral potential - where young creators live"
        },
        {
          feature: "Instagram Reels (primary for hosts)",
          why: "Engagement and trend participation - visual storytelling"
        },
        {
          feature: "Twitter/X (secondary)",
          why: "Real-time updates, community building, milestone celebrations"
        },
        {
          feature: "DMs and group chats",
          why: "Direct peer-to-peer communication - high trust channel"
        },
        {
          feature: "Content: Authentic, trend-aware",
          why: "UGC-style, raw founder stories, earnings proofs, behind-the-scenes"
        }
      ]
    },
    gradient: "from-indigo-600 to-purple-600",
  },
  {
    id: 12,
    title: "Weekly Content Volume",
    subtitle: "Cadence by Phase",
    content: [
      {
        title: "Pre-Launch",
        desc: "2-3 founder videos/week, daily story teasers, 1 carousel/week, 1-2 BTS posts/week",
        why: "Build anticipation without paid spend"
      },
      {
        title: "Sponsor Acquisition Weeks",
        desc: "2-3 organic posts/week + daily paid campaigns ($10-20/day) + daily DM outreach",
        why: "Targeted local business focus"
      },
      {
        title: "Host Acquisition Weeks",
        desc: "3-5 TikTok/Reels/week + 2 UGC posts/week + real-time milestones + 1-2 affiliate posts/week",
        why: "High volume on host platforms"
      },
      {
        title: "Post-Success",
        desc: "Repurpose case studies across all platforms + scale paid spend behind proven content",
        why: "Proof-based marketing with validation"
      }
    ],
    gradient: "from-orange-600 to-red-600",
  },
  {
    id: 13,
    title: "Success Metrics to Track",
    subtitle: "Optimize Based on Data, Not Assumptions",
    content: [
      "Waitlist signups per content piece → identify highest-performing hooks",
      "Cost per waitlist signup → optimize paid campaign efficiency once launched",
      "Affiliate code generation and usage rates → measure referral momentum",
      "Conversion from waitlist to active platform user → validate content-to-platform fit",
      "Double down on what works, cut what doesn't → ruthless optimization"
    ],
    why: {
      title: "The Optimization Loop:",
      points: [
        "Week 1-2: Test multiple hooks, formats, and CTAs across each audience",
        "Week 3-4: Kill bottom 50% of content, double spend on top performers",
        "Week 5-8: Refine winning formulas, A/B test variations",
        "Post-launch: Shift from vanity metrics (views) to business metrics (signups, conversions)",
        "Content that doesn't drive waitlist signups or conversions gets cut - no exceptions"
      ]
    },
    icon: BarChart,
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    id: 14,
    title: "The Content Engine",
    subtitle: "Execution Roadmap",
    type: "final",
    message: "Content strategy follows the rollout model. Sponsors get LinkedIn and professionalism. Hosts get TikTok and authenticity. Affiliates get earnings proofs and passive income breakdowns. Each audience gets what they need to say yes on their preferred platform.",
    why: {
      title: "The Strategic Framework:",
      points: [
        "Sponsor-first content (Weeks 1-4) builds supply before demand arrives",
        "Host content (Weeks 5-8) shows sponsors already waiting - removes friction",
        "Affiliate content runs ongoing - creates perpetual acquisition momentum",
        "All 15 video scripts ready to film - no creative bottlenecks",
        "Track metrics ruthlessly - content ROI must be measurable and positive"
      ]
    },
    cta: "Execute with Precision, Scale with Data",
    gradient: "from-orange-600 via-pink-600 to-purple-600",
  }
];
