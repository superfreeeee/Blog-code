package com.example.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClientController {

    @Autowired
    private FeignService feignService;

    @Value("${server.port}")
    private Integer port;

    @GetMapping("/")
    public String proxyDefault() {
        return "[Client at " + port + "]" + feignService.defaultRoute();
    }

    @GetMapping("/users")
    public Response getUsers() {
        return feignService.getUsers();
    }

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        return feignService.signUp(user);
    }
}
