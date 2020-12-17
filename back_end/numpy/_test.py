import numpy as np

# a = [[1,2],[3,4],[5,2]]
# a2 = np.array(a, dtype=np.int8, ndmin=2)
# print(a)
# print(a2)

a = np.empty([3,2], dtype=float, order='C')
print(a)
a = np.zeros([2,3], dtype=float, order='C')
print(a)
a = np.ones([3,2,2,3], dtype=int, order='C')
print(a)

a = [1,2,3,4,5,6,7,8,9]
a = np.asarray(a, dtype='S1', order='F')
print(a)
for i in range(3):
  for j in range(3):
    print(a[i][j])