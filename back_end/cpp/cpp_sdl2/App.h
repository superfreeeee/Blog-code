//
// Created by 超悠閒 on 2021/11/30.
//

#include <iostream>
#include <SDL2/SDL.h>

#ifndef CPP_SDL2_APP_H
#define CPP_SDL2_APP_H

class App {
private:
    static App Instance;

    bool Running = true;
    SDL_Window *Window = NULL;
    SDL_Renderer *Renderer = NULL;
    SDL_Surface *PrimarySurface = NULL;

    const int WIDTH = 1024;
    const int HEIGHT = 768;

    int R = 0xff;
    int G = 0xff;
    int B = 0xff;
    int A = 0xff;

private:
    App();

    // Capture SDL Events
    void OnEvent(SDL_Event *Event);

    // Initialize our SDL game / app
    bool Init();

    // Logic loop
    void Loop();

    // Render loop (draw)
    void Render();

    // Free up resources
    void Cleanup();

public:
    int Execute(int argc, char *argv[]);

public:
    static App *GetInstance();

    int GetWindowWidth();

    int GetWindowHeight();
};

#endif //CPP_SDL2_APP_H
