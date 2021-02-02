main_prefix=\[auto-deploy-main\]
echo $main_prefix"start"

echo ""
echo $main_prefix"invoke rebuild"
sh rebuild.sh

echo ""
echo $main_prefix"invoke copy"
sh copy.sh

echo ""
echo $main_prefix"invoke deploy remote"
ssh root@116.62.186.245 "cd blog/deploy;sh deploy.sh"