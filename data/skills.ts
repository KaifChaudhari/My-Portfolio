export interface SkillCategory {
    category: string;
    icon: string;
    skills: Skill[];
}

export interface Skill {
    name: string;
    level: "Expert" | "Advanced" | "Intermediate" | "Familiar";
}

const skills: SkillCategory[] = [
    {
        category: "Security",
        icon: "Shield",
        skills: [
            { name: "Web Application Penetration Testing", level: "Advanced" },
            { name: "Vulnerability Assessment", level: "Advanced" },
            { name: "OWASP Top 10", level: "Advanced" },
            { name: "Threat Modeling", level: "Intermediate" },
            { name: "Malware Analysis", level: "Intermediate" },
            { name: "Social Engineering", level: "Intermediate" },
            { name: "Network Security", level: "Intermediate" },
            { name: "CTF Challenges", level: "Advanced" },
        ],
    },
    {
        category: "Programming",
        icon: "Code",
        skills: [
            { name: "Python", level: "Advanced" },
            { name: "TypeScript / JavaScript", level: "Advanced" },
            { name: "Dart / Flutter", level: "Intermediate" },
            { name: "Bash / Shell Scripting", level: "Intermediate" },
            { name: "SQL", level: "Intermediate" },
            { name: "HTML / CSS", level: "Advanced" },
        ],
    },
    {
        category: "Security Tools",
        icon: "Terminal",
        skills: [
            { name: "Burp Suite", level: "Advanced" },
            { name: "Nmap / Nessus", level: "Intermediate" },
            { name: "Metasploit", level: "Intermediate" },
            { name: "Wireshark", level: "Intermediate" },
            { name: "OWASP ZAP", level: "Intermediate" },
            { name: "SQLMap", level: "Advanced" },
            { name: "Gobuster / Ffuf", level: "Advanced" },
        ],
    },
    {
        category: "Frameworks & Platforms",
        icon: "Layers",
        skills: [
            { name: "Flask", level: "Advanced" },
            { name: "Next.js / React", level: "Advanced" },
            { name: "Linux (Kali / Ubuntu)", level: "Advanced" },
            { name: "Docker", level: "Intermediate" },
            { name: "Git / GitHub", level: "Advanced" },
            { name: "Firebase", level: "Intermediate" },
        ],
    },
    {
        category: "AI & Emerging",
        icon: "Brain",
        skills: [
            { name: "AI-Driven Threat Detection", level: "Intermediate" },
            { name: "Prompt Engineering (Security)", level: "Intermediate" },
            { name: "Anomaly Detection Models", level: "Familiar" },
            { name: "LLM Security Research", level: "Familiar" },
        ],
    },
];

export default skills;
