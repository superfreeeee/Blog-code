package com.example.builder.graph;

import com.example.builder.graph.element.ElementBuilder;
import com.example.builder.graph.svg.SVGBuilder;
import org.junit.Test;

public class GraphDrawerTest {

    private GraphDrawer director = new GraphDrawer();

    private void testTemplate(GraphBuilder builder) {
        String res = director.test(builder);
        System.out.println("res: " + res);
        builder.check();

        res = director.createFace(builder);
        System.out.println("face: " + res);
        builder.check();
    }

    @Test
    public void createSVG() {
        testTemplate(new SVGBuilder());
    }

    @Test
    public void createElement() {
        testTemplate(new ElementBuilder()); // Error 未实现
    }
}