package thinking_in_java.io.sample5_BufferedReader;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

/**
 * BufferedReader 用法（流式读取其他 Reader）
 */
public class BufferedInputFile {
    public static String read(String filename) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(filename));
        String s;
        StringBuilder builder = new StringBuilder();
        while ((s = reader.readLine()) != null) {
            builder.append(s + "\n");
        }
        reader.close();
        return builder.toString();
    }

    public static void main(String[] args) throws IOException {
        System.out.println(read("src/main/java/thinking_in_java/io/sample5_BufferedReader/BufferedInputFile.java"));
        System.out.println(read("src/main/java/thinking_in_java/io/sample5_BufferedReader/test.txt"));
    }
}
