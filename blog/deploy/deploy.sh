deploy_prefix=\[auto-deploy\]

echo $deploy_prefix"invoke check"
sh check.sh

echo ""
echo $deploy_prefix"invoke clean"
sh clean.sh

echo ""
echo $deploy_prefix"deploy blog-fe"
sh ../fe/deploy.sh

echo ""
echo $deploy_prefix"deploy blog-be"
sh ../be/deploy.sh

echo ""
echo $deploy_prefix"check after deploy"
sh check.sh