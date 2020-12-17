#include <stdio.h>

typedef enum e_color {
    RED, GREEN, BLUE
} Color;

int main() {
    Color red = RED, green = GREEN, blue = BLUE;
    printf("----- Color -----\n");
    printf("red: %d\n", red);
    printf("green: %d\n", green);
    printf("blue: %d\n", blue);
    printf("sizeof(Color): %lu\n", sizeof(Color));
    printf("sizeof(int): %lu\n", sizeof(int));
}