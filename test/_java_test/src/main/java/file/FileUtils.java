package file;

import java.io.*;

public class FileUtils {

    public static String readByLines(String path) {
        File file = new File(path);
        if (file.exists()) {
            BufferedReader br = null;
            try {
                br = new BufferedReader(new FileReader(file));
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    sb.append(line);
                    sb.append('\n');
                }
                return sb.toString();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (br != null) {
                    try {
                        br.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        } else {
            System.err.println("file not exists: " + path);
        }
        return "";
    }

    public static String readByChars(String path) {
        File file = new File(path);
        if (file.exists()) {
            InputStreamReader sr = null;
            try {
                sr = new InputStreamReader(new FileInputStream(file));
                StringBuilder sb = new StringBuilder();
                int c;
                while ((c = sr.read()) != -1) {
                    sb.append((char) c);
                }
                sr.close();
                return sb.toString();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (sr != null) {
                    try {
                        sr.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        } else {
            System.err.println("file not exists: " + path);
        }
        return "";
    }

}
