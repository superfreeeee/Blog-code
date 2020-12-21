package com.example.annotation.test3;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AnnotationUtils {
    public void solve(Class<?> c) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        // 检查传入类是否标记为 @Controller
        if (c.getDeclaredAnnotation(Controller.class) == null) {
            throw new RuntimeException("class didn't declared with @Controller");
        }
        // 遍历所有方法
        for (Method method : c.getDeclaredMethods()) {
            System.out.println("method: " + method.getName() + ", annotations: " + Arrays.toString(method.getDeclaredAnnotations()));
            // 只处理标记为 @RequestMapping 的方法作为接口
            if (method.getAnnotation(RequestMapping.class) == null) continue;

            // 获取接口注解内容
            RequestMapping requestMapping = method.getAnnotation(RequestMapping.class);
            Class<RequestMapping> cr = RequestMapping.class;
            List<String> params = new ArrayList<>();
            // 遍历接口注解的所有属性
            for (Method attr : cr.getDeclaredMethods()) {
                Object val = attr.invoke(requestMapping);
                AliasFor aliasFor;
                // 如果未传入值且存在别名，则引用别名
                if (val.equals(attr.getDefaultValue()) && (aliasFor = attr.getDeclaredAnnotation(AliasFor.class)) != null) {
                    val = cr.getDeclaredMethod(aliasFor.value()).invoke(requestMapping);
                }
                params.add(attr.getName() + ": " + val);
            }
            System.out.println("RequestMapping with params: {" + String.join(", ", params) + "}");
        }
    }

    // 测试入口
    public static void main(String[] args) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        new AnnotationUtils().solve(DemoController.class);
    }
}
