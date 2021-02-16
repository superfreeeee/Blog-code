import org.junit.Test;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import static org.junit.Assert.*;

public class Tests {

    private SimpleDateFormat df1 = new SimpleDateFormat("YYYY-MM-dd");
    private SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");

    @Test
    public void test() {
        Calendar calendar = Calendar.getInstance();

        for (int date = 25; date <= 28; date++) {
            calendar.set(2020, 11, date);
            show(calendar.getTime());
        }
    }

    private void show(Date date) {
        System.out.printf("YYYY-MM-dd: %s, yyyy-MM-dd: %s\n", df1.format(date), df2.format(date));
    }
}