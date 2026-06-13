(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* theme toggle */
  const root = document.documentElement;
  const stored = localStorage.getItem("vektra-theme");
  if (stored) root.setAttribute("data-theme", stored);
  const themeBtn = $("#theme-toggle");
  const themeLabel = themeBtn && $(".theme-label", themeBtn);
  const sync = () => { if (themeLabel) themeLabel.textContent = root.getAttribute("data-theme") === "light" ? "LIGHT" : "DARK"; };
  sync();
  if (themeBtn) themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("vektra-theme", next);
    sync();
  });

  /* cursor (simple) */
  const cursor = $(".cursor");
  const ring = $(".cursor-ring");
  if (cursor && ring && matchMedia("(hover: hover)").matches) {
    let cx = innerWidth/2, cy = innerHeight/2, mx = cx, my = cy, rx = cx, ry = cy;
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    const tick = () => {
      cx += (mx - cx) * 0.4; cy += (my - cy) * 0.4;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* motion demos */
  $$(".motion-demo").forEach((b) => {
    b.addEventListener("click", () => {
      b.style.setProperty("--motion-dur", b.dataset.dur);
      b.style.setProperty("--motion-ease", b.dataset.ease);
      b.classList.remove("run");
      void b.offsetWidth;
      b.classList.add("run");
      setTimeout(() => b.classList.remove("run"), 1500);
    });
  });

  /* elastic demo */
  const el = $("#elastic-demo");
  if (el) el.addEventListener("click", () => {
    el.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.4)" }, { transform: "scale(0.9)" }, { transform: "scale(1.05)" }, { transform: "scale(1)" }],
      { duration: 800, easing: "cubic-bezier(0.68, -0.55, 0.27, 1.55)" }
    );
  });

  /* logo replay */
  const replay = $("#replay-logo");
  const iframe = $(".logo-frame.anim iframe");
  if (replay && iframe) {
    replay.addEventListener("click", () => {
      const src = iframe.getAttribute("src");
      iframe.setAttribute("src", "");
      setTimeout(() => iframe.setAttribute("src", src), 30);
    });
  }
})();
