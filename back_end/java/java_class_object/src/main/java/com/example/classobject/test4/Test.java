package com.example.classobject.test4;

public class Test {

    public static void main(String[] args) {
        check(A.class);
        check(A.B.class);
        check(C.class);
        check(D.class);
        check(E.class);
        check(int.class);
        check(new int[0].getClass());
        check(F.createAnonymous().getClass());
        check(F.createLocal().getClass());
    }

    private static void check(Class c) {
        System.out.println("----- check " + c.getSimpleName() + " -----");
        System.out.println("isMemberClass: " + c.isMemberClass() + ", isInterface: " + c.isInterface() + ", isEnum: " + c.isEnum() + ", isAnnotation: " + c.isAnnotation());
        System.out.println("isArray: " + c.isArray() + ", isPrimitive: " + c.isPrimitive() + ", isAnonymousClass: " + c.isAnonymousClass() + ", isLocalClass: " + c.isLocalClass());
    }
}

