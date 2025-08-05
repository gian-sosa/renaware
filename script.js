menuIcon = document.querySelector(".menuIcon");
menuIcon.onclick = function () {
  nav = document.querySelector(".nav");
  nav.classList.toggle("active");
};

cerrarImg = document.querySelector(".cerrarImg");
cerrarImg.onclick = function () {
  img = document.querySelector(".aviso");
  img.classList.toggle("closeAviso");
};

//javascript para evitar anticlick en la página
document.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);
document.addEventListener(
  "selectstart",
  function (e) {
    e.preventDefault();
  },
  false
);
//javascript para evitar el uso de F12
document.onkeydown = function (e) {
  if (e.keyCode === 123) {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
    e.preventDefault();
    return false;
  }
};

// Prevenir arrastre de imágenes
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
  });
});

// Contador de visitas global usando CountAPI
async function initGlobalVisitCounter() {
  try {
    // URL única para tu sitio web - cambia 'renaware-pilar-sosa' por un nombre único
    const apiUrl = "https://api.countapi.xyz/hit/renaware-pilar-sosa/visits";

    const response = await fetch(apiUrl);
    const data = await response.json();

    const countElement = document.getElementById("visitCount");
    if (countElement && data.value) {
      countElement.textContent = data.value.toLocaleString();
    }
  } catch (error) {
    console.error("Error al obtener contador de visitas:", error);
    // Fallback al localStorage si falla la API
    initLocalVisitCounter();
  }
}

// Función de respaldo con localStorage
function initLocalVisitCounter() {
  let visitCount = localStorage.getItem("visitCount");

  if (visitCount === null) {
    visitCount = 0;
  } else {
    visitCount = parseInt(visitCount);
  }

  visitCount++;
  localStorage.setItem("visitCount", visitCount);

  const countElement = document.getElementById("visitCount");
  if (countElement) {
    countElement.textContent = visitCount.toLocaleString();
  }
}

// Inicializar contador cuando cargue la página
document.addEventListener("DOMContentLoaded", function () {
  initGlobalVisitCounter();
});
