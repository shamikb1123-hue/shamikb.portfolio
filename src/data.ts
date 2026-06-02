import { Experience, Education, SkillCategory, Project } from './types';

export const PERSONAL_SUMMARY = 
  "Aspiring Human Resources and Business Development professional passionate about people, growth, and meaningful communication. Currently pursuing a BBA in Entrepreneurship and serving as the Academic Chair of the Department (Student Representative Council), where I actively contribute to student representation and academic coordination. Alongside academics, I am deeply interested in learning marketing and business strategy, exploring how brands, ideas, and people connect to create value and impact. Beyond the classroom, I express creativity as an author and content creator, using storytelling and digital media to connect with audiences and share meaningful narratives. I believe empathy, communication, and creative thinking are powerful tools for leadership and organizational growth. Always eager to learn, collaborate, and create impact through people-centric and innovative approaches.";

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Partnership Executive",
    organization: "Inhub Entrepreneurship Cell (Inspiria Knowledge Campus)",
    duration: "6 months",
    period: "January 2026 - Present",
    category: "entrepreneurship",
    details: [
      "Securing student-startup partnerships and managing outreach campaigns for the campus incubator framework.",
      "Facilitating dialogue between localized entrepreneurs and prospective student co-founders.",
      "Spearheading strategic collaborations and ecosystem networking activities."
    ]
  },
  {
    id: "exp2",
    role: "Academic Chair",
    organization: "Inspiria Knowledge Campus",
    duration: "1 year",
    period: "July 2025 - Present",
    category: "academic",
    details: [
      "Serving as the Academic Representative on the Student Representative Council (SRC).",
      "Bridging the communication gap between the faculty board and student cohorts to streamline curriculum updates.",
      "Leading department coordinators, managing educational workshops, and advocating student feedback."
    ]
  },
  {
    id: "exp3",
    role: "Innovation Ambassador",
    organization: "IIC SRCASW",
    duration: "1 year 4 months",
    period: "March 2025 - Present",
    category: "leadership",
    details: [
      "Fostering design thinking and innovation culture among students under the Institution's Innovation Council.",
      "Coordinating seminars on intellectual property rights, ideation workshops, and incubation concepts.",
      "Recognized by Ministry of Education's Innovation Cell for supporting regional entrepreneurship."
    ]
  },
  {
    id: "exp4",
    role: "Supply Chain Management Intern",
    organization: "Skymount Beverages",
    duration: "3 months",
    period: "September 2025 - November 2025",
    category: "corporate",
    details: [
      "Spearheaded key inventory audit metrics, minimizing raw material stockout risks by 12%.",
      "Managed tracking spreadsheets for outbound logistics, reporting daily quality checks and operational dispatch queues.",
      "Collaborated with procurement coordinators to optimize stock levels and run automated data dashboard models."
    ]
  },
  {
    id: "exp5",
    role: "Student Engagement Head",
    organization: "Inhub Entrepreneurship Cell (Inspiria Knowledge Campus)",
    duration: "6 months",
    period: "February 2025 - July 2025",
    category: "entrepreneurship",
    details: [
      "Designed student-focused hackathons, pitch-days, and startup bootcamps triggering 45%+ higher attendance rates.",
      "Coordinated campus newsletters, direct student feedback channels, and peer group mentor structures.",
      "Assisted in logistics planning for the national entrepreneurship summit panels."
    ]
  },
  {
    id: "exp6",
    role: "CR (BBA-E) of SOM CLUB",
    organization: "Inspiria Knowledge Campus",
    duration: "1 year 4 months",
    period: "August 2024 - November 2025",
    category: "leadership",
    details: [
      "Represented the School of Management (SOM) classes to coordinate academic schedules, events and student clubs.",
      "Maintained key communication registries, exam schedules, and grievance portfolios for over 120 students.",
      "Organized departmental management fests, intra-college panels, and resource-sharing ecosystems."
    ]
  },
  {
    id: "exp7",
    role: "Member (Young Indians)",
    organization: "Young Indians (Yi)",
    duration: "1 year 11 months",
    period: "January 2024 - November 2025",
    category: "leadership",
    details: [
      "Supported nation-building agendas, climate action task forces, and student empowerment chapters.",
      "Organized local public service drives, industrial visits, and soft skill training bootcamps."
    ]
  },
  {
    id: "exp8",
    role: "General Member E CELL",
    organization: "Inhub Entrepreneurship Cell (Inspiria Knowledge Campus)",
    duration: "8 months",
    period: "July 2024 - February 2025",
    category: "entrepreneurship",
    details: [
      "Participated in initial business modeling workshops, operational research, and campus-wide ideation challenges.",
      "Promoted localized entrepreneurial resources and arranged venue logistics for high-profile business panels."
    ]
  },
  {
    id: "exp9",
    role: "Campus Ambassador",
    organization: "Cognizance, IIT Roorkee",
    duration: "2 months",
    period: "December 2024 - January 2025",
    category: "academic",
    details: [
      "Represented IIT Roorkee's annual tech-fest in West Bengal, driving 200+ student registrations through targeted digital campaigns.",
      "Leveraged social media pipelines and student club sponsorships to increase events' geographic diversity."
    ]
  },
  {
    id: "exp10",
    role: "Member (Young Indians)",
    organization: "Young Indians",
    duration: "2 years 3 months",
    period: "September 2023 - November 2025",
    category: "leadership",
    details: [
      "Contributed to regional leadership forums, youth empowerment summits, and community awareness programs."
    ]
  },
  {
    id: "exp11",
    role: "Public Relation Executive",
    organization: "Inhub Entrepreneurship Cell",
    duration: "1 month",
    period: "January 2026 - January 2026",
    category: "entrepreneurship",
    details: [
      "Formulated early social media strategies and drafted official invitations for guest panelists.",
      "Managed public relation communications, campus press releases, and alumni interactions."
    ]
  },
  {
    id: "exp12",
    role: "Member",
    organization: "Toastmasters International",
    duration: "1 year 1 month",
    period: "July 2023 - July 2024",
    category: "leadership",
    details: [
      "Honed advanced public speaking skills, constructive evaluation methods, and spontaneous conversation delivery.",
      "Delivered multiple prepared speeches on entrepreneurship, personal stories, and business communication."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    id: "edu1",
    degree: "Bachelor of Business Administration (BBA) in Entrepreneurship & Entrepreneurial Studies",
    institution: "Inspiria Knowledge Campus",
    period: "July 2023 - December 2027",
    details: "Focusing on Startup Management, Business Development, Venture Finance, Human Resource Management, and Operational Logistics. Academic Chair of the Department."
  },
  {
    id: "edu2",
    degree: "Higher Secondary (Class XII), Humanities & Humanistic Studies",
    institution: "Techno India Group Public School",
    period: "April 2011 - March 2023",
    details: "Focused on communication, political science, humanities journals, and soft skill presentation frameworks. Graduated with honors."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Business & Strategy",
    emoji: "💼",
    description: "Developing robust models and ecosystem blueprints for modern startups.",
    skills: [
      { name: "Entrepreneurship & Ideation", level: 95, tags: ["Incubation", "Pitch-Decks", "Business Model Canvas"] },
      { name: "Business Development", level: 90, tags: ["Lead Gen", "Partnerships", "Ecosystem Networking"] },
      { name: "Marketing & Brand Strategy", level: 85, tags: ["Digital Outreach", "Consumer Psychology", "PR"] },
      { name: "Supply Chain & Operations", level: 80, tags: ["Inventory Controls", "Data Management", "Logistics Tracking"] }
    ]
  },
  {
    name: "Leadership & Representation",
    emoji: "🎙️",
    description: "Empowering groups, representing department needs, and commanding rooms.",
    skills: [
      { name: "Public Speaking & Toastmasters", level: 95, tags: ["Keynote Address", "Impromptu Speech", "Debates"] },
      { name: "Academic Administration", level: 92, tags: ["SRC Oversight", "Student Grievances", "Coordination"] },
      { name: "Event Planning", level: 90, tags: ["Fests", "Conclaves", "Hackathons", "Catering-Logistics"] },
      { name: "Team Leadership", level: 88, tags: ["E-Cell Governance", "SOM Club Direction", "Mentoring"] }
    ]
  },
  {
    name: "Interpersonal & Creative",
    emoji: "✍️",
    description: "Human-centric, storytelling, and digital copy design for ultimate connection.",
    skills: [
      { name: "Soft Skills & Empathy", level: 95, tags: ["Active Listening", "Negotiating", "Peer Advisory"] },
      { name: "Written Communication", level: 92, tags: ["Authoring", "Press Releases", "Content Writing"] },
      { name: "Storytelling & Digital Media", level: 88, tags: ["Content Creation", "Creative Narratives", "Audiences Connection"] },
      { name: "Hindi / Bengali / English", level: 90, tags: ["Professional Bilingual Range", "Cross-Cultural Sync"] }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj_inhub",
    title: "Inhub Venture Matrix Sandbox",
    description: "A business blueprint wizard mimicking campus business proposals. It simulates startup ideas, allows structuring the Business Model Canvas, and auto-calculates milestones.",
    role: "Partnership & Student Engagement Head",
    company: "Inhub Entrepreneurship Cell",
    metrics: "Enhanced active student ideation by 45%",
    tags: ["React Sandbox", "Startup Modelling", "Canvas Generator"],
    liveSimName: "VentureMatrix"
  },
  {
    id: "proj_skymount",
    title: "Skymount Logistics & Quality Grid",
    description: "An interactive, real-time-styled dashboard simulating inventory tracking, quality inspection triggers, and supply chain dispatch queues for beverage distribution.",
    role: "Supply Chain Management Intern",
    company: "Skymount Beverages",
    metrics: "12% reduction in mock-inventory discrepancies",
    tags: ["Inventory Dashboard", "SCM Simulation", "Quality Controls"],
    liveSimName: "SupplyChainHub"
  },
  {
    id: "proj_toastmasters",
    title: "Toastmasters Pitch & Timer Companion",
    description: "An AI-flavored spontaneous speech counselor. Provides randomized business and leadership prompts, live elapsed timers (with Toastmasters green/yellow/red cards), and word trackers.",
    role: "Public Speaker & Member",
    company: "Toastmasters International",
    metrics: "Reduced impromptu hesitation levels",
    tags: ["Speech Prompts", "Card Timer", "Presentations Help"],
    liveSimName: "SpeechCoach"
  },
  {
    id: "proj_som",
    title: "SOM Departmental Activity Planner",
    description: "An interactive workspace planner built to help department heads organize management lectures, student club agendas, and coordinate exam queries.",
    role: "Academic Chair & Club CR",
    company: "SOM Club & Student Representative Council",
    metrics: "Smoothed logistics of 4 major events",
    tags: ["Task Calendar", "Student Grievances Log", "Academic Roadmap"],
    liveSimName: "ActivityPlanner"
  }
];

export const CERTIFICATIONS = [
  "SWAVALAMBAN AND INNOVATION CONCLAVE - Official Delegate / Certificant",
  "Institution's Innovation Council (IIC) Ambassador Accreditation",
  "Toastmasters International - Public Communication & Leadership Milestone"
];

export const AWARDS = [
  { title: "Rising Star Award", description: "Awarded for demonstrating phenomenal early-stage startup drive, event organization, and active community growth.", year: "2025" },
  { title: "Shining Star Award", description: "Recognized for exemplary peer advisory, campus advocacy, and public speaking performance.", year: "2025" },
  { title: "Academic Chair Appointment", description: "Formally elected to command student academic coordination inside the Student Representative Council.", year: "2025" }
];
