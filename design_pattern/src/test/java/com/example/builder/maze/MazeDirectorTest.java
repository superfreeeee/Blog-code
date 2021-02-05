package com.example.builder.maze;

import com.example.builder.maze.simple.SimpleMazeBuilder;
import org.junit.Test;

import static org.junit.Assert.*;

public class MazeDirectorTest {

    private MazeDirector director = new MazeDirector();

    @Test
    public void createMaze() {
        Maze maze = director.createMaze(new SimpleMazeBuilder());
        maze.show();
    }

    @Test
    public void createComplexMaze() {
        Maze maze = director.createComplexMaze(new SimpleMazeBuilder());
        maze.show();
    }
}