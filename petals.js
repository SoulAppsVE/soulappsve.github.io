/*
  petals.js
  - Genera corazones (petals) y palabras "Bubu" que caen.
  - No toca el <video>.
*/

(function () {
  const CONTAINER_SELECTOR = ".petal-container";
  const PETAL_COUNT = 28;
  const BUBU_COUNT = 14;
  const container = document.querySelector(CONTAINER_SELECTOR);
  if (!container) return;

  // Evitar ejecutar más de una vez
  if (container.dataset.petalsInit === "true") return;
  container.dataset.petalsInit = "true";

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  // --- corazones ---
  for (let i = 0; i < PETAL_COUNT; i++) {
    const p = document.createElement("div");
    p.className = "petal";

    const base = 24;
    const scale = rand(0.6, 1.5);
    const size = Math.round(base * scale);
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;

    p.style.left = `${rand(-10, 110)}%`;
    p.style.top = `${rand(-20, -5)}vh`;

    const fallDuration = rand(6, 18);
    const swayDuration = rand(3, 6);
    const delay = rand(-10, 8);
    p.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    p.style.animationDelay = `${delay}s, ${rand(0, 2)}s`;

    p.style.opacity = `${rand(0.85, 1)}`;

    container.appendChild(p);
  }

  // --- palabras "Bubu" ---
  // Evitar crear varias veces si ya existen
  if (container.dataset.bubuInit === "true") return;
  container.dataset.bubuInit = "true";

  for (let i = 0; i < BUBU_COUNT; i++) {
    const t = document.createElement("span");
    t.className = "bubu";
    t.textContent = "Bubu";

    // tamaño de fuente aleatorio (relativo)
    const fontBase = rand(14, 26); // px
    t.style.fontSize = `${Math.round(fontBase)}px`;

    // posición inicial
    t.style.left = `${rand(-8, 108)}%`;
    t.style.top = `${rand(-30, -5)}vh`;

    // animaciones (coinciden con las keyframes fallText, swayText en CSS)
    const fallDuration = rand(7, 16);
    const swayDuration = rand(2.5, 5.5);
    const delay = rand(-10, 6);
    t.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    t.style.animationDelay = `${delay}s, ${rand(0, 2)}s`;

    t.style.opacity = `${rand(0.7, 1)}`;

    container.appendChild(t);
  }
})();
