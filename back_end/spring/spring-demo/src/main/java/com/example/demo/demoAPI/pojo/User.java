package com.example.demo.demoAPI.pojo;

public class User {
    private Integer userId;
    private String name;
    private String password;

    public static User fromUserVO(UserVO userVO) {
        User user = new User();
        user.name = userVO.getName();
        user.password = userVO.getPassword();
        return user;
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
