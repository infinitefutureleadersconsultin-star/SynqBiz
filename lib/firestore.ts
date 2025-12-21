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
import type {
  IsaiahMetrics,
  SoyaMetrics,
  Idea,
  IdeaComment,
  PartnershipAgreement,
  Milestone,
  CalendarEvent,
  Task,
  CoFounder
} from '@/types';

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

// ============================================
// PHASE 4: THINK TANK / IDEAS
// ============================================

/**
 * Create a new idea
 */
export async function createIdea(idea: Omit<Idea, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const ideasRef = collection(db, 'ideas');
    const docRef = await addDoc(ideasRef, {
      ...idea,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    });

    return { success: true, id: docRef.id, error: null };
  } catch (error: any) {
    console.error('Error creating idea:', error);
    return { success: false, id: null, error: error.message };
  }
}

/**
 * Get all ideas
 */
export async function getAllIdeas(limitCount = 50) {
  try {
    const ideasRef = collection(db, 'ideas');
    const q = query(ideasRef, orderBy('created_at', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);

    const ideas: Idea[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      ideas.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString() || new Date().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString() || new Date().toISOString(),
      } as Idea);
    });

    return { data: ideas, error: null };
  } catch (error: any) {
    console.error('Error fetching ideas:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Update idea (for voting, status changes, etc.)
 */
export async function updateIdea(ideaId: string, updates: Partial<Idea>) {
  try {
    const ideaRef = doc(db, 'ideas', ideaId);
    await updateDoc(ideaRef, {
      ...updates,
      updated_at: Timestamp.now(),
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error updating idea:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Add comment to idea
 */
export async function addIdeaComment(comment: Omit<IdeaComment, 'id' | 'created_at'>) {
  try {
    const commentsRef = collection(db, 'idea_comments');
    const docRef = await addDoc(commentsRef, {
      ...comment,
      created_at: Timestamp.now(),
    });

    return { success: true, id: docRef.id, error: null };
  } catch (error: any) {
    console.error('Error adding comment:', error);
    return { success: false, id: null, error: error.message };
  }
}

/**
 * Get comments for an idea
 */
export async function getIdeaComments(ideaId: string) {
  try {
    const commentsRef = collection(db, 'idea_comments');
    const q = query(commentsRef, where('idea_id', '==', ideaId), orderBy('created_at', 'asc'));
    const querySnapshot = await getDocs(q);

    const comments: IdeaComment[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      comments.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString() || new Date().toISOString(),
      } as IdeaComment);
    });

    return { data: comments, error: null };
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    return { data: null, error: error.message };
  }
}

// ============================================
// PHASE 4: PARTNERSHIP AGREEMENT
// ============================================

/**
 * Create or update partnership agreement
 */
export async function savePartnershipAgreement(agreement: Omit<PartnershipAgreement, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const agreementRef = collection(db, 'partnership_agreements');
    const docId = `agreement_v${agreement.version}`;

    await setDoc(doc(agreementRef, docId), {
      ...agreement,
      updated_at: Timestamp.now(),
      created_at: Timestamp.now(),
    }, { merge: true });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error saving agreement:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get current partnership agreement
 * Simplified query to avoid Firestore index requirements
 */
export async function getCurrentAgreement() {
  try {
    const agreementRef = collection(db, 'partnership_agreements');
    // Simple query without composite index requirement
    const q = query(agreementRef, orderBy('created_at', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { data: null, error: null };
    }

    // Find first non-archived agreement
    let agreementDoc = null;
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      if (data.status !== 'archived') {
        agreementDoc = docSnapshot;
        break;
      }
    }

    if (!agreementDoc) {
      return { data: null, error: null };
    }

    const data = agreementDoc.data();
    const agreement: PartnershipAgreement = {
      id: agreementDoc.id,
      ...data,
      created_at: data.created_at?.toDate().toISOString() || new Date().toISOString(),
      updated_at: data.updated_at?.toDate().toISOString() || new Date().toISOString(),
    } as PartnershipAgreement;

    return { data: agreement, error: null };
  } catch (error: any) {
    console.error('Error fetching agreement:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Sign partnership agreement
 */
export async function signAgreement(
  agreementId: string,
  cofounder: 'issiah' | 'soya',
  signatureData: string,
  ipAddress: string
) {
  try {
    const agreementRef = doc(db, 'partnership_agreements', agreementId);
    const agreementDoc = await getDoc(agreementRef);

    if (!agreementDoc.exists()) {
      return { success: false, error: 'Agreement not found' };
    }

    const data = agreementDoc.data();
    const signatures = data.signatures || { issiah: { signed: false }, soya: { signed: false } };

    signatures[cofounder] = {
      signed: true,
      signature_data: signatureData,
      signed_at: new Date().toISOString(),
      ip_address: ipAddress,
    };

    // Check if both signed
    const bothSigned = signatures.issiah.signed && signatures.soya.signed;

    await updateDoc(agreementRef, {
      signatures,
      status: bothSigned ? 'fully_signed' : 'pending',
      updated_at: Timestamp.now(),
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error signing agreement:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// PHASE 4: MILESTONES
// ============================================

/**
 * Create a milestone
 */
export async function createMilestone(milestone: Omit<Milestone, 'id' | 'created_at' | 'updated_at' | 'completion_percentage'>) {
  try {
    const milestonesRef = collection(db, 'milestones');
    const completion_percentage = milestone.target_value > 0
      ? Math.min(100, Math.round((milestone.current_value / milestone.target_value) * 100))
      : 0;

    const docRef = await addDoc(milestonesRef, {
      ...milestone,
      completion_percentage,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    });

    return { success: true, id: docRef.id, error: null };
  } catch (error: any) {
    console.error('Error creating milestone:', error);
    return { success: false, id: null, error: error.message };
  }
}

/**
 * Update milestone progress
 */
export async function updateMilestone(milestoneId: string, updates: Partial<Milestone>) {
  try {
    const milestoneRef = doc(db, 'milestones', milestoneId);
    const milestoneDoc = await getDoc(milestoneRef);

    if (!milestoneDoc.exists()) {
      return { success: false, error: 'Milestone not found' };
    }

    const data = milestoneDoc.data();
    const current_value = updates.current_value ?? data.current_value;
    const target_value = updates.target_value ?? data.target_value;
    const completion_percentage = target_value > 0
      ? Math.min(100, Math.round((current_value / target_value) * 100))
      : 0;

    // Auto-update status based on completion
    let status = updates.status ?? data.status;
    if (completion_percentage === 100 && status !== 'completed') {
      status = 'completed';
      updates.completed_at = new Date().toISOString();
    } else if (completion_percentage > 0 && status === 'not_started') {
      status = 'in_progress';
    }

    await updateDoc(milestoneRef, {
      ...updates,
      completion_percentage,
      status,
      updated_at: Timestamp.now(),
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error updating milestone:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all milestones
 */
export async function getAllMilestones(filterBy?: { owner?: string; status?: string }) {
  try {
    const milestonesRef = collection(db, 'milestones');
    let q = query(milestonesRef, orderBy('deadline', 'asc'));

    if (filterBy?.owner) {
      q = query(milestonesRef, where('owner', '==', filterBy.owner), orderBy('deadline', 'asc'));
    }

    const querySnapshot = await getDocs(q);

    const milestones: Milestone[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const milestone = {
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString() || new Date().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString() || new Date().toISOString(),
        completed_at: data.completed_at || undefined,
      } as Milestone;

      // Filter by status if provided
      if (!filterBy?.status || milestone.status === filterBy.status) {
        milestones.push(milestone);
      }
    });

    return { data: milestones, error: null };
  } catch (error: any) {
    console.error('Error fetching milestones:', error);
    return { data: null, error: error.message };
  }
}

// ============================================
// PHASE 4: CALENDAR EVENTS
// ============================================

/**
 * Create a calendar event
 */
export async function createCalendarEvent(event: Omit<CalendarEvent, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const eventsRef = collection(db, 'calendar_events');
    const docRef = await addDoc(eventsRef, {
      ...event,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    });

    return { success: true, id: docRef.id, error: null };
  } catch (error: any) {
    console.error('Error creating event:', error);
    return { success: false, id: null, error: error.message };
  }
}

/**
 * Update a calendar event
 */
export async function updateCalendarEvent(eventId: string, updates: Partial<CalendarEvent>) {
  try {
    const eventRef = doc(db, 'calendar_events', eventId);
    await updateDoc(eventRef, {
      ...updates,
      updated_at: Timestamp.now(),
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error updating event:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a calendar event
 */
export async function deleteCalendarEvent(eventId: string) {
  try {
    const eventRef = doc(db, 'calendar_events', eventId);
    await deleteDoc(eventRef);

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error deleting event:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get calendar events within a date range
 */
export async function getCalendarEvents(startDate: string, endDate: string, userId?: string) {
  try {
    const eventsRef = collection(db, 'calendar_events');
    let q = query(
      eventsRef,
      where('start_time', '>=', startDate),
      where('start_time', '<=', endDate),
      orderBy('start_time', 'asc')
    );

    const querySnapshot = await getDocs(q);

    const events: CalendarEvent[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      events.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString() || new Date().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString() || new Date().toISOString(),
      } as CalendarEvent);
    });

    return { data: events, error: null };
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Get upcoming events (next 30 days)
 */
export async function getUpcomingEvents(limitCount = 10) {
  try {
    const now = new Date().toISOString();
    const thirtyDaysLater = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const eventsRef = collection(db, 'calendar_events');
    const q = query(
      eventsRef,
      where('start_time', '>=', now),
      where('start_time', '<=', thirtyDaysLater),
      where('status', '==', 'scheduled'),
      orderBy('start_time', 'asc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);

    const events: CalendarEvent[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      events.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString() || new Date().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString() || new Date().toISOString(),
      } as CalendarEvent);
    });

    return { data: events, error: null };
  } catch (error: any) {
    console.error('Error fetching upcoming events:', error);
    return { data: null, error: error.message };
  }
}

// ============================================
// WEEKLY TASKS
// ============================================

/**
 * Helper: Get Monday of current week
 */
function getMondayOfWeek(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  const monday = new Date(d.setDate(diff));
  return monday.toISOString().split('T')[0];
}

/**
 * Create a task
 */
export async function createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'week_of'>) {
  try {
    const tasksRef = collection(db, 'tasks');
    const week_of = getMondayOfWeek(new Date(task.due_date));

    const docRef = await addDoc(tasksRef, {
      ...task,
      week_of,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    });

    return { success: true, id: docRef.id, error: null };
  } catch (error: any) {
    console.error('Error creating task:', error);
    return { success: false, id: null, error: error.message };
  }
}

/**
 * Update a task
 */
export async function updateTask(taskId: string, updates: Partial<Task>) {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      ...updates,
      updated_at: Timestamp.now(),
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error updating task:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Complete a task and update related metrics
 */
export async function completeTask(taskId: string, userId: string) {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    const taskSnap = await getDoc(taskRef);

    if (!taskSnap.exists()) {
      return { success: false, error: 'Task not found' };
    }

    const task = taskSnap.data() as Task;

    // Update task status
    await updateDoc(taskRef, {
      status: 'completed',
      completed_at: new Date().toISOString(),
      updated_at: Timestamp.now(),
    });

    // If task has metrics_impact, update the relevant metrics
    if (task.metrics_impact && task.metrics_impact.metric_type && task.metrics_impact.metric_value) {
      const today = new Date().toISOString().split('T')[0];
      const metricType = task.metrics_impact.metric_type;
      const metricValue = task.metrics_impact.metric_value;

      // Update metrics based on owner
      if (task.owner === 'issiah') {
        // Get or create today's metrics
        const metricsRef = collection(db, 'isaiah_metrics');
        const q = query(metricsRef, where('user_id', '==', userId), where('date', '==', today));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Create new metrics entry
          await saveIssiahMetrics(userId, today, {
            [metricType]: metricValue,
            notes: `Completed task: ${task.title}`,
          });
        } else {
          // Update existing metrics
          const metricDoc = querySnapshot.docs[0];
          const existingValue = metricDoc.data()[metricType] || 0;
          await updateDoc(metricDoc.ref, {
            [metricType]: existingValue + metricValue,
            updated_at: Timestamp.now(),
          });
        }
      } else if (task.owner === 'soya') {
        // Similar logic for Soya's metrics
        const metricsRef = collection(db, 'soya_metrics');
        const q = query(metricsRef, where('user_id', '==', userId), where('date', '==', today));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          await saveSoyaMetrics(userId, today, {
            [metricType]: metricValue,
            notes: `Completed task: ${task.title}`,
          });
        } else {
          const metricDoc = querySnapshot.docs[0];
          const existingValue = metricDoc.data()[metricType] || 0;
          await updateDoc(metricDoc.ref, {
            [metricType]: existingValue + metricValue,
            updated_at: Timestamp.now(),
          });
        }
      }
    }

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error completing task:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a task
 */
export async function deleteTask(taskId: string) {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await deleteDoc(taskRef);
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error deleting task:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get tasks for current week
 */
export async function getCurrentWeekTasks(owner?: CoFounder) {
  try {
    const week_of = getMondayOfWeek();
    const tasksRef = collection(db, 'tasks');

    let q;
    if (owner) {
      q = query(
        tasksRef,
        where('week_of', '==', week_of),
        where('owner', '==', owner),
        orderBy('due_date', 'asc')
      );
    } else {
      q = query(
        tasksRef,
        where('week_of', '==', week_of),
        orderBy('due_date', 'asc')
      );
    }

    const querySnapshot = await getDocs(q);

    const tasks: Task[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tasks.push({
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString() || new Date().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString() || new Date().toISOString(),
        completed_at: data.completed_at || undefined,
      } as Task);
    });

    return { data: tasks, error: null };
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Get all tasks with optional filtering
 */
export async function getAllTasks(filterBy?: { owner?: CoFounder; status?: Task['status']; week_of?: string }) {
  try {
    const tasksRef = collection(db, 'tasks');
    let q = query(tasksRef, orderBy('due_date', 'asc'));

    if (filterBy?.owner) {
      q = query(tasksRef, where('owner', '==', filterBy.owner), orderBy('due_date', 'asc'));
    }

    const querySnapshot = await getDocs(q);

    const tasks: Task[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const task = {
        id: doc.id,
        ...data,
        created_at: data.created_at?.toDate().toISOString() || new Date().toISOString(),
        updated_at: data.updated_at?.toDate().toISOString() || new Date().toISOString(),
        completed_at: data.completed_at || undefined,
      } as Task;

      // Filter by status if provided
      if (!filterBy?.status || task.status === filterBy.status) {
        // Filter by week_of if provided
        if (!filterBy?.week_of || task.week_of === filterBy.week_of) {
          tasks.push(task);
        }
      }
    });

    return { data: tasks, error: null };
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return { data: null, error: error.message };
  }
}
