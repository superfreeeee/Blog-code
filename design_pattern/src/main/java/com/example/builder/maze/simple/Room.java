package com.example.builder.maze.simple;

import java.util.HashMap;
import java.util.Map;

class Room implements MapSite {
    private final int roomNO;
    private Map<Direction, MapSite> sites;

    public Room(int roomNO) {
        this.roomNO = roomNO;
        this.sites = new HashMap<>();
    }

    public int getRoomNO() {
        return roomNO;
    }

    public void setSide(Direction direction, MapSite site) {
        sites.put(direction, site);
    }

    public MapSite getSide(Direction direction) {
        return sites.get(direction);
    }

    @Override
    public void enter() {
        System.out.println("Room " + roomNO);
    }

}
