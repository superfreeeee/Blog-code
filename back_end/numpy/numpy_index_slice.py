#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jun 24 21:52:00 2020

@author: superfree
"""

import numpy as np

a = np.arange(9).reshape(3,3)
b = a.copy(order='F')
print(a)
print(b)
print('\na:')
for row in a:
    for col in row:
        print(col, end=",")
print('\nb:')
for row in b:
    for col in row:
        print(col, end=",")
print('\na by nditer:')
for x in np.nditer(a):
    print(x, end=",")
print('\nb by nditer:')
for x in np.nditer(b):
    print(x, end=",")