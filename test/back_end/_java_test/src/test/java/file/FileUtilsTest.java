package file;

import org.junit.Test;

import static org.junit.Assert.*;

public class FileUtilsTest {

    private String baseUrl = "/Users/superfree/Desktop/Blog/code/tmp/_java_test/src/main/resources/doc/";

    @Test
    public void test1() {
        String path = baseUrl + "test1.txt";
        String content = FileUtils.readByLines(path);
        System.out.println(content);
    }

    @Test
    public void test2() {
        String path = baseUrl + "test1.txt";
        String content = FileUtils.readByChars(path);
        System.out.println(content);
    }
}