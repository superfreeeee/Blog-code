package com.example.builder.maze;

import com.example.builder.maze.simple.SimpleMaze;

public interface MazeBuilder {

    void buildMaze(int size);

    void buildRoom(int roomNO);

    void buildDoor(int roomFrom, int roomTo);

    SimpleMaze getMaze();
}
