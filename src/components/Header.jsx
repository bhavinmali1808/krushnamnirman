import { useEffect, useRef, useState } from "react";
import { NAV } from "../data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 700 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const cls = ["header", scrolled && "scrolled", hidden && !open && "hidden", open && "menu-open"]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={cls}>
      <div className="nav">
        <a href="#home" className="logo" aria-label="Krushnamnirman home" onClick={close}>
          <strong>KRUSHNAMNIRMAN</strong>
          <small>Interior Design</small>
        </a>

        <nav className={`nav-links${open ? " open" : ""}`} id="navLinks" aria-label="Main">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={close}>
              <span data-text={label}>{label}</span>
            </a>
          ))}
          <a href="#quote" className="btn btn-line nav-cta" onClick={close}>Get Free Quote</a>
        </nav>

        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}
