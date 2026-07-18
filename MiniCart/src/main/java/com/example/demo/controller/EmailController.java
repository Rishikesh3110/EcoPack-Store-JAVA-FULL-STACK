package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EmailRequest;
import com.example.demo.service.EmailService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/sendMail")
    public String sendMail() {

        emailService.sendEmail(
                "ecopackstore.demo@gmail.com",
                "EcoPack Store Test Mail",
                "Congratulations! Your Spring Boot Email Integration is Working Successfully 🌿");

        return "Email Sent Successfully";
    }

    @PostMapping("/email/signup")
    public String signupMail(@RequestBody EmailRequest request) {

        emailService.sendWelcomeEmail(
                request.getEmail(),
                request.getName());

        return "Welcome Email Sent Successfully";
    }

}