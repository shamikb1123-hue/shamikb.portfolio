import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCw, AlertTriangle, MessageSquare, Volume2, HelpCircle } from 'lucide-react';

const RANDOM_TOPIC_PROMPTS = [
  "Empathy should compete with Strategy: Why modern HR drives long term venture profits.",
  "Failing Forward: How a student E-Cell experience transforms academic theory into street smarts.",
  "The 60-Second Elevator Pitch: How to hook an investor before the lift doors slide open.",
  "Silent Leadership: Why active listening is the ultimate public speaking cheat-code.",
  "Siliguri to the World: Scaling regional business ecosystems beyond tier-one boundaries.",
  "Public Speaking: Overcoming stage anxiety with physical grounding techniques.",
  "Storytelling & Branding: Why people buy stories, not features or margins."
];

const PITCH_TEMPLATES: Record<string, string[]> = {
  "Empathy should compete with Strategy: Why modern HR drives long term venture profits.": [
    "HOOK: 'Most companies treat employees like rows on a spreadsheet, but human energy is the only thing that doesn't depreciate.'",
    "THE STORY: Share how student coordinators in SOM Club solved attendance drops by directly listening to classmate workloads rather than issuing penalties.",
    "ACTION: Recommend creating 'feedback-loops before policy-blocks' to retain talent during crucial incubations."
  ],
  "Failing Forward: How a student E-Cell experience transforms academic theory into street smarts.": [
    "HOOK: 'In high school, we are taught to memorise first and test later. In entrepreneurship, you test first, fail, and learn the lesson afterwards.'",
    "THE STORY: Describe taking a risk with an E-Cell workshop that only initial 10 students registered for, and pivoting to late-night delivery themes.",
    "ACTION: Encourage students to fail at least once inside safe, non-graded academic environments."
  ],
  "The 60-Second Elevator Pitch: How to hook an investor before the lift doors slide open.": [
    "HOOK: 'If your value proposition takes three minutes to explain, it represents a feature, not a business model.'",
    "THE STORY: Show how clarifying the core value of Inhub to simple 'student delivery' raised engagement instantly.",
    "ACTION: Craft a single, crisp story sentence including target niche, problem, and unique solution."
  ],
  "Silent Leadership: Why active listening is the ultimate public speaking cheat-code.": [
    "HOOK: 'We are gifted with two ears and one mouth for a very specific ratio.'",
    "THE STORY: Talk about balancing grievances in the Student Representative Council by sitting in the back of the lecture halls first.",
    "ACTION: Let the interlocutor fully exhaust their ideas before putting forward the academic response."
  ]
};

