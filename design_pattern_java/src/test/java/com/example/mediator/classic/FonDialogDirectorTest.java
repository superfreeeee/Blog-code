package com.example.mediator.classic;

import org.junit.Test;

import static org.junit.Assert.*;

public class FonDialogDirectorTest {

    @Test
    public void test() {
        FonDialogDirector director = new FonDialogDirector();
        director.init();
        director.fontList.handleMouse(1); // 选择字体
        director.field.handleInput("input a message"); // 输入信息
        director.cancel.handleMouse(); // 点击取消
        director.field.handleInput("re-input a message"); // 再次输入信息
        director.ok.handleMouse(); // 点击确定
    }
}