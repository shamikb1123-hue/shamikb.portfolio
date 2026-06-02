import React, { useState } from 'react';
import { Calendar, UserCheck, MessageCircle, AlertTriangle, Plus, ChevronRight, Activity } from 'lucide-react';

interface Grievance {
  id: string;
  topic: string;
  category: 'Infrastructure' | 'Curriculum' | 'Extracurricular' | 'Career';
  urgency: 'Medium' | 'High' | 'Critical';
  loggedAt: string;
  resolutionRate: number;
  outcome: string;
  status: 'In Progress' | 'Escalated to Faculty' | 'Resolved';
}

const INITIAL_EVENTS = [
  { id: 'ev1', title: 'Intra-SOM Club Business Case Bowl', time: '14:30 - Friday', room: 'Incubation Lab', host: 'Shamik Banerjee' },
  { id: 'ev2', title: 'Alumni Mentoring Session: Marketing Strategy', time: '11:00 - Monday', room: 'Seminar Hall 2', host: 'Inhub Board' },
  { id: 'ev3', title: 'Grievance Review Panel: Exam Re-schedules', time: '10:00 - Tuesday', room: 'Boardroom B', host: 'SRC Representative Council' }
];

const INITIAL_GRIEVANCES: Grievance[] = [
  {
    id: 'g1',
    topic: "Extend campus library hours in late evening until 7 PM during finals",
    category: "Infrastructure",
    urgency: "High",
    loggedAt: "May 25, 2026",
    resolutionRate: 88,
    outcome: "Librarian board approved. Extends up to 7:00 PM starting next week.",
    status: "Resolved"
  },
  {
    id: "g2",
    topic: "Add specific guest lecture modules on Digital SEO under BBA Marketing curriculum",
    category: "Curriculum",
    urgency: "Medium",
    loggedAt: "May 29, 2026",
    resolutionRate: 74,
    outcome: "Presented proposal to BBA academic board; guest specialist scheduled for June 12.",
    status: "Resolved"
  }
];

