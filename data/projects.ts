export interface Project {
    id: string;
    title: string;
    subtitle: string;
    tag: string;
    featured: boolean;
    description: string;
    technicalDescription: string;
    stack: string[];
    highlights: string[];
    technicalHighlights: string[];
    architecture?: string;
    githubUrl?: string;
    liveUrl?: string;
    status: "active" | "completed" | "research";
}

const projects: Project[] = [
    {
        id: "auto-scan",
        title: "Auto Scan",
        subtitle: "Web Application Vulnerability Scanner",
        tag: "Featured Project",
        featured: true,
        status: "completed",
        description:
            "A comprehensive vulnerability scanning platform that automates security assessments for web applications. Auto Scan identifies critical weaknesses across authentication, injection points, and misconfigurations — delivering structured, severity-classified reports.",
        technicalDescription:
            "Auto Scan is a Flask-based vulnerability scanner implementing automated detection for all OWASP Top 10 categories. The backend performs deep request/response analysis, fuzzing injection vectors, and crawling application endpoints. Results are classified by CVSS-aligned severity levels (Critical / High / Medium / Low / Informational) and stored in a session-isolated database to prevent cross-scan data leakage.",
        stack: ["Python", "Flask", "SQLite", "JavaScript", "HTML/CSS", "Requests", "BeautifulSoup"],
        highlights: [
            "OWASP Top 10 coverage",
            "Automated report generation",
            "Severity-classified findings",
            "Secure user authentication",
            "Clean dashboard interface",
        ],
        technicalHighlights: [
            "Dynamic request/response interception and analysis pipeline",
            "Injected payloads tested across GET/POST/Header/Cookie parameters",
            "SQLi, XSS, SSRF, Open Redirect, IDOR detection modules",
            "CVSS-aligned severity classification (Critical → Informational)",
            "Session-isolated scan results preventing data leakage between users",
            "CSRF protection on all state-changing endpoints",
            "Bcrypt password hashing with salted storage",
            "Rate limiting on authentication endpoints (brute-force mitigation)",
        ],
        architecture:
            "Flask REST API → Scan Engine (modular plugins per vulnerability class) → Result Aggregator → SQLite (session-scoped) → Jinja2 Report Template. Authentication layer uses JWT tokens with short expiry. Frontend communicates via AJAX to avoid full-page reloads during scan progress.",
    },
    {
        id: "password-checker",
        title: "Password Checker",
        subtitle: "Secure Password Strength Analyzer",
        tag: "Mobile App",
        featured: false,
        status: "completed",
        description:
            "A Flutter mobile application that evaluates password strength in real-time, helping users build stronger security habits through visual feedback and actionable guidance.",
        technicalDescription:
            "Built in Flutter/Dart, this app implements a multi-factor password scoring engine evaluating entropy, character class distribution, sequential pattern detection, and known breach corpus matching. The evaluation runs entirely client-side — no password data is ever transmitted.",
        stack: ["Flutter", "Dart"],
        highlights: [
            "Real-time strength evaluation",
            "Visual feedback system",
            "Security awareness focused",
            "Offline-first architecture",
            "Clean Material Design UI",
        ],
        technicalHighlights: [
            "Entropy-based scoring algorithm (Shannon entropy calculation)",
            "Character class analysis: uppercase, lowercase, digits, symbols",
            "Sequential and keyboard pattern detection (abc, 123, qwerty)",
            "Dictionary attack simulation against common password list (10k entries)",
            "Zero data transmission — all analysis is client-side",
            "Animatable strength meter with color-coded feedback",
            "Actionable suggestions engine per weakness category",
        ],
        architecture:
            "Flutter StatefulWidget → PasswordAnalyzer service class → ScoreEngine (entropy + pattern modules) → UI feedback layer. All logic is encapsulated in pure Dart with no external network calls.",
    },
];

export default projects;
