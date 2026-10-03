import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Quote from "./components/Quote";
import {
  Atmospheres, Contact, Faq, Footer, Intro, Marquee, Materials, Pricing, Process, Services, Spaces, Stats, Testimonials,
} from "./components/Sections";
import { WhatsAppIcon } from "./components/ui";
import { CONTACT } from "./data";

function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2200);
    return () => clearTimeout(t);
  }, []);
  const text = encodeURIComponent("Hello Krushnamnirman, I'd like to know more about your interior design services.");
  return (
    <a
      className={`whatsapp-float${show ? " show" : ""}`}
      href={`https://wa.me/${CONTACT.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}

export default function App() {
  // Set by "Request Price" buttons and space tiles to pre-fill the quote form
  const [preset, setPreset] = useState(null);

  return (
    <>
      <Loader />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Intro />
        <Spaces onPick={setPreset} />
        <Materials />
        <Stats />
        <Atmospheres />
        <Services />
        <Process />
        <Projects />
        <Pricing onPick={setPreset} />
        <Testimonials />
        <Quote preset={preset} />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
