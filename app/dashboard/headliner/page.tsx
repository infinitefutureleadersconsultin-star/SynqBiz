"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, DollarSign, TrendingUp, Users, Zap, Target, Award, ChevronDown } from "lucide-react";

// Marketplace Strategy Presentation
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

// Revenue Projections 2026 Presentation
const revenueSlides = [
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
    title: "2026 Growth Scenarios",
    subtitle: "Three Paths to Success",
    content: [
      {
        title: "Scenario 1: Conservative Growth",
        desc: "We execute okay, grow steadily, nothing viral. 2026 Revenue: $5.4M | December ARR: $11.5M"
      },
      {
        title: "Scenario 2: Moderate Growth",
        desc: "We nail the HBCU market, expand to 20 cities, sponsors start recurring. 2026 Revenue: $13.8M | December ARR: $28.8M"
      },
      {
        title: "Scenario 3: Aggressive Growth",
        desc: "Venue lock-in works, viral TikTok growth, sponsors addicted to data. 2026 Revenue: $38.7M | December ARR: $84M"
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
    id: 4,
    title: "The Bottom Line",
    subtitle: "Your Equity at 40%",
    content: [
      {
        title: "Conservative (Scenario 1)",
        desc: "2026 Revenue: $5.4M | Exit Valuation: $25-50M | Your equity: $10-20M"
      },
      {
        title: "Moderate (Scenario 2)",
        desc: "2026 Revenue: $13.8M | Exit Valuation: $70-140M | Your equity: $28-56M"
      },
      {
        title: "Aggressive (Scenario 3)",
        desc: "2026 Revenue: $38.7M | Exit Valuation: $200-400M | Your equity: $80-160M"
      }
    ],
    highlight: "Even the conservative scenario puts you at $10-20M in equity value",
    icon: DollarSign,
    gradient: "from-yellow-600 to-amber-600",
  },
  {
    id: 5,
    title: "The Closing Pitch",
    subtitle: "This Is a System, Not a Guess",
    type: "final",
    message: "On any given Saturday, there are 2,000 events happening on our platform. Each one generates $300+ in revenue across tickets, sponsors, and promoters. That's $600K every Saturday, $2.4M every month, $30M a year — and our cost to service each event is $6. That's 98% gross margin on a marketplace that hasn't existed before.",
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
  const [activeDeck, setActiveDeck] = useState<'marketplace' | 'revenue'>('marketplace');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = activeDeck === 'marketplace' ? marketplaceSlides : revenueSlides;
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

  const switchDeck = (deck: 'marketplace' | 'revenue') => {
    setActiveDeck(deck);
    setCurrentSlide(0); // Reset to first slide when switching decks
  };

  return (
    <div className="min-h-screen -m-8 bg-gray-900">
      {/* Deck Selector */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex gap-3 bg-gray-800/90 backdrop-blur-md p-2 rounded-full border border-white/10">
        <button
          onClick={() => switchDeck('marketplace')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            activeDeck === 'marketplace'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          Marketplace Strategy
        </button>
        <button
          onClick={() => switchDeck('revenue')}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            activeDeck === 'revenue'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          Revenue Projections
        </button>
      </div>

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

            {slide.type === "comparison" && activeDeck === 'marketplace' && (
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

                {(slide as any).purpleCow && activeDeck === 'marketplace' && (
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
