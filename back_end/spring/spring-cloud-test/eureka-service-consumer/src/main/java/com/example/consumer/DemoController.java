package com.example.consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class DemoController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/info")
    public String getEurekaServiceInfo() {
        String url = "http://localhost:8801/";
        HttpMethod type = HttpMethod.GET;
        RequestEntity<String> req = null;
        ResponseEntity<String> res = restTemplate.exchange(url, type, req, String.class);
        return res.getBody();
    }

    @GetMapping("/info2")
    public String getEurekaServiceInfo2() {
        String url = "http://localhost:8801/";
        String res = restTemplate.getForObject(url, String.class);
        return res;
    }

    @GetMapping("/info3")
    public String getEurekaServiceInfo3() {
        String url = "http://localhost:8801/id?userId=123";
        String res = restTemplate.getForObject(url, String.class);
        return res;
    }

    @GetMapping("/info4")
    public UserVO getEurekaServiceInfo4() {
        UserVO userVO = new UserVO();
        userVO.setId("100");
        userVO.setName("superfree");

        String url = "http://localhost:8801/create";
        UserVO res = restTemplate.postForObject(url, userVO, UserVO.class);
        return res;
    }
}
