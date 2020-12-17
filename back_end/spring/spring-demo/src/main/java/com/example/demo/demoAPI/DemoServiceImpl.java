package com.example.demo.demoAPI;

import com.example.demo.dao.DemoMapper;
import com.example.demo.demoAPI.pojo.User;
import com.example.demo.demoAPI.pojo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DemoServiceImpl implements DemoService {

    @Autowired
    DemoMapper demoMapper;

    @Override
    public boolean addUser(UserVO userVO) {
        User user = User.fromUserVO(userVO);
        try {
            int res = demoMapper.insertUser(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public UserVO getUser(Integer userId) {
        try {
            User user = demoMapper.selectUserById(userId);
            UserVO userVO = UserVO.fromUser(user);
            return userVO;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
