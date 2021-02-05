package com.example.builder.maze.simple;

class Door implements MapSite {
    private Room r1, r2;

    public Door(Room r1, Room r2) {
        this.r1 = r1;
        this.r2 = r2;
    }

    @Override
    public void enter() {
        System.out.println("Door between " + r1.getRoomNO() + " & " + r2.getRoomNO());
    }

}
