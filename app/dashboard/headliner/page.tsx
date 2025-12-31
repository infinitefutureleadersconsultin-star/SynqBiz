"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, DollarSign, TrendingUp, Users, Zap, Target, Award, ChevronDown, Presentation, Megaphone, ArrowLeft } from "lucide-react";

// Import pitch deck data
import { marketplaceStrategySlides } from "./decks/marketplace-strategy";
import { marketingRolloutSlides } from "./decks/marketing-rollout-2026";

type PitchDeck = {
  id: string;
  name: string;
  description: string;
  icon: any;
  gradient: string;
  slides: any[];
};

const pitchDecks: PitchDeck[] = [
  {
    id: "marketplace-strategy",
    name: "Marketplace Strategy & Positioning",
    description: "Our competitive positioning, free tier strategy, revenue model, and purple cow messaging",
    icon: Presentation,
    gradient: "from-blue-600 via-purple-600 to-pink-600",
    slides: marketplaceStrategySlides
  },
  {
    id: "marketing-rollout-2026",
    name: "Marketing Rollout 2026",
    description: "Brand strategy, customer acquisition plan, social channels, and go-to-market execution",
    icon: Megaphone,
    gradient: "from-orange-500 via-red-500 to-pink-600",
    slides: marketingRolloutSlides
  }
];

