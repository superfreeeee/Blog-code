package org.example.os.memory.main;

import java.util.Date;

/**
 * 反向页表 IPT：记录页框使用情形
 */
public class InvertedPageTable {

    private Frame[] table; // 反向页表项，下标为页框号

    public InvertedPageTable(int size) {
        table = new Frame[size];
        for (int i = 0; i < size; i++) {
            table[i] = new Frame(false, -1, false);
        }
    }

    /**
     * 返回反向页表大小(即页框数量)
     *
     * @return
     */
    public int size() {
        return table.length;
    }

    /**
     * 按页框号查反向页表项
     *
     * @param frameNO
     * @return
     */
    public Frame get(int frameNO) {
        return table[frameNO];
    }

    /**
     * 调入页面(记录页面号)
     *
     * @param frameNO
     * @param pageNO
     */
    public void load(int frameNO, int pageNO) {
        table[frameNO].setValid(true);
        table[frameNO].setPageNO(pageNO);
        table[frameNO].setDirty(false);
        table[frameNO].setLoadTime(new Date().getTime());
    }

    /**
     * 写内存，置脏值为 1
     *
     * @param frameNO
     */
    public void modify(int frameNO) {
        table[frameNO].setDirty(true);
    }

}
