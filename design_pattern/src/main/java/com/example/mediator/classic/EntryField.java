package com.example.mediator.classic;

public class EntryField extends Widget {

    private String text;

    public EntryField(DialogDirector director) {
        super(director);
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void handleInput(String input) {
        System.out.println("[Widget Event] input EntryField");
        setText(input);
        changed();
    }

}
