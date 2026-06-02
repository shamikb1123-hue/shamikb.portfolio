import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PERSONAL_SUMMARY, 
  EXPERIENCES, 
  EDUCATION, 
  SKILL_CATEGORIES, 
  PROJECTS, 
  AWARDS, 
  CERTIFICATIONS 
} from './data';
import { 
  Linkedin, 
  MapPin, 
  Mail, 
  Award, 
  BookOpen, 
  Briefcase, 
  Terminal, 
  Code, 
  ChevronRight, 
  Menu, 
  X, 
  Sparkles, 
  User, 
  FileText, 
  Layers, 
  Send,
  CheckCircle 
} from 'lucide-react';

// Live playgrounds
import VentureMatrix from './components/playgrounds/VentureMatrix';
import SupplyChainHub from './components/playgrounds/SupplyChainHub';
import SpeechCoach from './components/playgrounds/SpeechCoach';
import ActivityPlanner from './components/playgrounds/ActivityPlanner';

// Other modules
import ResumeBuilder from './components/ResumeBuilder';
import ContactForm from './components/ContactForm';

type TabId = 'overview' | 'skills' | 'experience' | 'playgrounds' | 'resume' | 'contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'entrepreneurship' | 'academic' | 'corporate' | 'leadership'>('all');
  const [selectedPlayground, setSelectedPlayground] = useState<string>('proj_inhub');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fallback image loading queue for the placeholder slot
  const [photoCandidates] = useState<string[]>(() => [
    new URL('./shamik_portrait_1780293406317.png.jpeg', import.meta.url).href,
    new URL('./assets/images/shamik.png', import.meta.url).href,
    new URL('./assets/images/shamik.jpg', import.meta.url).href,
    new URL('./assets/images/shamik.jpeg', import.meta.url).href,
  ]);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [imageHasFailedAll, setImageHasFailedAll] = useState(false);

  const handleImageError = () => {
    if (candidateIndex < photoCandidates.length - 1) {
      setCandidateIndex(prev => prev + 1);
    } else {
      setImageHasFailedAll(true);
    }
  };

  // filter experiences
  const filteredExperiences = EXPERIENCES.filter(exp => {
    if (timelineFilter === 'all') return true;
    return exp.category === timelineFilter;
  });

  const tabNames: Record<TabId, string> = {
    overview: 'Portfolio Overview',
    skills: 'Specialist Skills',
    experience: 'Chronological Timeline',
    playgrounds: 'Sandbox Playgrounds',
    resume: 'Resume Console',
    contact: 'Connect Me & Contact'
  };

  const navItems: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Biography', icon: <User className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills Specialized', icon: <Layers className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience Timeline', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'playgrounds', label: 'Interactive Playgrounds', icon: <Terminal className="w-4 h-4" /> },
    { id: 'resume', label: 'Interactive Resume', icon: <FileText className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact & Links', icon: <Send className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] font-sans selection:bg-neon-orange selection:text-black flex flex-col p-0 md:p-3 lg:p-4">
      
      {/* Outer stark frame border wrapper */}
      <div className="flex-1 w-full bg-[#050505] flex flex-col border-4 md:border-8 border-[#1a1a1a] shadow-2xl relative overflow-hidden">
        
        {/* Navigation Headers */}
        <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-[#ffffff10] no-print px-6 py-4 md:px-10 flex justify-between items-center w-full relative">
          
          {/* Logo Name */}
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 bg-neon-orange rounded-full shadow-[0_0_12px_#FF5F1F]" />
            <div>
              <span className="font-extrabold text-xl tracking-tighter text-white font-display block">SB.PORTFOLIO</span>
              <p className="text-[9px] font-mono text-neon-orange tracking-widest uppercase mt-0.5">E-Cell Ambassador &amp; Academic Lead</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                id={`nav_tab_${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-all cursor-pointer rounded-none border ${
                  activeTab === item.id 
                    ? 'bg-neon-orange text-black border-neon-orange font-black' 
                    : 'text-gray-400 border-transparent hover:text-white hover:border-[#ffffff10]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Header Controls (Connect CTA Element) */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              id="header_linkedin_connect_btn"
              href="https://www.linkedin.com/in/shamik-banerjee-63909527b"
              target="_blank"
              rel="noreferrer referrer"
              className="bg-neon-orange text-black px-6 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-white transition-colors rounded-none"
            >
              Connect Me
            </a>
          </div>

          {/* Mobile Menu Actuator */}
          <div className="lg:hidden flex items-center">
            <button 
              id="mobile_menu_actuator"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#ffffff10] rounded-none text-gray-400 hover:text-white cursor-pointer transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Drawer Dropdown menu */}
          {mobileMenuOpen && (
            <div id="mobile_slide_menu" className="lg:hidden bg-[#0a0a0a] border-b border-[#ffffff10] absolute top-full left-0 w-full z-50 p-4 space-y-2 no-print shadow-2xl">
              {navItems.map(item => (
                <button
                  key={item.id}
                  id={`mob_nav_tab_${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-xs font-black uppercase tracking-wider rounded-none border ${
                    activeTab === item.id 
                      ? 'bg-neon-orange text-black border-neon-orange' 
                      : 'text-gray-400 border-transparent bg-transparent hover:text-white hover:border-[#ffffff10]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-[#ffffff10] flex gap-2">
                <a 
                  id="mobile_linkedin_connect"
                  href="https://www.linkedin.com/in/shamik-banerjee-63909527b"
                  target="_blank"
                  rel="noreferrer referrer"
                  className="flex-1 text-center py-2.5 bg-black border border-[#ffffff10] text-xs font-black uppercase tracking-wider text-gray-300 hover:border-neon-orange hover:text-white rounded-none cursor-pointer"
                >
                  LinkedIn
                </a>
                <button 
                  id="mobile_go_resume_btn"
                  onClick={() => {
                    setActiveTab('resume');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 text-center py-2.5 bg-neon-orange text-black text-xs font-black uppercase tracking-wider rounded-none cursor-pointer font-extrabold"
                >
                  Resume Sheet
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Banner / Hero Segment (Strict Grid Columns layout modeled after Bold Typography HTML) */}
        <section className="bg-[#050505] border-b border-[#ffffff10] no-print">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Portion of the Hero - Occupies 8/12 grid */}
            <div className="lg:col-span-8 p-6 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#ffffff10] space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex-1 min-w-0">
                  <h2 className="text-neon-orange text-xs font-black uppercase tracking-[0.4em] mb-4">
                    Full Stack Business Architect / Academic Lead
                  </h2>
                  
                  <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black leading-[0.85] tracking-tighter mb-8 uppercase">
                    SHAMIK<br/>
                    <span className="text-transparent text-stroke-orange">BANERJEE</span>
                  </h1>
                  
                  <p className="max-w-xl text-xs md:text-sm text-gray-400 leading-relaxed uppercase font-medium">
                    Specializing in startup incubation alliances, SCM diagnostics, and public speaking coaching. Driven by the intersection of business intelligence, leadership, and technical precision.
                  </p>
                </div>

                {/* Clean, minimalist professional portrait layout */}
                <div className="w-full md:w-64 shrink-0 no-print flex items-center justify-center">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-transparent">
                    {/* Hidden img helper to cycle candidates natively before rendering */}
                    <img 
                      src={photoCandidates[candidateIndex]} 
                      onError={handleImageError} 
                      className="hidden"
                      alt="Preloader helper"
                      referrerPolicy="no-referrer"
                    />

                    {!imageHasFailedAll ? (
                      /* Pristine, borderless professional photo */
                      <img 
                        src={photoCandidates[candidateIndex]} 
                        alt="Shamik Banerjee"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-none transition-all duration-300"
                      />
                    ) : (
                      /* Minimalist, formal fallback silhouette if no image is found */
                      <div className="w-full h-full flex flex-col items-center justify-center border border-[#ffffff10] bg-[#0c0c0c] rounded-none">
                        <User className="w-12 h-12 text-gray-500 stroke-[1]" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Stark Core statistics row with stagger and hover physics */}
              <div className="flex flex-wrap gap-8 md:gap-12 pt-6">
                <motion.div 
                  className="flex flex-col cursor-crosshair"
                  whileHover={{ scale: 1.1, x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <span className="text-4xl font-black text-neon-orange">12+</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Timeline Entries</span>
                </motion.div>
                <motion.div 
                  className="flex flex-col cursor-crosshair"
                  whileHover={{ scale: 1.1, x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <span className="text-4xl font-black text-neon-orange">04+</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Interactive Hubs</span>
                </motion.div>
                <motion.div 
                  className="flex flex-col cursor-crosshair"
                  whileHover={{ scale: 1.1, x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <span className="text-4xl font-black text-neon-orange">03</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Elite Accolades</span>
                </motion.div>
              </div>

              {/* Action layout CTA buttons with line layout */}
              <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
                <motion.a 
                  id="hero_linkedin_action_btn"
                  href="https://www.linkedin.com/in/shamik-banerjee-63909527b"
                  target="_blank"
                  rel="noreferrer referrer"
                  className="bg-white text-black px-8 py-4 font-black text-xs md:text-sm uppercase tracking-widest hover:bg-neon-orange hover:text-black transition-colors rounded-none text-center"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  Connect on LinkedIn
                </motion.a>
                
                <motion.button 
                  id="hero_resume_action_btn"
                  onClick={() => setActiveTab('resume')}
                  className="border border-[#ffffff20] text-[#f0f0f0] px-8 py-4 font-black text-xs md:text-sm uppercase tracking-widest hover:border-white hover:bg-charcoal-light transition-all rounded-none text-center cursor-pointer"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  Interactive Resume
                </motion.button>
                <div className="hidden md:block flex-1 h-[1px] bg-[#ffffff10]"></div>
              </div>
            </div>

            {/* Right Portion of the Hero - Occupies 4/12 grid (Skill Core Expertise list) */}
            <div className="lg:col-span-4 flex flex-col bg-[#0a0a0a]">
              
              <section className="p-6 md:p-8 border-b border-[#ffffff10] flex-1">
                <h3 className="text-neon-orange text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                  Expertise // Focus Core
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <motion.div 
                    className="border border-[#ffffff10] p-4 text-center rounded-none bg-[#050505]"
                    whileHover={{ scale: 1.05, borderColor: "#FF5F1F" }}
                  >
                    <div className="text-xs font-black uppercase tracking-tight">STARTUP ALLIANCES</div>
                    <div className="w-full h-1 bg-[#222] mt-2.5 overflow-hidden">
                      <motion.div 
                        className="h-full bg-neon-orange" 
                        initial={{ width: 0 }}
                        whileInView={{ width: "95%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="border border-[#ffffff10] p-4 text-center rounded-none bg-[#050505]"
                    whileHover={{ scale: 1.05, borderColor: "#FF5F1F" }}
                  >
                    <div className="text-xs font-black uppercase tracking-tight">PUBLIC SPEAKING</div>
                    <div className="w-full h-1 bg-[#222] mt-2.5 overflow-hidden">
                      <motion.div 
                        className="h-full bg-neon-orange" 
                        initial={{ width: 0 }}
                        whileInView={{ width: "90%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="border border-[#ffffff10] p-4 text-center rounded-none bg-[#050505]"
                    whileHover={{ scale: 1.05, borderColor: "#FF5F1F" }}
                  >
                    <div className="text-xs font-black uppercase tracking-tight">SCM DIAGNOSTICS</div>
                    <div className="w-full h-1 bg-[#222] mt-2.5 overflow-hidden">
                      <motion.div 
                        className="h-full bg-neon-orange" 
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="border border-[#ffffff10] p-4 text-center rounded-none bg-[#050505]"
                    whileHover={{ scale: 1.05, borderColor: "#FF5F1F" }}
                  >
                    <div className="text-xs font-black uppercase tracking-tight">HR DEVELOPMENT</div>
                    <div className="w-full h-1 bg-[#222] mt-2.5 overflow-hidden">
                      <motion.div 
                        className="h-full bg-neon-orange" 
                        initial={{ width: 0 }}
                        whileInView={{ width: "80%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
              </section>

              <section className="p-6 md:p-8 flex-1">
                <h3 className="text-neon-orange text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                  Location // Availability
                </h3>
                <div className="space-y-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                  <div className="flex justify-between items-center bg-[#050505] p-3 border border-[#ffffff10]">
                    <span>Current Base</span>
                    <span className="text-white font-black">Siliguri, WB, India</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#050505] p-3 border border-[#ffffff10]">
                    <span>Consultancy Status</span>
                    <span className="text-neon-orange font-black">Open for Alliances</span>
                  </div>
                </div>
              </section>

              <div className="h-16 flex items-center px-8 bg-neon-orange text-black font-black text-xs uppercase tracking-[0.2em] justify-between">
                <span>Active 2026 // Student Ambassador</span>
                <span>Inspiria Lead</span>
              </div>

            </div>

          </div>
        </section>

        {/* Main Workspace Frame */}
        <main className="flex-1 p-6 md:p-10 bg-[#050505]">
        
        {/* Dynamic active screen segment renderer */}
        <div className="space-y-12">
          
          {/* Tab Screen 1: OVERVIEW BIOGRAPHY */}
          {activeTab === 'overview' && (
            <div id="overview_tab_screen" className="space-y-8 animate-fadeIn">
              
              {/* Scrolling Contact Ticker Marquee with custom Framer Motion smooth scroll */}
              <div className="bg-[#0d0d0d] border border-neon-orange/40 p-3 overflow-hidden flex items-center relative gap-4">
                <span className="bg-neon-orange text-black text-[9px] font-mono font-black tracking-widest px-2.5 py-1.5 uppercase shrink-0 z-10 relative">
                  Live Hotline
                </span>
                <div className="flex-1 overflow-hidden relative flex items-center">
                  <motion.div 
                    className="flex gap-12 whitespace-nowrap text-xs font-mono text-neon-orange tracking-widest font-black uppercase"
                    animate={{ x: [0, -1500] }}
                    transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                  >
                    <span>✦ CHANNELS OPEN FOR STRATEGIC ALLIANCES // VENTURE MATRICES // PORTFOLIO AUDITING ✦ INITIATE CONNECTION AT: +91 62909 52712 ✦ EMAIL: SHAMIK.B.1123@INSPIRIA.EDU.IN ✦ LINKEDIN: LINKEDIN.COM/IN/SHAMIK-BANERJEE-63909527b ✦</span>
                    <span>✦ CHANNELS OPEN FOR STRATEGIC ALLIANCES // VENTURE MATRICES // PORTFOLIO AUDITING ✦ INITIATE CONNECTION AT: +91 62909 52712 ✦ EMAIL: SHAMIK.B.1123@INSPIRIA.EDU.IN ✦ LINKEDIN: LINKEDIN.COM/IN/SHAMIK-BANERJEE-63909527b ✦</span>
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
               {/* Left Column Biography summary */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Biography card */}
                <motion.div 
                  className="bg-[#0d0d0d] border border-[#ffffff10] p-6 md:p-8 rounded-none space-y-6"
                  whileHover={{ scale: 1.01, borderColor: "rgba(255, 95, 31, 0.4)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-neon-orange rounded-none shadow-[0_0_8px_#FF5F1F]" />
                    <h3 className="text-xl font-display font-extrabold text-white uppercase tracking-wider">Professional Biography</h3>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed text-justify uppercase font-medium">
                    {PERSONAL_SUMMARY}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed text-justify">
                    Through direct, proactive alignment with Student Representative Councils and continuous strategic planning sessions at Inspiria Knowledge Campus, Shamik maintains an executive coordination framework bridging faculty agendas, campus fests, and student leadership milestones.
                  </p>
                </motion.div>
 
                {/* Star awards & certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Awards Portfolio card */}
                  <motion.div 
                    className="bg-[#0d0d0d] border border-[#ffffff10] p-6 rounded-none space-y-6"
                    whileHover={{ scale: 1.02, borderColor: "rgba(255, 95, 31, 0.4)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-[10px] font-mono text-neon-orange uppercase tracking-[0.25em] font-black block">Acclaimed Recognitions</span>
                    <h4 className="text-md font-display font-black text-white uppercase tracking-wider">Honors &amp; Star Accolades</h4>
                    <div className="space-y-6">
                      {AWARDS.map((aw, id) => (
                        <motion.div 
                          key={id} 
                          className="relative pl-5 border-l border-neon-orange/40 text-xs"
                          whileHover={{ x: 4 }}
                        >
                          <span className="absolute top-1.5 left-0 w-2 h-2 bg-neon-orange rounded-none"></span>
                          <div className="font-extrabold text-white uppercase tracking-tight">{aw.title}</div>
                          <p className="text-[11px] text-gray-400 mt-1 leading-snug">{aw.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
 
                  {/* Certifications card */}
                  <motion.div 
                    className="bg-[#0d0d0d] border border-[#ffffff10] p-6 rounded-none space-y-6"
                    whileHover={{ scale: 1.02, borderColor: "rgba(255, 95, 31, 0.4)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-[10px] font-mono text-neon-orange uppercase tracking-[0.25em] font-black block">Corporate accreditations</span>
                    <h4 className="text-md font-display font-black text-white uppercase tracking-wider">Validated Credentials</h4>
                    <div className="space-y-3">
                      {CERTIFICATIONS.map((cert, id) => (
                        <motion.div 
                          key={id} 
                          className="bg-[#050505] border border-[#ffffff10] p-3 rounded-none text-xs flex items-start gap-3 cursor-pointer"
                          whileHover={{ x: 4, borderColor: "rgba(255, 95, 31, 0.3)" }}
                        >
                          <div className="w-1.5 h-1.5 bg-neon-orange rounded-none mt-2 shrink-0"></div>
                          <span className="text-stone-300 text-[11px] leading-relaxed uppercase font-semibold">{cert}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
 
                </div>
              </div>
 
              {/* Right Column details list with cohesive motion-graphic indicators */}
              <div className="space-y-8">
                
                {/* Academic Highlights */}
                <motion.div 
                  className="bg-[#0d0d0d] border border-[#ffffff10] p-6 rounded-none space-y-6"
                  whileHover={{ borderColor: "rgba(255, 95, 31, 0.4)", scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-neon-orange" />
                    <h3 className="text-md font-display font-extrabold text-white uppercase tracking-wider">Academics &amp; Degrees</h3>
                  </div>
                  <div className="space-y-6">
                    {EDUCATION.map(edu => (
                      <motion.div 
                        key={edu.id} 
                        className="text-xs transition-colors hover:bg-black/50 p-3 rounded-none border border-transparent hover:border-[#ffffff10]"
                        whileHover={{ x: 6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-extrabold text-white uppercase tracking-tight leading-tight">{edu.degree}</h4>
                        </div>
                        <p className="text-neon-orange text-[10px] font-mono font-bold mt-1 uppercase tracking-widest">{edu.period}</p>
                        <p className="text-gray-400 text-[11px] mt-2 font-display leading-normal text-justify uppercase">{edu.institution}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
 
                {/* Languages card */}
                <motion.div 
                  className="bg-[#0d0d0d] border border-[#ffffff10] p-6 rounded-none space-y-4"
                  whileHover={{ borderColor: "rgba(255, 95, 31, 0.4)", scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-[10px] font-mono font-black text-neon-orange uppercase tracking-[0.2em]">Bilingual Speech range</h3>
                  <div className="space-y-2 text-xs uppercase font-extrabold text-stone-200">
                    <motion.div 
                      className="flex justify-between items-center bg-[#050505] p-3 border border-[#ffffff10] rounded-none cursor-pointer"
                      whileHover={{ x: 6, borderColor: "rgba(255, 95, 31, 0.3)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>English</span>
                      <span className="font-mono text-gray-500 text-[10px]">Professional</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between items-center bg-[#050505] p-3 border border-[#ffffff10] rounded-none cursor-pointer"
                      whileHover={{ x: 6, borderColor: "rgba(255, 95, 31, 0.3)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>Bengali</span>
                      <span className="font-mono text-gray-500 text-[10px]">Native / Bilingual</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between items-center bg-[#050505] p-3 border border-[#ffffff10] rounded-none cursor-pointer"
                      whileHover={{ x: 6, borderColor: "rgba(255, 95, 31, 0.3)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <span>Hindi</span>
                      <span className="font-mono text-gray-500 text-[10px]">Working</span>
                    </motion.div>
                  </div>
                </motion.div>
 
              </div>
            </div>
          </div>
          )}
 
          {/* Tab Screen 2: SPECIAL SKILLS CATALOG */}
          {activeTab === 'skills' && (
            <div id="skills_tab_screen" className="space-y-8 animate-fadeIn">
              <div className="text-left max-w-2xl">
                <span className="text-xs font-mono text-neon-orange uppercase tracking-[0.3em] font-black">Curated Specialties</span>
                <h3 className="text-3xl font-display font-black text-white mt-2 uppercase tracking-wide">Specialized Competency Matrices</h3>
                <p className="text-xs text-gray-400 mt-2 uppercase">
                  Explore localized skill benchmarks representing Shamik&apos;s BBA study curves, strategic communication drills inside Toastmasters, and real logistical operations.
                </p>
              </div>
 
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="bg-[#0d0d0d] border border-[#ffffff10] rounded-none p-6 space-y-6 hover:border-neon-orange/30 transition-colors">
                    <div className="flex items-center gap-3 border-b border-[#ffffff10] pb-4">
                      <span className="text-2xl shrink-0">{cat.emoji}</span>
                      <div>
                        <h4 className="font-display font-black text-white text-sm uppercase tracking-wider leading-tight">{cat.name}</h4>
                        <p className="text-[9px] text-gray-500 uppercase mt-1 tracking-wider">{cat.description}</p>
                      </div>
                    </div>
 
                    <div className="space-y-6">
                      {cat.skills.map((skill, sidx) => (
                        <div key={sidx} className="space-y-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-stone-200 font-bold uppercase tracking-tight text-xs">{skill.name}</span>
                            <span className="text-neon-orange font-mono font-black">{skill.level}%</span>
                          </div>
                          
                          {/* Slider status bar emulation - sharp square border */}
                          <div className="w-full bg-[#050505] h-2 rounded-none overflow-hidden border border-[#ffffff10]">
                            <div 
                              className="bg-neon-orange h-full rounded-none"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
 
                          {/* Skill Tags list */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {skill.tags.map((tag, tidx) => (
                              <span key={tidx} className="bg-[#050505] hover:border-neon-orange/40 text-gray-400 border border-[#ffffff10] px-2 py-0.5 rounded-none text-[9px] font-mono uppercase transition-colors">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
 
              {/* Special interactive skill validation sandbox */}
              <div className="bg-[#0d0d0d] border border-[#ffffff10] p-6 rounded-none flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-2 text-left">
                  <h5 className="font-display font-black text-white uppercase text-md tracking-wider">Need a live test of these skills?</h5>
                  <p className="text-xs text-gray-400">Launch an interactive sandbox playground matching specific skill models.</p>
                </div>
                <button
                  id="skills_call_sandbox_btn"
                  onClick={() => setActiveTab('playgrounds')}
                  className="bg-neon-orange hover:bg-white text-black font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-none cursor-pointer transition-colors"
                >
                  Configure Interactive Sandbox Now
                </button>
              </div>
            </div>
          )}
 
          {/* Tab Screen 3: EXPERIENCE TIMELINE */}
          {activeTab === 'experience' && (
            <div id="experience_tab_screen" className="space-y-8 animate-fadeIn">
              
              {/* Timeline Header filter controls */}
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="text-left">
                  <span className="text-xs font-mono text-neon-orange uppercase tracking-[0.3em] font-black">Chronological Records</span>
                  <h3 className="text-3xl font-display font-black text-white mt-1 uppercase tracking-tight">Experience &amp; Leadership Ledger</h3>
                  <p className="text-xs text-gray-400 mt-2 uppercase">Directly integrated and parsed from Shamik&apos;s verified professional portfolio data.</p>
                </div>
                
                {/* Categories filtering links */}
                <div className="flex flex-wrap gap-1 bg-[#0d0d0d] border border-[#ffffff10] p-1.5 rounded-none">
                  {(['all', 'entrepreneurship', 'academic', 'corporate', 'leadership'] as const).map(cat => (
                    <button
                      key={cat}
                      id={`timeline_filter_btn_${cat}`}
                      onClick={() => setTimelineFilter(cat)}
                      className={`px-3.5 py-2 text-[10px] font-mono rounded-none transition-all uppercase cursor-pointer border ${
                        timelineFilter === cat
                          ? 'bg-neon-orange text-black border-neon-orange font-black'
                          : 'text-gray-400 border-transparent hover:text-white hover:border-[#ffffff10]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
 
              {/* Vertical timeline graph */}
              <div className="relative border-l-2 border-[#ffffff10] ml-3 md:ml-6 pl-6 md:pl-8 space-y-8 py-3">
                
                {filteredExperiences.map((exp, idx) => (
                  <motion.div 
                    key={exp.id} 
                    className="relative select-text text-left group"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    
                    {/* Square timeline indicator icon */}
                    <div className="absolute -left-[35px] md:-left-[43px] w-6 h-6 rounded-none bg-[#050505] border-2 border-neon-orange flex items-center justify-center text-[10px] text-white font-mono font-black shrink-0 transition-all group-hover:bg-neon-orange group-hover:text-black">
                      {idx + 1}
                    </div>
 
                    <div className="bg-[#0d0d0d] border border-[#ffffff10] rounded-none p-6 md:p-8 hover:border-neon-orange/30 transition-all">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                        <div>
                          <span className="bg-neon-orange text-black text-[9px] font-mono font-black tracking-widest px-2.5 py-0.5 rounded-none uppercase">
                            {exp.category}
                          </span>
                          <h4 className="text-lg font-display font-black text-white mt-3 uppercase tracking-wide leading-snug">
                            {exp.role}
                          </h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-neon-orange font-bold block">{exp.period}</span>
                          <span className="text-[10px] text-gray-400 font-mono uppercase block mt-1">Duration: {exp.duration}</span>
                        </div>
                      </div>
 
                      <div className="text-xs text-white uppercase tracking-wider font-extrabold font-mono pb-3">
                        {exp.organization}
                      </div>
 
                      <ul className="list-disc list-inside space-y-2 text-xs text-stone-300 border-t border-[#ffffff10] pt-4">
                        {exp.details.map((detail, dIdx) => (
                          <li key={dIdx} className="leading-relaxed text-stone-400 pl-1 text-[11px] text-justify list-item uppercase font-medium">{detail}</li>
                        ))}
                      </ul>
                    </div>
 
                  </motion.div>
                ))}
 
                {filteredExperiences.length === 0 && (
                  <div className="text-center py-12 bg-[#0d0d0d] rounded-none border border-[#ffffff10] p-6">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">No experience listings matched this filter category.</p>
                  </div>
                )}
 
              </div>
            </div>
          )}
 
          {/* Tab Screen 4: INTERACTIVE PLAYGROUNDS / PROJECTS */}
          {activeTab === 'playgrounds' && (
            <div id="playgrounds_tab_screen" className="space-y-8 animate-fadeIn">
              
              <div className="text-left">
                <span className="text-xs font-mono text-neon-orange uppercase tracking-[0.3em] font-black">Skill Testing Simulators</span>
                <h3 className="text-3xl font-display font-black text-white mt-1 uppercase tracking-tight">Interactive Sandbox Workspace</h3>
                <p className="text-xs text-gray-400 mt-2 max-w-3xl uppercase">
                  Select an interactive project module inspired directly by Shamik&apos;s actual leadership and corporate experience history to run diagnostic tests.
                </p>
              </div>
 
              {/* Grid Selector Cards of different projects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 no-print">
                {PROJECTS.map(proj => (
                  <button
                    key={proj.id}
                    id={`playground_card_${proj.id}`}
                    onClick={() => setSelectedPlayground(proj.id)}
                    className={`text-left p-5 rounded-none border transition-all cursor-pointer ${
                      selectedPlayground === proj.id 
                        ? 'bg-[#0d0d0d] border-neon-orange shadow-none border-2 ring-1 ring-neon-orange' 
                        : 'bg-[#0a0a0a] border-[#ffffff10] hover:border-neon-orange/40 hover:bg-[#0d0d0d]'
                    }`}
                  >
                    <span className="bg-[#050505] border border-[#ffffff10] text-neon-orange text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-none uppercase">
                      {proj.company.split(' ')[0]}
                    </span>
                    <h4 className="text-xs font-display font-black text-white mt-4 uppercase tracking-wider leading-snug">{proj.title}</h4>
                    <p className="text-[11px] text-gray-400 mt-2 leading-snug line-clamp-3 uppercase font-medium">{proj.description}</p>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {proj.tags.slice(0, 2).map((tg, i) => (
                        <span key={i} className="text-[9px] font-mono text-gray-400 bg-black/50 border border-[#ffffff10] px-2 py-0.5 rounded-none uppercase">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
 
              {/* Sandbox display iframe container with sharp borders */}
              <div className="border-4 border-[#1a1a1a] rounded-none overflow-hidden bg-[#050505] min-h-[480px] relative p-1.5 shadow-xl">
                {selectedPlayground === 'proj_inhub' && <VentureMatrix />}
                {selectedPlayground === 'proj_skymount' && <SupplyChainHub />}
                {selectedPlayground === 'proj_toastmasters' && <SpeechCoach />}
                {selectedPlayground === 'proj_som' && <ActivityPlanner />}
              </div>
            </div>
          )}
 
          {/* Tab Screen 5: RESUME CONSOLE */}
          {activeTab === 'resume' && (
            <div id="resume_tab_screen" className="space-y-6 animate-fadeIn">
              <ResumeBuilder />
            </div>
          )}
 
          {/* Tab Screen 6: CONTACT & SYNERGY */}
          {activeTab === 'contact' && (
            <div id="contact_tab_screen" className="space-y-6 animate-fadeIn">
              <ContactForm />
            </div>
          )}
 
        </div>
 
      </main>
 
      {/* Footer segment with structural outline layout */}
      <footer className="bg-[#0d0d0d] border-t-2 border-[#1a1a1a] mt-16 py-10 px-8 text-xs text-gray-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-black text-white font-display text-sm uppercase tracking-widest">Shamik Banerjee — Bold Portfolio Consoles</p>
            <p className="mt-1 uppercase text-[10px] text-gray-500 tracking-wider">Siliguri, West Bengal, India. Built with React &amp; Bold Typography theme layout structures.</p>
          </div>
          <div className="flex gap-4 uppercase font-bold tracking-wider text-[11px]">
            <a 
              id="footer_linkedin_btn"
              href="https://www.linkedin.com/in/shamik-banerjee-63909527b" 
              target="_blank" 
              rel="noreferrer referrer"
              className="text-[#f0f0f0] hover:text-neon-orange underline transition-colors"
            >
              LinkedIn Profile
            </a>
            <span>•</span>
            <span className="font-mono text-neon-orange">shamik.b.1123@inspiria.edu.in</span>
          </div>
        </div>
      </footer>
 
    </div>
  </div>
  );
}
