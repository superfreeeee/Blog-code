package adt.graph;

import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.*;

public class GraphTest {

    private Graph<Integer, Integer, Integer> graph;

    private boolean[] buildSuccessSeq(int size) {
        boolean[] res = new boolean[size];
        Arrays.fill(res, true);
        return res;
    }

    @Test
    public void test_directed_graph_with_adj_matrix() {
        test_1(new DirectedGraphWithAdjMatrix<>(4));
        test_2(new DirectedGraphWithAdjMatrix<>(6));
    }

    @Test
    public void test_directed_graph_with_adj_list() {
        test_1(new DirectedGraphWithAdjList<>(4));
        test_2(new DirectedGraphWithAdjList<>(6));
    }

    /**
     * 第一张图测试
     *
     * @param graph
     */
    private void test_1(Graph<Integer, Integer, Integer> graph) {
        System.out.println("test_1: type<Integer, Integer, Integer>");
        Integer[] keys = new Integer[]{0, 2, 4, 6};
        boolean[] addVerticesRes = buildSuccessSeq(keys.length);
        assertArrayEquals(addVerticesRes, graph.addVertices(keys));

        Integer[] fromKeys = new Integer[]{0, 0, 0, 2, 2, 4};
        Integer[] toKeys = new Integer[]{2, 4, 6, 4, 6, 6};
        boolean[] addEdgesRes = buildSuccessSeq(fromKeys.length);
        assertArrayEquals(addEdgesRes, graph.addEdges(fromKeys, toKeys));

        System.out.println("all vertices: " + graph.getVertices());
        System.out.println("0 to : " + graph.getAdjVertices(0));
        System.out.println("2 to : " + graph.getAdjVertices(2));
        System.out.println("4 to : " + graph.getAdjVertices(4));
        System.out.println("6 to : " + graph.getAdjVertices(6));

        System.out.println("all edges" + graph.getEdges());
        System.out.println("0 edges: " + graph.getAdjEdges(0));
        System.out.println("2 edges: " + graph.getAdjEdges(2));
        System.out.println("4 edges: " + graph.getAdjEdges(4));
        System.out.println("6 edges: " + graph.getAdjEdges(6));
        System.out.println();
    }

    /**
     * 第二张图测试
     *
     * @param graph
     */
    private void test_2(Graph<String, Integer, Integer> graph) {
        System.out.println("test_2: type<String, Integer, Integer>");
        graph.addVertex("s", null);
        graph.addVertex("v1", null);
        graph.addVertex("v2", null);
        graph.addVertex("v3", null);
        graph.addVertex("v4", null);
        graph.addVertex("t", null);
        graph.addEdge("s", "v1", 16);
        graph.addEdge("s", "v2", 13);
        graph.addEdge("v1", "v3", 12);
        graph.addEdge("v2", "v1", 4);
        graph.addEdge("v2", "v4", 14);
        graph.addEdge("v3", "v2", 9);
        graph.addEdge("v3", "t", 20);
        graph.addEdge("v4", "v3", 7);
        graph.addEdge("v4", "t", 4);

        System.out.println("all vertices: " + graph.getVertices());
        System.out.println("s to: " + graph.getAdjVertices("s"));
        System.out.println("v1 to: " + graph.getAdjVertices("v1"));
        System.out.println("v2 to: " + graph.getAdjVertices("v2"));
        System.out.println("v3 to: " + graph.getAdjVertices("v3"));
        System.out.println("v4 to: " + graph.getAdjVertices("v4"));
        System.out.println("t to: " + graph.getAdjVertices("t"));

        System.out.println(graph.getEdges());
        System.out.println("s edges: " + graph.getAdjEdges("s"));
        System.out.println("v1 edges: " + graph.getAdjEdges("v1"));
        System.out.println("v2 edges: " + graph.getAdjEdges("v2"));
        System.out.println("v3 edges: " + graph.getAdjEdges("v3"));
        System.out.println("v4 edges: " + graph.getAdjEdges("v4"));
        System.out.println("t edges: " + graph.getAdjEdges("t"));
        System.out.println();
    }
}