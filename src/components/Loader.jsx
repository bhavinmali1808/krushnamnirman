import { useEffect, useState } from "react";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let t1, t2, finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, 1400 - (performance.now() - start));
      t1 = setTimeout(() => {
        setDone(true);
        document.body.classList.remove("loading");
        t2 = setTimeout(() => setGone(true), 1200);
      }, wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    // Safety net: never block the page for more than 4s
    const failsafe = setTimeout(finish, 4000);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(failsafe);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (gone) return null;
  return (
    <div className={`loader${done ? " done" : ""}`} aria-hidden="true">
      <div className="loader-inner">
        <span className="loader-word">KRUSHNAMNIRMAN</span>
        <span className="loader-line" />
      </div>
    </div>
  );
}
