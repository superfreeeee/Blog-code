package com.example.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {

    @Value("${server.port}")
    private Integer port;

    @GetMapping("/info")
    public String info() {
        return "Service from " + port;
    }
}
