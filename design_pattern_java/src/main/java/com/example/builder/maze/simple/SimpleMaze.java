package com.example.builder.maze.simple;

import com.example.builder.maze.Maze;

public class SimpleMaze implements Maze {

    private Room[] rooms;

    public SimpleMaze(int size) {
        rooms = new Room[size];
    }

    public boolean hasRoom(int roomNO) {
        return rooms[roomNO] != null;
    }

    int size() {
        return rooms.length;
    }

    Room getRoom(int roomNO) {
        return rooms[roomNO];
    }

    void addRoom(Room room) {
        rooms[room.getRoomNO()] = room;
    }

    @Override
    public void show() {
        int w = (int) Math.sqrt(rooms.length);
        int width = w * 2 + 1;
        for (int i = 0; i < width; i++) {
            for (int j = 0; j < width; j++) {
                int roomNo = (Math.min(i, width - 2)) / 2 * w + (Math.min(j, width - 2)) / 2;
                int cx = roomNo / w * 2, cy = roomNo % w * 2;
                int offset = (i - cx) * 3 + (j - cy);
//                System.out.println(roomNo + " " + cx + " " + cy + " " + offset);
                Room room = rooms[roomNo];
                if (room == null) {
                    System.out.print(' ');
                    continue;
                }
                char c = ' ';
                switch (offset) {
                    case 1:
                        c = siteMark(room.getSide(Direction.North));
                        break;
                    case 3:
                        c = siteMark(room.getSide(Direction.West));
                        break;
                    case 4:
                        c = '.';
                        break;
                    case 5:
                        c = siteMark(room.getSide(Direction.East));
                        break;
                    case 7:
                        c = siteMark(room.getSide(Direction.South));
                        break;
                }
                System.out.print(c);
            }
            System.out.println();
        }
    }

    private char siteMark(MapSite site) {
        if (site instanceof Wall) return 'O';
        if (site instanceof Door) return 'E';
        if (site instanceof Room) return 'R';
        return '?';
    }
}
