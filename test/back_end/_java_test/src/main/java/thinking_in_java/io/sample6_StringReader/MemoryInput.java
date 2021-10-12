package thinking_in_java.io.sample6_StringReader;

import thinking_in_java.io.sample5_BufferedReader.BufferedInputFile;

import java.io.IOException;
import java.io.StringReader;

/**
 * StringReader 用法（流式读取 String）
 */
public class MemoryInput {
    public static void main(String[] args) throws IOException {
        StringReader reader = new StringReader(BufferedInputFile.read("src/main/java/thinking_in_java/io/sample5_BufferedReader/BufferedInputFile.java")); // test.txt
        int c;
        while ((c = reader.read()) != -1) {
            System.out.print((char) c);
        }
        System.out.println();
    }
}
