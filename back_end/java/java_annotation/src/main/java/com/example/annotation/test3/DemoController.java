package com.example.annotation.test3;

@Controller
public class DemoController {

    @RequestMapping("/foo")
    public void foo() {}

    @RequestMapping(path = "/bar")
    public void bar() {}
}
