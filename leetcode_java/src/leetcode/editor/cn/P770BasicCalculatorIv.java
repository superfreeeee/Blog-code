package leetcode.editor.cn;

import java.util.*;

public class P770BasicCalculatorIv {
    public static void main(String[] args) {
        Solution solution = new P770BasicCalculatorIv().new Solution();

//        String expression = "e + 8 - a + 5";
//        String[] evalvars = new String[]{"e"};
//        int[] evalints = new int[]{1};

        String expression = "0";
//        String expression = "(e + 8) * (e - 8)";
//        String expression = "((a - b) * (b - c) + (c - a)) * ((a - b) + (b - c) * (c - a))";
        String[] evalvars = new String[]{};
        int[] evalints = new int[]{};

//        String expression = "e - 8 + temperature - pressure";
//        String[] evalvars = new String[]{"e", "temperature"};
//        int[] evalints = new int[]{1, 12};

        System.out.println(solution.basicCalculatorIV(expression, evalvars, evalints));
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        private String numberPattern = "[-]?[0-9]+";

        public List<String> basicCalculatorIV(String expression, String[] evalvars, int[] evalints) {
            expression = expression.replace(" ", "");

            // filter given values
            Map<String, Integer> mapper = new HashMap<>();
            for (int i = 0; i < evalints.length; i++) {
                mapper.put(evalvars[i], evalints[i]);
//                expression = expression.replace(evalvars[i], "(" + evalints[i] + ")");
            }
            System.out.println(expression);
            System.out.println(mapper);


            // to suffix tokens
            int end = expression.length();
            List<String> tokens = new ArrayList<>();
            Stack<Character> signs = new Stack<>();
            for (int i = 0; i < end; i++) {
//                System.out.println("meet " + expression.charAt(i));
                switch (expression.charAt(i)) {
                    case '(':
                        signs.push('(');
                        break;
                    case ')':
                        while (signs.peek() != '(') {
                            tokens.add("" + signs.pop());
                        }
                        signs.pop();
                        break;
                    case '+':
                    case '-':
                        while (!signs.empty() && signs.peek() != '(') {
                            tokens.add("" + signs.pop());
                        }
                    case '*':
                        signs.push(expression.charAt(i));
                        break;
                    default:
                        int i0 = i++;
                        while (i < end && !"()+-*".contains("" + expression.charAt(i))) i++;
                        String token = expression.substring(i0, i--);
                        if (mapper.containsKey(token)) token = String.valueOf(mapper.get(token));
                        tokens.add(token);
                        System.out.println("_" + token + "_");
                }
//                System.out.println(tokens);
//                System.out.println(signs);
            }
            while (signs.size() > 0) {
                tokens.add(signs.pop() + "");
            }
            System.out.println(tokens);

            // calculate suffix tokens
            Stack<Map<String, Integer>> patterns = new Stack<>();
            for (String token : tokens) {
                if (!"+-*".contains(token)) {
                    Map<String, Integer> var = new TreeMap<>();
                    if (token.matches("^[-]?[0-9]+$")) {
                        var.put("_", Integer.parseInt(token));
                    } else {
                        var.put(token, 1);
                    }
                    patterns.push(var);
                } else {
                    Map<String, Integer> pb = patterns.pop();
                    Map<String, Integer> pa = patterns.pop();
                    Map<String, Integer> pc = new TreeMap<>();
                    if (token.equals("+") || token.equals("-")) {
                        Set<String> keys = new HashSet<>();
                        keys.addAll(pa.keySet());
                        keys.addAll(pb.keySet());
                        for (String key : keys) {
                            int a = pa.getOrDefault(key, 0);
                            int b = pb.getOrDefault(key, 0);
                            int time = token.equals("+") ? a + b : a - b;
                            if (time != 0) pc.put(key, time);
                        }
                        patterns.push(pc);
                    } else {
                        for (String keyA : pa.keySet()) {
                            for (String keyB : pb.keySet()) {
                                String key;
                                if (keyA.equals("_")) {
                                    key = keyB;
                                } else if (keyB.equals("_")) {
                                    key = keyA;
                                } else {
                                    List<String> vars = new ArrayList<>();
                                    vars.addAll(Arrays.asList(keyA.split("\\*")));
                                    vars.addAll(Arrays.asList(keyB.split("\\*")));
                                    key = String.join("*", vars.stream().sorted().toArray(String[]::new));
                                }
                                int time = pa.get(keyA) * pb.get(keyB) + pc.getOrDefault(key, 0);
                                if (time != 0) pc.put(key, time);
                                else pc.remove(key);
                            }
                        }
                        patterns.add(pc);
                    }
                }
                System.out.println(patterns);
            }

            // generate final result
            Map<String, Integer> finalPattern = patterns.pop();
            System.out.println(finalPattern);
            List<String> res = new ArrayList<>();
            for (String key : finalPattern.keySet().stream().sorted(new Comparator<String>() {
                @Override
                public int compare(String o1, String o2) {
                    int l1 = o1.split("\\*").length;
                    int l2 = o2.split("\\*").length;
                    return l2 - l1;
                }
            }).toArray(String[]::new)) {
                if (!key.equals("_")) {
                    res.add(finalPattern.get(key) + "*" + key);
                }
            }
            if (finalPattern.containsKey("_") && finalPattern.get("_") != 0) {
                res.add("" + finalPattern.get("_"));
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
