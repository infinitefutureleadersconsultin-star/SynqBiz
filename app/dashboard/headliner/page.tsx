"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, DollarSign, TrendingUp, Users, Zap, Target, Award, ChevronDown, Smartphone, BarChart3, Sparkles } from "lucide-react";

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
    title: "Host Purple Cow",
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
    title: "Sponsor Purple Cow",
    subtitle: "The Other Side of the Marketplace",
    content: [
      "Brands spend thousands on ads people skip",
      "They want to reach customers at events — but can't find them",
      "Local events aren't on Google, Eventbrite, or anywhere",
      "We solve the discovery problem"
    ],
    purpleCow: "We Found the Events. You Just Pick Which Ones to Sponsor.",
    explanation: "Underground parties, college events, cookouts, pop-ups — the events your customers actually go to. We curate them. You sponsor them.",
    callout: "\"Sponsor events you'll never find on Google.\"",
    why: {
      title: "Why Sponsors Care:",
      points: [
        "They CAN'T find local/underground events on their own → no search engine, no listings",
        "They DON'T trust random DMs from hosts → no credibility, no vetting",
        "They CAN'T measure ROI → traditional sponsorship is 'pay and pray'",
        "The process is MESSY → back-and-forth emails, no contracts, sketchy payments",
        "We remove ALL friction → curated events, instant checkout, built-in tracking"
      ]
    },
    icon: Target,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 10,
    title: "The Sponsor's Current Problem",
    subtitle: "Why They Need Us",
    content: [
      {
        title: "Discovery Problem",
        desc: "Local brands want to sponsor events but don't know where to find them. Underground events don't show up on Google."
      },
      {
        title: "Trust Problem",
        desc: "Random DMs from event hosts have no credibility. Is this event real? Will 50 people show up or 500?"
      },
      {
        title: "ROI Problem",
        desc: "Traditional sponsorships are 'pay and hope.' No tracking. No conversion data. No proof it worked."
      },
      {
        title: "Process Problem",
        desc: "Back-and-forth emails, unclear deliverables, sketchy payment methods, no contracts."
      }
    ],
    why: {
      title: "What This Means:",
      points: [
        "Big brands have agencies to solve this → they pay $50K+ for experiential marketing activations",
        "Small/local brands are locked out → can't afford agencies, can't find events themselves",
        "We democratize experiential marketing → same results, 1/100th the cost",
        "Our platform IS the solution → discovery, vetting, contracts, payments, tracking all in one place"
      ]
    },
    icon: Users,
    gradient: "from-red-500 to-pink-600",
  },
  {
    id: 11,
    title: "The Invention: Sponsor-to-Pocket",
    subtitle: "Our Netflix Moment",
    content: [
      "Current sponsorships = passive. Logo on a wall. Hope someone remembers.",
      "Our sponsorships = active. Instant connection. Trackable conversions.",
      "We change the relationship from 'brand awareness' to 'direct response.'"
    ],
    why: {
      title: "How It Works:",
      points: [
        "Every event gets a QR code/NFC tap point (on banner, entrance, table)",
        "Attendee taps/scans → takes 1 second, no app download",
        "They instantly receive: discount code, link to order, digital coupon (expires 48hrs), giveaway entry",
        "Sponsor gets: exact scan count, conversion rate, retargeting pixel, email/phone capture (opt-in)",
        "This isn't brand awareness. This is direct response marketing at a live event."
      ]
    },
    highlight: "Sponsorship with a receipt. Know exactly how many customers you got — not just how many people saw your logo.",
    icon: Smartphone,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: 12,
    title: "Why This Has Never Been Done",
    subtitle: "We're the First to Connect All Three",
    content: [
      {
        title: "1. Event Access",
        desc: "We have the hosts. Nobody else has curated access to underground/local events at scale."
      },
      {
        title: "2. Sponsor Budget",
        desc: "Sponsors have money to spend — they just don't know where. We show them exactly where."
      },
      {
        title: "3. Attendee Attention",
        desc: "The event captures attention in person. We capture it digitally via QR/NFC. Then track the conversion."
      }
    ],
    why: {
      title: "The Netflix Comparison:",
      points: [
        "Netflix didn't just digitize DVDs → they changed the content/viewer relationship",
        "From 'rent and return' → 'always available, personalized, data-driven'",
        "We're doing the same for sponsorships",
        "From 'logo on wall' → 'direct connection, immediate action, trackable conversion'",
        "This is the sponsorship model that doesn't exist yet. We're inventing it."
      ]
    },
    icon: Sparkles,
    gradient: "from-purple-500 to-fuchsia-600",
  },
  {
    id: 13,
    title: "Sponsor Pricing Tiers",
    subtitle: "How We Monetize Both Sides",
    type: "comparison",
    free: {
      title: "SPONSOR PRICING",
      subtitle: "Pay Based on Tracking Depth",
      features: [
        {
          feature: "Bronze - $250",
          why: "Logo placement only (old way). Passive brand awareness."
        },
        {
          feature: "Silver - $500",
          why: "Logo + QR code activation. Track scans, basic engagement."
        },
        {
          feature: "Gold - $1,000",
          why: "Logo + QR + email capture + retargeting pixel. Full funnel tracking."
        },
        {
          feature: "Platinum - $2,500",
          why: "All above + exclusive 'Presented By' + post-event analytics report + unlimited events/month."
        }
      ]
    },
    pro: {
      title: "WHY SPONSORS PAY MORE",
      subtitle: "Because We Deliver Customers, Not Awareness",
      features: [
        {
          feature: "Trackable ROI",
          why: "💰 They can prove it worked. 'I paid $1,000, got 40 customers. $25 CAC.'"
        },
        {
          feature: "Cheaper than Ads",
          why: "💰 Facebook/Instagram CAC = $30-50. Our CAC = $15-25. We win on math."
        },
        {
          feature: "Real Engagement",
          why: "💰 Not a scroll-by. People spend 2-4 hours under your banner, drinking, dancing, taking photos."
        },
        {
          feature: "Retargeting Unlocked",
          why: "💰 Pixel fires. Now they can run ads to everyone who scanned. Warm audience."
        },
        {
          feature: "Recurring Revenue",
          why: "💰 Once they see it works, they sponsor 10+ events. LTV >> CAC."
        }
      ]
    },
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 14,
    title: "The Value Proposition to Sponsors",
    subtitle: "What We Actually Sell",
    content: [
      "We don't sell banner space.",
      "We don't sell brand awareness.",
      "We sell customers."
    ],
    why: {
      title: "The Pitch:",
      points: [
        "\"A banner at a 500-person HBCU party costs $500. That's $1 per impression.\"",
        "\"But it's not a scroll-by impression. It's 4 hours of attention, photos, memories.\"",
        "\"Plus you get QR scans → conversion data → retargeting → measurable customers.\"",
        "\"That's worth 1,000 Instagram ads. And you can prove it.\"",
        "\"We don't sell you a logo on a wall. We sell you customers in your store.\""
      ]
    },
    purpleCow: "Stop Running Ads. Start Showing Up.",
    explanation: "Your customers are at parties, cookouts, tailgates, and pop-ups this weekend. We put your brand in the room — not on their feed.",
    icon: BarChart3,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    id: 15,
    title: "The Psychology Behind the Funnel",
    subtitle: "How This Works in Practice",
    content: [
      {
        step: "1. Purple Cow Stops the Scroll",
        desc: "\"We pay you to throw your event\" (hosts) / \"Sponsor events you'll never find\" (sponsors) → Curiosity click."
      },
      {
        step: "2. Landing Page Removes All Friction",
        desc: "Free forever for hosts. Self-serve browse for sponsors. No sales calls. Easy checkout."
      },
      {
        step: "3. Product Experience Exceeds Expectations",
        desc: "Hosts: cleaner than Eventbrite, sponsor marketplace. Sponsors: events they couldn't find elsewhere."
      },
      {
        step: "4. First Transaction = Aha Moment",
        desc: "Host gets their first $500 sponsorship. Sponsor gets their first 30 QR scans → 8 conversions."
      },
      {
        step: "5. They Stay Because It Actually Works",
        desc: "Hosts make money. Sponsors get customers. Platform becomes indispensable."
      },
      {
        step: "6. Revenue Flows Through the Ecosystem",
        desc: "Ticket fees. Sponsorship cuts. Promoter commissions. Conversion tracking upsells. Money is moving."
      }
    ],
    why: {
      title: "Why This Matters for the Landing Page:",
      points: [
        "We need TWO landing pages → one for hosts, one for sponsors",
        "Host page: 'We pay you' / Sponsor page: 'We found the events'",
        "Both remove objections → hosts see 'free forever' / sponsors see 'self-serve, no sales calls'",
        "Both promise outcomes → hosts: revenue / sponsors: customers",
        "Both deliver proof → testimonials, case studies, conversion data"
      ]
    },
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    id: 16,
    title: "This Is How We Compete",
    subtitle: "Our Strategic Edge",
    content: [
      "✓ Match the free entry every competitor offers → remove friction for hosts",
      "✓ Give hosts a built-in sponsor marketplace → our unique moat (no competitor has this)",
      "✓ Give sponsors access to events they can't find → solve discovery problem",
      "✓ Add conversion tracking to sponsorships → solve ROI problem",
      "✓ Let the marketplace generate revenue → transactions on both sides"
    ],
    why: {
      title: "What This Means for Development Priorities:",
      points: [
        "Sponsor marketplace must be visible on day 1 → not hidden behind a menu",
        "QR code generation must be automatic → every sponsorship gets a trackable link",
        "Analytics dashboard for sponsors → show scans, conversions, ROI in real-time",
        "Free tier for hosts must be feature-complete → match Eventbrite 1:1",
        "Self-serve sponsor checkout → no sales team needed until $10K+ deals"
      ]
    },
    highlight: "The purple cow opens the door. The product keeps them in the room. The marketplace generates the money.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 17,
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
        "Every email/ad must lead with the purple cow → hosts: 'We pay you' / sponsors: 'We found the events'",
        "Success = hosts making money through sponsors + sponsors getting customers. Everything else is a distraction."
      ]
    },
    gradient: "from-purple-600 via-pink-600 to-red-600",
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
