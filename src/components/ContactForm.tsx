import React, { useState, useEffect } from 'react';
import { ContactMessage } from '../types';
import { Send, Linkedin, Mail, MessageSquare, Trash2, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reply, setReply] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('shamik_portfolio_contact_messages');
    if (raw) {
      try {
        setMessages(JSON.parse(raw));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitted(false);
    setReply(null);

    // Simulate standard connection latency
    setTimeout(() => {
      const added: ContactMessage = {
        id: Date.now().toString(),
        name,
        email,
        subject: subject || 'No Subject Specified',
        message,
        timestamp: new Date().toLocaleString()
      };

      const updated = [added, ...messages];
      setMessages(updated);
      localStorage.setItem('shamik_portfolio_contact_messages', JSON.stringify(updated));

      setIsSubmitting(false);
      setSubmitted(true);

      // Draft a automated reactive reply based on Shamik's expertise!
      const automaticReplies = [
        `Hi ${name}! Thanks for reaching out. As Academic Chair & E-Cell coordinator, I'd thrive to discuss entrepreneurial incubations or management fests. I'll review your line shortly!`,
        `Greetings ${name}. Empathy & Communication drive growth! I appreciate your message regarding "${subject || 'your invitation'}" and will connect with you both here or via LinkedIn inside 24 hours.`,
        `Thank you for contacting me, ${name}! Your proposal has been compiled into my workspace planner. Let's build something exceptional together.`
      ];
      
      const chosenReply = automaticReplies[Math.floor(Math.random() * automaticReplies.length)];
      setReply(chosenReply);

      // reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('shamik_portfolio_contact_messages');
  };

  return (
    <div id="contact_shamik_section" className="bg-[#0d0d0d] border border-[#ffffff10] rounded-none p-6 text-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-mono text-neon-orange uppercase tracking-[0.2em] font-black">Strategic Contact Hub</span>
            <h4 className="text-3xl font-display font-black text-white uppercase tracking-tight mt-1">Let&apos;s Craft Synergy</h4>
            <p className="text-xs text-gray-400 mt-2 uppercase font-medium leading-relaxed">
              Have an entrepreneurial idea, student council concern, public speaking invite, or supply chain consultancy project? Dispatch a ping!
            </p>
          </div>

          <div className="space-y-4 pt-2 uppercase font-bold text-xs">
            <a 
              id="linkedin_connect_direct_btn"
              href="https://www.linkedin.com/in/shamik-banerjee-63909527b" 
              target="_blank" 
              rel="noreferrer referrer"
              className="flex items-center gap-3 bg-[#050505] hover:bg-neon-orange/10 hover:border-neon-orange border border-[#ffffff10] px-4 py-3 rounded-none transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-none bg-[#161616] group-hover:bg-neon-orange/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5 text-neon-orange" />
              </div>
              <div className="text-left text-xs">
                <span className="block font-black text-white">Shamik Banerjee on LinkedIn</span>
                <span className="text-gray-500 underline lowercase font-normal">linkedin.com/in/shamik-banerjee-63909527b</span>
              </div>
            </a>

            <div className="flex items-center gap-3 bg-[#050505] border border-[#ffffff10] px-4 py-3 rounded-none">
              <div className="w-10 h-10 rounded-none bg-[#161616] flex items-center justify-center">
                <Mail className="w-5 h-5 text-neon-orange" />
              </div>
              <div className="text-left text-xs">
                <span className="block font-black text-white">Direct Academic Email</span>
                <span className="text-gray-400 font-mono tracking-wide lowercase font-normal">shamik.b.1123@inspiria.edu.in</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#050505] border border-[#ffffff10] px-4 py-3 rounded-none">
              <div className="w-10 h-10 rounded-none bg-[#161616] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-neon-orange" />
              </div>
              <div className="text-left text-xs">
                <span className="block font-black text-white">Location HQ</span>
                <span className="text-gray-400">Siliguri, West Bengal, India</span>
              </div>
            </div>
          </div>

          <div className="bg-[#050505] border border-[#ffffff10] rounded-none p-5 text-xs space-y-2.5 leading-relaxed text-gray-400 uppercase font-bold">
            <span className="font-black text-white block tracking-wider">Connection Protocol Guidelines</span>
            <p>1. Ensure messages describe target collaboration (Mangement, BD, SCM, or Public Relations).</p>
            <p>2. LinkedIn responses generally complete under 4-6 business hours.</p>
          </div>
        </div>

        {/* Right Side: Interactive Forms */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="bg-[#050505] border border-[#ffffff10] p-6 rounded-none space-y-5">
            <h5 className="text-xs font-mono font-black text-neon-orange uppercase tracking-[0.2em]">Fast Contact Terminal</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 uppercase font-bold text-[11px] text-gray-400">
              <div>
                <label htmlFor="contact_name_input" className="block mb-1.5 font-black">Your Full Name *</label>
                <input 
                  id="contact_name_input"
                  type="text" 
                  required
                  placeholder="e.g. Priyesh Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#161616] border border-[#ffffff10] focus:border-neon-orange rounded-none px-4 py-3 text-sm text-white focus:outline-none placeholder-gray-600 font-medium"
                />
              </div>
              <div>
                <label htmlFor="contact_email_input" className="block mb-1.5 font-black">Your Email Address *</label>
                <input 
                  id="contact_email_input"
                  type="email" 
                  required
                  placeholder="e.g. reader@work.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161616] border border-[#ffffff10] focus:border-neon-orange rounded-none px-4 py-3 text-sm text-white focus:outline-none placeholder-gray-600 font-medium"
                />
              </div>
            </div>

            <div className="uppercase font-bold text-[11px] text-gray-400">
              <label htmlFor="contact_subject_input" className="block mb-1.5 font-black">Proposed Collaboration Theme</label>
              <input 
                id="contact_subject_input"
                type="text" 
                placeholder="e.g. Incubation Lecture Panel / SCM Audit Project"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#161616] border border-[#ffffff10] focus:border-neon-orange rounded-none px-4 py-3 text-sm text-white focus:outline-none placeholder-gray-600 font-medium"
              />
            </div>

            <div className="uppercase font-bold text-[11px] text-gray-400">
              <label htmlFor="contact_message_box" className="block mb-1.5 font-black">Detailed Inquiry *</label>
              <textarea 
                id="contact_message_box"
                required
                rows={4}
                placeholder="Type your strategic collaboration outline..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#161616] border border-[#ffffff10] focus:border-neon-orange rounded-none p-4 text-sm text-white focus:outline-none resize-none placeholder-gray-600 font-medium"
              />
            </div>

            <button 
              id="submit_inquiry_btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-neon-orange hover:bg-white text-black hover:text-black text-xs font-black uppercase tracking-widest py-3.5 px-6 rounded-none flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? 'Transmitting Over API...' : 'Dispatch Message Out'}
            </button>
          </form>

          {/* Success messages and auto-replies */}
          {submitted && reply && (
            <div className="bg-[#050505] border border-emerald-500/30 p-5 rounded-none space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Message Successfully Buffered on Client-Side Registry !</span>
              </div>
              <p className="text-[11px] text-gray-400 uppercase font-medium">Your mock messages have been logged inside browser localStorage for testing.</p>
              
              <div className="p-4 bg-neon-orange/5 border border-neon-orange/20 rounded-none text-xs mt-3 relative">
                <span className="absolute top-2 right-2 font-mono text-[9px] text-neon-orange/40 uppercase font-black tracking-widest">SIMULATED REPLY</span>
                <span className="font-black text-white block mb-1 uppercase tracking-wider">Shamik Banerjee (Auto-Bot Response)</span>
                <p className="text-[#ffd0b0] leading-relaxed italic uppercase font-bold text-[11px]">{reply}</p>
              </div>
            </div>
          )}

          {/* Local buffered messages ledger */}
          {messages.length > 0 && (
            <div className="bg-[#050505] border border-[#ffffff10] p-5 rounded-none space-y-4">
              <div className="flex justify-between items-center border-b border-[#ffffff10] pb-3">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-black">Client Buffered Messages Ledger ({messages.length})</span>
                <button 
                  id="clear_client_msgs_btn"
                  onClick={clearMessages}
                  className="text-red-400 hover:text-red-300 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer font-bold"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear Ledger
                </button>
              </div>

              <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                {messages.map((m) => (
                  <div key={m.id} className="text-xs p-3.5 bg-[#0d0d0d] rounded-none border border-[#ffffff10]">
                    <div className="flex justify-between text-[10px] text-gray-500 mb-2 font-mono uppercase font-black">
                      <span className="text-white">{m.name} ({m.email})</span>
                      <span>{m.timestamp.split(',')[0]}</span>
                    </div>
                    <div className="font-extrabold text-neon-orange text-xs uppercase tracking-wider">{m.subject}</div>
                    <p className="text-gray-400 mt-2 leading-snug uppercase font-medium">{m.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
