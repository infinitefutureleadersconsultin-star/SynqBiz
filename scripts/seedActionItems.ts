/**
 * Seed script to populate action items database with original detailed action items
 * Run this once to migrate from hardcoded action items to database-driven system
 *
 * Usage: npx ts-node scripts/seedActionItems.ts
 */

import { createActionItem } from '../lib/firestore';
import type { ActionItem } from '../types';

const originalActionItems = [
  // HIGH PRIORITY
  {
    title: "Landing Page Optimization & User Psychology",
    task: `Evaluate current landing page effectiveness and streamline if needed:

QUESTIONS TO ADDRESS:
• Is the landing page too busy or just right?
• Should we streamline the amount of copy?
• Are we overwhelming visitors with too much information?

PSYCHOLOGICAL GOAL:
• Get event hosts and sponsors to immediately understand what the platform does and why it matters
• Visitors are already interested (from outreach) - now guide them forward efficiently
• Show a few strong one-liners, not paragraphs
• Help them quickly grasp: saves time, makes money
• Highlight strategic pricing model (detailed in HEADLINER)
• Compel them to move OFF landing page and INTO the app

DESIRED USER FLOW:
1. Land on page → See clear value prop
2. Understand pricing benefits
3. Click to enter app (not get stuck reading)

IMPLEMENTATION:
• Review current copy and messaging
• Identify what can be removed or simplified
• A/B test different levels of detail
• Focus on conversion, not education`,
    context: "User Psychology and Conversion Optimization",
    impact: "At this stage, visitors are already interested through outreach. We don't need to sell them - we need to guide them into the app efficiently. Too much text creates friction. Strong one-liners + clear pricing + easy entry = better conversion. The landing page should be a gateway, not a textbook.",
    priority: "high" as const,
    created_by: "system",
    created_by_name: "issiah" as const,
  },
  {
    title: "Split Landing Page Implementation (Event Host vs Sponsor)",
    task: `Redesign landing page with personalized entry points like Hush app example:

LAYOUT STRUCTURE:
• Keep existing brand kit (colors, fonts, style)
• Keep main title and subtitle on first page
• Split first section into TWO personalized entry points:
  - LEFT: Event Host section
  - RIGHT: Sponsor section
• Similar to Hush app screenshot (For Men / For Women)
• But for us: Event Host / Sponsor

USER FLOW:
• Visitor clicks their section (Event Host or Sponsor)
• Takes them to dedicated page OR app with role-specific content
• Event Host sees: "It only takes one person to create an event"
• Sponsor sees: Different messaging tailored to sponsor needs
• Each user only sees content relevant to their role
• No confusion, no irrelevant information

BENEFITS:
• Personalized experience from first interaction
• Clear navigation path based on user type
• Reduces cognitive load (only see what applies to you)
• Professional, modern design pattern

IMPLEMENTATION:
• Design split hero section with two clickable areas
• Create separate landing pages or app routes for each user type
• Write role-specific copy for Event Hosts vs Sponsors
• Ensure smooth transition from landing page to app`,
    context: "Two-Sided Marketplace UX Best Practices",
    impact: "Generic landing pages create confusion. When an event host sees sponsor information (or vice versa), it dilutes the message and creates friction. Personalized entry points make each user feel like the platform was built specifically for them. Clear separation = better conversion and user experience.",
    priority: "high" as const,
    created_by: "system",
    created_by_name: "issiah" as const,
  },
  {
    title: "Platform Rebrand: SponsorSynq → HEADLINER",
    task: `Update all branding from SponsorSynq to HEADLINER:

LOGO STYLE REFERENCE:
• HEADLINER logo style (all caps, unconventional e's)
• Similar aesthetic to screenshot provided
• Modern, bold, standout design
• Rainbow/gradient underline element

WHERE TO UPDATE:
• Landing page header
• App logo and branding
• Navigation menu
• Email templates
• Marketing materials
• Social media profiles
• Domain name (if applicable)
• Legal documents and terms of service
• API documentation
• Competitor analysis references
• All customer-facing copy
• Internal documentation

BRAND POSITIONING:
• HEADLINER = You're the main act
• Positioning event hosts as the stars
• Sponsors help amplify the headliner
• Stronger, more aspirational brand identity

IMPLEMENTATION:
• Create new logo files and brand assets
• Update all codebase references (search/replace SponsorSynq)
• Update database references if needed
• Test all user-facing pages
• Coordinate rebrand announcement`,
    context: "Brand Identity and Market Positioning",
    impact: "HEADLINER is a stronger, more aspirational brand name. It positions event hosts as the stars (the headliners) rather than just sponsors being synced. The name creates immediate understanding and emotional connection. The bold, modern logo style stands out and feels professional. Rebrand now before scaling to avoid confusion later.",
    priority: "high" as const,
    created_by: "system",
    created_by_name: "issiah" as const,
  },
  {
    title: "Pricing Strategy Definition",
    task: `Finalize comprehensive pricing strategy - what to charge, why, and when:

QUESTIONS TO ANSWER:
• What exactly are we charging for?
• How much are we charging?
• When do we charge (upfront, per event, monthly, commission)?
• Why these prices (market research, competitor comparison, value-based)?
• What's included in free vs paid tiers?
• What's our pricing psychology (pay when you get paid)?

CURRENT PRICING MODEL (from competitor analysis):
• Free tier: ~8% total (3% processing + 5% platform fee)
• $100/mo tier: ~3% total (waives 5% platform fee)
• Sponsor commission: 12% of sponsor deals
• Breakeven: $2K/mo in ticket sales
• Instant payout: 1.5% capped at $15

NEED TO CLARIFY:
• Is this final or still being tested?
• Are there edge cases we haven't covered?
• How do we communicate pricing to different user types?
• What's the pricing for sponsors vs event hosts?
• Do we charge sponsors anything beyond the 12% commission?
• What about venue partnerships - any fees there?
• Promoter/affiliate commissions - who pays?

IMPLEMENTATION:
• Document complete pricing structure
• Create pricing comparison charts
• Write clear pricing page copy
• Define pricing for all user types and features
• Establish when to review/adjust pricing`,
    context: "Revenue Model and Competitive Positioning",
    impact: "We need absolute clarity on what we're charging and why before we can confidently sell to customers. Pricing affects everything: sales strategy, messaging, competitive positioning, customer acquisition. Without a clear, defensible pricing strategy, we risk undercharging (leaving money on table) or overcharging (losing customers). Must be finalized before major marketing push.",
    priority: "high" as const,
    created_by: "system",
    created_by_name: "issiah" as const,
  },
  {
    title: "Customer Presentation vs Internal Transactions",
    task: `Define clear distinction between customer-facing and internal views:

CUSTOMER-FACING (Event Pages, Sponsor Pages, Marketing):
• Simple, benefit-focused messaging
• Trust-building language
• ROI and value propositions
• Clean, minimal transaction details
• Focus on 'what you get' not 'how it works'

INTERNAL PLATFORM (Dashboard, Admin, Business Transactions):
• Detailed transaction breakdowns
• Compliance-focused documentation
• Full accounting transparency
• Technical specifications
• Audit trails and detailed reporting

IMPLEMENTATION:
• Create separate components for public vs internal views
• Document messaging guidelines for each context
• Ensure consistency but contextual appropriateness`,
    context: "User Experience and Trust Building",
    impact: "Customers and event hosts need different levels of detail. External presentation should be clean and benefit-driven to build trust and drive conversions. Internal platform should be transparent and detailed for accounting, compliance, and operational clarity. Mixing these creates confusion and erodes trust.",
    priority: "high" as const,
    created_by: "system",
    created_by_name: "soya" as const,
  },
  {
    title: "Daily Payouts (CRITICAL - Posh Has This)",
    task: `Automatic daily payouts as tickets sell:
• Hosts receive money daily instead of waiting 3-5 days
• Critical cash flow advantage for hosts paying vendors/venues upfront
• Include in $100/mo tier or offer as separate option
• Posh has this as standard - hosts will see our 3-5 day as downgrade

IMPLEMENTATION:
• Integrate with Stripe's scheduled payouts
• Allow hosts to choose daily vs standard
• Track payout history and show next payout date`,
    context: "CRITICAL FEATURE GAP vs Posh - Competitive Parity",
    impact: "CRITICAL GAP vs Posh. Their hosts get money daily. Ours wait 3-5 days. This is a major switching barrier. Without this, Posh hosts won't move to us even with sponsor marketplace advantage.",
    priority: "high" as const,
    created_by: "system",
    created_by_name: "soya" as const,
  },
  {
    title: "SMS Marketing (CRITICAL - Posh Has This)",
    task: `SMS broadcast capabilities matching Posh:
• Send SMS blasts to past attendees about new events
• Segment by event category, location, purchase history
• Track conversion rates (Posh claims 32% of inventory sold via SMS)
• Automated notifications when new events match attendee interests
• Include in $100/mo tier

IMPLEMENTATION:
• Integrate Twilio or similar SMS API
• Build audience segmentation tools
• Track SMS → ticket conversion`,
    context: "CRITICAL FEATURE GAP vs Posh - Revenue Driver",
    impact: "CRITICAL GAP vs Posh. They sell 32% of tickets through SMS blasts. This is a proven, high-ROI re-engagement channel. Without it, our $100 tier is incomplete compared to Posh's free features.",
    priority: "high" as const,
    created_by: "system",
    created_by_name: "soya" as const,
  },
  {
    title: "Promoter System Enhancement (Match Posh Kickback)",
    task: `Enhanced promoter/affiliate system matching Posh Kickback:
• PUBLIC Kickback: All ticket buyers get referral link automatically
• PRIVATE Kickback: Invite-only for influencers/partners
• Automatic commission tracking via unique links + QR codes
• Automatic payouts every 1-2 business days
• Detailed analytics showing sales/conversions per promoter
• Host sets commission (flat fee or %)

NOTE: Posh gets 11% avg additional revenue from Kickback
NOTE: Posh charges 20% platform fee on Kickback commissions`,
    context: "Viral Growth Engine - Competitor Feature Parity",
    impact: "Posh's Kickback is mature and proven ($35K additional revenue for top events). Our planned promoter system must match or exceed this. Public kickback (all buyers become affiliates) is genius for viral growth.",
    priority: "high" as const,
    created_by: "system",
    created_by_name: "soya" as const,
  },
  {
    title: "Event Collaboration/Co-hosting",
    task: `Multi-host event collaboration system:
• Primary & secondary event hosts
• Real-time ticket revenue tracking for all hosts
• Customizable revenue split (50/50, 60/40, etc.)
• Primary host controls fund distribution
• Venue payment tracking/metrics
• Multi-city tour dashboard
• Track all events under one tour umbrella`,
    context: "UNIQUE DIFFERENTIATOR - Network Effects",
    impact: "UNIQUE DIFFERENTIATOR. Neither Eventbrite nor Posh have this. Creates network effects - hosts bring other hosts. Game-changer for tours and large-scale events.",
    priority: "high" as const,
    created_by: "system",
    created_by_name: "soya" as const,
  },
  {
    title: "Venue Partnership System (ULTIMATE MOAT)",
    task: `Venue integration + lock-in strategy:
• Venues can create accounts
• Event hosts connect their venue
• Transparent revenue sharing dashboard
• Track bar/food/door splits in real-time
• Simple fund distribution

VENUE LOCK-IN STRATEGY:
• Partner with venues to require HEADLINER
• 'Want to use our venue? Use HEADLINER'
• Creates vendor lock-in
• Eliminates competition with Eventbrite/Posh`,
    context: "ULTIMATE COMPETITIVE MOAT - Distribution Channel Ownership",
    impact: "ULTIMATE COMPETITIVE MOAT. Neither competitor has this. If venues require HEADLINER, hosts have no choice. We stop competing on features and own the distribution channel. Market domination strategy.",
    priority: "high" as const,
    created_by: "system",
    created_by_name: "issiah" as const,
  },
  {
    title: "Team Permissions (CRITICAL - Both Competitors Have This)",
    task: `Role-based team access:
• Admin: Full access to everything
• Finance: Revenue, payouts, refunds only
• Marketing: SMS, promotions, analytics only
• Door Staff: Check-in only
• Custom roles with granular permissions

USE CASE: Large events have teams - promoters, door staff, marketing, finance
Posh and Eventbrite both have robust team management`,
    context: "TABLE STAKES - Enterprise Feature Parity",
    impact: "TABLE STAKES feature both competitors have. Professional events need team collaboration. Without this, we look amateur compared to Posh/Eventbrite.",
    priority: "high" as const,
    created_by: "system",
    created_by_name: "soya" as const,
  },

  // MEDIUM PRIORITY
  {
    title: "Performance Tracking",
    task: `Analytics dashboard tracking ROI of paid features

WHERE: Event host dashboard - 'Marketing Performance' section

WHEN: After event hosts use Event Boost ($15) or Featured Placement ($29)

HOW IT WORKS:
• Track views, clicks, sponsor offers received
• Compare boosted vs non-boosted events
• Show ROI: 'You spent $15, received 3 sponsor offers worth $500'
• Export performance reports

WHY: Event hosts won't pay for Boost/Featured unless they see proof it works. Need data to justify these upgrades and show clear ROI.`,
    context: "Product Analytics and Monetization",
    impact: "Users need proof that paying for Boost/Featured actually brings more sponsors. Without tracking, they won't trust these features are worth the money. Data-driven justification drives adoption.",
    priority: "medium" as const,
    created_by: "system",
    created_by_name: "soya" as const,
  },
  {
    title: "Instant Payout Cap",
    task: `Maximum fee limit on instant payout feature

WHERE: Payout settings page when event host requests instant transfer

WHEN: Event host clicks 'Get Paid Now' instead of waiting 3-5 days

HOW IT WORKS:
• Current: 1.5% of payout (unlimited)
• Updated: 1.5% of payout, capped at $15 max
• Example: $10,000 payout = $15 fee (not $150)
• Small payouts: $500 = $7.50 (still 1.5%)

WHY: Large event hosts avoid instant payout because 1.5% of $10K = $150 fee. With a $15 cap, they'll actually use it. Makes feature attractive to high-revenue events.`,
    context: "Feature Adoption and Revenue Optimization",
    impact: "Without a cap, high-earning event hosts see instant payout as too expensive ($150 on $10K). A $15 cap makes it affordable for large events while maintaining revenue on smaller payouts.",
    priority: "medium" as const,
    created_by: "system",
    created_by_name: "soya" as const,
  },
  {
    title: "Annual Subscription",
    task: `Yearly payment option for $100/mo subscription

WHERE: Pricing page and subscription settings

WHEN: Event hosts choose subscription plan (currently $100/month only)

HOW IT WORKS:
• Current: $100/month only ($1,200/year)
• Add option: $1,000/year (save $200, ~17% discount)
• Locks in user for 12 months
• Same benefits: Waives 5% platform fee, re-engagement, promoters, collaboration, premium analytics
• Auto-renewal with option to cancel

WHY: Annual commitments improve revenue predictability and reduce churn. Users who pay upfront are more invested in the platform. Industry standard pricing psychology.`,
    context: "Revenue Model and Customer Retention",
    impact: "Annual subscriptions lock in committed hosts, reduce monthly churn, and improve financial predictability. $200 discount incentivizes yearly commitment while maintaining strong revenue per customer.",
    priority: "medium" as const,
    created_by: "system",
    created_by_name: "issiah" as const,
  },
  {
    title: "Tiered Boost Options",
    task: `Multiple Event Boost pricing tiers based on duration

WHERE: Event creation/editing page - 'Promote Your Event' section

WHEN: Event host wants to attract sponsors faster

HOW IT WORKS:
• Current: $15 for 7 days only
• Add tiers:
  - Quick Boost: $10 for 3 days (last-minute events)
  - Standard Boost: $15 for 7 days (current option)
  - Extended Boost: $25 for 14 days (early planning)
• Shows estimated sponsor reach per tier
• Can purchase multiple boosts per event

WHY: Different events have different timelines. Club events (short notice) need 3-day boost. Corporate events (planned ahead) benefit from 14-day visibility. Flexibility increases adoption.`,
    context: "Product Flexibility and Monetization",
    impact: "One-size-fits-all doesn't work. Last-minute events need short boosts, planned events need extended visibility. Tiered pricing captures different customer segments and increases total boost revenue.",
    priority: "medium" as const,
    created_by: "system",
    created_by_name: "soya" as const,
  },

  // LOW PRIORITY
  {
    title: "Enterprise Compliance",
    task: `University-specific admin features for event oversight

WHERE: Admin dashboard for university administrators

WHEN: Universities require institutional control before allowing student event hosting

HOW IT WORKS:
• Approval Workflows: Student org submits event → admin reviews/approves before going live
• Audit Trails: Track who created/edited/approved each event, timestamp everything
• SIS Integration: Connect to Student Information System to verify student status, majors, orgs
• Budget Controls: Set spending limits per org, require multi-level approval for large events
• Compliance Reports: Export event data for Title IX, liability, budget reviews

WHY: Universities won't adopt without institutional oversight. Legal/compliance departments require approval chains and audit capabilities. This unlocks $10K-25K/year enterprise contracts.`,
    context: "Enterprise Sales and Compliance",
    impact: "Universities have strict compliance requirements (Title IX, budget accountability, liability). Without admin controls and audit trails, they legally cannot let students use the platform. Required for enterprise sales.",
    priority: "low" as const,
    created_by: "system",
    created_by_name: "soya" as const,
  },
  {
    title: "Leaderboards",
    task: `Public rankings of top-performing ambassadors

WHERE: Ambassador dashboard and public leaderboard page

WHEN: Ambassadors view their stats and compare performance

HOW IT WORKS:
• Real-time rankings based on:
  - Total referrals (new event hosts brought in)
  - Revenue generated from referrals
  - Active users (referrals still using platform)
  - Tier status (Starter, Rising, Elite, Founding)
• Show top 10 globally, top 3 in user's region
• Display earnings: 'Top ambassador earned $2,450 this month'
• Gamification: Badges for milestones (10 referrals, $1K earned, etc.)
• Monthly resets with Hall of Fame for all-time leaders

WHY: Shows ambassadors what's possible ('If they earned $2K, I can too'). Creates competitive motivation. Proves the program is real and lucrative. Drives ambassador recruitment and activity.`,
    context: "Gamification and Ambassador Program",
    impact: "Social proof drives action. When potential ambassadors see others earning $1K+/month, they're motivated to join. Competition pushes existing ambassadors to recruit harder. Makes program feel legitimate and achievable.",
    priority: "low" as const,
    created_by: "system",
    created_by_name: "issiah" as const,
  },
];

async function seed() {
  console.log('Starting action items seed...');
  console.log(`Seeding ${originalActionItems.length} action items...`);

  for (const item of originalActionItems) {
    try {
      const result = await createActionItem(item);
      if (result.success) {
        console.log(`✓ Created: ${item.title}`);
      } else {
        console.error(`✗ Failed to create ${item.title}:`, result.error);
      }
    } catch (error) {
      console.error(`✗ Error creating ${item.title}:`, error);
    }
  }

  console.log('\nSeed complete!');
  console.log('All original action items have been migrated to the database.');
  console.log('They can now be viewed, edited, and approved through the Overview dashboard.');
}

// Run the seed
seed().catch(console.error);
