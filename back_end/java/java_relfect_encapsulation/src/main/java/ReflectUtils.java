
import java.lang.annotation.Annotation;
import java.lang.annotation.ElementType;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class ReflectUtils {
    // 根据字段名获取字段
    public static Object getField(Object obj, String name) throws NoSuchFieldException, IllegalAccessException {
        if (obj == null) throw new NullPointerException();
        Class c = obj.getClass(); // 获取 Class 对象
        Field field = c.getDeclaredField(name); // 获取指定字段 Field
        field.setAccessible(true); // 设置可访问性，屏蔽 private
        return field.get(obj); // 动态获取对象 obj 字段
    }

    // 根据方法名和参数调用方法
    public static Object invokeMethod(Object obj, String name, Object... args) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        if (obj == null) throw new NullPointerException();
        Class c = obj.getClass();
        Method method;
        // 获取具体方法 Method
        if (args.length == 0) {
            // 无参数列表
            method = c.getDeclaredMethod(name);
        } else {
            // 获取参数类型列表
            Class[] paramTypes = new Class[args.length];
            for (int i = 0; i < args.length; i++) {
                paramTypes[i] = args[i].getClass();
            }
            method = c.getDeclaredMethod(name, paramTypes);
        }
        method.setAccessible(true); // 设置可访问性屏蔽 private
        if (method.getReturnType() == void.class) {
            // 返回类型为 void
            method.invoke(obj, args);
            return null; // 调用后返回 null
        } else {
            // 存在返回值，一律返回 Object
            return method.invoke(obj, args);
        }
    }

    // 根据名称获取类的注解
    public static Annotation getAnnotation(Class c, String name) {
        for (Annotation annotation : c.getDeclaredAnnotations()) {
            // 检查注解列表是否存在匹配注解名，避免需要获取特定注解的 Class 对象
            if (annotation.annotationType().getSimpleName().equals(name)) {
                return annotation;
            }
        }
        return null;
    }

    // 根据名称、属性类型、属性名获取注解
    public static Annotation getAnnotation(Class c, String name, ElementType type, String target) throws NoSuchFieldException, NoSuchMethodException, ClassNotFoundException {
        switch (type) {
            case FIELD: // 字段上的注解
                Field field = c.getDeclaredField(target);
                for (Annotation annotation : field.getAnnotations()) {
                    if (annotation.annotationType().getSimpleName().equals(name)) {
                        return annotation;
                    }
                }
                break;
            case METHOD: // 方法上的注解
                Method method = c.getDeclaredMethod(target);
                for (Annotation annotation : method.getAnnotations()) {
                    if (annotation.annotationType().getSimpleName().equals(name)) {
                        return annotation;
                    }
                }
                break;
        }
        return null;
    }
}
