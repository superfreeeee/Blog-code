package thinking_in_java.io.sample3_File_listFiles;

import utils.PrinterUtils;

import java.io.File;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Pattern;

/**
 * 目录优化 2
 */
public class Directory {
    public static File[] local(File dir, final String regexp) {
        return dir.listFiles(new FilenameFilter() {
            private Pattern pattern = Pattern.compile(regexp);

            public boolean accept(File dir, String name) {
                return pattern.matcher(new File(name).getName()).matches();
            }
        });
    }

    public static File[] local(String path, final String regexp) {
        return local(new File(path), regexp);
    }

    public static class TreeInfo implements Iterable<File> {
        public List<File> files = new ArrayList<File>();
        public List<File> dirs = new ArrayList<File>();

        public Iterator<File> iterator() {
            return files.iterator();
        }

        void addAll(TreeInfo treeInfo) {
            files.addAll(treeInfo.files);
            dirs.addAll(treeInfo.dirs);
        }

        @Override
        public String toString() {
            return "TreeInfo{\n" +
                    "files=" + files +
                    ",\ndirs=" + dirs +
                    '}';
        }
    }

    public static TreeInfo walk(String start, String regexp) {
        return recurseDirs(new File(start), regexp);
    }

    public static TreeInfo walk(File start, String regexp) {
        return recurseDirs(start, regexp);
    }

    public static TreeInfo walk(String start) {
        return recurseDirs(new File(start), ".*");
    }

    public static TreeInfo walk(File start) {
        return recurseDirs(start, ".*");
    }


    private static TreeInfo recurseDirs(File startDir, String regexp) {
        TreeInfo result = new TreeInfo();
        for (File item : startDir.listFiles()) {
            if (item.isDirectory()) {
                result.dirs.add(item);
                result.addAll(recurseDirs(item, regexp));
            } else {
                if (item.getName().matches(regexp)) {
                    result.files.add(item);
                }
            }
        }
        return result;
    }

    public static void main(String[] args) {
        TreeInfo treeInfo = walk("src/main/java");
        PrinterUtils.lineEachItem("files", treeInfo.files);
        PrinterUtils.lineEachItem("dirs", treeInfo.dirs);
    }
}
