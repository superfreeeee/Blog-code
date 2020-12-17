rebuild_prefix=\[auto-rebuild\]
old_path=`pwd`

cd /Users/superfree/Desktop/Blog/code/blog/be
echo $rebuild_prefix"visit blog-be: "`pwd`

mvn clean package

echo $rebuild_prefix"finish blog-be"
cd $old_path

# echo "be module: "