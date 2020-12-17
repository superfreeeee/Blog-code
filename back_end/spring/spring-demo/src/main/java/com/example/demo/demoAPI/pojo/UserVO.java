package com.example.demo.demoAPI.pojo;

public class UserVO {
    private Integer userId;
    private String name;
    private String password;

    public static UserVO fromUser(User user) {
        UserVO userVO = new UserVO();
        userVO.userId = user.getUserId();
        userVO.name = user.getName();
        userVO.password = user.getPassword();
        return userVO;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
