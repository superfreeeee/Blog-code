check_prefix=\[auto-check\]

echo ""
echo $check_prefix"docker images"
docker images

echo ""
echo $check_prefix"docker containers"
docker ps -a