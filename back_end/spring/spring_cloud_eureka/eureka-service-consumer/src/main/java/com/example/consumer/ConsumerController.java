package com.example.consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
public class ConsumerController {

    @Value("${server.port}")
    private String port;

    @Autowired
    private RestTemplate restTemplate;

    private String providerUrl = "http://localhost:8801";

    @GetMapping("/")
    public String info() {
        return "Default route from port: " + port;
    }

    @GetMapping("/users")
    public Map<String, User> users() {
        String url = providerUrl + "/users";
        Map<String, User> res = restTemplate.getForObject(url, Map.class);
        return res;
    }

    @GetMapping("/register")
    public String register(String name, String password) {
        String url = providerUrl + "/register?name=" + name + "&password=" + password;
        String res = restTemplate.getForObject(url, String.class);
        return "Proxy from " + port + ": " + res;
    }

    @GetMapping("/login")
    public String login(String name, String password) {
        String url = providerUrl + "/login?name=" + name + "&password=" + password;
        String res = restTemplate.getForObject(url, String.class);
        return "Proxy from " + port + ": " + res;
    }
}
