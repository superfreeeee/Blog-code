package com.example.annotation.test2;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface RequestMapping {
    String name(); // 接口名称
    String path(); // 接口路由
    Class[] params() default {}; // 接口参数
}
