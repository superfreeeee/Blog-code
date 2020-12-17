package com.example.demo.demoAPI;

import com.example.demo.vo.ResponseVO;
import com.example.demo.demoAPI.pojo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/demo/api")
public class DemoController {

    @Autowired
    DemoService demoService;

    @PostMapping("/user")
    public ResponseVO addUser(@RequestBody UserVO userVO) {
        boolean res = demoService.addUser(userVO);
        return ResponseVO.buildSimple(res);
    }

    @GetMapping("/user/{userId}")
    public ResponseVO getUserInfo(@PathVariable Integer userId) {
        UserVO userVO = demoService.getUser(userId);
        if(userVO == null) {
            return ResponseVO.buildSimple(false);
        } else {
            return ResponseVO.buildSuccess(userVO);
        }
    }
}
