package com.example.provider;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ProviderController {

    @Value("${server.port}")
    private String port;

    private Map<String, User> userTable = new HashMap<>();

    @GetMapping("/")
    public String info() {
        return "Default route from port: " + port;
    }

    @GetMapping("/users")
    public Map<String, User> getUserTable() {
        return userTable;
    }

    @GetMapping("/register")
    public String register(String name, String password) {
        if (name.length() == 0) {
            return "User name is required.";
        }
        if (password.length() == 0) {
            return "User password is required.";
        }
        if (userTable.containsKey(name)) {
            return "User " + name + " is already exist.";
        }
        User user = new User(name, password);
        userTable.put(user.getName(), user);
        return "Register success with id: " + user.getId() + ".";
    }

    @GetMapping("/login")
    public String login(String name, String password) {
        if (!userTable.containsKey(name)) {
            return "User " + name + " didn't exist.";
        }
        User user = userTable.get(name);
        if (!user.getPassword().equals(password)) {
            return "Incorrect password.";
        }
        return "Login success with user id: " + user.getId() + ".";
    }
}
