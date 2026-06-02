import React, { useState } from 'react';
import { Award, TrendingUp, DollarSign, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

export default function VentureMatrix() {
  const [ideaName, setIdeaName] = useState('Campus Cafe Delivery');
  const [industry, setIndustry] = useState('F&B Tech');
  const [targetAudience, setTargetAudience] = useState('College Students & Late-Night Crammers');
  const [budget, setBudget] = useState({
    marketing: 30,
    dev: 40,
    operations: 15,
    hr: 15,
  });
  const [showCanvas, setShowCanvas] = useState(true);
  const [auditResult, setAuditResult] = useState<{ score: number; verdict: string; tips: string[] } | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const calculateViability = () => {
    // A playful, illustrative score calculating algorithm reflecting Shamik's core expertise
    let score = 70;
    const tips: string[] = [];

    if (budget.marketing < 25) {
      score -= 10;
      tips.push("Insufficient Marketing budget - user acquisition could be bottlenecked.");
    } else {
      score += 5;
      tips.push("Healthy Marketing setup ensures high brand outreach.");
    }

    if (budget.hr < 10) {
      score -= 15;
      tips.push("Extremely low HR payroll might trigger team member turnover or bad talent synergy.");
    } else if (budget.hr > 30) {
      score -= 10;
      tips.push("Over-allocated HR overheads could burn your initial venture capital path prematurely.");
    } else {
      score += 10;
      tips.push("Balanced HR/Payroll reserves aligned with sustainable talent management.");
    }

    if (budget.operations < 15) {
      score -= 10;
      tips.push("Inadequate operational reserves - supply chain vulnerabilities are highly likely.");
    } else {
      score += 5;
    }

    const finalScore = Math.max(30, Math.min(99, score));
    let verdict = "Highly Promising Sandbox";
    if (finalScore < 60) verdict = "Needs Restructuring";
    else if (finalScore >= 85) verdict = "Excellent Venture Execution Ready";

    setAuditResult({
      score: finalScore,
      verdict,
      tips
    });
  };

  const handleSliderChange = (field: keyof typeof budget, value: number) => {
    const newBudget = { ...budget };
    newBudget[field] = value;

    const totalRemaining = 100 - value;
    const fieldsToAdjust = (['marketing', 'dev', 'operations', 'hr'] as const).filter(k => k !== field);
    
    const sumOthers = fieldsToAdjust.reduce((sum, f) => sum + budget[f], 0);
    if (sumOthers > 0) {
      fieldsToAdjust.forEach(f => {
        const proportion = budget[f] / sumOthers;
        newBudget[f] = Math.max(0, Math.round(totalRemaining * proportion));
      });
    } else {
      fieldsToAdjust.forEach(f => {
        newBudget[f] = Math.max(0, Math.round(totalRemaining / fieldsToAdjust.length));
      });
    }

    const sum = newBudget.marketing + newBudget.dev + newBudget.operations + newBudget.hr;
    if (sum !== 100) {
      const diff = 100 - sum;
      newBudget[fieldsToAdjust[0]] += diff;
    }

    setBudget(newBudget);
  };

  const pitchSlides = [
    { title: "1. The Hook / Problem", desc: `Why is current ${industry} broken? Explain why existing solutions fail to satisfy ${targetAudience}.` },
    { title: "2. Value Proposition", desc: `How ${ideaName} solves this pain point cleanly. What is the unique breakthrough?` },
    { title: "3. Market Opportunity", desc: `Showing total addressable market size (TAM) and initial target demographic reach.` },
    { title: "4. Business Model & HR Synergy", desc: `${budget.hr}% dedicated to recruiting core leadership team, supported by ${budget.operations}% core operational efficiency.` },
    { title: "5. Operational Roadmap", desc: "Our 6-month milestones for incubation, prototype deployment, and scaling strategy." }
  ];

  return (
    <div id="venture_matrix" className="bg-charcoal-medium border border-charcoal-light rounded-xl p-5 md:p-6 text-gray-300">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-charcoal-light pb-4 mb-5">
        <div>
          <h4 className="text-xl font-display font-semibold text-white flex items-center gap-2">
            <span className="w-2 h-5 bg-neon-orange rounded-full inline-block"></span>
            Inhub Venture Matrix Sandbox
          </h4>
          <p className="text-xs text-gray-400 mt-1">Interactive startup idea modeling aligned with college incubation metrics</p>
        </div>
        <div className="flex gap-2">
          <button 
            id="toggle_canvas_view"
            onClick={() => setShowCanvas(!showCanvas)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${showCanvas ? 'bg-neon-orange text-black' : 'bg-charcoal-light hover:bg-neon-orange hover:text-black text-gray-300'}`}
          >
            {showCanvas ? 'Show Strategy Dashboard' : 'Show Canvas Layout'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Workspace panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-3 bg-charcoal-dark/50 p-4 rounded-xl border border-charcoal-light/65">
            <h5 className="text-xs font-mono font-medium text-neon-orange uppercase tracking-wider">Startup Pitch Identity</h5>
            <div>
              <label htmlFor="idea_name_input" className="block text-xs font-medium text-gray-400 mb-1">Proposed Startup Name</label>
              <input 
                id="idea_name_input"
                type="text" 
                value={ideaName} 
                onChange={(e) => setIdeaName(e.target.value)} 
                className="w-full bg-charcoal-light border border-charcoal-light rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-orange"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="industry_select" className="block text-xs font-medium text-gray-400 mb-1">Sector/Industry</label>
                <select 
                  id="industry_select"
                  value={industry} 
                  onChange={(e) => setIndustry(e.target.value)} 
                  className="w-full bg-charcoal-light border border-charcoal-light rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-orange"
                >
                  <option value="F&B Tech">F&B Tech</option>
                  <option value="EdTech Hub">EdTech Hub</option>
                  <option value="HR & Payroll">HR & Payroll</option>
                  <option value="Sustainable Logistics">Sustainable Logistics</option>
                  <option value="Consumer Product">Consumer Product</option>
                </select>
              </div>
              <div>
                <label htmlFor="target_audience_input" className="block text-xs font-medium text-gray-400 mb-1">Target Audience</label>
                <input 
                  id="target_audience_input"
                  type="text" 
                  value={targetAudience} 
                  onChange={(e) => setTargetAudience(e.target.value)} 
                  className="w-full bg-charcoal-light border border-charcoal-light rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neon-orange"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 bg-charcoal-dark/50 p-4 rounded-xl border border-charcoal-light/65">
            <h5 className="text-xs font-mono font-medium text-neon-orange uppercase tracking-wider flex justify-between items-center">
              <span>Capital Resource Allocation</span>
              <span className="text-white font-sans text-xs lowercase">Total: 100%</span>
            </h5>
            <p className="text-xs text-stone-400">Distribute your startup funds. HR & Marketing drive scale-up speed.</p>
            
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <label htmlFor="marketing_slider">Marketing & PR Outreach</label>
                  <span>{budget.marketing}%</span>
                </div>
                <input 
                  id="marketing_slider"
                  type="range" 
                  min="5" 
                  max="60" 
                  value={budget.marketing} 
                  onChange={(e) => handleSliderChange('marketing', Number(e.target.value))}
                  className="w-full accent-neon-orange cursor-pointer bg-charcoal-light h-1.5 rounded-lg"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <label htmlFor="dev_slider">Product & Tech R&D</label>
                  <span>{budget.dev}%</span>
                </div>
                <input 
                  id="dev_slider"
                  type="range" 
                  min="5" 
                  max="60" 
                  value={budget.dev} 
                  onChange={(e) => handleSliderChange('dev', Number(e.target.value))}
                  className="w-full accent-neon-orange cursor-pointer bg-charcoal-light h-1.5 rounded-lg"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <label htmlFor="operations_slider">Operations & Inventory</label>
                  <span>{budget.operations}%</span>
                </div>
                <input 
                  id="operations_slider"
                  type="range" 
                  min="5" 
                  max="40" 
                  value={budget.operations} 
                  onChange={(e) => handleSliderChange('operations', Number(e.target.value))}
                  className="w-full accent-neon-orange cursor-pointer bg-charcoal-light h-1.5 rounded-lg"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <label htmlFor="hr_slider">Talent Acquisition & HR</label>
                  <span>{budget.hr}%</span>
                </div>
                <input 
                  id="hr_slider"
                  type="range" 
                  min="5" 
                  max="40" 
                  value={budget.hr} 
                  onChange={(e) => handleSliderChange('hr', Number(e.target.value))}
                  className="w-full accent-neon-orange cursor-pointer bg-charcoal-light h-1.5 rounded-lg"
                />
              </div>
            </div>

            <button 
              id="run_viability_audit"
              onClick={calculateViability}
              className="w-full bg-neon-orange hover:bg-neon-orange-dark text-black text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 mt-3 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              Run Venture Audit Analysis
            </button>
          </div>
        </div>

        {/* Informational Visual Panel */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {showCanvas ? (
            /* Business Model Canvas Framework */
            <div className="bg-charcoal-dark border border-charcoal-light/70 p-4 rounded-xl flex-1 flex flex-col">
              <h5 className="text-xs font-mono font-medium text-neon-orange uppercase tracking-wider mb-3">Model Aspect Grid</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-grow text-[11px]">
                
                <div className="bg-charcoal-medium/60 p-2.5 rounded border border-charcoal-light/45">
                  <span className="text-neon-orange text-[10px] font-mono block">Partners</span>
                  <div className="text-white font-medium mt-1">Key Partners</div>
                  <p className="text-gray-400 leading-tight mt-1">Inspiria Incubation Cell, suppliers, regional marketing outlets.</p>
                </div>

                <div className="bg-charcoal-medium/60 p-2.5 rounded border border-charcoal-light/45 space-y-2">
                  <div>
                    <span className="text-neon-orange text-[10px] font-mono block">Activities</span>
                    <div className="text-white font-medium mt-0.5">Key Activities</div>
                    <p className="text-gray-400 leading-tight mt-0.5">Core coding, regional partner coordination, delivery dispatch.</p>
                  </div>
                  <div className="border-t border-charcoal-light/40 pt-1">
                    <span className="text-neon-orange text-[10px] font-mono block">Resources</span>
                    <div className="text-white font-medium mt-0.5">Key Resources</div>
                    <p className="text-gray-400 leading-tight mt-0.5">BBA networks, student volunteers, delivery channels.</p>
                  </div>
                </div>

                <div className="bg-charcoal-medium/60 p-2.5 rounded border border-charcoal-light/45">
                  <span className="text-neon-orange text-[10px] font-mono block">Value Proposition</span>
                  <div className="text-white font-medium mt-1">Core Offer</div>
                  <div className="text-white font-semibold glow-orange">{ideaName}</div>
                  <p className="text-gray-400 mt-1 leading-tight">Optimized service pipeline customized exactly for {targetAudience}.</p>
                </div>

                <div className="bg-charcoal-medium/60 p-2.5 rounded border border-charcoal-light/45 space-y-2">
                  <div>
                    <span className="text-neon-orange text-[10px] font-mono block">Relationships</span>
                    <div className="text-white font-medium mt-0.5">Relationships</div>
                    <p className="text-gray-400 leading-tight mt-0.5">Highly responsive support, direct feedback desk, event alignment.</p>
                  </div>
                  <div className="border-t border-charcoal-light/40 pt-1">
                    <span className="text-neon-orange text-[10px] font-mono block">Channels</span>
                    <div className="text-white font-medium mt-0.5">Channels</div>
                    <p className="text-gray-400 leading-tight mt-0.5">Inspiria student notice boards, social pipelines, word-of-mouth.</p>
                  </div>
                </div>

                <div className="col-span-2 bg-charcoal-medium/60 p-2.5 rounded border border-charcoal-light/45">
                  <span className="text-neon-orange text-[10px] font-mono block">Financial Struct</span>
                  <div className="text-white font-medium mt-1">Cost Structure</div>
                  <div className="grid grid-cols-2 gap-2 mt-1.5 text-[10px] text-gray-400">
                    <div>Development: <span className="text-white font-semibold">{budget.dev}%</span></div>
                    <div>Marketing Strategy: <span className="text-white font-semibold">{budget.marketing}%</span></div>
                    <div>Talent Ops: <span className="text-white font-semibold">{budget.hr}%</span></div>
                    <div>Ops Flow: <span className="text-white font-semibold">{budget.operations}%</span></div>
                  </div>
                </div>

                <div className="col-span-2 bg-charcoal-medium/60 p-2.5 rounded border border-charcoal-light/45">
                  <span className="text-neon-orange text-[10px] font-mono block">Revenue</span>
                  <div className="text-white font-medium mt-1">Revenue Stream</div>
                  <p className="text-gray-400 leading-tight mt-1">Corporate sponsorships, commission fees per unit sold, premium membership setups for {targetAudience}.</p>
                </div>

              </div>
            </div>
          ) : (
            /* Custom Presentation Strategy Generator */
            <div className="bg-charcoal-dark border border-charcoal-light/70 p-4 rounded-xl flex-1 flex flex-col justify-between">
              <div>
                <h5 className="text-xs font-mono font-medium text-neon-orange uppercase tracking-wider mb-3">Pitch Deck Assistant Engine</h5>
                <p className="text-xs text-gray-400 mb-4">Click through slides designed by an Innovation Ambassador to highlight startup value proposition.</p>
                
                <div className="bg-charcoal-medium border border-charcoal-light p-4 rounded-lg relative overflow-hidden">
                  <span className="absolute top-2 right-2 text-xs font-mono text-neon-orange/40">Slide {activeSlide + 1}/5</span>
                  <p className="text-sm font-semibold text-white font-display mb-2">{pitchSlides[activeSlide].title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{pitchSlides[activeSlide].desc}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-1.5">
                  {pitchSlides.map((_, i) => (
                    <button 
                      key={i}
                      id={`slide_dot_${i}`}
                      onClick={() => setActiveSlide(i)}
                      className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${activeSlide === i ? 'bg-neon-orange' : 'bg-charcoal-light hover:bg-neon-orange/45'}`}
                    ></button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button 
                    id="prev_slide_btn"
                    onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
                    disabled={activeSlide === 0}
                    className="px-2 py-1 bg-charcoal-light hover:bg-charcoal-light/80 disabled:opacity-30 rounded text-xs text-gray-300 transition-colors cursor-pointer"
                  >
                    Prev
                  </button>
                  <button 
                    id="next_slide_btn"
                    onClick={() => setActiveSlide(prev => Math.min(4, prev + 1))}
                    disabled={activeSlide === 4}
                    className="px-2 py-1 bg-neon-orange hover:bg-neon-orange-dark text-black rounded text-xs font-medium transition-colors cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Audit report output */}
          {auditResult && (
            <div className="mt-4 bg-charcoal-dark border border-neon-orange/30 p-4 rounded-xl transition-all animate-fadeIn">
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${auditResult.score >= 80 ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30' : 'bg-[#1b1001] text-neon-orange border border-neon-orange/30'}`}>
                    {auditResult.score}%
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neon-orange uppercase tracking-wide">Strategic Audit Report</div>
                    <div className="text-sm font-semibold text-white">{auditResult.verdict}</div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-gray-500">Audited by Shamik Banerjee</div>
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-gray-400 list-disc list-inside">
                {auditResult.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
