
import java.lang.annotation.Annotation;
import java.lang.annotation.ElementType;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class ReflectUtils {
    public static Object getField(Object obj, String name) throws NoSuchFieldException, IllegalAccessException {
        if (obj == null) throw new NullPointerException();
        Class c = obj.getClass();
        Field field = c.getDeclaredField(name);
        field.setAccessible(true);
        return field.get(obj);
    }

    public static Object invokeMethod(Object obj, String name, Object... args) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        if (obj == null) throw new NullPointerException();
        Class c = obj.getClass();
        Method method = c.getDeclaredMethod(name);
        method.setAccessible(true);
        if (method.getReturnType() == void.class) {
            method.invoke(obj, args);
            return null;
        } else {
            return method.invoke(obj, args);
        }
    }

    public static Annotation getAnnotation(Class c, String name) {
        for (Annotation annotation : c.getDeclaredAnnotations()) {
            if (annotation.annotationType().getSimpleName().equals(name)) {
                return annotation;
            }
        }
        return null;
    }

    public static Annotation getAnnotation(Class c, String name, ElementType type, String target) throws NoSuchFieldException, NoSuchMethodException, ClassNotFoundException {
        switch (type) {
            case FIELD:
                Field field = c.getDeclaredField(target);
                for (Annotation annotation : field.getAnnotations()) {
                    if (annotation.annotationType().getSimpleName().equals(name)) {
                        return annotation;
                    }
                }
                break;
            case METHOD:
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
