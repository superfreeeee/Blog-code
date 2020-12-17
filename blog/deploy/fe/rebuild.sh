rebuild_prefix=\[auto-rebuild\]
old_path=`pwd`

cd /Users/superfree/Desktop/Blog/code/blog/fe
echo $rebuild_prefix"visit blog-fe: "`pwd`

npm run build

echo $rebuild_prefix"finish blog-fe"
cd $old_path

# echo "be module: "