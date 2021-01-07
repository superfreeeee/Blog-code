package org.example.os.memory.mmu;

import org.example.os.memory.main.InvertedPageTable;
import org.example.os.memory.main.Memory;
import org.example.os.memory.main.Page;
import org.example.os.memory.mmu.pagingreplacement.FIFO;
import org.example.os.memory.mmu.pagingreplacement.ReplaceStrategy;
import org.example.os.utils.Transformer32;

/**
 * MMU = Memory Management Unit 内存管理单元
 */
public class MMU implements IMMU {

    private Memory memory = Memory.getInstance();

    private ReplaceStrategy replaceStrategy = new FIFO(); // 默认使用 LRU

    public void setReplaceStrategy(ReplaceStrategy replaceStrategy) {
        if (replaceStrategy != null) {
            this.replaceStrategy = replaceStrategy;
        }
    }

    /**
     * 直接地址存取
     * 假设：直接访问内存物理地址
     *
     * @param physicalAddr 物理地址(32 位) = 内存物理地址(32 位)
     * @return
     */
    public char[] fetchByDirectAddr(String physicalAddr, int len) {
        return memory.read(physicalAddr, len);
    }

    /**
     * 逻辑地址存取(逻辑地址 = 页面号 + 页内偏移量)
     * 假设：页式存储(未使用虚拟存储，不存在缺页)
     *
     * @param logicAddr 逻辑地址(32 位) = 页面号(22 位) + 页内偏移量(10 位)
     * @param len
     * @return
     */
    public char[] fetchFromPaging(String logicAddr, int len) {
        char[] data = new char[0];
        int pageNO = Transformer32.binaryToDecimal(logicAddr.substring(0, 22)); // 起始虚页号
        while (len > 0) {
            // 每次至多从一个页框读一页的数据
            int nextLen = len >= Memory.PAGE_SIZE_B ? Memory.PAGE_SIZE_B : len; // 下次读取大小
            len -= nextLen;

            int frameNO = memory.getPageTable().get(pageNO).getFrameNO(); // 根据页表查询所在页框号
            data = merge(data, memory.readByFrameNO(frameNO, nextLen)); // 根据页框号存取数据
            pageNO++; // 逻辑地址连续
        }
        return memory.read(logicAddr, len);
    }

    private char[] merge(char[] a, char[] b) {
        char[] c = new char[a.length + b.length];
        for (int i = 0; i < a.length; i++) c[i] = a[i];
        for (int i = 0; i < b.length; i++) c[a.length + i] = b[i];
        return c;
    }

    /**
     * 逻辑地址存取(逻辑地址 = 页面号 + 页内偏移量)
     * 假设：页式虚拟存储(使用虚拟存储，可能存在缺页)
     *
     * @param logicAddr 逻辑地址(32 位) = 页面号(22 位) + 页内偏移量(10 位)
     * @param len
     * @return
     */
    public char[] fetchFromVirtualPaging(String logicAddr, int len) {
        char[] data = new char[0];
        int pageNO = Transformer32.binaryToDecimal(logicAddr.substring(0, 22)); // 起始虚页号
        while (len > 0) {
            // 每次至多从一个页框读一页的数据
            int nextLen = len >= Memory.PAGE_SIZE_B ? Memory.PAGE_SIZE_B : len; // 下次读取大小
            len -= nextLen;

            int frameNO = assertPageLoaded(pageNO); // 确保当前页面已经调入，并返回所在页框号
            data = merge(data, memory.readByFrameNO(frameNO, nextLen)); // 根据页框号存取数据
            pageNO++; // 逻辑地址连续
        }
        return memory.read(logicAddr, len);
    }

    /**
     * 断言当前页面已经被调入
     * 1. 页面已经调入：对应页表项的 valid == true
     * 2. 页面不在内存中
     * - 查找空的页框：对应反向页表项的 valid == false
     * - 没有空的页框：使用替换策略选拔可替换的页框
     * 核心部分：选拔调入页框号，memory.loadPage 会自动写回脏页
     *
     * @param pageNO
     * @return 返回所在页框号
     */
    private int assertPageLoaded(int pageNO) {
        Page page = memory.getPageTable().get(pageNO);
        // 页面已经在内存中
        if (page.isValid()) return page.getFrameNO();

        // 查找空的页框
        InvertedPageTable invertedPageTable = memory.getInvertedPageTable();
        for (int frameNO = 0; frameNO < invertedPageTable.size(); frameNO++) {
            if (!invertedPageTable.get(frameNO).isValid()) { // 当前页框为空
                memory.loadPage(pageNO, frameNO); // 进行替换
                return frameNO;
            }
        }

        // 根据策略选拔替换页框
        int frameNO = replaceStrategy.getFrameNO();
        memory.loadPage(pageNO, frameNO);
        return frameNO;
    }

}
