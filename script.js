// Variables globales
let menuIcon, nav, cerrarImg, img;

// Función para inicializar elementos del DOM
function initializeElements() {
  menuIcon = document.querySelector(".menuIcon");
  nav = document.querySelector(".nav");
  cerrarImg = document.querySelector(".cerrarImg");
  img = document.querySelector(".aviso");

  // Event listeners solo si los elementos existen
  if (menuIcon && nav) {
    menuIcon.onclick = function () {
      nav.classList.toggle("active");
    };
  }

  if (cerrarImg && img) {
    cerrarImg.onclick = function () {
      img.classList.toggle("closeAviso");
    };
  }
}

// JavaScript para evitar anticlick en la página
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

// JavaScript para evitar el uso de F12
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

// Contador de visitas global usando CountAPI
async function initGlobalVisitCounter() {
  try {
    const apiUrl =
      "https://api.countapi.xyz/hit/ut_MLKieFOdcEviudrGRFGqnf70sMyQdSW7NmNcTJ9l/visits";

    console.log("Intentando conectar con CountAPI...");

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Respuesta de CountAPI:", data);

    const countElement = document.getElementById("visitCount");
    if (countElement) {
      if (data.value !== undefined) {
        countElement.textContent = data.value.toLocaleString();
        console.log("Contador actualizado:", data.value);
      } else {
        throw new Error("No se recibió valor válido de la API");
      }
    } else {
      console.error("Elemento visitCount no encontrado en el DOM");
    }
  } catch (error) {
    console.error("Error al obtener contador de visitas:", error);
    initLocalVisitCounter();
  }
}

// Función de respaldo con localStorage
function initLocalVisitCounter() {
  console.log("Usando contador local como respaldo");

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
    console.log("Contador local actualizado:", visitCount);
  }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM cargado, inicializando...");

  // Inicializar elementos del DOM
  initializeElements();

  // Prevenir arrastre de imágenes
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
  });

  // Inicializar contador después de un pequeño delay
  setTimeout(() => {
    initGlobalVisitCounter();
  }, 100);
});
