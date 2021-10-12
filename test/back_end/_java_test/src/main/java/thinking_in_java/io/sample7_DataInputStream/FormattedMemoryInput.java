package thinking_in_java.io.sample7_DataInputStream;

import thinking_in_java.io.sample5_BufferedReader.BufferedInputFile;

import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.IOException;

public class FormattedMemoryInput {
    public static void main(String[] args) throws IOException {
        DataInputStream inputStream = new DataInputStream(new ByteArrayInputStream(BufferedInputFile.read("src/main/java/thinking_in_java/io/sample5_BufferedReader/BufferedInputFile.java").getBytes()));
        while (true) {
            System.out.print((char) inputStream.readByte());
        }
    }
}
