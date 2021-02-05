package com.example.builder.maze.simple;

class Wall implements MapSite {
    @Override
    public void enter() {
        System.out.println("Wall");
    }

}
