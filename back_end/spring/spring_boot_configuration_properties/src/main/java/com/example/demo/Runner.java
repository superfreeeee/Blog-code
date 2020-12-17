package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;


@Component
@EnableConfigurationProperties(MyProperties.class)
public class Runner implements ApplicationRunner {

    @Autowired
    private MyProperties myProperties;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        show();
    }

    public void show() {
        System.out.println("----- show my.prop -----");
        System.out.println(myProperties);
    }
}
