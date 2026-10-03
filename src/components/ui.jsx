import { Fragment, useEffect, useRef, useState } from "react";

/** Returns [ref, inView]; flips to true once the element scrolls into view. */
export function useInView({ threshold = 0.15, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, threshold, rootMargin]);

  return [ref, inView];
}

/** Fades + slides its content up when scrolled into view. */
export function Reveal({ as: Tag = "div", className = "", delay = 0, style, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`${className} reveal${inView ? " visible" : ""}`.trim()}
      style={{ "--d": `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Image with a curtain-wipe reveal and optional scroll parallax. */
export function ImgReveal({ src, alt, className = "", parallax = false, children }) {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const imgRef = useRef(null);

  useEffect(() => {
    if (!parallax) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = ref.current?.getBoundingClientRect();
      if (!box || !imgRef.current) return;
      const raw = (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const progress = Math.max(-1, Math.min(1, raw));
      imgRef.current.style.setProperty("--py", `${(progress * -7).toFixed(2)}%`);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [parallax, ref]);

  return (
    <div ref={ref} className={`${className} img-reveal${inView ? " visible" : ""}`}>
      <img ref={imgRef} className={parallax ? "parallax" : undefined} src={src} alt={alt} loading="lazy" />
      {children}
    </div>
  );
}

/** Heading whose words rise up one after another. */
export function SplitText({ as: Tag = "h2", className = "", text }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <Tag ref={ref} className={`${className} split${inView ? " visible" : ""}`} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          <span className="word" aria-hidden="true"><span style={{ "--i": i }}>{word}</span></span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}

export const ArrowLeft = () => (
  <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
);
export const ArrowRight = () => (
  <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
);
export const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.7a10.7 10.7 0 0 1-5.5-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.7 10.7 0 1 1 16 26.7zm5.9-8c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5 1-1.8.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.3 3.4 14.7 14.7 0 0 0 5.7 5c2.1.9 2.9 1 4 .8a3.4 3.4 0 0 0 2.2-1.6 2.8 2.8 0 0 0 .2-1.6c-.1-.2-.3-.3-.6-.4z" />
  </svg>
);

export const pad = (n) => String(n).padStart(2, "0");
