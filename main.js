const videoPlayer = document.createElement("video");
videoPlayer.src = "../sample-video.mp4";
videoPlayer.controls = true;
videoPlayer.style.width = "80%";
videoPlayer.style.borderRadius = "10px";
videoPlayer.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.height = "100vh";
  container.style.position = "relative";

  container.appendChild(videoPlayer);
  document.body.appendChild(container);

  // Initialize falling petals
  import("./petals.js").then((module) => {
    module.createFallingPetals();
  });
});

/*
  main.js
  - No duplicará el reproductor. Solo añade comportamientos opcionales.
*/

document.addEventListener("DOMContentLoaded", () => {
  // Mantener el video con id="videoPlayer" si existe, si no el primero
  const allVideos = () => Array.from(document.querySelectorAll("video"));
  let keep = document.getElementById("videoPlayer") || allVideos()[0] || null;

  function removeExtraVideos() {
    const vids = allVideos();
    if (!vids.length) return;
    if (!keep) keep = document.getElementById("videoPlayer") || vids[0];
    vids.forEach((v) => {
      if (v !== keep) {
        v.remove();
      }
    });
  }

  // Ejecutar limpieza inicial
  removeExtraVideos();

  // Asegurar que dentro de .video-player-container sólo quede el video deseado
  document.querySelectorAll(".video-player-container").forEach((container) => {
    const vids = container.querySelectorAll("video");
    vids.forEach((v) => {
      if (v !== keep) v.remove();
    });
  });

  // Observar el DOM por si algún script externo intenta inyectar otro <video>
  const observer = new MutationObserver(() => {
    removeExtraVideos();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
  });

  // Opcional: pausa al perder foco (comportamiento previo)
  if (keep) {
    window.addEventListener("blur", () => {
      if (!keep.paused) keep.pause();
    });
  }
});
