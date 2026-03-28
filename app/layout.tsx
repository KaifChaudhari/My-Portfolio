import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { TechnicalProvider } from "@/context/TechnicalContext";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import PageLoader from "@/components/PageLoader";
import SmoothScroll from "@/components/SmoothScroll";
import CursorEffect from "@/components/CursorEffect";
import ScrollAnimations from "@/components/ScrollAnimations";
import MatrixRain from "@/components/MatrixRain";

export const metadata: Metadata = {
    metadataBase: new URL("https://kaifchaudhari.github.io"),
    title: "Kaif Chaudhari – Cybersecurity Analyst & Security Researcher",
    description:
        "Portfolio of Kaif Chaudhari showcasing cybersecurity projects, vulnerability research, AI-driven security systems, and secure application development.",
    keywords: [
        "cybersecurity analyst",
        "security researcher",
        "penetration testing",
        "web application security",
        "vulnerability assessment",
        "AI security",
        "Kaif Chaudhari",
    ],
    authors: [{ name: "Kaif Chaudhari" }],
    creator: "Kaif Chaudhari",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://kaifchaudhari.github.io",
        title: "Kaif Chaudhari – Cybersecurity Analyst & Security Researcher",
        description:
            "Portfolio showcasing cybersecurity projects, vulnerability research, AI-driven security systems, and secure application development.",
        siteName: "Kaif Chaudhari Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Kaif Chaudhari – Cybersecurity Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Kaif Chaudhari – Cybersecurity Analyst & Security Researcher",
        description: "Cybersecurity portfolio — vulnerability research, AI defense, secure engineering.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <meta name="theme-color" content="#0a0a0f" />
                <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:;" />
            </head>
            <body className="antialiased">
                <CursorEffect />
                <PageLoader />
                <ScrollProgress />
                <MatrixRain />
                <SmoothScroll>
                    <ThemeProvider>
                        <TechnicalProvider>
                            {children}
                            <BackToTop />
                            <ScrollAnimations />
                        </TechnicalProvider>
                    </ThemeProvider>
                </SmoothScroll>
            </body>
        </html>
    );
}
