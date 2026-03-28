import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueStrip from "@/components/ValueStrip";
import About from "@/components/About";
import Domains from "@/components/Domains";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import TryHackMeStats from "@/components/TryHackMeStats";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";


export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <ValueStrip />
                <About />
                <Domains />
                <Projects />
                <Research />
                <Skills />
                <Achievements />
                <TryHackMeStats />
                <Resume />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
