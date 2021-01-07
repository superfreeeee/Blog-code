package org.example.os.memory.mmu;

public interface IMMU {

    /**
     * 直接地址存取
     * 假设：直接访问内存物理地址
     *
     * @param physicalAddr 物理地址(32 位) = 内存物理地址(32 位)
     * @return
     */
    char[] fetchByDirectAddr(String physicalAddr, int len);

    /**
     * 逻辑地址存取(逻辑地址 = 页面号 + 页内偏移量)
     * 假设：页式存储(未使用虚拟存储，不存在缺页)
     *
     * @param logicAddr 逻辑地址(32 位) = 页面号(22 位) + 页内偏移量(10 位)
     * @param len
     * @return
     */
    char[] fetchFromPaging(String logicAddr, int len);

    /**
     * 逻辑地址存取(逻辑地址 = 页面号 + 页内偏移量)
     * 假设：页式虚拟存储(使用虚拟存储，可能存在缺页)
     *
     * @param logicAddr 逻辑地址(32 位) = 页面号(22 位) + 页内偏移量(10 位)
     * @param len
     * @return
     */
    char[] fetchFromVirtualPaging(String logicAddr, int len);

}
