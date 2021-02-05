package com.example.builder.graph;

import com.example.builder.graph.canvas.CanvasBuilder;
import com.example.builder.graph.svg.SVGBuilder;
import org.junit.Test;

public class GraphDrawerTest {

    private GraphDrawer director = new GraphDrawer();

    @Test
    public void createSVG() {
        String svg = director.create(new SVGBuilder());
        System.out.println(svg);
    }

    @Test
    public void createCanvas() {
        String canvas = director.create(new CanvasBuilder());
        System.out.println(canvas);
    }
}