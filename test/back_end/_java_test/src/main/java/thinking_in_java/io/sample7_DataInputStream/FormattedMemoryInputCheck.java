package thinking_in_java.io.sample7_DataInputStream;

import java.io.*;

public class FormattedMemoryInputCheck {
    public static void main(String[] args) throws IOException {
        DataInputStream inputStream = new DataInputStream(new BufferedInputStream(new FileInputStream("src/main/java/thinking_in_java/io/sample5_BufferedReader/BufferedInputFile.java")));
        while (inputStream.available() != 0) {
            System.out.print((char) inputStream.readByte());
        }
    }
}
