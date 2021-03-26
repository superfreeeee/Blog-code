package com.example.builder.graph.svg;

public class Line implements Item {
    public int x1, y1, x2, y2;
    public String style;

    public static Line from(int x1, int x2, int y1, int y2, String[] style) {
        Line line = new Line();
        line.x1 = x1;
        line.y1 = y1;
        line.x2 = x2;
        line.y2 = y2;
        line.style = String.join(";", style);
        return line;
    }

    @Override
    public String build() {
        return "<line x1=\"" + x1 + "\" y1=\"" + y1 + "\" x2=\"" + x2 + "\" y2=\"" + y2 + "\" style=\"" + style + "\"/>";
    }
}
