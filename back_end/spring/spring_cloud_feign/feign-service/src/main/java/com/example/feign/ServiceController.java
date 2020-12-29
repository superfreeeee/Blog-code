package com.example.feign;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ServiceController {

    @Value("${server.port}")
    private Integer port;

    private Map<Integer, User> userTable = new HashMap<>();

    @GetMapping("/")
    public String defaultRoute() {
        return "Default response from feign-service at " + port;
    }

    @GetMapping("/users")
    public Response getUsers() {
        return new Response("users at " + port, new ArrayList<>(userTable.values()));
    }

    @PostMapping("/signup")
    public String signUp(@RequestBody User user) {
        user.setId(userTable.size());
        userTable.put(user.getId(), user);
        return "Sign up user by id=" + user.getId() + " at port " + port;
    }
}
