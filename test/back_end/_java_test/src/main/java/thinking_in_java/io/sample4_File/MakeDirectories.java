package thinking_in_java.io.sample4_File;

import java.io.File;
import java.io.IOException;

/**
 * File 类详细 API
 */
public class MakeDirectories {
    private static void fileData(File f) {
        System.out.println("Absolute path: " + f.getAbsolutePath() +
                "\nCan read     : " + f.canRead() +
                "\nCan write    : " + f.canWrite() +
                "\ngetName      : " + f.getName() +
                "\ngetParent    : " + f.getParent() +
                "\ngetPath      : " + f.getPath() +
                "\nlength       : " + f.length() +
                "\nlastModified : " + f.lastModified()
        );
    }

    public static void main(String[] args) throws IOException {
        File f = new File("src/main/java/thinking_in_java/io/sample4_File/test.txt");
        if (!f.exists()) {
            f.createNewFile();
        }
        fileData(f);
    }
}
