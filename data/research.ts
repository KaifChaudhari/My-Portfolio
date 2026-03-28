export interface ResearchItem {
    id: string;
    title: string;
    category: "writeup" | "research" | "blog" | "ctf";
    summary: string;
    technicalSummary: string;
    tags: string[];
    date: string;
    readTime: string;
    url?: string;
}

const research: ResearchItem[] = [
    {
        id: "sqli-deep-dive",
        title: "SQL Injection Beyond the Basics",
        category: "writeup",
        summary:
            "A practical walkthrough of advanced SQLi exploitation techniques, covering blind injection, time-based attacks, and out-of-band data exfiltration against hardened targets.",
        technicalSummary:
            "Explores Boolean-based blind SQLi using binary search algorithms for efficient data extraction (O(log n) queries per character). Covers time-based blind attacks with SLEEP() and WAITFOR DELAY, error-based extraction via GROUP BY, and OOB techniques using DNS lookups. Includes WAF evasion patterns: comment obfuscation, encoding, and case variation.",
        tags: ["SQLi", "Web Security", "OWASP", "Penetration Testing"],
        date: "2024-11",
        readTime: "12 min",
    },
    {
        id: "malware-analysis-rat",
        title: "Dissecting a Python-Based RAT",
        category: "research",
        summary:
            "Static and dynamic analysis of a Python-compiled Remote Access Trojan, covering persistence mechanisms, C2 communication, and defensive countermeasures.",
        technicalSummary:
            "Reverse engineered a PyInstaller-compiled RAT using pyinstxtractor + uncompyle6. Identified AES-128 CBC encrypted C2 traffic with hardcoded XOR-obfuscated key. Persistence via Windows Registry Run key and scheduled task double-drop. C2 protocol used HTTP CONNECT tunneling to bypass firewall egress filtering. Documented full IOC list and YARA detection rules.",
        tags: ["Malware Analysis", "Reverse Engineering", "C2", "Python"],
        date: "2024-09",
        readTime: "18 min",
    },
    {
        id: "ai-threat-detection",
        title: "Applying ML to Anomaly Detection in Web Traffic",
        category: "blog",
        summary:
            "Exploring how machine learning models can identify malicious web traffic patterns that signature-based WAFs consistently miss.",
        technicalSummary:
            "Implemented an Isolation Forest model trained on CSIC 2010 HTTP dataset. Feature engineering: request length, parameter count, entropy of values, HTTP verb distribution. Achieved 94.2% detection rate with 3.1% false positive rate. Compared against ModSecurity CRS baseline (87% detection, 7.4% FPR). Discusses adversarial evasion: low-entropy polymorphic payloads.",
        tags: ["Machine Learning", "WAF", "Anomaly Detection", "AI Security"],
        date: "2025-01",
        readTime: "15 min",
    },
    {
        id: "ctf-web-challenges",
        title: "CTF Web Security Challenge Breakdowns",
        category: "ctf",
        summary:
            "Detailed solution writeups for challenging web security CTF problems, covering SSRF chains, prototype pollution, and JWT algorithm confusion attacks.",
        technicalSummary:
            "SSRF chain: Gopher protocol wrapper enabling internal Redis command injection → RCE via Lua eval(). Prototype pollution: __proto__ injection through JSON merge in lodash-based utility leading to privilege escalation. JWT confusion: RS256→HS256 algorithm substitution using public key as HMAC secret for admin token forgery.",
        tags: ["CTF", "SSRF", "JWT", "Prototype Pollution", "Web Security"],
        date: "2025-02",
        readTime: "20 min",
    },
];

export default research;
