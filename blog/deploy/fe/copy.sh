#!/bin/sh
copy_prefix=\[auto-copy\]

if [ x"$1" != x ]
then
    #echo "param exist"
    a=`expr $1 / 1000`
    b=`expr $1 % 1000 / 100`
    c=`expr $1 % 100 / 10`
    d=`expr $1 % 10`
else
    #echo "param not exist"
    a=1
    b=1
    c=1
    d=1
fi

if [ $a == 1 ]
then
    echo $copy_prefix"copy build"
    scp -r ../fe/build root@116.62.186.245:/root/blog/fe
fi

if [ $b == 1 ]
then
    echo $copy_prefix"copy Dockerfile"
    scp fe/Dockerfile root@116.62.186.245:/root/blog/fe
fi

if [ $c == 1 ]
then
    echo $copy_prefix"copy default.conf"
    scp fe/default.conf root@116.62.186.245:/root/blog/fe
fi

if [ $d == 1 ]
then
    echo $copy_prefix"copy deploy.sh"
    scp fe/deploy.sh root@116.62.186.245:/root/blog/fe
fi