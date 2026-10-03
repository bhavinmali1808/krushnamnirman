import { useCallback, useEffect, useState } from "react";
import { HERO_SLIDES } from "../data";
import { ArrowLeft, ArrowRight } from "./ui";

const DURATION = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const count = HERO_SLIDES.length;
  const go = useCallback((i) => setIndex((i + count) % count), [count]);

  // Autoplay; restarts whenever the slide changes (including manual clicks)
  useEffect(() => {
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [index, go]);

  return (
    <section className="hero" id="home" aria-roledescription="carousel" aria-label="Featured interiors">
      {HERO_SLIDES.map((s, i) => {
        const Title = i === 0 ? "h1" : "h2";
        return (
          <div
            key={s.kicker}
            className={`hero-slide${i === index ? " active" : ""}`}
            style={{ "--img": `url('${s.img}')` }}
            aria-hidden={i !== index}
          >
            <div className="hero-text">
              <p className="hero-kicker">{s.kicker}</p>
              <Title className="hero-title">{s.title[0]}<br />{s.title[1]}</Title>
              <a href={s.cta[0]} className="link-arrow light" tabIndex={i === index ? 0 : -1}>{s.cta[1]}</a>
            </div>
          </div>
        );
      })}

      <div className="hero-controls">
        <button className="circle-btn light" aria-label="Previous slide" onClick={() => go(index - 1)}><ArrowLeft /></button>
        <button className="circle-btn light" aria-label="Next slide" onClick={() => go(index + 1)}><ArrowRight /></button>
      </div>
      <a href="#intro" className="scroll-hint" aria-label="Scroll down"><span /></a>
    </section>
  );
}
