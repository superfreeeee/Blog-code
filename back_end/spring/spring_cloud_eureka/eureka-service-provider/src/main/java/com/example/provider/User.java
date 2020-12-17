package com.example.provider;

public class User {

    private static int count = 0;
    private Integer id;
    private String name;
    private String password;

    public User() {
        id = count++;
    }

    public User(String name, String password) {
        id = count++;
        this.name = name;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
