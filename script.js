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
