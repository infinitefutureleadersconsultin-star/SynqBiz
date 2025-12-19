import { db } from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import type { IsaiahMetrics, SoyaMetrics } from '@/types';

// ============================================
// ISSIAH'S METRICS
// ============================================

/**
 * Save or update Issiah's metrics for a specific date
 */
export async function saveIssiahMetrics(
  userId: string,
  date: string,
  metrics: Partial<Omit<IsaiahMetrics, 'id' | 'user_id' | 'date' | 'created_at' | 'updated_at'>>
) {
  try {
    const metricsRef = collection(db, 'isaiah_metrics');
    const docId = `${userId}_${date}`;

    await setDoc(doc(metricsRef, docId), {
      user_id: userId,
      date,
      outreach_contacts: metrics.outreach_contacts || 0,
      meetings_scheduled: metrics.meetings_scheduled || 0,
      partnership_emails: metrics.partnership_emails || 0,
      business_concepts: metrics.business_concepts || 0,
      college_outreach: metrics.college_outreach || 0,
      personal_brand_posts: metrics.personal_brand_posts || 0,
      event_host_outreach: metrics.event_host_outreach || 0,
      enterprise_outreach: metrics.enterprise_outreach || 0,
      notes: metrics.notes || '',
      updated_at: Timestamp.now(),
      created_at: Timestamp.now(),
    }, { merge: true });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error saving Issiah metrics:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get Issiah's metrics for a specific date
 */
export async function getIssiahMetricsByDate(userId: string, date: string) {
  try {
    const docId = `${userId}_${date}`;
    const docRef = doc(db, 'isaiah_metrics', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() } as IsaiahMetrics, error: null };
    }
    return { data: null, error: null };
  } catch (error: any) {
    console.error('Error getting Issiah metrics:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Get all of Issiah's metrics (for charts/history)
 */
export async function getAllIssiahMetrics(userId: string, limitCount = 30) {
  try {
    const metricsRef = collection(db, 'isaiah_metrics');
    const q = query(
      metricsRef,
      where('user_id', '==', userId),
      orderBy('date', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const metrics: IsaiahMetrics[] = [];

    querySnapshot.forEach((doc) => {
      metrics.push({ id: doc.id, ...doc.data() } as IsaiahMetrics);
    });

    return { data: metrics, error: null };
  } catch (error: any) {
    console.error('Error getting all Issiah metrics:', error);
    return { data: [], error: error.message };
  }
}

// ============================================
// SOYA'S METRICS
// ============================================

/**
 * Save or update Soya's metrics for a specific date
 */
export async function saveSoyaMetrics(
  userId: string,
  date: string,
  metrics: Partial<Omit<SoyaMetrics, 'id' | 'user_id' | 'date' | 'created_at' | 'updated_at'>>
) {
  try {
    const metricsRef = collection(db, 'soya_metrics');
    const docId = `${userId}_${date}`;

    await setDoc(doc(metricsRef, docId), {
      user_id: userId,
      date,
      revenue_milestone: metrics.revenue_milestone || 0,
      ui_improvements: metrics.ui_improvements || 0,
      user_signups: metrics.user_signups || 0,
      support_tickets_resolved: metrics.support_tickets_resolved || 0,
      app_uptime_percentage: metrics.app_uptime_percentage || 0,
      onboarding_completion_rate: metrics.onboarding_completion_rate || 0,
      feedback_collected: metrics.feedback_collected || 0,
      retention_rate: metrics.retention_rate || 0,
      facebook_ads_spent: metrics.facebook_ads_spent || 0,
      features_shipped: metrics.features_shipped || 0,
      notes: metrics.notes || '',
      updated_at: Timestamp.now(),
      created_at: Timestamp.now(),
    }, { merge: true });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error saving Soya metrics:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get Soya's metrics for a specific date
 */
export async function getSoyaMetricsByDate(userId: string, date: string) {
  try {
    const docId = `${userId}_${date}`;
    const docRef = doc(db, 'soya_metrics', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() } as SoyaMetrics, error: null };
    }
    return { data: null, error: null };
  } catch (error: any) {
    console.error('Error getting Soya metrics:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Get all of Soya's metrics (for charts/history)
 */
export async function getAllSoyaMetrics(userId: string, limitCount = 30) {
  try {
    const metricsRef = collection(db, 'soya_metrics');
    const q = query(
      metricsRef,
      where('user_id', '==', userId),
      orderBy('date', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const metrics: SoyaMetrics[] = [];

    querySnapshot.forEach((doc) => {
      metrics.push({ id: doc.id, ...doc.data() } as SoyaMetrics);
    });

    return { data: metrics, error: null };
  } catch (error: any) {
    console.error('Error getting all Soya metrics:', error);
    return { data: [], error: error.message };
  }
}

// ============================================
// AGGREGATE STATS (for overview dashboard)
// ============================================

/**
 * Calculate aggregate stats from metrics
 */
export function calculateStats(metrics: (IsaiahMetrics | SoyaMetrics)[]) {
  if (metrics.length === 0) {
    return {
      total: 0,
      thisWeek: 0,
      thisMonth: 0,
      trend: 'neutral' as const,
      change: 0
    };
  }

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const total = metrics.length;
  const thisWeek = metrics.filter(m => new Date(m.date) >= weekAgo).length;
  const thisMonth = metrics.filter(m => new Date(m.date) >= monthAgo).length;

  // Simple trend calculation
  const trend = thisWeek > (thisMonth / 4) ? 'up' : thisWeek < (thisMonth / 4) ? 'down' : 'neutral';
  const change = thisWeek > 0 ? Math.round((thisWeek / (thisMonth / 4) - 1) * 100) : 0;

  return {
    total,
    thisWeek,
    thisMonth,
    trend: trend as 'up' | 'down' | 'neutral',
    change
  };
}
