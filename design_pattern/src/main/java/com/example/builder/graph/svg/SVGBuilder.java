package com.example.builder.graph.svg;

import com.example.builder.graph.GraphBuilder;

import java.util.ArrayList;
import java.util.List;

public class SVGBuilder implements GraphBuilder {
    private List<Item> items;
    private Group group;

    private void addItem(Item item) {
        List<Item> items = group == null ? this.items : group.items;
        items.add(item);
    }

    @Override
    public GraphBuilder init() {
        items = new ArrayList<>();
        return this;
    }

    @Override
    public GraphBuilder group(String id) {
        Group g = new Group(group, id);
        addItem(g);
        group = g;
        return this;
    }

    @Override
    public GraphBuilder groupEnd() {
        if (group != null) {
            group = group.outer;
        }
        return this;
    }

    @Override
    public GraphBuilder addCircle(int cx, int cy, int r, String[] style) {
        addItem(Circle.from(cx, cy, r, style));
        return this;
    }

    @Override
    public GraphBuilder addLine(int x1, int x2, int y1, int y2, String[] style) {
        addItem(Line.from(x1, x2, y1, y2, style));
        return this;
    }

    @Override
    public GraphBuilder addRect(int x, int y, int rx, int ry, int width, int height, String[] style) {
        addItem(Rect.from(x, y, rx, ry, width, height, style));
        return this;
    }

    @Override
    public String build() {
        StringBuilder res = new StringBuilder();
        res.append("<svg>");
        for (Item item : items) res.append(item.build());
        res.append("</svg>");
        return res.toString();
    }

    @Override
    public void check() {
        System.out.println("<svg>");
        showItems(items, "  ");
        System.out.println("</svg>");
    }

    private void showItems(List<Item> items, String prefix) {
        for (Item item : items) {
            if (item instanceof Group) {
                System.out.println(prefix + "<g>");
                showItems(((Group) item).items, prefix + "  ");
                System.out.println(prefix + "</g>");
            } else {
                System.out.println(prefix + item.build());
            }
        }
    }
}
