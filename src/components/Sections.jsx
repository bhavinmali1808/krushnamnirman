// Smaller, mostly static sections
import { useEffect, useRef, useState } from "react";
import {
  ATMOSPHERES, CONTACT, FAQS, MARQUEE, MATERIALS, PACKAGES, SERVICES, SPACES, STATS, STEPS, TESTIMONIALS,
} from "../data";
import { ArrowLeft, ArrowRight, ImgReveal, Reveal, SplitText, pad, useInView } from "./ui";

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE]; // doubled for a seamless loop
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

export function Intro() {
  return (
    <section className="section intro" id="intro">
      <div className="container narrow">
        <Reveal as="p" className="label">Krushnamnirman</Reveal>
        <SplitText
          className="statement"
          text="We create interiors where craftsmanship, comfort and Indian sensibility live together — from the first sketch to the final handover."
        />
        <Reveal as="a" href="#quote" className="link-arrow">Start your project</Reveal>
      </div>
    </section>
  );
}

export function Spaces({ onPick }) {
  return (
    <section className="section spaces" id="spaces">
      <div className="container">
        <div className="head-row">
          <Reveal as="h2" className="title">Spaces</Reveal>
          <Reveal as="p" delay={0.1}>Every room, designed around the way you live.</Reveal>
        </div>
        <div className="tile-grid">
          {SPACES.map((s, i) => (
            <Reveal
              as="a" href="#quote" className="tile" key={s.title} delay={(i % 4) * 0.08}
              onClick={() => onPick({ service: s.service })}
            >
              <div className="tile-img"><img src={s.img} alt={s.alt} loading="lazy" /></div>
              <h3>{s.title}</h3>
              <span className="tile-more">Get a quote</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Materials() {
  return (
    <section className="section materials" id="materials">
      <div className="container materials-grid">
        <ImgReveal className="mat-main" src={MATERIALS.main.img} alt={MATERIALS.main.alt} parallax />
        <div className="mat-text">
          <Reveal as="p" className="label">Materials for design</Reveal>
          <Reveal as="h2" className="title" delay={0.05}>Chosen by hand,<br />built to last</Reveal>
          <Reveal as="p" delay={0.1}>We work only with materials we trust — so your home looks as good in ten years as it does on handover day.</Reveal>
          <ul className="mat-list">
            {MATERIALS.list.map((m, i) => (
              <Reveal as="li" key={m} delay={i * 0.06}><b>{pad(i + 1)}</b> {m}</Reveal>
            ))}
          </ul>
        </div>
        <ImgReveal className="mat-side" src={MATERIALS.side.img} alt={MATERIALS.side.alt} />
      </div>
    </section>
  );
}

function Counter({ value, run }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1600, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, value]);
  return <span className="stat-num">{n}</span>;
}

export function Stats() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <section className="stats" ref={ref}>
      <div className="container stats-grid">
        {STATS.map((s, i) => (
          <div className={`stat reveal${inView ? " visible" : ""}`} style={{ "--d": `${i * 0.1}s` }} key={s.label}>
            <Counter value={s.value} run={inView} />
            <span className="stat-suf">{s.suffix}</span>
            <p>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Atmospheres() {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);

  const scrollBy = (dir) => {
    const el = ref.current;
    const card = el.querySelector(".card");
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  // Mouse drag-to-scroll (touch devices scroll natively)
  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 5 && !drag.current.moved) { drag.current.moved = true; setDragging(true); }
    ref.current.scrollLeft = drag.current.left - dx;
  };
  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
  };

  return (
    <section className="section atmospheres" id="atmospheres">
      <div className="container head-row">
        <div>
          <Reveal as="p" className="label">Inspirations</Reveal>
          <Reveal as="h2" className="title" delay={0.05}>Atmospheres</Reveal>
        </div>
        <Reveal className="carousel-nav" delay={0.1}>
          <button className="circle-btn" aria-label="Previous" onClick={() => scrollBy(-1)}><ArrowLeft /></button>
          <button className="circle-btn" aria-label="Next" onClick={() => scrollBy(1)}><ArrowRight /></button>
        </Reveal>
      </div>
      <div
        ref={ref}
        className={`carousel${inView ? " visible" : ""}${dragging ? " dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {ATMOSPHERES.map((a) => (
          <article className="card" key={a.title}>
            <div className="card-img"><img src={a.img} alt={a.alt} loading="lazy" draggable="false" /></div>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section services" id="services">
      <div className="container services-grid">
        <div className="services-head">
          <Reveal as="p" className="label">What we do</Reveal>
          <Reveal as="h2" className="title" delay={0.05}>Services</Reveal>
          <Reveal as="p" delay={0.1}>One team for design, production and installation — so you get one timeline and one point of contact.</Reveal>
          <Reveal as="a" href="#quote" className="btn btn-dark" delay={0.15}>Get Free Quote</Reveal>
        </div>
        <ol className="service-list">
          {SERVICES.map(([title, text], i) => (
            <Reveal as="li" key={title} delay={i * 0.05}>
              <span>{pad(i + 1)}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="head-row">
          <Reveal as="h2" className="title">Our process</Reveal>
          <Reveal as="p" delay={0.1}>From idea to handover in five clear steps.</Reveal>
        </div>
        <ol className="steps">
          {STEPS.map(([title, text], i) => (
            <Reveal as="li" className="step" key={title} delay={i * 0.12}>
              <span className="step-num">{pad(i + 1)}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Pricing({ onPick }) {
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="head-row">
          <div>
            <Reveal as="p" className="label">Pricing</Reveal>
            <Reveal as="h2" className="title" delay={0.05}>Price on request</Reveal>
          </div>
          <Reveal as="p" delay={0.1}>
            Every home is different, so every quote is made for you — based on size, materials and design.
            Tell us about your space and we'll share a detailed, itemised estimate.
          </Reveal>
        </div>
        <div className="package-grid">
          {PACKAGES.map((p, i) => (
            <Reveal as="article" className="package" key={p.name} delay={i * 0.1}>
              <span className="pkg-num">{pad(i + 1)}</span>
              <h3>{p.name}</h3>
              <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
              <p className="on-request">Price on request</p>
              <a href="#quote" className="btn btn-line" onClick={() => onPick({ property: p.property })}>Request Price</a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6500);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <section className="section testimonials">
      <div className="container narrow">
        <Reveal as="p" className="label">Client stories</Reveal>
        <Reveal className="slider" delay={0.1}>
          <div className="slides">
            {TESTIMONIALS.map((t, i) => (
              <blockquote className={`slide${i === index ? " active" : ""}`} key={i} aria-hidden={i !== index}>
                <p>"{t.quote}"</p>
                <footer>{t.by}</footer>
              </blockquote>
            ))}
          </div>
          <div className="slider-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={i === index ? "active" : ""}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <div>
          <Reveal as="p" className="label">FAQ</Reveal>
          <Reveal as="h2" className="title" delay={0.05}>Questions</Reveal>
        </div>
        <div className="accordion">
          {FAQS.map(([q, a], i) => (
            <Reveal as="details" key={q} delay={i * 0.05}>
              <summary>{q}</summary>
              <p>{a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="head-row">
          <Reveal as="h2" className="title">Contact</Reveal>
          <Reveal as="p" delay={0.1}>Call, WhatsApp or email — we'd love to hear about your project.</Reveal>
        </div>
        <div className="contact-grid">
          {CONTACT.people.map((p, i) => (
            <Reveal className="contact-card" key={p.name} delay={i * 0.1}>
              <p className="label">{p.role}</p>
              <h3>{p.name}</h3>
              <a href={`tel:${p.tel}`}>{p.phone}</a>
              <a href={`https://wa.me/${p.wa}`} target="_blank" rel="noopener noreferrer" className="link-arrow small">WhatsApp</a>
            </Reveal>
          ))}
          <Reveal className="contact-card" delay={0.2}>
            <p className="label">Email</p>
            <h3>Write to us</h3>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <span className="muted">{CONTACT.hours}</span>
          </Reveal>
          <Reveal className="contact-card" delay={0.3}>
            <p className="label">Studio</p>
            <h3>Visit us</h3>
            <span>{CONTACT.address[0]}<br />{CONTACT.address[1]}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href="#home" className="logo dark">
            <strong>KRUSHNAMNIRMAN</strong>
            <small>Interior Design</small>
          </a>
          <a href="#quote" className="btn btn-dark">Get Free Quote</a>
        </div>
        <div className="footer-grid">
          <div>
            <h4>Spaces</h4>
            <ul>{["Living Rooms", "Modular Kitchens", "Bedrooms", "Wardrobes"].map((s) => <li key={s}><a href="#spaces">{s}</a></li>)}</ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#intro">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              {CONTACT.people.map((p) => (
                <li key={p.name}><a href={`tel:${p.tel}`}>{p.name}{p.role === "Owner" ? " (Owner)" : ""} · {p.phone}</a></li>
              ))}
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Krushnamnirman Interiors. All rights reserved.</p>
          <a href="#home" className="to-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
