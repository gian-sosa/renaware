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
