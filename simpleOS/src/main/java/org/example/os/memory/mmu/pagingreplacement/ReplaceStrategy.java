package org.example.os.memory.mmu.pagingreplacement;

/**
 * 页面替换策略
 * 核心目标：选出要替换的页框号
 * 假设：所有页框都被占用时才需要替换
 */
public interface ReplaceStrategy {

    int getFrameNO();
}
