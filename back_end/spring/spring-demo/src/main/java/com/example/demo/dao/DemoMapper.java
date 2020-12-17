package com.example.demo.dao;

import com.example.demo.demoAPI.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface DemoMapper {

    int insertUser(User user);

    User selectUserById(@Param("userId") Integer userId);
}
