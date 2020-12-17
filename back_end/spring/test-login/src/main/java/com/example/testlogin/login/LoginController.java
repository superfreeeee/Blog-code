package com.example.testlogin.login;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Date;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:8081")
public class LoginController {

    private int INACTIVE_INTERVAL = 5;

    private long timer;

    {
        timer = new Date().getTime();
        printTimeDelta();
        System.out.println("Initial inactive interval: " + INACTIVE_INTERVAL);
    }

    /**
     * 打印時間戳
     */
    private void printTimeDelta() {
        long delta = (new Date().getTime() - timer) / 1000;
        System.out.println("time passed: " + (delta / 60) + " min " + (delta % 60) + " sec");
    }

    /**
     * 基本方法，測試跨域成功
     * @return
     */
    @GetMapping("/hello")
    public LoginResponse hello() {
        return LoginResponse.success("Hello World");
    }

    /**
     * 登入，將產生對應 session 紀錄
     * @param loginForm
     * @param session
     * @return
     */
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginForm loginForm, HttpSession session) {
        session.setMaxInactiveInterval(INACTIVE_INTERVAL);
        session.setAttribute("username", loginForm.getUsername());
        session.setAttribute("password", loginForm.getPassword());

        SessionInfo sessionInfo = new SessionInfo(session);
        System.out.println(sessionInfo);
        printTimeDelta();
        return LoginResponse.success(sessionInfo);
    }

    /**
     * 檢查當前 session 信息
     * @param session
     * @return
     */
    @GetMapping("/check")
    public LoginResponse checkSession(HttpSession session) {
        SessionInfo sessionInfo = new SessionInfo(session);
        System.out.println(sessionInfo);
        printTimeDelta();
        return LoginResponse.success(sessionInfo);
    }

    /**
     * 設置 sessionId 最大有效時間
     * @param interval 單位：秒，< 0 時設回默認值 1800s
     * @return
     */
    @GetMapping("/interval")
    public LoginResponse setInactiveInterval(@RequestParam int interval) {
        if(interval <= 0) {
            interval = 1800;
        }
        this.INACTIVE_INTERVAL = interval;
        System.out.println("set inactive interval: " + interval);
        return LoginResponse.success();
    }

}
