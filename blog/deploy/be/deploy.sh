echo "[auto-deploy]start build docker image for be"

echo "[auto-deploy]build image"
docker build ../be -t blog-be

if [ x$1 = x ]
then
    echo ""
    echo "[auto-deploy]running blog-be image"
    docker run -d -p 8999:8999 -v /root/blog/file:/blog/file blog-be
fi

# echo ""
# echo "[auto-deploy]check images"
# docker images

# echo ""
# echo "[auto-deploy]check containers"
# docker ps -a