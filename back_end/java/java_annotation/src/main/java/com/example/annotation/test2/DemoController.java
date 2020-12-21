package com.example.annotation.test2;

@Controller
public class DemoController {

    @RequestMapping(name = "foo", path = "/foo")
    public void foo() {}

    @RequestMapping(name = "bar", path = "/bar", params = {int.class, double.class})
    public void bar(int i, double d) {}
}
