package org.example.os.memory.main;

/**
 * 页(虚页，磁盘中的数据块)
 */
public class Page {
    private boolean valid; // 标志位，表示该页是否在内存中
    private int frameNO; // 虚页所在页框号，valid == true 时有效

    public Page(boolean valid, int frameNO) {
        this.valid = valid;
        this.frameNO = frameNO;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public int getFrameNO() {
        return frameNO;
    }

    public void setFrameNO(int frameNO) {
        this.frameNO = frameNO;
    }
}
