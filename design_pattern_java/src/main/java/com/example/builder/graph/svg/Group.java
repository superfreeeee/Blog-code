package com.example.builder.graph.svg;

import java.util.ArrayList;
import java.util.List;

public class Group implements Item {
    public List<Item> items;
    public Group outer;
    public String id;

    public Group(Group outer, String id) {
        this.items = new ArrayList<>();
        this.outer = outer;
        this.id = id;
    }

    @Override
    public String build() {
        StringBuilder res = new StringBuilder();
        res.append(id == null ? "<g>" : "<g id=\"" + id + "\">");
        for (Item item : items) res.append(item.build());
        res.append("</g>");
        return res.toString();
    }
}
