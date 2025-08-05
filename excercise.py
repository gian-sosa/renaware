import pygame
import sys
import random

# Inicializar pygame
pygame.init()

# Configuración de la pantalla
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Pong")

# Colores
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# Configuración de las paletas
PADDLE_WIDTH, PADDLE_HEIGHT = 15, 100
PADDLE_SPEED = 7

# Configuración de la pelota
BALL_SIZE = 15
BALL_SPEED_X, BALL_SPEED_Y = 5, 5

# Inicializar paletas
player_paddle = pygame.Rect(50, HEIGHT // 2 - PADDLE_HEIGHT // 2, PADDLE_WIDTH, PADDLE_HEIGHT)
opponent_paddle = pygame.Rect(WIDTH - 50 - PADDLE_WIDTH, HEIGHT // 2 - PADDLE_HEIGHT // 2, PADDLE_WIDTH, PADDLE_HEIGHT)

# Inicializar pelota
ball = pygame.Rect(WIDTH // 2 - BALL_SIZE // 2, HEIGHT // 2 - BALL_SIZE // 2, BALL_SIZE, BALL_SIZE)
ball_speed_x = BALL_SPEED_X * random.choice((1, -1))
ball_speed_y = BALL_SPEED_Y * random.choice((1, -1))

# Puntuación
player_score = 0
opponent_score = 0
font = pygame.font.Font(None, 36)

# Reloj para controlar la velocidad del juego
clock = pygame.time.Clock()

def reset_ball():
    """Reinicia la pelota al centro con dirección aleatoria"""
    ball.center = (WIDTH // 2, HEIGHT // 2)
    return BALL_SPEED_X * random.choice((1, -1)), BALL_SPEED_Y * random.choice((1, -1))

# Bucle principal del juego
while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
    
    # Movimiento de las paletas
    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP] and player_paddle.top > 0:
        player_paddle.y -= PADDLE_SPEED
    if keys[pygame.K_DOWN] and player_paddle.bottom < HEIGHT:
        player_paddle.y += PADDLE_SPEED
    
    # IA del oponente (sigue la pelota)
    if opponent_paddle.centery < ball.centery and opponent_paddle.bottom < HEIGHT:
        opponent_paddle.y += PADDLE_SPEED - 1  # Un poco más lento para hacerlo más fácil
    if opponent_paddle.centery > ball.centery and opponent_paddle.top > 0:
        opponent_paddle.y -= PADDLE_SPEED - 1
    
    # Movimiento de la pelota
    ball.x += ball_speed_x
    ball.y += ball_speed_y
    
    # Colisiones con los bordes superior e inferior
    if ball.top <= 0 or ball.bottom >= HEIGHT:
        ball_speed_y *= -1
    
    # Colisiones con las paletas
    if ball.colliderect(player_paddle) or ball.colliderect(opponent_paddle):
        ball_speed_x *= -1
        # Aumentar un poco la velocidad después de cada golpe
        ball_speed_x *= 1.05
        ball_speed_y *= 1.05
    
    # Puntuación
    if ball.left <= 0:
        opponent_score += 1
        ball_speed_x, ball_speed_y = reset_ball()
    if ball.right >= WIDTH:
        player_score += 1
        ball_speed_x, ball_speed_y = reset_ball()
    
    # Dibujar elementos
    screen.fill(BLACK)
    pygame.draw.rect(screen, WHITE, player_paddle)
    pygame.draw.rect(screen, WHITE, opponent_paddle)
    pygame.draw.ellipse(screen, WHITE, ball)
    pygame.draw.aaline(screen, WHITE, (WIDTH // 2, 0), (WIDTH // 2, HEIGHT))
    
    # Mostrar puntuación
    player_text = font.render(str(player_score), True, WHITE)
    opponent_text = font.render(str(opponent_score), True, WHITE)
    screen.blit(player_text, (WIDTH // 4, 20))
    screen.blit(opponent_text, (3 * WIDTH // 4, 20))
    
    # Actualizar pantalla
    pygame.display.flip()
    clock.tick(60)  # 60 FPS