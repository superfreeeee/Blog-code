package stragety.opts.impl;

import stragety.opts.OperationStrategy;

public class SubOperation implements OperationStrategy {

    public int calculate(int x, int y) {
        return x - y;
    }
}
