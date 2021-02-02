rebuild_prefix=\[auto-rebuild\]

echo ""
echo $rebuild_prefix"invoke rebuild fe"
sh fe/rebuild.sh

echo ""
echo $rebuild_prefix"invoke rebuild be"
sh be/rebuild.sh