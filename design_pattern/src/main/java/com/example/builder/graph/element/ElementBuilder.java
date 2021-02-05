package com.example.builder.graph.element;

import com.example.builder.graph.GraphBuilder;

public class ElementBuilder implements GraphBuilder {
    @Override
    public GraphBuilder init() {
        return null;
    }

    @Override
    public GraphBuilder group(String id) {
        return null;
    }

    @Override
    public GraphBuilder groupEnd() {
        return null;
    }

    @Override
    public GraphBuilder addRect(int x, int y, int rx, int ry, int width, int height, String[] style) {
        return null;
    }

    @Override
    public GraphBuilder addCircle(int cx, int cy, int r, String[] style) {
        return null;
    }

    @Override
    public GraphBuilder addLine(int x1, int y1, int x2, int y2, String[] style) {
        return null;
    }

    @Override
    public String build() {
        return null;
    }

    @Override
    public void check() {

    }
}
