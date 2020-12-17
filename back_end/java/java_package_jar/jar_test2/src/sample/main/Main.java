package sample.main;

import sample.pkg1.Test1;
import sample.pkg2.Test2;

public class Main {
    public static void main(String[] args) {
        for (String arg : args) {
            System.out.println("param: " + arg);
        }
        Test1 test1 = new Test1();
        test1.display();
        Test2 test2 = new Test2();
        test2.display();
    }
}