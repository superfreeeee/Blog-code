package com.example.builder.graph.svg;

public class Circle implements Item {
    public int cx, cy, r;
    public String style;

    public static Circle from(int cx, int cy, int r, String[] style) {
        Circle circle = new Circle();
        circle.cx = cx;
        circle.cy = cy;
        circle.r = r;
        circle.style = String.join(";", style);
        return circle;
    }

    @Override
    public String build() {
        return "<circle cx=\"" + cx + "\" cy=\"" + cy + "\" r=\"" + r + "\" style=\"" + style + "\"/>";
    }
}
