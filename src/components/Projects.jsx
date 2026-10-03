import { useEffect, useState } from "react";
import { PROJECTS, PROJECT_FILTERS } from "../data";
import { Reveal, useInView } from "./ui";

function ProjectItem({ p, hidden, onOpen, delay }) {
  const [ref, inView] = useInView();
  const cls = ["gallery-item", p.size, "reveal", inView && "visible", hidden && "hide"].filter(Boolean).join(" ");
  return (
    <figure
      ref={ref}
      className={cls}
      style={{ "--d": `${delay}s` }}
      tabIndex={0}
      onClick={() => onOpen(p)}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(p); } }}
    >
      <img src={p.img} alt={p.alt} loading="lazy" />
      <figcaption><span>{p.label}</span>{p.title}</figcaption>
    </figure>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="head-row">
          <div>
            <Reveal as="p" className="label">Portfolio</Reveal>
            <Reveal as="h2" className="title" delay={0.05}>Bespoke projects</Reveal>
          </div>
          <Reveal className="filters" role="tablist" aria-label="Filter projects" delay={0.1}>
            {PROJECT_FILTERS.map(([key, label]) => (
              <button
                key={key}
                role="tab"
                aria-selected={filter === key}
                className={`filter${filter === key ? " active" : ""}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </Reveal>
        </div>

        {/* key={filter} replays the pop-in animation on every filter change */}
        <div className="gallery" key={filter}>
          {PROJECTS.map((p, i) => (
            <ProjectItem
              key={p.title}
              p={p}
              delay={(i % 3) * 0.08}
              hidden={filter !== "all" && p.cat !== filter}
              onOpen={setOpen}
            />
          ))}
        </div>
      </div>

      <div
        className={`lightbox${open ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
        onClick={() => setOpen(null)}
      >
        <button className="lightbox-close" aria-label="Close">&times;</button>
        {open && <img src={open.img.replace(/w=\d+/, "w=1600")} alt={open.alt} onClick={(e) => e.stopPropagation()} />}
      </div>
    </section>
  );
}
