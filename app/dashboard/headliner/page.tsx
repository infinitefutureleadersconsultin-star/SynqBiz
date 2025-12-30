"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, DollarSign, TrendingUp, Users, Zap, Target, Award } from "lucide-react";

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
    highlight: "The entire platform should be free with no limitations on core features",
    icon: Target,
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: 4,
    title: "How We Make Money",
    subtitle: "Four Revenue Streams",
    content: [
      {
        title: "1. Ticket Fees",
        desc: "Processing fees (attendee) + platform fees (host). Host fees waived on Pro."
      },
      {
        title: "2. Sponsorship Cuts",
        desc: "Every time a sponsor buys a package ($250-$2,500), we take a percentage."
      },
      {
        title: "3. Promoter Commissions",
        desc: "Percentage of every sale driven by promoters. Free tier gets 4-5 promoters."
      },
      {
        title: "4. Venue Subscriptions",
        desc: "Future: Venues running all events exclusively through our platform."
      }
    ],
    icon: DollarSign,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "Why We Can't Do It Any Other Way",
    subtitle: "The Competitive Reality",
    content: [
      "Eventbrite, Posh, Partiful, Evite → all offer unlimited free events",
      "Hosts coming from those platforms expect no event limits",
      "We don't have the brand recognition to justify friction",
      "A paywall after one event = dead on arrival",
      "At scale, our landing page must sell itself — no personal explanations"
    ],
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
    highlight: "Hosts don't pay for features. They pay for outcomes.",
    icon: Award,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 7,
    title: "Free vs. Pro Breakdown",
    subtitle: "What Lives Where",
    type: "comparison",
    free: {
      title: "FREE TIER",
      features: [
        "Unlimited events",
        "Full ticketing system",
        "Basic sponsor marketplace access",
        "Up to 4-5 promoters",
        "Contracts & payouts",
        "Standard analytics"
      ]
    },
    pro: {
      title: "PRO TIER - $100/month",
      features: [
        "✨ Platform fees waived (keep more money)",
        "✨ Unlimited promoters + deep analytics",
        "✨ Collaboration tools for co-hosts",
        "✨ Expense tracking & payout splits",
        "✨ Built-in marketing engine",
        "✨ Email warm audiences automatically"
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
    explanation: "When a sponsor pays $1,000, the host keeps the majority. We bring money to hosts instead of taking it from them.",
    callout: "\"Eventbrite charges you. We pay you.\"",
    icon: Zap,
    gradient: "from-fuchsia-500 to-purple-600",
  },
  {
    id: 9,
    title: "The Psychology",
    subtitle: "How This Works in Practice",
    content: [
      {
        step: "1. Purple Cow",
        desc: "Gets them to the landing page"
      },
      {
        step: "2. Landing Page",
        desc: "Gets them into the app"
      },
      {
        step: "3. Product Experience",
        desc: "They discover cleaner UI, better tools, sponsor marketplace"
      },
      {
        step: "4. Retention",
        desc: "They stay because the platform is actually better"
      },
      {
        step: "5. Revenue",
        desc: "Money moves through the ecosystem. We take our cut."
      }
    ],
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    id: 10,
    title: "This Is How We Compete",
    subtitle: "Our Strategic Edge",
    content: [
      "✓ Match the free entry every competitor offers",
      "✓ Give hosts a built-in sponsor marketplace (no one else has this)",
      "✓ Position ourselves as helping hosts get paid, not taking from them",
      "✓ Let people in without walls or friction",
      "✓ Let the marketplace generate the revenue"
    ],
    highlight: "The purple cow opens the door. The product keeps them in the room. The marketplace generates the money.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    id: 11,
    title: "The Engine",
    subtitle: "What Drives Everything",
    type: "final",
    message: "We don't need to charge people to walk in. We just need to make sure that once they're in, money is moving — and we get a cut of every transaction that happens.",
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
        {/* Slide Content */}
        <div className={`w-full h-full bg-gradient-to-br ${slide.gradient} flex items-center justify-center p-8 transition-all duration-500`}>
          <div className="max-w-5xl w-full">
            {slide.type === "cover" && (
              <div className="text-center text-white space-y-8 animate-fade-in">
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
                <div className="text-center mb-12">
                  <h2 className="text-6xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-2xl opacity-90">{slide.subtitle}</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  {/* Free Tier */}
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20">
                    <h3 className="text-3xl font-bold mb-6 text-center">{slide.free?.title}</h3>
                    <ul className="space-y-4">
                      {slide.free?.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-lg">
                          <span className="text-green-300 mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Pro Tier */}
                  <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border-2 border-yellow-300/50 shadow-2xl">
                    <h3 className="text-3xl font-bold mb-6 text-center text-yellow-200">{slide.pro?.title}</h3>
                    <ul className="space-y-4">
                      {slide.pro?.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-lg font-medium">
                          <span className="text-yellow-300 mt-1">★</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {slide.type === "final" && (
              <div className="text-center text-white space-y-12 animate-fade-in">
                <h2 className="text-7xl font-black">{slide.title}</h2>
                <p className="text-3xl font-light opacity-90">{slide.subtitle}</p>
                <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-12 max-w-4xl mx-auto border-2 border-white/30">
                  <p className="text-3xl font-medium leading-relaxed">
                    {slide.message}
                  </p>
                </div>
                <div className="pt-8">
                  <div className="inline-block px-12 py-4 bg-white text-purple-600 rounded-full text-2xl font-bold shadow-2xl">
                    Let the Marketplace Be the Engine
                  </div>
                </div>
              </div>
            )}

            {!slide.type && (
              <div className="text-white space-y-8 animate-fade-in">
                <div className="flex items-center gap-6 mb-8">
                  {slide.icon && <slide.icon className="w-20 h-20 opacity-90" />}
                  <div>
                    <h2 className="text-6xl font-bold">{slide.title}</h2>
                    <p className="text-2xl opacity-90 mt-2">{slide.subtitle}</p>
                  </div>
                </div>

                {slide.content && Array.isArray(slide.content) && (
                  <div className="space-y-6 pl-4">
                    {typeof slide.content[0] === 'string' ? (
                      <ul className="space-y-5">
                        {(slide.content as string[]).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-4 text-2xl">
                            <span className="text-yellow-300 font-bold mt-1">→</span>
                            <span className="font-light">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="grid gap-6">
                        {(slide.content as any[]).map((item, idx) => (
                          <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                            {item.title && <h3 className="text-2xl font-bold mb-2">{item.title}</h3>}
                            {item.desc && <p className="text-xl opacity-90">{item.desc}</p>}
                            {item.step && (
                              <div>
                                <div className="text-2xl font-bold text-yellow-300 mb-2">{item.step}</div>
                                <div className="text-xl opacity-90">{item.desc}</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {slide.highlight && (
                  <div className="bg-yellow-400/20 backdrop-blur-md border-2 border-yellow-300/50 rounded-2xl p-6 mt-8">
                    <p className="text-2xl font-semibold text-yellow-100">{slide.highlight}</p>
                  </div>
                )}

                {slide.purpleCow && (
                  <div className="mt-12 space-y-6">
                    <div className="bg-white text-purple-600 rounded-3xl p-10 shadow-2xl transform hover:scale-105 transition-transform">
                      <p className="text-5xl font-black text-center">{slide.purpleCow}</p>
                    </div>
                    {slide.explanation && (
                      <p className="text-xl text-center opacity-90">{slide.explanation}</p>
                    )}
                    {slide.callout && (
                      <div className="text-center">
                        <div className="inline-block bg-white/20 backdrop-blur-md px-8 py-4 rounded-full border-2 border-white/30">
                          <p className="text-2xl font-bold">{slide.callout}</p>
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
          className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md rounded-full flex items-center justify-center transition-all group"
        >
          <ChevronLeft className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md rounded-full flex items-center justify-center transition-all group"
        >
          <ChevronRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full">
          <span className="text-white font-semibold">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
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

      {/* CSS for animations */}
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
      `}</style>
    </div>
  );
}
