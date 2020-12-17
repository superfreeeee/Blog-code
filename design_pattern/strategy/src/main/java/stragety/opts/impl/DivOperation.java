package stragety.opts.impl;

import stragety.opts.OperationStrategy;

public class DivOperation implements OperationStrategy {
    public int calculate(int x, int y) {
        if(y == 0) {
            return -1;
        }
        return x / y;
    }
}
