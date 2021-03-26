package com.example.builder.maze.simple;

import com.example.builder.maze.MazeBuilder;

public class SimpleMazeBuilder implements MazeBuilder {

    private SimpleMaze maze;

    @Override
    public void buildMaze(int size) {
        this.maze = new SimpleMaze(size);
    }

    @Override
    public void buildRoom(int roomNO) {
        if (!maze.hasRoom(roomNO)) {
            Room room = new Room(roomNO);
            maze.addRoom(room);
            room.setSide(Direction.North, new Wall());
            room.setSide(Direction.South, new Wall());
            room.setSide(Direction.East, new Wall());
            room.setSide(Direction.West, new Wall());
        }
    }

    @Override
    public void buildDoor(int fromNO, int toNO) {
        Room from = maze.getRoom(fromNO);
        Room to = maze.getRoom(toNO);
        Door door = new Door(from, to);
        from.setSide(commonWall(from, to), door);
        to.setSide(commonWall(to, from), door);
    }

    @Override
    public SimpleMaze getMaze() {
        return maze;
    }

    private Direction commonWall(Room from, Room to) {
        int d = to.getRoomNO() - from.getRoomNO();
        if (d == 1) return Direction.East;
        if (d == -1) return Direction.West;
        int w = (int) Math.sqrt(maze.size());
        if (d == w) return Direction.South;
        if (d == -w) return Direction.North;
        throw new RuntimeException("None commonWall");
    }
}
