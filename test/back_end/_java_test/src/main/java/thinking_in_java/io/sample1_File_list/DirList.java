package thinking_in_java.io.sample1_File_list;

import java.io.File;
import java.util.Arrays;

/**
 * 打印指定目录下所有文件名
 */
public class DirList {
    public static void main(String[] args) {
        File path = new File("src/main/java/thinking_in_java/io/sample1_File_list");
        String[] list;
        if (args.length == 0) {
            list = path.list();
        } else {
            list = path.list(new DirFilter(args[0]));
        }

        Arrays.sort(list, String.CASE_INSENSITIVE_ORDER);
        System.out.println(Arrays.toString(list));
    }
}
