package thinking_in_java.io.sample2_File_list;

import thinking_in_java.io.sample1_File_list.DirFilter;

import java.io.File;
import java.io.FilenameFilter;
import java.util.Arrays;
import java.util.regex.Pattern;

/**
 * 打印目录优化
 */
public class DirList2 {
    public static FilenameFilter filter(final String regexp) {
        return new FilenameFilter() {
            private Pattern pattern = Pattern.compile(regexp);

            public boolean accept(File dir, String name) {
                return pattern.matcher(name).matches();
            }
        };
    }

    public static void main(String[] args) {
        File path = new File("src/main/java/thinking_in_java/io/sample2_File_list");
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
