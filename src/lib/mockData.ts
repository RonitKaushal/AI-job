export interface ResumeData {
  name: string;
  title: string;
  experience: string;
  education: string;
  skills: string[];
  summary: string;
}

export interface JobAnalysis {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  experienceMatch: "Strong" | "Moderate" | "Weak";
  verdict: "eligible" | "partial" | "not-eligible";
  verdictReason: string;
}

export interface JobCard {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  matchPercentage: number;
  salary: string;
  tags: string[];
  posted: string;
}

export const mockResumeData: ResumeData = {
  name: "Alex Morgan",
  title: "Frontend Developer",
  experience: "2.5 years",
  education: "B.Tech in Computer Science · MIT",
  summary:
    "Passionate frontend developer with hands-on experience building scalable web applications using modern JavaScript frameworks.",
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "UI/UX Design",
    "Git",
    "REST APIs",
    "Figma",
  ],
};

export const mockJobAnalysis: JobAnalysis = {
  matchPercentage: 78,
  matchingSkills: ["React", "TypeScript", "Node.js", "REST APIs", "Git"],
  missingSkills: ["GraphQL", "AWS", "Docker"],
  experienceMatch: "Moderate",
  verdict: "partial",
  verdictReason:
    "Your profile strongly matches the core technical stack. Some cloud & DevOps skills are missing but not critical.",
};

export const mockSuggestedJobs: JobCard[] = [
  {
    id: 1,
    title: "Frontend Engineer",
    company: "Vercel Inc.",
    location: "San Francisco, CA · Remote",
    type: "Full-time",
    matchPercentage: 92,
    salary: "$90k – $120k",
    tags: ["React", "TypeScript", "Next.js"],
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "React Developer",
    company: "Stripe",
    location: "New York, NY · Hybrid",
    type: "Full-time",
    matchPercentage: 85,
    salary: "$95k – $130k",
    tags: ["React", "Node.js", "REST APIs"],
    posted: "4 days ago",
  },
  {
    id: 3,
    title: "UI Engineer",
    company: "Figma",
    location: "Remote · Worldwide",
    type: "Full-time",
    matchPercentage: 79,
    salary: "$80k – $110k",
    tags: ["UI/UX", "Figma", "React"],
    posted: "1 week ago",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Linear",
    location: "London, UK · Remote",
    type: "Full-time",
    matchPercentage: 74,
    salary: "$85k – $115k",
    tags: ["Node.js", "TypeScript", "GraphQL"],
    posted: "3 days ago",
  },
  {
    id: 5,
    title: "Software Engineer – Web",
    company: "Notion",
    location: "Austin, TX · On-site",
    type: "Full-time",
    matchPercentage: 68,
    salary: "$88k – $125k",
    tags: ["React", "TypeScript", "Git"],
    posted: "5 days ago",
  },
  {
    id: 6,
    title: "Junior Frontend Developer",
    company: "Loom",
    location: "Remote · US",
    type: "Full-time",
    matchPercentage: 95,
    salary: "$70k – $90k",
    tags: ["React", "Tailwind CSS", "UI/UX"],
    posted: "1 day ago",
  },
];

export const resumeImprovementTips = [
  {
    icon: "✦",
    title: "Add Quantifiable Achievements",
    description:
      "Replace generic duties with impact metrics. e.g. \"Reduced load time by 40% by implementing lazy loading.\"",
  },
  {
    icon: "✦",
    title: "Learn Cloud Basics",
    description:
      "AWS or GCP fundamentals will open 30% more job opportunities in your tech stack.",
  },
  {
    icon: "✦",
    title: "Get Docker Certified",
    description:
      "Docker & containerization skills are consistently listed in senior-level frontend/full-stack JDs.",
  },
  {
    icon: "✦",
    title: "Strengthen Your GitHub Profile",
    description:
      "Recruiters scan GitHub. Pin 3 impactful projects with a detailed README and live demo link.",
  },
];
