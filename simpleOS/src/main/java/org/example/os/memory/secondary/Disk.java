package org.example.os.memory.secondary;

import org.example.os.memory.main.Memory;
import org.example.os.utils.Transformer32;

/**
 * 磁盘
 */
public class Disk {

    /* 磁盘常量 */
    public static final int DISK_SIZE = 16 * 1024 * 1024; // 16MB = 24 位

    public static final int PAGE_COUNT = DISK_SIZE / Memory.PAGE_SIZE_B; // 页面数 = 磁盘大小 / 页面大小

    /* 单例模式 */
    private static Disk disk = new Disk();

    public static Disk getInstance() {
        return disk;
    }

    /* 初始化 */
    private Disk() {
        data = new char[DISK_SIZE];
        for (int i = 0; i < DISK_SIZE; i++) data[i] = 0;
    }

    // 数据区
    private char[] data;

    /**
     * 页面号转起始地址
     * @param pageNO
     * @return
     */
    private String getEipByPageNO(int pageNO) {
        return Transformer32.decimalToBinary(pageNO * Memory.PAGE_SIZE_B);
    }

    /**
     * 按页写磁盘
     *
     * @param pageNO
     * @param data
     */
    public void writePage(int pageNO, char[] data) {
        write(getEipByPageNO(pageNO), data);
    }

    /**
     * 按页读磁盘
     *
     * @param pageNO
     * @return
     */
    public char[] readPage(int pageNO) {
        return read(getEipByPageNO(pageNO), Memory.PAGE_SIZE_B);
    }

    /**
     * 写磁盘
     *
     * @param eip  二进制起始地址
     * @param data 写入数据
     */
    public void write(String eip, char[] data) {
        int baseAddr = Transformer32.binaryToDecimal(eip);
        for (int i = 0; i < data.length && baseAddr + i < DISK_SIZE; i++) {
            this.data[baseAddr + i] = data[i];
        }
    }

    /**
     * 读磁盘
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
