package com.example.demo.demoAPI;

import com.example.demo.demoAPI.pojo.UserVO;

public interface DemoService {

    boolean addUser(UserVO userVO);

    UserVO getUser(Integer userId);
}
