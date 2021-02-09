package com.example.mediator.classic;

public class Button extends Widget {

    private String text = "button";

    public Button(DialogDirector director) {
        super(director);
    }

    public void setText(String text) {
        this.text = text;
    }

    public void handleMouse() {
        System.out.println("[Widget Event] click Button");
        changed();
    }
}
