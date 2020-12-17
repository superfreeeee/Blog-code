package com.example.testlogin.login;

import javax.servlet.http.HttpSession;

public class SessionInfo {

    private String sessionId;
    private int maxInactiveInterval;
    private String username;
    private String password;

    public SessionInfo(HttpSession session) {
        this.sessionId = session.getId();
        this.maxInactiveInterval = session.getMaxInactiveInterval();
        this.username = (String)session.getAttribute("username");
        this.password = (String)session.getAttribute("password");
    }

    @Override
    public String toString() {
        String lineSeparator = System.lineSeparator();
        return "sessionId: " + sessionId + lineSeparator +
                "maxInactiveInterval" + maxInactiveInterval + lineSeparator +
                "username: " + username + lineSeparator +
                "password: " + password + lineSeparator;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public int getMaxInactiveInterval() {
        return maxInactiveInterval;
    }

    public void setMaxInactiveInterval(int maxInactiveInterval) {
        this.maxInactiveInterval = maxInactiveInterval;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
