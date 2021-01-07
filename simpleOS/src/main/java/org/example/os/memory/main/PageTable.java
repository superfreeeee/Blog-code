package org.example.os.memory.main;

/**
 * 页表：记录页面调入情形
 */
public class PageTable {

    private Page[] table; // 页表项，下标为页号

    public PageTable(int size) {
        table = new Page[size];
        for (int i = 0; i < size; i++) {
            table[i] = new Page(false, -1);
        }
    }

    /**
     * 返回页表大小(即页面数量)
     * @return
     */
    public int size() {
        return table.length;
    }

    /**
     * 按虚页号查页表项
     *
     * @param pageNO
     * @return
     */
    public Page get(int pageNO) {
        return table[pageNO];
    }

    /**
     * 页面调入内存(记录页框号)
     *
     * @param pageNO
     * @param frameNO
     */
    public void load(int pageNO, int frameNO) {
        table[pageNO].setValid(true);
        table[pageNO].setFrameNO(frameNO);
    }

    /**
     * 页面调出内存(页面失效)
     *
     * @param pageNO
     */
    public void invalidate(int pageNO) {
        table[pageNO].setValid(false);
        table[pageNO].setFrameNO(-1);
    }
}
