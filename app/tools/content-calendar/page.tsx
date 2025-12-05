"use client";

import { useState } from "react";
import { Calendar, Plus, Trash2 } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";
import { getSEOMetadata } from "@/lib/seo-metadata";
import ShareButtons from "@/components/ShareButtons";

interface CalendarEvent {
  id: string;
  date: string;
  platform: string;
  content: string;
  time: string;
}

export default function ContentCalendarPage() {
  const tool = getToolById("content-calendar");
  const seo = tool ? getSEOMetadata(tool) : null;
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newEvent, setNewEvent] = useState({
    date: new Date().toISOString().split("T")[0],
    platform: "Instagram",
    content: "",
    time: "09:00"
  });

  const platforms = ["Instagram", "Twitter", "Facebook", "LinkedIn", "TikTok", "YouTube"];

  const addEvent = () => {
    if (!newEvent.content.trim()) {
      alert("Please enter content");
      return;
    }
    setEvents([
      ...events,
      {
        id: Date.now().toString(),
        ...newEvent
      }
    ]);
    setNewEvent({
      date: new Date().toISOString().split("T")[0],
      platform: "Instagram",
      content: "",
      time: "09:00"
    });
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const getEventsByDate = (date: string) => {
    return events.filter(e => e.date === date);
  };

  const getDaysInMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i).toISOString().split("T")[0]);
    }
    
    return days;
  };

  return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">Social Media Content Calendar - Plan & Schedule Posts Free</h1>
            <p className="text-slate-600">Plan and schedule your social media content with our free content calendar. Organize posts, track publishing dates, and manage multiple platforms. Boost your social media strategy.</p>
          </div>
        </div>
        <div className="mt-4">
          <ShareButtons
            title="Social Media Content Calendar"
            text="Check out this free content calendar tool!"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Add New Post</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Platform</label>
                <select
                  value={newEvent.platform}
                  onChange={(e) => setNewEvent({ ...newEvent, platform: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {platforms.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
                <textarea
                  value={newEvent.content}
                  onChange={(e) => setNewEvent({ ...newEvent, content: e.target.value })}
                  placeholder="Post content..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
              <button
                onClick={addEvent}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add to Calendar
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Calendar View</h2>
            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth().map((date, index) => {
                const dayEvents = getEventsByDate(date);
                const dayNum = new Date(date).getDate();
                const isToday = date === new Date().toISOString().split("T")[0];
                
                return (
                  <div
                    key={date}
                    className={`p-2 border rounded-lg min-h-[80px] ${
                      isToday ? "bg-blue-50 border-blue-300" : "border-slate-200"
                    }`}
                  >
                    <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : "text-slate-700"}`}>
                      {dayNum}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map(event => (
                        <div
                          key={event.id}
                          className="text-xs p-1 bg-slate-100 rounded truncate"
                          title={event.content}
                        >
                          {event.platform}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-slate-500">+{dayEvents.length - 2}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Posts</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {events.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No posts scheduled</p>
            ) : (
              events
                .sort((a, b) => new Date(a.date + "T" + a.time).getTime() - new Date(b.date + "T" + b.time).getTime())
                .map(event => (
                  <div key={event.id} className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </div>
                        <div className="text-xs text-slate-500">{event.platform}</div>
                      </div>
                      <button
                        onClick={() => removeEvent(event.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-slate-700">{event.content}</p>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {tool && <ToolComments toolId={tool.id} />}
      {tool && <ToolFAQ tool={tool} />}
      {tool && <RelatedTools currentTool={tool} />}
      {tool && <ToolDetailsSection tool={tool} />}
    </div>
    </>
  );
}

