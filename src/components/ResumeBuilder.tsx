import React, { useState } from 'react';
import { EXPERIENCES, EDUCATION, SKILL_CATEGORIES, PERSONAL_SUMMARY, CERTIFICATIONS, AWARDS } from '../data';
import { FileDown, Printer, CheckCircle, Mail, MapPin, Linkedin, Briefcase, GraduationCap, Award as AwardIcon } from 'lucide-react';

export default function ResumeBuilder() {
  const [downloading, setDownloading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const simulateDownload = () => {
    setDownloading(true);
    setSuccess(false);
    setTimeout(() => {
      setDownloading(false);
      setSuccess(true);
      
      // We will assemble a raw markdown style text resume of Shamik Banerjee and download it as 'shamik_banerjee_resume.txt' or similar doc
      const content = `
SHAMIK BANERJEE
=========================================
LinkedIn: www.linkedin.com/in/shamik-banerjee-63909527b
Email: shamik.b.1123@inspiria.edu.in
Location: Siliguri, West Bengal, India

SUMMARY
-----------------------------------------
${PERSONAL_SUMMARY}

OBJECTIVE
-----------------------------------------
IIC Innovation Ambassador | Aspiring Entrepreneur | HR&BD Enthusiast | Public speaker

EXPERIENCE
-----------------------------------------
${EXPERIENCES.map(exp => `
* ${exp.role} - ${exp.organization}
  Period: ${exp.period} (${exp.duration})
  Details:
  ${exp.details.map(d => `  - ${d}`).join('\n')}
`).join('\n')}

EDUCATION
-----------------------------------------
${EDUCATION.map(edu => `
* ${edu.degree}
  Institution: ${edu.institution}
  Period: ${edu.period}
  Details: ${edu.details}
`).join('\n')}

SKILLS Highlight
-----------------------------------------
${SKILL_CATEGORIES.map(cat => `
[${cat.name}]
${cat.skills.map(s => ` - ${s.name} (${s.level}%) | Tags: ${s.tags.join(', ')}`).join('\n')}
`).join('\n')}

HONORS & AWARDS
-----------------------------------------
${AWARDS.map(a => `* ${a.title} (${a.year}): ${a.description}`).join('\n')}

CERTIFICATIONS
-----------------------------------------
${CERTIFICATIONS.map(c => `* ${c}`).join('\n')}
      `;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'shamik_banerjee_resume_document.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setSuccess(false), 3000);
    }, 1800);
  };

  return (
    <div id="resume_builder_sub" className="bg-[#0d0d0d] border border-[#ffffff10] rounded-none p-6 text-gray-300">
      {/* Action Header controls */}
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#ffffff10] pb-5 mb-6 no-print">
        <div>
          <h4 className="text-xl font-display font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-5 bg-neon-orange rounded-none inline-block"></span>
            Professional Resume Console
          </h4>
          <p className="text-xs text-gray-400 mt-1 uppercase">Print or download a formatted structural resume compiled directly from Shamik's profiles</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button 
            id="print_resume_btn"
            onClick={handlePrint}
            className="bg-[#161616] hover:bg-white hover:text-black border border-[#ffffff10] px-5 py-3 rounded-none text-xs font-black uppercase tracking-widest text-gray-300 flex items-center gap-2 cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4 text-neon-orange" />
            Print Resume
          </button>
          
          <button 
            id="download_text_resume_btn"
            onClick={simulateDownload}
            disabled={downloading}
            className="bg-neon-orange hover:bg-white hover:text-black text-black px-6 py-3 rounded-none text-xs font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all"
          >
            <FileDown className="w-4 h-4" />
            {downloading ? 'Compiling Doc...' : success ? 'Downloaded!' : 'Download Resume.txt'}
          </button>
        </div>
      </div>

      {downloading && (
        <div className="bg-[#050505] border border-neon-orange/20 p-4 rounded-none mb-6 flex items-center gap-3 animate-pulse no-print">
          <div className="w-4 h-4 border-2 border-neon-orange border-t-transparent rounded-none animate-spin"></div>
          <span className="text-xs text-orange-200 uppercase font-bold">Assembling chronological records, skill matrices, credentials and exporting as raw plain-text report...</span>
        </div>
      )}

      {/* Printable Sheet View */}
      <div className="bg-white text-gray-900 border border-gray-300 rounded-none p-6 md:p-12 font-sans shadow-2xl select-text text-left max-w-4xl mx-auto print-card">
        {/* Print Header */}
        <div className="border-b-2 border-neon-orange pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
            <div>
              <h1 className="text-4xl font-display font-black text-black uppercase tracking-tight">Shamik Banerjee</h1>
              <p className="text-xs font-mono text-neon-orange font-black uppercase mt-1">IIC Innovation Ambassador | Aspiring Entrepreneur | HR &amp; BD Enthusiast</p>
            </div>
            <div className="space-y-1 text-xs text-gray-700 font-mono font-semibold">
              <div className="flex items-center gap-1.5 justify-start md:justify-end">
                <MapPin className="w-3 h-3 text-neon-orange" />
                <span>Siliguri, West Bengal, India</span>
              </div>
              <div className="flex items-center gap-1.5 justify-start md:justify-end">
                <Mail className="w-3 h-3 text-neon-orange" />
                <span>shamik.b.1123@inspiria.edu.in</span>
              </div>
              <div className="flex items-center gap-1.5 justify-start md:justify-end">
                <Linkedin className="w-3 h-3 text-neon-orange" />
                <span className="underline">linkedin.com/in/shamik-banerjee-63909527b</span>
              </div>
            </div>
          </div>
        </div>

        {/* Print Summary */}
        <div className="py-6 border-b border-gray-200">
          <h2 className="text-xs font-black text-black uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-2.5 h-3 bg-neon-orange rounded-none inline-block"></span>
            Professional Summary
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed text-justify uppercase font-medium">{PERSONAL_SUMMARY}</p>
        </div>

        {/* Double-column section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
          
          {/* Left Main (Experience Timeline) */}
          <div className="md:col-span-8 space-y-6">
            <h2 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 pb-2">
              <Briefcase className="w-3.5 h-3.5 text-neon-orange" />
              Professional Experience
            </h2>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-black uppercase tracking-tight">{exp.role}</h3>
                    <span className="font-mono text-[10px] text-gray-600 font-bold whitespace-nowrap">{exp.period}</span>
                  </div>
                  <div className="text-[11px] text-neon-orange font-bold font-mono uppercase tracking-wider mt-1">{exp.organization}</div>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 font-sans pl-1">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="leading-relaxed list-item text-[11px] text-justify uppercase font-medium">{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Main (Education, Skills, Honors) */}
          <div className="md:col-span-4 space-y-6">
            
            {/* Education */}
            <div className="space-y-3">
              <h2 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 pb-2">
                <GraduationCap className="w-3.5 h-3.5 text-neon-orange" />
                Education
              </h2>
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="text-[11px]">
                  <h3 className="font-extrabold text-gray-900 leading-tight uppercase">{edu.degree}</h3>
                  <div className="text-gray-600 uppercase font-medium mt-1">{edu.institution}</div>
                  <div className="text-[10px] text-neon-orange font-mono font-bold mt-1">{edu.period}</div>
                  {edu.details && <p className="text-[10px] text-gray-600 mt-2 leading-normal uppercase">{edu.details}</p>}
                </div>
              ))}
            </div>

            {/* Core Skills Profile */}
            <div className="space-y-3">
              <h2 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 pb-2">
                <span className="w-2 h-3 bg-neon-orange rounded-none inline-block"></span>
                Skills Portfolio
              </h2>
              <div className="space-y-3">
                {SKILL_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="text-[10px]">
                    <span className="font-black uppercase text-gray-800 tracking-wider font-display">{cat.name}</span>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {cat.skills.map((s, sidx) => (
                        <span key={sidx} className="bg-gray-100 text-gray-900 px-2 py-0.5 rounded-none text-[9px] font-mono font-bold uppercase border border-gray-300">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards section */}
            <div className="space-y-3">
              <h2 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 pb-2">
                <AwardIcon className="w-3.5 h-3.5 text-neon-orange" />
                Awards &amp; Accolades
              </h2>
              <div className="space-y-3 text-[10px]">
                {AWARDS.map((aw, idx) => (
                  <div key={idx}>
                    <div className="font-black text-gray-900 uppercase">{aw.title}</div>
                    <p className="text-gray-600 mt-1 uppercase font-medium">{aw.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
