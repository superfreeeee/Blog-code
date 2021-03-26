package com.example.builder.graph;

public class GraphDrawer {

    public String test(GraphBuilder builder) {
        return builder.init()
                .addRect(0, 0, 0, 0, 100, 100, new String[]{"fill: black"})
                .group()
                .addRect(100, 0, 0, 0, 100, 100, new String[]{"fill: black"})
                .groupEnd()
                .addRect(200, 0, 0, 0, 100, 100, new String[]{"fill: black"})
                .addCircle(50, 50, 20, new String[]{"fill: black"})
                .addLine(0, 0, 100, 100, new String[]{"stroke: black", "strokeWidth: 3"})
                .build();
    }

    public String createFace(GraphBuilder builder) {
        return builder.init()
                .addCircle(50, 50, 50, new String[]{"stroke: black"})
                .addCircle(30, 50, 5, new String[]{"stroke: black"})
                .addCircle(70, 50, 5, new String[]{"stroke: black"})
                .addCircle(50, 50, 5, new String[]{"stroke: black"})
                .addLine(30, 70, 70, 70, new String[]{"stroke: black"})
                .build();
    }
}
