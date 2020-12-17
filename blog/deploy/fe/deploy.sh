echo "[auto-deploy]start build docker image for fe"

echo "[auto-deploy]build image"
docker build ../fe -t blog-fe

if [ x$1 = x ]
then
    echo ""
    echo "[auto-deploy]running blog-fe image"
    docker run -d -p 80:80 blog-fe
fi

# echo ""
# echo "[auto-deploy]check images"
# docker images

# echo ""
# echo "[auto-deploy]check containers"
# docker ps -a