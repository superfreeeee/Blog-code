package com.example.builder.maze;

import com.example.builder.maze.simple.SimpleMaze;

public class MazeDirector {

    public SimpleMaze createMaze(MazeBuilder builder) {
        builder.buildMaze(4);
        builder.buildRoom(1);
        builder.buildRoom(3);
        builder.buildDoor(1, 3);
        return builder.getMaze();
    }

    public SimpleMaze createComplexMaze(MazeBuilder builder) {
        int size = 16;
        builder.buildMaze(size);
        for (int i = 0; i < size; i++) {
            builder.buildRoom(i);
        }
        builder.buildDoor(0, 1);
        builder.buildDoor(4, 5);
        builder.buildDoor(4, 8);
        builder.buildDoor(9, 10);
        builder.buildDoor(10, 6);
        builder.buildDoor(11, 15);
        builder.buildDoor(13, 12);
        builder.buildDoor(13, 14);
        builder.buildDoor(13, 9);
        return builder.getMaze();
    }

}
