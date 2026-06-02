export interface Experience {
  id: string;
  role: string;
  organization: string;
  duration: string;
  period: string;
  details: string[];
  category: 'entrepreneurship' | 'academic' | 'corporate' | 'leadership';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  tags: string[];
}

export interface SkillCategory {
  name: string;
  emoji: string;
  description: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  company: string;
  metrics: string;
  tags: string[];
  liveSimName: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
