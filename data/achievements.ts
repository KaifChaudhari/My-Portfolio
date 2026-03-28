export interface Certificate {
    title: string;
    issuer: string;
    date?: string;
    tags: string[];
    featured?: boolean;
}

export interface AchievementCategory {
    category: string;
    icon: string; // lucide icon name
    certs: Certificate[];
}

export const featuredCerts: Certificate[] = [
    {
        title: "Certified Ethical Hacker (CEH) — Trained",
        issuer: "EC-Council",
        tags: ["Ethical Hacking", "Penetration Testing", "Vulnerability Assessment", "Network Security"],
        featured: true,
    },
    {
        title: "TryHackMe Learning Path Completion",
        issuer: "TryHackMe",
        date: "2024",
        tags: ["CTF", "Linux", "Web Exploitation", "Privilege Escalation", "OSINT"],
        featured: true,
    },
    {
        title: "Computer Networks and Internet Protocol",
        issuer: "NPTEL / IIT (SWAYAM)",
        date: "May 2025",
        tags: ["TCP/IP", "Routing", "Internet Architecture", "Network Security"],
        featured: true,
    },
    {
        title: "Operating System Course: Fundamentals of OS",
        issuer: "Scaler Topics",
        date: "Aug 2024",
        tags: ["Process Management", "Memory Management", "File Systems", "OS Architecture"],
        featured: true,
    },
    {
        title: "Cyber Security & Ethical Hacking (A+)",
        issuer: "Industry Certification",
        tags: ["Cyber Defense", "Ethical Hacking", "Threat Analysis", "Security Operations"],
        featured: true,
    },
];

export const achievementCategories: AchievementCategory[] = [
    {
        category: "Cybersecurity & Ethical Hacking",
        icon: "Shield",
        certs: [
            {
                title: "Certified Ethical Hacker (CEH) — Trained",
                issuer: "EC-Council",
                tags: ["Ethical Hacking", "Penetration Testing", "Vulnerability Assessment"],
            },
            {
                title: "EC-Council Cybersecurity Evaluation Certificate",
                issuer: "EC-Council",
                date: "2024",
                tags: ["Threat Analysis", "Security Operations", "Cyber Defense"],
            },
            {
                title: "TryHackMe Learning Path Completion",
                issuer: "TryHackMe",
                date: "2024",
                tags: ["CTF", "Web Exploitation", "Privilege Escalation"],
            },
            {
                title: "Cyber Security Certificate",
                issuer: "Online Platform",
                date: "2024",
                tags: ["Cybersecurity Fundamentals", "Threat Intelligence"],
            },
            {
                title: "Cyber Security — Projections Tech Fest",
                issuer: "Parul University",
                date: "Feb 2026",
                tags: ["Security Challenges", "Practical Cybersecurity"],
            },
            {
                title: "Hack Defense Summit 2026",
                issuer: "Sohang Education",
                date: "Feb 2026",
                tags: ["Hack Defense", "Offensive Security"],
            },
        ],
    },
    {
        category: "Networking & Systems",
        icon: "Network",
        certs: [
            {
                title: "Computer Networks and Internet Protocol",
                issuer: "NPTEL / IIT (SWAYAM)",
                date: "May 2025",
                tags: ["TCP/IP", "Routing Protocols", "Internet Protocol"],
            },
            {
                title: "Operating System Course: Fundamentals of OS",
                issuer: "Scaler Topics",
                date: "Aug 2024",
                tags: ["Process Management", "Memory Management", "OS Architecture"],
            },
        ],
    },
    {
        category: "Programming & Development",
        icon: "Code",
        certs: [
            {
                title: "Programming in Java",
                issuer: "NPTEL / IIT (SWAYAM)",
                date: "Nov 2024",
                tags: ["Java SE", "OOP", "Collections", "Multithreading"],
            },
            {
                title: "Introduction to ASP.NET",
                issuer: "Simplilearn",
                date: "2024",
                tags: ["ASP.NET", "Web Development", "C#", ".NET"],
            },
        ],
    },
    {
        category: "Databases & Tools",
        icon: "Database",
        certs: [
            {
                title: "MS PostgreSQL Training",
                issuer: "Simplilearn",
                date: "2024",
                tags: ["PostgreSQL", "SQL", "Database Administration"],
            },
            {
                title: "PostgreSQL — Spoken Tutorial",
                issuer: "IIT Bombay",
                date: "2024",
                tags: ["PostgreSQL", "SQL", "Database Design"],
            },
            {
                title: "Computer Science Test — Spoken Tutorial",
                issuer: "IIT Bombay",
                date: "2024",
                tags: ["Computer Science Fundamentals"],
            },
        ],
    },
    {
        category: "Cloud & Web Technologies",
        icon: "Globe",
        certs: [
            {
                title: "Course Completion Certificate",
                issuer: "Online Platform",
                date: "Jul 2024",
                tags: ["Web Technologies", "Full Stack"],
            },
            {
                title: "Simplilearn Training Certificate",
                issuer: "Simplilearn",
                date: "2024",
                tags: ["Cloud Fundamentals", "Technology Skills"],
            },
        ],
    },
    {
        category: "Workshops & Events",
        icon: "Trophy",
        certs: [
            {
                title: "Projections — Call of Duty Mobile Tournament",
                issuer: "Parul University",
                date: "Feb 2026",
                tags: ["Strategic Thinking", "Tech Festival"],
            },
            {
                title: "CDC Global Fun Fest — Listening",
                issuer: "CDC Global",
                date: "2023–24",
                tags: ["Communication", "Interpersonal Skills"],
            },
            {
                title: "CDC Global Fun Fest — Certificate",
                issuer: "CDC Global",
                date: "2023–24",
                tags: ["Teamwork", "Leadership"],
            },
            {
                title: "Quiz on India's Democracy",
                issuer: "MyGov / Government of India",
                tags: ["Civic Awareness", "National Knowledge"],
            },
        ],
    },
];
