//
// Created by 超悠閒 on 2021/11/30.
//

#include "App.h"

using namespace std;

App App::Instance;

App::App() {}

void App::OnEvent(SDL_Event *Event) {
    if (SDL_QUIT == Event->type) {
        Running = false;
    } else if (SDL_MOUSEMOTION == Event->type) {
        int x = Event->motion.x;
        int y = Event->motion.y;
//        cout << "x = " << x << ", y = " << y << endl;

        float hor = (float) x / WIDTH;
        float ver = (float) y / HEIGHT;
        R = ((1 - hor) * (1 - ver)) * 0xff;
        G = (hor * (1 - ver)) * 0xff;
        B = (hor * ver) * 0xff;
        A = 0x00;
        cout << "(R, G, B, A) = (" << R << ", " << G << ", " << B << ", " << A << ")" << endl;
    } else if (SDL_KEYDOWN == Event->type) {
        cout << "Press key: " << Event->key.keysym.sym << endl;
        if (SDLK_ESCAPE == Event->key.keysym.sym) {
            Running = false;
        }
    }
}

bool App::Init() {
    if (SDL_Init(SDL_INIT_EVERYTHING) < 0) { // 初始化SDL
        cout << "SDL_Init error: " << SDL_GetError() << endl;
        return false;
    }

    Window = SDL_CreateWindow("Hello SDL world!", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, WIDTH,
                              HEIGHT, SDL_WINDOW_ALLOW_HIGHDPI); // 创建SDL窗口
    if (NULL == Window) {
        cout << "SDL_CreateWindow error: " << SDL_GetError() << endl;
        return false;
    }

    Renderer = SDL_CreateRenderer(Window, -1, SDL_RENDERER_ACCELERATED);
    if (NULL == Renderer) {
        cout << "SDL_CreateRenderer error: " << SDL_GetError() << endl;
        return false;
    }

    return true;
}

void App::Loop() {}

void App::Render() {
    SDL_RenderClear(Renderer);
    SDL_SetRenderDrawColor(Renderer, R, G, B, A);
    SDL_RenderPresent(Renderer);
}

void App::Cleanup() {
    if (Renderer) {
        SDL_DestroyRenderer(Renderer);
        Renderer = NULL;
    }
    if (Window) {
        SDL_DestroyWindow(Window);
        Window = NULL;
    }

    SDL_Quit();

    cout << "Quit SDL!" << endl;
}

int App::Execute(int argc, char **argv) {
    if (!Init()) {
        return 1;
    }

    SDL_Event event;
    while (Running) {
        while (SDL_PollEvent(&event) != 0) {
            OnEvent(&event);
        }

        Loop();
        Render();

        SDL_Delay(1);
    }

    Cleanup();
    return 0;
}

App *App::GetInstance() {
    return &App::Instance;
}

int App::GetWindowWidth() {
    return WIDTH;
}

int App::GetWindowHeight() {
    return HEIGHT;
}

