copy_prefix=\[auto-copy\]
fe_copy_args=$1
be_copy_args=$2

echo ""
echo $copy_prefix"copy blog-fe"
echo $copy_prefix"fe_copy_args: ${fe_copy_args}"
sh fe/copy.sh $fe_copy_args

echo ""
echo $copy_prefix"copy blog-be"
echo $copy_prefix"be_copy_args: ${be_copy_args}"
sh be/copy.sh $be_copy_args

scp check.sh root@116.62.186.245:/root/blog/deploy
scp clean.sh root@116.62.186.245:/root/blog/deploy
scp deploy.sh root@116.62.186.245:/root/blog/deploy