export default function ActivityPlanner() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [grievances, setGrievances] = useState<Grievance[]>(INITIAL_GRIEVANCES);
  const [newGrievanceText, setNewGrievanceText] = useState('');
  const [gCategory, setGCategory] = useState<'Infrastructure' | 'Curriculum' | 'Extracurricular' | 'Career'>('Curriculum');
  const [gUrgency, setGUrgency] = useState<'Medium' | 'High' | 'Critical'>('High');

  // New Event Forms
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventRoom, setNewEventRoom] = useState('Seminar Hall 1');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !newEventTime.trim()) return;

    const added = {
      id: Date.now().toString(),
      title: newEventTitle,
      time: newEventTime,
      room: newEventRoom,
      host: 'Shamik Banerjee (Chair)'
    };

    setEvents([...events, added]);
    setNewEventTitle('');
    setNewEventTime('');
  };

  const handleAddGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGrievanceText.trim()) return;

    // generate resolving rate
    let baseRate = 60;
    if (gUrgency === 'Medium') baseRate = 85;
    else if (gUrgency === 'High') baseRate = 72;
    else baseRate = 50; // Critical needs faculty boards approval, harder to resolve instantly

    const randAdjustment = Math.floor(Math.random() * 15);
    const finalRate = Math.min(99, baseRate + randAdjustment);

    let calculatedOutcome = '';
    if (gCategory === 'Curriculum') {
      calculatedOutcome = 'Scheduled syllabus sub-committee review under SOM Club guides.';
    } else if (gCategory === 'Infrastructure') {
      calculatedOutcome = 'Forwarded logistical request to Campus Administration Facilities Desk.';
    } else if (gCategory === 'Career') {
      calculatedOutcome = 'Liaised with placement cell to expand corporate invitation rosters.';
    } else {
      calculatedOutcome = 'Student Engagement Head requested funding approval from E-Cell treasury.';
    }

    const added: Grievance = {
      id: Date.now().toString(),
      topic: newGrievanceText,
      category: gCategory,
      urgency: gUrgency,
      loggedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      resolutionRate: finalRate,
      outcome: calculatedOutcome,
      status: gUrgency === 'Critical' ? 'Escalated to Faculty' : 'In Progress'
    };

    setGrievances([added, ...grievances]);
    setNewGrievanceText('');
  };

  const handleStatusToggle = (gId: string) => {
    setGrievances(prev => prev.map(g => {
      if (g.id === gId) {
        const nextStatus: Record<string, 'In Progress' | 'Escalated to Faculty' | 'Resolved'> = {
          'In Progress': 'Escalated to Faculty',
          'Escalated to Faculty': 'Resolved',
          'Resolved': 'In Progress'
        };
        return { 
          ...g, 
          status: nextStatus[g.status],
          outcome: nextStatus[g.status] === 'Resolved' ? 'Grievance parsed out fully and closed by representatives.' : g.outcome
        };
      }
      return g;
    }));
  };

  return (
    <div id="school_activity_planner" className="bg-charcoal-medium border border-charcoal-light rounded-xl p-5 md:p-6 text-gray-300">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-charcoal-light pb-4 mb-5">
        <div>
          <h4 className="text-xl font-display font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-5 bg-neon-orange rounded-full inline-block"></span>
            SOM Departmental Activity Planner
          </h4>
          <p className="text-xs text-gray-400 mt-1">Interactive workspace for planning club schedules and addressing student academic complaints</p>
        </div>
        <div className="flex items-center gap-2 bg-charcoal-dark border border-charcoal-light rounded-lg px-2.5 py-1 text-xs text-neon-orange">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Active Academic Chair Panel</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Events Schedule Console */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-neon-orange uppercase tracking-wider">Scheduled Department Events</span>
            <span className="text-[11px] text-gray-500 font-mono">Count: {events.length}</span>
          </div>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {events.map((ev) => (
              <div key={ev.id} className="bg-charcoal-dark p-3 rounded-lg border border-charcoal-light/70 relative hover:border-neon-orange/40 transition-colors">
                <span className="absolute top-2 right-2 text-[9px] bg-charcoal-light text-gray-400 px-1 py-0.5 rounded font-mono">
                  {ev.room}
                </span>
                <p className="text-xs font-semibold text-white pr-20">{ev.title}</p>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-2">
                  <Calendar className="w-3 h-3 text-neon-orange" />
                  <span>{ev.time}</span>
                  <span className="text-gray-600">|</span>
                  <span>Host: {ev.host}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Submit Event */}
          <form onSubmit={handleAddEvent} className="bg-charcoal-dark/50 p-4 border border-charcoal-light rounded-xl space-y-3">
            <span className="text-xs font-mono text-gray-400 block">Propose Lecture/Meeting</span>
            <div className="grid grid-cols-2 gap-2">
              <input 
                id="event_title_input"
                type="text" 
                placeholder="Event Theme" 
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full bg-charcoal-light border border-charcoal-light text-xs text-white rounded p-1.5 focus:outline-none focus:border-neon-orange"
              />
              <input 
                id="event_time_input"
                type="text" 
                placeholder="e.g. 15:00 - Tuesday" 
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="w-full bg-charcoal-light border border-charcoal-light text-xs text-white rounded p-1.5 focus:outline-none focus:border-neon-orange"
              />
            </div>
            <div className="flex gap-2">
              <select 
                id="event_room_select"
                value={newEventRoom}
                onChange={(e) => setNewEventRoom(e.target.value)}
                className="flex-1 bg-charcoal-light border border-charcoal-light text-xs rounded px-2 text-gray-300 focus:outline-none"
              >
                <option value="Incubation Lab">Incubation Lab</option>
                <option value="Seminar Hall 1">Seminar Hall 1</option>
                <option value="Auditorium Main">Auditorium Main</option>
                <option value="Online Zoom Grid">Online Zoom Grid</option>
              </select>
              <button 
                id="sumbit_proposal_btn"
                type="submit"
                className="bg-neon-orange text-black font-semibold text-xs px-3 py-1.5 rounded hover:bg-neon-orange-dark transition-colors cursor-pointer"
              >
                Submit Proposal
              </button>
            </div>
          </form>
        </div>

        {/* Academic Complaint/Grievance Resolver */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-neon-orange uppercase tracking-wider">Student Representative Council Ledger</span>
            <p className="text-[10px] text-gray-400">Click a badge to toggle representative status</p>
          </div>

          <div className="bg-charcoal-dark/50 border border-charcoal-light rounded-xl p-4 space-y-4">
            {/* Grievance Input Form */}
            <form onSubmit={handleAddGrievance} className="space-y-3">
              <label htmlFor="grievance_input" className="block text-xs font-medium text-gray-400">Log Student Grievance / Core Suggestion</label>
              <div className="flex gap-2">
                <input 
                  id="grievance_input"
                  type="text" 
                  value={newGrievanceText}
                  onChange={(e) => setNewGrievanceText(e.target.value)}
                  placeholder="e.g. Inadequate cafeteria sockets for laptops during lunch hours..."
                  className="flex-1 bg-charcoal-light border border-charcoal-light text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-neon-orange"
                />
              </div>

              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="flex gap-3 text-xs">
                  <div>
                    <label htmlFor="grievance_cat_select" className="inline text-gray-500 mr-1">Cat:</label>
                    <select 
                      id="grievance_cat_select"
                      value={gCategory} 
                      onChange={(e) => setGCategory(e.target.value as any)}
                      className="bg-charcoal-light border border-charcoal-light rounded text-[11px] p-0.5 text-white focus:outline-none"
                    >
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Curriculum">Curriculum</option>
                      <option value="Extracurricular">Extracurricular</option>
                      <option value="Career">Career</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="grievance_urgency_select" className="inline text-gray-500 mr-1 font-sans">Urgency:</label>
                    <select 
                      id="grievance_urgency_select"
                      value={gUrgency} 
                      onChange={(e) => setGUrgency(e.target.value as any)}
                      className="bg-charcoal-light border border-charcoal-light rounded text-[11px] p-0.5 text-white focus:outline-none"
                    >
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                <button 
                  id="log_grievance_btn"
                  type="submit"
                  className="bg-neon-orange hover:bg-neon-orange-dark text-black text-[11px] font-semibold py-1 px-3 rounded flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  Log to Board
                </button>
              </div>
            </form>

            {/* Grievance List Output */}
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 border-t border-charcoal-light/40 pt-3">
              {grievances.map((g) => (
                <div key={g.id} className="bg-charcoal-medium/55 p-3 rounded-lg border border-charcoal-light text-xs space-y-2 hover:border-charcoal-light/80 transition-colors">
                  <div className="flex justify-between items-start gap-2">
                    <p className="font-medium text-stone-200">{g.topic}</p>
                    <button 
                      id={`g_status_toggle_${g.id}`}
                      onClick={() => handleStatusToggle(g.id)}
                      className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-wide transition-colors uppercase select-none ${
                        g.status === 'Resolved' ? 'bg-emerald-900 text-emerald-300' :
                        g.status === 'Escalated to Faculty' ? 'bg-amber-950 text-amber-300 border border-amber-500/20' : 'bg-charcoal-light text-gray-300'
                      }`}
                    >
                      {g.status}
                    </button>
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-2 text-[10px] text-gray-500 pt-1 border-t border-charcoal-light/20">
                    <div className="flex gap-2">
                      <span>Category: <span className="text-gray-300">{g.category}</span></span>
                      <span>•</span>
                      <span>Urgency: <span className={`${g.urgency === 'Critical' ? 'text-red-400 font-semibold' : g.urgency === 'High' ? 'text-amber-400' : 'text-gray-400'}`}>{g.urgency}</span></span>
                    </div>
                    <div className="font-mono text-neon-orange text-[9px] flex items-center gap-1">
                      <Activity className="w-2.5 h-2.5" />
                      <span>Resolution Probability: {g.resolutionRate}%</span>
                    </div>
                  </div>

                  {g.outcome && (
                    <div className="p-1.5 bg-black/35 rounded text-[10px] text-gray-400 leading-normal border-l-2 border-neon-orange">
                      <span className="font-semibold text-gray-300">Strategy Liaison Dialogue:</span> {g.outcome}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
