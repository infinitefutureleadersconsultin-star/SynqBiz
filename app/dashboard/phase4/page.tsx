"use client";

import { useState } from "react";
import PartnershipAgreement from "@/components/PartnershipAgreement";
import ThinkTank from "@/components/ThinkTank";
import Milestones from "@/components/Milestones";
import Calendar from "@/components/Calendar";
import Card, { CardContent } from "@/components/ui/Card";
import { FileText, Lightbulb, Target, CalendarIcon } from "lucide-react";

type Tab = 'agreement' | 'think-tank' | 'milestones' | 'calendar';

export default function Phase4Page() {
  const [activeTab, setActiveTab] = useState<Tab>('think-tank');

  const tabs = [
    {
      id: 'think-tank' as Tab,
      name: 'Think Tank',
      icon: Lightbulb,
      description: 'Share and discuss ideas',
    },
    {
      id: 'milestones' as Tab,
      name: 'Milestones',
      icon: Target,
      description: '6-month productivity goals',
    },
    {
      id: 'calendar' as Tab,
      name: 'Calendar',
      icon: CalendarIcon,
      description: 'Events and scheduling',
    },
    {
      id: 'agreement' as Tab,
      name: 'Partnership Agreement',
      icon: FileText,
      description: '50/50 partnership contract',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Phase 4: Collaboration & Legal</h1>
        <p className="text-gray-600 mt-1">
          Partnership agreement, ideas board, milestones, and calendar
        </p>
      </div>

      {/* Tab Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    isActive
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? 'text-primary-600' : 'text-gray-600'
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        isActive ? 'text-primary-900' : 'text-gray-900'
                      }`}
                    >
                      {tab.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{tab.description}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <div>
        {activeTab === 'agreement' && <PartnershipAgreement />}
        {activeTab === 'think-tank' && <ThinkTank />}
        {activeTab === 'milestones' && <Milestones />}
        {activeTab === 'calendar' && <Calendar />}
      </div>
    </div>
  );
}
