package thinking_in_java.io.sample8_PrintWriter_FileWriter;

import thinking_in_java.io.sample5_BufferedReader.BufferedInputFile;

import java.io.*;

public class BasicFileOutput {
    static String file = "src/main/resources/doc/test1.txt";
    static String target = "src/main/resources/doc/test2.txt";

    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(file));
        PrintWriter writer = new PrintWriter(new BufferedWriter(new FileWriter(target)));
        int lineCount = 1;
        String s;
        while ((s = reader.readLine()) != null) {
            writer.println(lineCount + ": " + s);
            lineCount++;
        }
        writer.close();
        System.out.println(BufferedInputFile.read(target));
    }
}
