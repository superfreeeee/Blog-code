package com.example.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class RibbonServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RibbonServiceApplication.class, args);
	}

}
