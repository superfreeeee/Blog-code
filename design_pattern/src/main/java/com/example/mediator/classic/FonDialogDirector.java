package com.example.mediator.classic;

import java.util.ArrayList;
import java.util.List;

public class FonDialogDirector implements DialogDirector {

    // 这边本应设置为 private，由于测试需要主动触发窗口组件事件所以设为 public
    public ListBox fontList;
    public EntryField field;
    public Button ok, cancel;

    @Override
    public void init() {
        fontList = new ListBox(this);
        field = new EntryField(this);
        ok = new Button(this);
        cancel = new Button(this);

        List<String> options = new ArrayList<>();
        options.add("Arial");
        options.add("Helvetica");
        options.add("sans-serif");
        fontList.setList(options);

        field.setText("");
    }

    @Override
    public void showDialog() {
        System.out.println(String.format("show text in font type: %s", field.getText()));
    }

    @Override
    public void widgetChanged(Widget widget) {
        if (widget == fontList) {
            String font = fontList.getSelection();
            System.out.println(String.format("[widgetChanged] select font: %s", font));
        } else if (widget == field) {
            System.out.println("[widgetChanged] handle fontName changed: " + field.getText());
        } else if (widget == ok) {
            System.out.println("[widgetChanged] press ok");
            showDialog();
        } else if (widget == cancel) {
            System.out.println("[widgetChanged] press cancel");
            field.setText("");
        }
        System.out.println();
    }

}
