package com.example.algorithm.dc;

import org.junit.Test;

import static org.junit.Assert.*;

public class SquareMatrixMultiplyTest {

    // test 1
    private int[][] A1 = new int[][]{
            {1, 2},
            {3, 4}
    };
    private int[][] B1 = new int[][]{
            {5, 6},
            {7, 8}
    };
    private int[][] C1 = new int[][]{
            {19, 22},
            {43, 50}
    };

    // test 2
    private int[][] A2 = new int[][]{
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12},
            {13, 14, 15, 16}
    };
    private int[][] B2 = new int[][]{
            {1, 2, 3, 4},
            {2, 3, 4, 1},
            {3, 4, 1, 2},
            {4, 1, 2, 3}
    };
    private int[][] C2 = new int[][]{
            {30, 24, 22, 24},
            {70, 64, 62, 64},
            {110, 104, 102, 104},
            {150, 144, 142, 144}
    };

    @Test
    public void test_normal_mul_1() {
        System.out.println("=== normal-1 ===");
        int[][] D1 = SquareMatrixMultiply.normalSolve(A1, B1);
        printMatrix("A1", A1);
        printMatrix("B1", B1);
        printMatrix("C1", C1);
        printMatrix("D1", D1);
        assertTrue(same(C1, D1));
    }

    @Test
    public void test_strassen_mul_1() {
        System.out.println("=== strassen-1 ===");
        int[][] D1 = SquareMatrixMultiply.strassen(A1, B1);
        printMatrix("A1", A1);
        printMatrix("B1", B1);
        printMatrix("C1", C1);
        printMatrix("D1", D1);
        assertTrue(same(C1, D1));
    }

    @Test
    public void test_normal_mul_2() {
        System.out.println("=== normal-2 ===");
        int[][] D2 = SquareMatrixMultiply.normalSolve(A2, B2);
        printMatrix("A2", A2);
        printMatrix("B2", B2);
        printMatrix("C2", C2);
        printMatrix("D2", D2);
        assertTrue(same(C2, D2));
    }

    @Test
    public void test_strassen_mul_2() {
        System.out.println("=== strassen-2 ===");
        int[][] D2 = SquareMatrixMultiply.strassen(A2, B2);
        printMatrix("A2", A2);
        printMatrix("B2", B2);
        printMatrix("C2", C2);
        printMatrix("D2", D2);
        assertTrue(same(C2, D2));
    }

    private boolean same(int[][] A, int[][] B) {
        int n = A.length;
        for(int i=0 ; i<n ; i++) {
            for(int j=0 ; j<n ; j++) {
                if(A[i][j] != B[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    private void printMatrix(String name, int[][] A) {
        System.out.println(name);
        int n = A.length;
        for(int i=0 ; i<n ; i++) {
            for(int j=0 ; j<n ; j++) {
                System.out.print((j == 0 ? "" : ", ") + A[i][j]);
            }
            System.out.println();
        }
        System.out.println();
    }

}