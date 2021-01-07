package com.example.config.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableConfigurationProperties(Data.class)
public class ClientController {

    @Autowired
    private Data data;

    @GetMapping("/")
    public Data info() {
        return data;
    }
}
