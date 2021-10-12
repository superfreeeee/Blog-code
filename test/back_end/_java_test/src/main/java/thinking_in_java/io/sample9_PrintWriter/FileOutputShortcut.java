package thinking_in_java.io.sample9_PrintWriter;

import java.io.*;

public class FileOutputShortcut {
    static String source = "src/main/resources/doc/test2.txt";
    static String target = "src/main/resources/doc/test3.txt";

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(source));
        PrintWriter writer = new PrintWriter(target);

        int lineCount = 1;
        String s;
        while ((s = reader.readLine()) != null) {
            writer.println("(" + lineCount + ") " + s);
            lineCount++;
        }
        writer.close();
        reader.close();
    }
}
