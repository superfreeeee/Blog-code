package stragety;

import stragety.opts.impl.AddOperation;
import stragety.opts.OperationStrategy;
import stragety.opts.impl.DivOperation;
import stragety.opts.impl.MulOperation;
import stragety.opts.impl.SubOperation;

import java.util.HashMap;

public class IntegerCalculator {

    private HashMap<String, OperationStrategy> operations;

    IntegerCalculator() {
        operations = new HashMap<String, OperationStrategy>();
        // default operations
        registerOperation("add", new AddOperation());
        registerOperation("sub", new SubOperation());
        registerOperation("mul", new MulOperation());
        registerOperation("div", new DivOperation());
    }

    void solve(String cmd) {
        String[] args = cmd.split(" ");
        String op = args[0];
        int x = Integer.parseInt(args[1]);
        int y = Integer.parseInt(args[2]);
        int result = operations.get(op).calculate(x, y);
        System.out.println("cmd: " + cmd);
        System.out.println("result: " + result);
    }

    /**
     * can register outside OperationStrategy to enhance calculate ability of Calculatro
     * @param name operation name in command
     * @param strategy operation Strategy
     */
    public void registerOperation(String name, OperationStrategy strategy) {
        operations.put(name, strategy);
    }

    public static void main(String[] args) {
        String[] commands = new String[]{
                "add 200 70",
                "sub 200 70",
                "mul 200 70",
                "div 200 70",
                "gcd 200 70"
        };
        IntegerCalculator calculator = new IntegerCalculator();
        calculator.registerOperation("gcd", new OperationStrategy() {
            public int calculate(int x, int y) {
                if(x < 0 || y < 0) {
                    return -1;
                }
                if(x < y) {
                    x = x ^ y;
                    y = x ^ y;
                    x = x ^ y;
                }
                int tmp;
                while(y > 0) {
                    tmp = y;
                    y = x % y;
                    x = tmp;
                }
                return x;
            }
        });

        for(String cmd : commands) {
            calculator.solve(cmd);
        }
    }
}
