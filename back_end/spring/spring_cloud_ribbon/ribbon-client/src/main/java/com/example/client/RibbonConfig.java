package com.example.client;

import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.RoundRobinRule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RibbonConfig {

    @Bean
    public IRule rule() {
        // 使用轮训的负载均衡策略
        return new RoundRobinRule();
    }

}
