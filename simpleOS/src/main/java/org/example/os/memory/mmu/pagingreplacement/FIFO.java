package org.example.os.memory.mmu.pagingreplacement;

import org.example.os.memory.main.InvertedPageTable;
import org.example.os.memory.main.Memory;

public class FIFO implements ReplaceStrategy {

    @Override
    public int getFrameNO() {
        InvertedPageTable invertedPageTable = Memory.getInstance().getInvertedPageTable();
        int firstLoad = 0;
        for (int frameNO = 1; frameNO < invertedPageTable.size(); frameNO++) {
            if (invertedPageTable.get(frameNO).getLoadTime() < invertedPageTable.get(firstLoad).getLoadTime()) {
                firstLoad = frameNO;
            }
        }
        return firstLoad;
    }
}
