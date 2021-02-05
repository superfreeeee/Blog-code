package com.example.builder.graph;

public class GraphDrawer {

    public String create(GraphBuilder builder) {
        builder.init()
                .addRect(0, 0, 0, 0, 100, 100, new String[]{"fill: black"})
                .group()
                .addRect(100, 0, 0, 0, 100, 100, new String[]{"fill: black"})
                .groupEnd()
                .addRect(200, 0, 0, 0, 100, 100, new String[]{"fill: black"})
                .addCircle(50, 50, 20, new String[]{"fill: black"})
                .addLine(0, 0, 100, 100, new String[]{"stroke: black", "strokeWidth: 3"});
        builder.check();
        return builder.build();
    }
}
