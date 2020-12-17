clean_prefix=\[auto-clean\]

be_image_ID=`docker images | grep blog-be | awk '{print $3}'`
fe_image_ID=`docker images | grep blog-fe | awk '{print $3}'`
be_container_ID=`docker ps -a | grep blog-be | awk '{print $1}'`
fe_container_ID=`docker ps -a | grep blog-fe | awk '{print $1}'`


if [ x$fe_container_ID != x ]
then
  echo ""
  echo $clean_prefix"fe_container_ID: "$fe_container_ID
  echo $clean_prefix"stop blog-fe container"
  docker stop $fe_container_ID
  echo $clean_prefix"remove blog-fe container"
  docker rm $fe_container_ID
else
  echo ""
  echo $clean_prefix"blog-fe container not exist"
fi

if [ x$be_container_ID != x ]
then
  echo ""
  echo $clean_prefix"be_container_ID: "$be_container_ID
  echo $clean_prefix"stop blog-be container"
  docker stop $be_container_ID
  echo $clean_prefix"remove blog-be container"
  docker rm $be_container_ID
else
  echo ""
  echo $clean_prefix"blog-be container not exist"
fi

if [ x$fe_image_ID != x ]
then
  echo ""
  echo $clean_prefix"fe_image_ID: "$fe_image_ID
  echo $clean_prefix"remove blog-fe image"
  docker rmi $fe_image_ID
else
  echo ""
  echo $clean_prefix"blog-fe image not exist"
fi

if [ x$be_image_ID != x ]
then
  echo ""
  echo $clean_prefix"be_image_ID: "$be_image_ID
  echo $clean_prefix"remove blog-be image"
  docker rmi $be_image_ID
else
  echo ""
  echo $clean_prefix"blog-be image not exist"
fi



