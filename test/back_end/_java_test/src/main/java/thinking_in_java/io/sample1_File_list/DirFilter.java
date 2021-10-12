package thinking_in_java.io.sample1_File_list;

import java.io.File;
import java.io.FilenameFilter;
import java.util.regex.Pattern;

public class DirFilter implements FilenameFilter {
    private Pattern pattern;

    public DirFilter(String regexp) {
        this.pattern = Pattern.compile(regexp);
    }

    public boolean accept(File dir, String name) {
        return pattern.matcher(name).matches();
    }
}
