package com.example.mediator.classic;

import java.util.List;

public class ListBox extends Widget {

    private List<String> options;
    private int select = -1;

    public ListBox(DialogDirector director) {
        super(director);
    }

    public String getSelection() {
        return select >= 0 ? options.get(select) : "";
    }

    public void setList(List<String> options) {
        this.options = options;
    }

    public void handleMouse(int select) {
        System.out.println("[Widget Event] select ListBox");
        this.select = select;
        changed();
    }
}
