int sum(int times) {
    int ans = 0;
    for(int k=0; k<times; k++) {
        for(int j=0; j<times; j++) {
            for(int i=0; i<times; i++) {
                ans += i;
            }
        }
    }
    return ans;
}

int fac(int n) {
    return n <= 2 ? 1 : fac(n - 1) + fac(n - 2);
}
