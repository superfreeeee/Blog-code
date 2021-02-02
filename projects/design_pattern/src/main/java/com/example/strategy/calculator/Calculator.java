package com.example.strategy.calculator;

import com.example.strategy.calculator.operation.*;

import java.util.HashMap;
import java.util.Map;

public class Calculator {

    private Map<String, Operation> operationMap;

    public Calculator() {
        this.operationMap = new HashMap<>();
        this.operationMap.put("add", new Add());
        this.operationMap.put("sub", new Sub());
        this.operationMap.put("mul", new Mul());
        this.operationMap.put("div", new Div());
        this.operationMap.put("mod", new Mod());
    }

    /**
     * 执行计算
     *
     * @param cmd
     * @return
     */
    public int calculate(String cmd) {
        String[] args = cmd.split(" ");
        String op = args[0];
        int x = Integer.parseInt(args[1]);
        int y = Integer.parseInt(args[2]);
        return operationMap.get(op).calculate(x, y);
    }

    /**
     * 动态添加新计算
     *
     * @param name
     * @param operation
     */
    public void custom(String name, Operation operation) {
        operationMap.put(name, operation);
    }
}
