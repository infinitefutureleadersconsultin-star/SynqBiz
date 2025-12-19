import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Synq<span className="text-primary-600">Biz</span>
          </h1>
          <p className="text-xl text-gray-600">
            Co-Founder Accountability Dashboard
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Track progress, manage metrics, and stay aligned on your journey to building SponsorSynq.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Built for Issiah McLean & Soya Diaoune
          </p>
        </div>
      </div>
    </main>
  );
}
