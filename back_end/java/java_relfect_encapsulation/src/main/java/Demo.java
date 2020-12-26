@MyAnnotation("Class Demo")
public class Demo {

    @MyAnnotation("Field field")
    private String field = "default string of Demo.field";

    @MyAnnotation("Method methodReturnVoid")
    private void methodReturnVoid() {
        System.out.println("invoke methodReturnVoid from Demo");
    }

    private String methodReturnString() {
        return "return String from Demo.gmethodReturnString)";
    }

    private Integer methodWithParams(Integer i, Integer j) {
        return i + j;
    }
}
