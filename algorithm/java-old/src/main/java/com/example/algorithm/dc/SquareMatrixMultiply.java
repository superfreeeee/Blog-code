package com.example.algorithm.dc;

/**
 * 分治算法：方陣乘法
 * 問題描述：
 *     矩陣乘法，一般 O(n^3) 乘法 & strassen 算法
 */
public class SquareMatrixMultiply {

    public static int[][] normalSolve(int[][] A, int[][] B) {
        int n = A.length;
        int[][] C = new int[n][n];
        for(int i=0 ; i < n ; i++) {
            for(int j=0 ; j < n ; j++) {
                C[i][j] = 0;
                for(int k=0 ; k < n ; k++) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return C;
    }

    public static int[][] strassen(int[][] A, int[][] B) {
        return mul(A, B);
    }

    private static int[][] mul(int[][] A, int[][] B) {
        int n = A.length;
        if(n == 1) {
            return new int[][]{{A[0][0] * B[0][0]}};
        } else {
            int[][][][] splitA = split(A);
            int[][][][] splitB = split(B);
            int[][][] S = countS(splitA, splitB);
            int[][][] P = countP(splitA, splitB, S);
            int[][] C = countC(P, n);
            return C;
        }
    }

    private static int[][] addAndSub(int[][] A, int[][] B, boolean isAdd) {
        int n = A.length;
        int[][] C = new int[n][n];
        for(int i=0 ; i<n ; i++) {
            for(int j=0 ; j<n ; j++) {
                C[i][j] = A[i][j] + (isAdd ? B[i][j] : -B[i][j]);
            }
        }
        return C;
    }

    private static int[][][][] split(int[][] A) {
        int n = A.length / 2;
        int[][][][] B = new int[2][2][n][n];
        for(int i=0 ; i<2 ; i++) {
            for(int j=0 ; j<2 ; j++) {
                for(int x=0 ; x<n ; x++) {
                    for(int y=0 ; y<n ; y++) {
                        B[i][j][x][y] = A[i * n + x][j * n + y];
                    }
                }
            }
        }
        return B;
    }

    private static int[][][] countS(int[][][][] A, int[][][][] B) {
        int n = A.length / 2;
        int[][][] S = new int[10][n][n];
        S[0] = addAndSub(B[0][1], B[1][1], false);
        S[1] = addAndSub(A[0][0], A[0][1], true);
        S[2] = addAndSub(A[1][0], A[1][1], true);
        S[3] = addAndSub(B[1][0], B[0][0], false);
        S[4] = addAndSub(A[0][0], A[1][1], true);
        S[5] = addAndSub(B[0][0], B[1][1], true);
        S[6] = addAndSub(A[0][1], A[1][1], false);
        S[7] = addAndSub(B[1][0], B[1][1], true);
        S[8] = addAndSub(A[0][0], A[1][0], false);
        S[9] = addAndSub(B[0][0], B[0][1], true);
        return S;
    }

    private static int[][][] countP(int[][][][] A, int[][][][] B, int[][][] S) {
        int n = A.length / 2;
        int[][][] P = new int[7][n][n];
        P[0] = mul(A[0][0], S[0]);
        P[1] = mul(S[1], B[1][1]);
        P[2] = mul(S[2], B[0][0]);
        P[3] = mul(A[1][1], S[3]);
        P[4] = mul(S[4], S[5]);
        P[5] = mul(S[6], S[7]);
        P[6] = mul(S[8], S[9]);
        return P;
    }

    private static int[][] countC(int[][][] P, int n) {
        int d = n / 2;
        int[][] C11 = addAndSub(addAndSub(addAndSub(P[4], P[3], true), P[1], false), P[5], true);
        int[][] C12 = addAndSub(P[0], P[1], true);
        int[][] C21 = addAndSub(P[2], P[3], true);
        int[][] C22 = addAndSub(addAndSub(addAndSub(P[4], P[0], true), P[2], false), P[6], false);
        int[][] C = new int[n][n];
        for(int i=0 ; i<d ; i++) {
            for(int j=0 ; j<d ; j++) {
                C[i][j] = C11[i][j];
                C[i][j + d] = C12[i][j];
                C[i + d][j] = C21[i][j];
                C[i + d][j + d] = C22[i][j];
            }
        }
        return C;
    }
}
