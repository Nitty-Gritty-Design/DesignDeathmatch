(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* cursor follower */
  const cursor = $(".cursor");
  if (cursor && matchMedia("(hover: hover)").matches) {
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; cursor.classList.add("live"); });
    addEventListener("mouseleave", () => cursor.classList.remove("live"));
    const tick = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* motion demo buttons */
  $$(".motion-demo").forEach((b) => {
    b.addEventListener("click", () => {
      b.style.setProperty("--motion-dur", b.dataset.dur);
      b.style.setProperty("--motion-ease", b.dataset.ease);
      b.classList.remove("run");
      // restart animation
      void b.offsetWidth;
      b.classList.add("run");
      setTimeout(() => b.classList.remove("run"), 1500);
    });
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
