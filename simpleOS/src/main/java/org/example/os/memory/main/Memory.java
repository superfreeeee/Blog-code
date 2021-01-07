package org.example.os.memory.main;

import org.example.os.memory.secondary.Disk;
import org.example.os.utils.Transformer32;

/**
 * 内存
 */
public class Memory {

    /* 内存常量 */
    public static final int MEMORY_SIZE_B = 1 * 1024 * 1024; // 内存大小：1MB = 20 位

    public static final int PAGE_SIZE_B = 1 * 1024; // 页面大小 = 页框大小：1KB = 10 位

    public static final int FRAME_COUNT = MEMORY_SIZE_B / PAGE_SIZE_B; // 页框数 = 内存大小 / 页面大小

    /* 单例模式 */
    private static Memory memory = new Memory();

    public static Memory getInstance() {
        return memory;
    }

    /* 初始化 */
    private Memory() {
        data = new char[MEMORY_SIZE_B];
        for (int i = 0; i < MEMORY_SIZE_B; i++) data[i] = 0;

        pageTable = new PageTable(Disk.PAGE_COUNT);
        invertedPageTable = new InvertedPageTable(FRAME_COUNT);
    }

    // 数据区
    private char[] data;
    // 页表
    private PageTable pageTable;
    // 反向页表
    private InvertedPageTable invertedPageTable;

    public PageTable getPageTable() {
        return pageTable;
    }

    public InvertedPageTable getInvertedPageTable() {
        return invertedPageTable;
    }

    /**
     * 页框号转起始地址
     *
     * @param frameNO
     * @return
     */
    private String getEipByFrameNO(int frameNO) {
        return Transformer32.decimalToBinary(frameNO * PAGE_SIZE_B);
    }

    /**
     * 根据页框号读数据
     * 限制：一次读取不能超过一个页框的大小
     *
     * @return
     */
    public char[] readByFrameNO(int frameNO, int len) {
        if (len > PAGE_SIZE_B) return new char[0];
        return read(getEipByFrameNO(frameNO), len);
    }

    /**
     * 将页面加载到页框
     *
     * @param pageNO
     * @param frameNO
     */
    public void loadPage(int pageNO, int frameNO) {
        // 如果原页面经过修改，需要写会磁盘
        if (invertedPageTable.get(frameNO).isDirty()) {
            writeBack(frameNO);
        }
        char[] page = Disk.getInstance().readPage(pageNO);
        write(getEipByFrameNO(frameNO), page); // 将页面载入内存

        pageTable.load(pageNO, frameNO); // 更新页表
        invertedPageTable.load(frameNO, pageNO); // 更新反向页表
    }

    /**
     * 将页面写回磁盘
     *
     * @param frameNO
     */
    public void writeBack(int frameNO) {
        int pageNO = invertedPageTable.get(frameNO).getPageNO();
        char[] page = read(getEipByFrameNO(frameNO), PAGE_SIZE_B);
        Disk.getInstance().writePage(pageNO, page); // 将页面写回磁盘
    }

    /**
     * 写内存
     *
     * @param eip  二进制起始地址
     * @param data 写入数据
     */
    public void write(String eip, char[] data) {
        int baseAddr = Transformer32.binaryToDecimal(eip);
        for (int i = 0; i < data.length && baseAddr + i < MEMORY_SIZE_B; i++) {
            this.data[baseAddr + i] = data[i];
        }
        // 修改页框，置脏值为 1
        int frameNO = baseAddr / PAGE_SIZE_B;
        int frames = data.length % PAGE_SIZE_B == 0 ? data.length / PAGE_SIZE_B : data.length / PAGE_SIZE_B + 1;
        for (int i = 0; i < frames; i++) invertedPageTable.modify(frameNO + i);
    }

    /**
     * 读内存
     *
     * @param eip 二进制起始地址
     * @param len 读数据长度
     * @return
     */
    public char[] read(String eip, int len) {
        int baseAddr = Transformer32.binaryToDecimal(eip);
        char[] data = new char[len];
        for (int i = 0; i < len; i++) {
            data[i] = this.data[baseAddr + i];
        }
        return data;
    }

}
