import pygame
import sqlite3

# Constants
SCREEN_WIDTH, SCREEN_HEIGHT = 1200, 1800
ITEM_HEIGHT = 50
ITEM_MARGIN = 10
FONT_SIZE = 48
BG_COLOR = (255, 255, 255)
ITEM_COLOR = (200, 200, 200)
ITEM_SELECTED_COLOR = (150, 150, 255)
TEXT_COLOR = (0, 0, 0)
SCROLL_SPEED = 60

# Database
DB_PATH = "database.db"

def load_questions():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, rank FROM questions")
    items = cursor.fetchall()
    conn.close()
    return items

def save_item_ranks(item_rects):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    for idx, item in enumerate(item_rects):
        cursor.execute(
            "UPDATE questions SET rank = ? WHERE id = ?",
            (idx, item["id"])
        )
    conn.commit()
    conn.close()
    print("Ranks saved to database.")

def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Scrollable Drag-and-Drop Sorter")

    font = pygame.font.SysFont(None, FONT_SIZE)

    items = load_questions()
    item_rects = []

    for i, (item_id, title, rank) in enumerate(items):
        rect = pygame.Rect(
            20,
            i * (ITEM_HEIGHT + ITEM_MARGIN),
            SCREEN_WIDTH - 40,
            ITEM_HEIGHT
        )


        item_rects.append({"id": item_id, "title": title, "rank": rank, "rect": rect})

    item_rects.sort(key = lambda x: x["rank"] or 0)


    selected_item = None
    offset_y = 0
    scroll_offset = 0

    clock = pygame.time.Clock()
    running = True

    while running:
        clock.tick(60)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

            elif event.type == pygame.MOUSEBUTTONDOWN:
                if event.button == 1:  # Left click
                    mouse_x, mouse_y = event.pos
                    adjusted_y = mouse_y + scroll_offset
                    for item in item_rects:
                        if item["rect"].collidepoint((mouse_x, adjusted_y)):
                            selected_item = item
                            offset_y = adjusted_y - item["rect"].y
                            break

                elif event.button == 4:  # Scroll up
                    scroll_offset = max(scroll_offset - SCROLL_SPEED, -100)
                elif event.button == 5:  # Scroll down
                    max_scroll = max(0, (len(item_rects) * (ITEM_HEIGHT + ITEM_MARGIN)) - SCREEN_HEIGHT + 100)
                    scroll_offset = min(scroll_offset + SCROLL_SPEED, max_scroll)

            elif event.type == pygame.MOUSEBUTTONUP:
                if event.button == 1 and selected_item:
                    # Snap to nearest position
                    index = (selected_item["rect"].y) // (ITEM_HEIGHT + ITEM_MARGIN)
                    index = max(0, min(index, len(item_rects) - 1))
                    item_rects.remove(selected_item)
                    item_rects.insert(index, selected_item)
                    # Recalculate positions
                    for i, item in enumerate(item_rects):
                        item["rect"].y = i * (ITEM_HEIGHT + ITEM_MARGIN)
                    selected_item = None

            elif event.type == pygame.MOUSEMOTION:
                if selected_item:
                    mouse_x, mouse_y = event.pos
                    adjusted_y = mouse_y + scroll_offset
                    selected_item["rect"].y = adjusted_y - offset_y

            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_s:
                    save_item_ranks(item_rects) 

        screen.fill(BG_COLOR)

        # Draw only visible items
        for idx, item in enumerate(item_rects):
            draw_rect = item["rect"].copy()
            draw_rect.y -= scroll_offset
            if draw_rect.bottom >= 0 and draw_rect.top <= SCREEN_HEIGHT:
                color = ITEM_SELECTED_COLOR if item == selected_item else ITEM_COLOR
                pygame.draw.rect(screen, color, draw_rect)
                title_surface = font.render(item["title"], True, TEXT_COLOR)
                idx_surface = font.render(str(idx + 1), True, TEXT_COLOR)
                screen.blit(title_surface, (draw_rect.x + 10, draw_rect.y + 10))
                screen.blit(idx_surface, (draw_rect.x + draw_rect.w - 20, draw_rect.y + 10))

        pygame.display.flip()

    pygame.quit()

if __name__ == "__main__":
    main()
