@MyAnnotation("Class Demo")
public class Demo {

    @MyAnnotation("Field field")
    private String field = "default string of Demo.field";

    @MyAnnotation("Method f")
    private void f() {
        System.out.println("invoke function f from Demo");
    }

    private String g() {
        return "return String from Demo.g()";
    }
}
