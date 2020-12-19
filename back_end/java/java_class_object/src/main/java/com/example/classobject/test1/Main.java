package com.example.classobject.test1;

public class Main {

    /**
     * 查看 Class 对象信息
     * @param c
     */
    private static void info(Class c) {
        System.out.println("----- info -----");
        System.out.println("Class name: " + c.getName()); // 获取类型名称
        System.out.println("is interface: " + c.isInterface()); // 检查是否为接口
        System.out.println("Simple name: " + c.getSimpleName()); // 简单名称
        System.out.println("Canonical name: " + c.getCanonicalName()); // 全限定名
    }

    public static void main(String[] args) {
        Class c = null;
        try {
            // 获取 B 类型的 Class 对象
            c = Class.forName("com.example.classobject.test1.B");
        } catch (ClassNotFoundException e) {
            System.out.println("B not found");
            System.exit(1);
        }

        info(c); // 展示 B 类型的 Class 对象信息
        for(Class i : c.getInterfaces()) {
            info(i); // 展示 B 类型的所有接口 Class 信息
        }

        Class pc = c.getSuperclass(); // 获取父类即 A 的 Class 对象
        Object p = null;

        try {
            p = pc.newInstance(); // 创建父类实例
        } catch (InstantiationException e) {
            System.out.println("unable to instantiate");
            System.exit(1);
        } catch(IllegalAccessException e) {
            System.out.println("unable to access");
            System.exit(1);
        }
        info(p.getClass()); // 由对象获取 Class 信息（类型为 A）
    }
}
