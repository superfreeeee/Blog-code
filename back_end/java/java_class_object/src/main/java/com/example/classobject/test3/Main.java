package com.example.classobject.test3;

public class Main {

    public static void main(String[] args) {
        testSuperClassInstance();
        testTypeCasting();
    }

    private static void testSuperClassInstance() {
        try {
            Class<SubClass> c = SubClass.class; // 子类 Class 对象
            SubClass subClass = c.newInstance(); // 创建子类实例
            System.out.println("after create subClass");

            // pc.newInstance return type "capture of ? super SubClass"
            Class<? super SubClass> pc = c.getSuperclass(); // 父类 Class对象
            Object superClass = pc.newInstance(); // 创建父类实例
            System.out.println("after create superClass");
        } catch (IllegalAccessException e) {
            System.out.println("Illegal access");
            System.exit(1);
        } catch (InstantiationException e) {
            System.out.println("Instantiation error");
            System.exit(1);
        }
    }

    private static void testTypeCasting() {
        SuperClass sup = new SubClass();
        Class<SubClass> subType = SubClass.class;
        // 另一种类型转换 cast()
        // SubClass.class.cast(obj) 与 (SubClass) obj 等价
        SubClass sub = subType.cast(sup); // equals: sub = (SubClass) sup;
    }
}
