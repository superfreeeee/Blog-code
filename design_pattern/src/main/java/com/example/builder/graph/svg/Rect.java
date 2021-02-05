package com.example.builder.graph.svg;

public class Rect implements Item {
    public int x, y, rx, ry, width, height;
    public String style;

    public static Rect from(int x, int y, int rx, int ry, int width, int height, String[] style) {
        Rect rect = new Rect();
        rect.x = x;
        rect.y = y;
        rect.rx = rx;
        rect.ry = ry;
        rect.width = width;
        rect.height = height;
        rect.style = String.join(";",style);
        return rect;
    }

    @Override
    public String build() {
        return "<rect x=\"" + x + "\" y=\"" + y + "\" rx=\"" + rx + "\" ry=\"" + ry + "\" width=\"" + width + "\" height=\"" + height + "\" style=\"" + style + "\"/>";
    }
}