export default function SpeechCoach() {
  const [topic, setTopic] = useState(RANDOM_TOPIC_PROMPTS[0]);
  const [time, setTime] = useState(0); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Toastmasters Card Colors:
  // Green at 60s (1 min)
  // Yellow at 90s (1.5 min)
  // Red at 120s (2 mins)
  const getCardColor = () => {
    if (time >= 120) return 'bg-[#3b0b0a] border-red-500 text-red-100'; // red card
    if (time >= 90) return 'bg-[#2e2a04] border-yellow-500 text-yellow-100'; // yellow card
    if (time >= 60) return 'bg-[#092612] border-emerald-500 text-emerald-100'; // green card
    return 'bg-charcoal-dark border-charcoal-light text-gray-300'; // neutral dark card
  };

  const getCardBadge = () => {
    if (time >= 120) return { label: 'RED CARD LIMIT', css: 'bg-red-500 text-black' };
    if (time >= 90) return { label: 'YELLOW WARNING', css: 'bg-yellow-500 text-black' };
    if (time >= 60) return { label: 'GREEN PASS QUALIFIED', css: 'bg-emerald-500 text-black' };
    return { label: 'PREPARING / ICEBREAKER', css: 'bg-gray-700 text-gray-200' };
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const handleTopicShuffle = () => {
    const remaining = RANDOM_TOPIC_PROMPTS.filter(t => t !== topic);
    const chosen = remaining[Math.floor(Math.random() * remaining.length)];
    setTopic(chosen);
    // Reset stopwatch on shuffle
    setIsActive(false);
    setTime(0);
  };

  const handleTextChange = (text: string) => {
    setSpeechText(text);
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    setWordCount(words);
    
    // Calculate running speed (assuming typical spoken speed if read out loud)
    if (time > 0) {
      const runningWpm = Math.round((words / time) * 60);
      setWpm(runningWpm);
    }
  };

  const formatTimer = (totSeconds: number) => {
    const mins = Math.floor(totSeconds / 60);
    const secs = totSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getWpmStatus = (speed: number) => {
    if (speed === 0) return { text: 'Not speaking yet', color: 'text-gray-400' };
    if (speed < 110) return { text: 'Comfortable Pace (Subtle / Relaxed)', color: 'text-sky-400' };
    if (speed <= 150) return { text: 'Optimal Speaking Flow (110 - 150 WPM)', color: 'text-emerald-400' };
    return { text: 'Fast Pace (Ensure articulation is clear)', color: 'text-amber-400 font-semibold animate-pulse' };
  };

  return (
    <div id="toastmasters_companion" className="bg-charcoal-medium border border-charcoal-light rounded-xl p-5 md:p-6 text-gray-300">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-charcoal-light pb-4 mb-5">
        <div>
          <h4 className="text-xl font-display font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-5 bg-neon-orange rounded-full inline-block"></span>
            Toastmasters Pitch & Timer Companion
          </h4>
          <p className="text-xs text-gray-400 mt-1">Interactive stopwatch evaluator aligned with professional public speaking timing standards</p>
        </div>
        <div className="flex bg-charcoal-dark border border-charcoal-light rounded-lg divide-x divide-charcoal-light text-xs shrink-0 overflow-hidden">
          <span className="px-2.5 py-1 text-gray-400 font-mono">Min: 1:00</span>
          <span className="px-2.5 py-1 text-gray-400 font-mono">Mid: 1:30</span>
          <span className="px-2.5 py-1 text-gray-400 font-mono">Max: 2:00</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-charcoal-dark border border-charcoal-light rounded-xl p-4 space-y-3 relative">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-neon-orange uppercase tracking-wider">Impromptu Challenge Card</span>
              <button 
                id="shuffle_prompts_btn"
                onClick={handleTopicShuffle}
                className="text-xs text-[#ff8c40] hover:text-white transition-colors underline cursor-pointer"
              >
                Shuffle Prompt
              </button>
            </div>
            
            <p className="text-md font-display font-semibold text-white leading-snug">
              &ldquo;{topic}&rdquo;
            </p>

            <p className="text-[11px] text-gray-400">
              Practice delivering a 2-minute impromptu talk on this business-focused concept.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="speech_dictation_box" className="text-xs font-mono text-gray-400">Practice Speech Dictation Pad</label>
              <div className="text-[11px] text-gray-500">
                WPM: <span className="text-white font-semibold font-mono">{wpm}</span> words/min
              </div>
            </div>
            <textarea 
              id="speech_dictation_box"
              value={speechText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Start drafting or typing your spoken thoughts in this placeholder box, then view your calculated articulation speed metrics..."
              className="w-full h-36 bg-charcoal-dark border border-charcoal-light text-sm text-gray-300 rounded-xl p-3 focus:outline-none focus:border-neon-orange placeholder-gray-600 resize-none"
            />
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Total counted words: <span className="font-semibold text-white font-mono">{wordCount}</span></span>
              <span className={getWpmStatus(wpm).color}>{getWpmStatus(wpm).text}</span>
            </div>
          </div>
        </div>

        {/* Stopwatch card evaluator */}
        <div className="flex flex-col justify-between">
          <div className={`p-5 rounded-xl border flex-grow flex flex-col justify-between transition-all duration-300 ${getCardColor()}`}>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                Toastmasters Timer Signal
              </span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase ${getCardBadge().css}`}>
                {getCardBadge().label}
              </span>
            </div>

            <div className="text-center py-6">
              <div className="text-5xl md:text-6xl font-mono font-extrabold tracking-wider text-white">
                {formatTimer(time)}
              </div>
              <p className="text-xs text-gray-400 mt-2 font-mono">Elapsed Speaking Clock</p>
            </div>

            <div className="flex justify-center gap-3">
              <button 
                id="control_timer_btn"
                onClick={handleStartPause}
                className={`px-4 py-2 rounded-lg text-xs font-bold font-sans flex items-center gap-2 cursor-pointer transition-colors ${
                  isActive ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-neon-orange hover:bg-neon-orange-dark text-black'
                }`}
              >
                {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isActive ? 'Pause Timer' : 'Start Timer'}
              </button>
              <button 
                id="reset_timer_btn"
                onClick={handleReset}
                className="px-4 py-2 bg-charcoal-light hover:bg-charcoal-light/80 border border-charcoal-light rounded-lg text-xs font-sans text-gray-300 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Reset Time
              </button>
            </div>
          </div>

          {/* Structured pitch assistance */}
          <div className="mt-4 bg-charcoal-dark border border-charcoal-light p-4 rounded-xl space-y-2">
            <span className="text-xs font-mono text-neon-orange uppercase tracking-wide block">Strategic Pivot Assistant (3-Part Pitch)</span>
            
            {PITCH_TEMPLATES[topic] ? (
              <div className="space-y-1.5 text-[11px] leading-relaxed">
                {PITCH_TEMPLATES[topic].map((line, idx) => (
                  <p key={idx} className="text-gray-400">
                    <span className="font-mono text-white select-none">{line.split(':')[0]}:</span>
                    {line.split(':')[1]}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                Unlock specialized structure guides by shuffling back to core topics like &quot;Modern HR&quot; or &quot;Failing Forward&quot;. Every step builds empathy.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
