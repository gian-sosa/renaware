const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Tamaño de cada celda
const cellSize = 20;
const canvasSize = 400;

// Dirección inicial de la serpiente
let dx = cellSize;
let dy = 0;

// Serpiente y manzana
let snake = [{ x: 100, y: 100 }];
let apple = { x: 200, y: 200 };

// Puntuación
let score = 0;

// Función para dibujar la serpiente
function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x, segment.y, cellSize, cellSize);
  });
}

// Función para dibujar la manzana
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, cellSize, cellSize);
}

// Función para mover la serpiente
function moveSnake() {
  const head = { ...snake[0] }; // Copia de la cabeza

  head.x += dx;
  head.y += dy;

  // Comprobamos si la serpiente se ha chocado con los bordes
  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize
  ) {
    resetGame();
  }

  // Comprobamos si la serpiente se ha mordido a sí misma
  if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    resetGame();
  }

  snake.unshift(head); // Añadimos la nueva cabeza

  // Si la serpiente ha comido una manzana
  if (head.x === apple.x && head.y === apple.y) {
    score++;
    spawnApple();
  } else {
    snake.pop(); // Quitamos la cola si no ha comido
  }
}

// Función para dibujar el tablero
function drawBoard() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  drawSnake();
  drawApple();
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Puntuación: ${score}`, 10, 20);
}

// Función para generar una nueva manzana en una posición aleatoria
function spawnApple() {
  apple.x = Math.floor(Math.random() * (canvasSize / cellSize)) * cellSize;
  apple.y = Math.floor(Math.random() * (canvasSize / cellSize)) * cellSize;
}

// Función de reinicio del juego
function resetGame() {
  score = 0;
  snake = [{ x: 100, y: 100 }];
  dx = cellSize;
  dy = 0;
  spawnApple();
}

// Manejador de eventos para las teclas
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -cellSize;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = cellSize;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -cellSize;
    dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = cellSize;
    dy = 0;
  }
});

// Función principal del juego
function gameLoop() {
  moveSnake();
  drawBoard();
  setTimeout(gameLoop, 100); // Controla la velocidad del juego
}

// Iniciar juego
spawnApple();
gameLoop();
