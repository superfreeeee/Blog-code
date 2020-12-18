package com.example.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ClientController {

    @Value("${server.port}")
    private Integer port;

    @Autowired
    private RestTemplate restTemplate;

    // 由于套用了 ribbon 服务，可以直接根据服务名 ribbon-service 查找相应微服务
    private String ribbonServiceInfoUrl = "http://ribbon-service/info";
    private int count = 0;

    @GetMapping("/found")
    public String access() {
        count++;
        String res = restTemplate.getForObject(ribbonServiceInfoUrl, String.class);
        return "Ribbon Client(port=" + port + "), " + "result=" + res + '\n' + ", request count=" + count;
    }
}
