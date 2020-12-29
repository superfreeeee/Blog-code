package com.example.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("feign-service")
public interface FeignService {

    @GetMapping("/")
    public String defaultRoute();

    @GetMapping("/users")
    public Response getUsers();

    @PostMapping("/signup")
    public String signUp(@RequestBody User user);
}