export default function HeadlinerPage() {
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeDeck = pitchDecks.find(deck => deck.id === selectedDeck);
  const slide = activeDeck?.slides[currentSlide];

  const nextSlide = () => {
    if (activeDeck && currentSlide < activeDeck.slides.length - 1) {
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

  const backToSelector = () => {
    setSelectedDeck(null);
    setCurrentSlide(0);
  };

  // Deck Selector View
  if (!selectedDeck) {
    return (
      <div className="min-h-screen -m-8 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-6xl w-full">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-7xl font-black text-white mb-4 tracking-tight">
                HEADLINER
              </h1>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-1.5 w-64 bg-gradient-to-r from-pink-500 via-blue-500 via-green-500 to-yellow-500 rounded-full"></div>
              </div>
              <p className="text-2xl text-white/80 font-light">
                Select a Pitch Deck to View
              </p>
            </div>

            {/* Deck Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {pitchDecks.map((deck, idx) => (
                <button
                  key={deck.id}
                  onClick={() => selectDeck(deck.id)}
                  className="group relative bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-3xl p-8 border-2 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-left animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${deck.gradient} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-300`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${deck.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <deck.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
                      {deck.name}
                    </h3>

                    <p className="text-white/70 text-lg leading-relaxed mb-6">
                      {deck.description}
                    </p>

                    <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">{deck.slides.length} slides</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer Info */}
            <div className="mt-12 text-center text-white/50 text-sm">
              <p>Use these decks to understand HEADLINER's strategy and market approach</p>
            </div>
          </div>
        </div>

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
            animation: fade-in 0.6s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    );
  }

  // Presentation View
  return (
    <div className="min-h-screen -m-8 bg-gray-900">
      {/* Back Button */}
      <button
        onClick={backToSelector}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white font-medium transition-all group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Decks
      </button>

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
                {slide.subtitle && (
                  <p className="text-3xl font-light opacity-90">
                    {slide.subtitle}
                  </p>
                )}
                {slide.tagline && (
                  <div className="pt-8">
                    <div className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full text-xl font-medium">
                      {slide.tagline}
                    </div>
                  </div>
                )}
              </div>
            )}

            {slide.type === "logo-analysis" && (
              <div className="text-white space-y-8 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-5xl font-bold mb-3">{slide.title}</h2>
                  <p className="text-xl opacity-90">{slide.subtitle}</p>
                </div>

                {/* Logo Display */}
                <div className="flex justify-center mb-12">
                  <div className="bg-gray-900 rounded-3xl p-16 border-2 border-white/20">
                    <div className="text-center">
                      <h1 className="text-8xl font-black tracking-tight text-white mb-4" style={{ letterSpacing: '0.05em' }}>
                        HEADLINER
                      </h1>
                      <div className="h-2 w-full bg-gradient-to-r from-pink-500 via-blue-500 via-green-500 to-yellow-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Analysis Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {slide.analysis?.map((item: any, idx: number) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                      <h3 className="text-xl font-bold mb-3 text-yellow-300">{item.aspect}</h3>
                      <p className="text-base opacity-90 leading-relaxed">{item.insight}</p>
                    </div>
                  ))}
                </div>

                {/* Strategic Recommendation */}
                {slide.recommendation && (
                  <div className="bg-yellow-400/20 backdrop-blur-md border-2 border-yellow-300/50 rounded-2xl p-8 mt-8">
                    <h3 className="text-2xl font-bold mb-4 text-yellow-300">Brand Strategy Recommendation:</h3>
                    <p className="text-xl font-medium text-yellow-100 leading-relaxed">{slide.recommendation}</p>
                  </div>
                )}
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

            {slide.type === "channels-grid" && (
              <div className="text-white space-y-8 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-5xl font-bold mb-3">{slide.title}</h2>
                  <p className="text-xl opacity-90">{slide.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {slide.channels?.map((channel: any, idx: number) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${channel.gradient} rounded-xl flex items-center justify-center`}>
                          {channel.icon && <channel.icon className="w-6 h-6 text-white" />}
                        </div>
                        <h3 className="text-2xl font-bold">{channel.name}</h3>
                      </div>

                      <p className="text-base opacity-90 mb-4">{channel.strategy}</p>

                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-yellow-300">Tactics:</div>
                        <ul className="space-y-2">
                          {channel.tactics?.map((tactic: string, tidx: number) => (
                            <li key={tidx} className="text-sm opacity-75 flex items-start gap-2">
                              <span className="text-yellow-300 mt-0.5">→</span>
                              <span>{tactic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {channel.kpi && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <div className="text-xs font-medium text-yellow-300">KPI: {channel.kpi}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.type === "timeline" && (
              <div className="text-white space-y-8 animate-fade-in">
                <div className="text-center mb-8">
                  <h2 className="text-5xl font-bold mb-3">{slide.title}</h2>
                  <p className="text-xl opacity-90">{slide.subtitle}</p>
                </div>

                <div className="space-y-6">
                  {slide.phases?.map((phase: any, idx: number) => (
                    <div key={idx} className="relative">
                      {/* Timeline Connector */}
                      {idx < slide.phases.length - 1 && (
                        <div className="absolute left-6 top-16 bottom-0 w-1 bg-gradient-to-b from-yellow-300 to-transparent"></div>
                      )}

                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 relative">
                        <div className="flex items-start gap-4">
                          {/* Phase Number */}
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-black text-white text-xl flex-shrink-0">
                            {idx + 1}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold">{phase.name}</h3>
                              <span className="text-sm px-3 py-1 bg-yellow-300/20 rounded-full text-yellow-300 font-medium">
                                {phase.timeframe}
                              </span>
                            </div>

                            <p className="text-base opacity-90 mb-4">{phase.description}</p>

                            <div className="grid md:grid-cols-2 gap-4">
                              {phase.actions?.map((action: string, aidx: number) => (
                                <div key={aidx} className="flex items-start gap-2 text-sm">
                                  <span className="text-green-300 mt-0.5">✓</span>
                                  <span className="opacity-90">{action}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

                {slide.cta && (
                  <div className="pt-8">
                    <div className="inline-block px-12 py-4 bg-white text-purple-600 rounded-full text-2xl font-bold shadow-2xl">
                      {slide.cta}
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
          disabled={activeDeck && currentSlide === activeDeck.slides.length - 1}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md rounded-full flex items-center justify-center transition-all group z-10"
        >
          <ChevronRight className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full z-10">
          <span className="text-white font-semibold">
            {currentSlide + 1} / {activeDeck?.slides.length}
          </span>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {activeDeck?.slides.map((_, idx) => (
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
