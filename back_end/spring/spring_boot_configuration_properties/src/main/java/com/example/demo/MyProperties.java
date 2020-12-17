package com.example.demo;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "my.prop")
public class MyProperties {

    private String name;
    private Integer port;
    private List<String> excludeUsers;
    private ServerProperties server;
    private ClientProperties client;

    @Override
    public String toString() {
        return "MyProperties{" +
                "name='" + name + '\'' +
                ", port=" + port +
                ", excludeUsers=" + excludeUsers +
                ", server=" + server +
                ", client=" + client +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public List<String> getExcludeUsers() {
        return excludeUsers;
    }

    public void setExcludeUsers(List<String> excludeUsers) {
        this.excludeUsers = excludeUsers;
    }

    public ServerProperties getServer() {
        return server;
    }

    public void setServer(ServerProperties server) {
        this.server = server;
    }

    public ClientProperties getClient() {
        return client;
    }

    public void setClient(ClientProperties client) {
        this.client = client;
    }
}
