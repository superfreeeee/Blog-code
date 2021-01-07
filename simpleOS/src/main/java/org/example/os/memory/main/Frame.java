package org.example.os.memory.main;

import java.util.Date;

/**
 * 页框(内存中的数据块)
 */
public class Frame {
    private boolean valid; // 页框内容是否有效
    private int pageNO; // 页框所保存的虚页号，valie == true 时有效
    private boolean dirty; // 脏值，标志该页框是否被修改

    /* 下面为页面替换策略需要用到的属性 */
    private long loadTime; // 页面调入时间戳，FIFO 策略需要

    public Frame(boolean valid, int pageNO, boolean dirty) {
        this.valid = valid;
        this.pageNO = pageNO;
        this.dirty = dirty;
        this.loadTime = 0;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public int getPageNO() {
        return pageNO;
    }

    public void setPageNO(int pageNO) {
        this.pageNO = pageNO;
    }

    public boolean isDirty() {
        return dirty;
    }

    public void setDirty(boolean dirty) {
        this.dirty = dirty;
    }

    public long getLoadTime() {
        return loadTime;
    }

    public void setLoadTime(long loadTime) {
        this.loadTime = loadTime;
    }
}
