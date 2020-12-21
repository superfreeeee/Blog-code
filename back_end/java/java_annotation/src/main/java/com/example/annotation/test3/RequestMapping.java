package com.example.annotation.test3;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RequestMapping {

    // 默认读取 value，于 path 互为别名
    @AliasFor("path")
    String value() default "";
    @AliasFor("value")
    String path() default "";
}
