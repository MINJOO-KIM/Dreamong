package com.ssafy.dreamong.domain.entity.user.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class MyController {

    @GetMapping("/my")
    public String myAPI() {
        log.info("{} , my Controller Connect", this);
        return "my route";
    }
}
