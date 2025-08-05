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

// // JavaScript para evitar anticlick en la página
// document.addEventListener(
//   "contextmenu",
//   function (e) {
//     e.preventDefault();
//   },
//   false
// );

// document.addEventListener(
//   "selectstart",
//   function (e) {
//     e.preventDefault();
//   },
//   false
// );

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
});

const token = "ut_5f7kcWPc0oSRse4idt7V5bbnZ0KEcmBKy4UsPbmC"; // tu nuevo token
const workspace = "renaware";
const counterName = "renaware";

fetch(
  `https://counterapi.dev/api/v1/workspace/${workspace}/counter/${counterName}/hit`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("visit-count").textContent = data.value || 0;
  })
  .catch((error) => {
    console.error("Error al obtener el contador:", error);
    document.getElementById("visit-count").textContent = "Error";
  });
