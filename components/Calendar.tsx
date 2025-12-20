"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/firebase";
import {
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  getCalendarEvents,
  getUpcomingEvents
} from "@/lib/firestore";
import type { CalendarEvent } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Clock,
  MapPin,
  Video,
  Trash2
} from "lucide-react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState<'issiah' | 'soya'>('issiah');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: 'meeting' as CalendarEvent['event_type'],
    start_time: '',
    end_time: '',
    all_day: false,
    location: '',
    meeting_link: '',
    attendees: [] as ('issiah' | 'soya')[],
    reminder_minutes: 15,
  });

  useEffect(() => {
    loadUserAndEvents();
  }, [currentDate]);

  async function loadUserAndEvents() {
    try {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.uid);
        setUserRole((user.user_metadata?.role || 'issiah') as 'issiah' | 'soya');
      }

      // Load events for current month
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const { data: monthEvents } = await getCalendarEvents(
        startOfMonth.toISOString(),
        endOfMonth.toISOString()
      );

      if (monthEvents) {
        setEvents(monthEvents);
      }

      // Load upcoming events
      const { data: upcoming } = await getUpcomingEvents(5);
      if (upcoming) {
        setUpcomingEvents(upcoming);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.start_time || !formData.end_time) {
      alert('Please fill in all required fields');
      return;
    }

    const newEvent = {
      title: formData.title,
      description: formData.description,
      event_type: formData.event_type,
      start_time: formData.start_time,
      end_time: formData.end_time,
      all_day: formData.all_day,
      attendees: formData.attendees,
      location: formData.location,
      meeting_link: formData.meeting_link,
      reminder_minutes: formData.reminder_minutes,
      status: 'scheduled' as const,
      created_by: userId,
    };

    const result = await createCalendarEvent(newEvent);

    if (result.success) {
      alert('Event created! 📅');
      setShowCreateForm(false);
      resetForm();
      await loadUserAndEvents();
    } else {
      alert(`Failed to create event: ${result.error}`);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    const result = await deleteCalendarEvent(eventId);

    if (result.success) {
      await loadUserAndEvents();
    } else {
      alert(`Failed to delete event: ${result.error}`);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_type: 'meeting',
      start_time: '',
      end_time: '',
      all_day: false,
      location: '',
      meeting_link: '',
      attendees: [],
      reminder_minutes: 15,
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start_time);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getEventTypeColor = (type: CalendarEvent['event_type']) => {
    const colors = {
      meeting: 'bg-blue-100 text-blue-700 border-blue-300',
      deadline: 'bg-red-100 text-red-700 border-red-300',
      milestone: 'bg-purple-100 text-purple-700 border-purple-300',
      reminder: 'bg-amber-100 text-amber-700 border-amber-300',
      other: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[type];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-primary-200">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 text-primary-600" />
              <CardTitle>Calendar & Events</CardTitle>
            </div>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                  const dayEvents = getEventsForDate(date);
                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(date)}
                      className={`aspect-square p-2 border rounded-lg hover:border-primary-500 transition-colors ${
                        isToday ? 'bg-primary-50 border-primary-300 font-semibold' : 'border-gray-200'
                      }`}
                    >
                      <div className="text-sm">{day}</div>
                      {dayEvents.length > 0 && (
                        <div className="mt-1 flex gap-0.5 flex-wrap">
                          {dayEvents.slice(0, 3).map((event) => (
                            <div
                              key={event.id}
                              className="w-1.5 h-1.5 rounded-full bg-primary-600"
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.length === 0 ? (
                  <p className="text-sm text-gray-600 text-center py-8">No upcoming events</p>
                ) : (
                  upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-lg border-2 ${getEventTypeColor(event.event_type)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                        <Clock className="w-3 h-3" />
                        {new Date(event.start_time).toLocaleString()}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      )}
                      {event.meeting_link && (
                        <div className="flex items-center gap-2 text-xs">
                          <Video className="w-3 h-3" />
                          <a
                            href={event.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline"
                          >
                            Join Meeting
                          </a>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-primary-50">
              <div className="flex items-center justify-between">
                <CardTitle>Create New Event</CardTitle>
                <button onClick={() => setShowCreateForm(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <Input
                  label="Event Title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  placeholder="e.g., Partnership Meeting with Acme Corp"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Additional details about the event..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Event Type
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={formData.event_type}
                      onChange={(e) => setFormData(prev => ({ ...prev, event_type: e.target.value as CalendarEvent['event_type'] }))}
                    >
                      <option value="meeting">Meeting</option>
                      <option value="deadline">Deadline</option>
                      <option value="milestone">Milestone</option>
                      <option value="reminder">Reminder</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Reminder (minutes before)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={formData.reminder_minutes}
                      onChange={(e) => setFormData(prev => ({ ...prev, reminder_minutes: parseInt(e.target.value) }))}
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="datetime-local"
                    label="Start Time"
                    value={formData.start_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                    required
                  />
                  <Input
                    type="datetime-local"
                    label="End Time"
                    value={formData.end_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="all_day"
                    checked={formData.all_day}
                    onChange={(e) => setFormData(prev => ({ ...prev, all_day: e.target.checked }))}
                    className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="all_day" className="text-sm text-gray-700">
                    All-day event
                  </label>
                </div>

                <Input
                  label="Location (optional)"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Conference Room A"
                />

                <Input
                  label="Meeting Link (optional)"
                  type="url"
                  value={formData.meeting_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, meeting_link: e.target.value }))}
                  placeholder="e.g., https://zoom.us/j/123456789"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Attendees
                  </label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.attendees.includes('issiah')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({ ...prev, attendees: [...prev.attendees, 'issiah'] }));
                          } else {
                            setFormData(prev => ({ ...prev, attendees: prev.attendees.filter(a => a !== 'issiah') }));
                          }
                        }}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Issiah</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.attendees.includes('soya')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({ ...prev, attendees: [...prev.attendees, 'soya'] }));
                          } else {
                            setFormData(prev => ({ ...prev, attendees: prev.attendees.filter(a => a !== 'soya') }));
                          }
                        }}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Soya</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="flex-1">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
