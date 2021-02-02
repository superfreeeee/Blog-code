#!/bin/sh
copy_prefix=\[auto-copy\]

if [ x"$1" != x ]
then
    #echo "param exist"
    a=`expr $1 / 100`
    b=`expr $1 % 100 / 10`
    c=`expr $1 % 10`
else
    #echo "param not exist"
    a=1
    b=1
    c=1
fi

#echo "a = ${a}"
#echo "b = ${b}"
#echo "c = ${c}"

if [ $a == 1 ]
then
    #echo a
    echo $copy_prefix"copy jar"
    scp ../be/target/be-0.0.1-SNAPSHOT.jar root@116.62.186.245:/root/blog/be
fi

if [ $b == 1 ]
then
    #echo b
    echo $copy_prefix"copy Dockerfile"
    scp be/Dockerfile root@116.62.186.245:/root/blog/be
fi

if [ $c == 1 ]
then
    #echo c
    echo $copy_prefix"copy deploy.sh"
    scp be/deploy.sh root@116.62.186.245:/root/blog/be
fi
# Superfree11