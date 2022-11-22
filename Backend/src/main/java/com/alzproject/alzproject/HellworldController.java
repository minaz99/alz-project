package com.alzproject.alzproject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HellworldController {

    @GetMapping("/")
    public String home() {
        return "Hello world";
    }

}
