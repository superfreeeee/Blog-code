import java.lang.annotation.ElementType;

public class Test {
    public static void main(String[] args) throws Exception {
        Demo demo = new Demo();
        System.out.println("demo.field: " + ReflectUtils.getField(demo, "field"));
        System.out.println("demo.f: " + ReflectUtils.invokeMethod(demo, "f"));
        System.out.println("demo.g: " + ReflectUtils.invokeMethod(demo, "g"));
        System.out.println("MyAnnotation on Demo: " + ReflectUtils.getAnnotation(Demo.class, "MyAnnotation"));
        System.out.println("MyAnnotation on Demo.field: " + ReflectUtils.getAnnotation(Demo.class, "MyAnnotation", ElementType.FIELD, "field"));
        System.out.println("MyAnnotation on Demo.method: " + ReflectUtils.getAnnotation(Demo.class, "MyAnnotation", ElementType.METHOD, "f"));
    }
}
