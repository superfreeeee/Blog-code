package com.example.provider;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/")
    public String getDefaultUser() {
        return new UserVO("0", "default user").toString();
    }

    @GetMapping("/id")
    public String getUserById(String userId) {
        return new UserVO(userId, "User " + userId).toString();
    }

    @PostMapping("/create")
    public UserVO createUser(@RequestBody UserVO userVO) {
        return userVO;
    }
}
