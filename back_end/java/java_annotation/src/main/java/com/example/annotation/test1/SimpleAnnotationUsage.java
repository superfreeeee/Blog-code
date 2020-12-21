package com.example.annotation.test1;

@SimpleAnnotation
public class SimpleAnnotationUsage {

    @SimpleAnnotation
    private String field;

    private String unAnnotatedField;

    @SimpleAnnotation
    public void method() {}

    private void unAnnotatedMethod() {}
}
