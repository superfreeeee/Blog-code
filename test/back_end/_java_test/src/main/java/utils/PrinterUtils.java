package utils;

import java.util.List;

public class PrinterUtils {
    public static void lineEachItem(String tag, List list) {
        System.out.println("[" + tag + "]");
        for (Object item : list) {
            System.out.println("  " + item);
        }
        System.out.println("--------------------");
    }
}
