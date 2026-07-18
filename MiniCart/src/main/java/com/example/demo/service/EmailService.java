package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, String body) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

    public void sendWelcomeEmail(String email, String name) {

        String subject = "🌿 Welcome to EcoPack Store";

        String body =
                "Hello " + name + ",\n\n"
                + "Welcome to EcoPack Store!\n\n"
                + "Thank you for registering with us.\n"
                + "We're excited to have you on our platform.\n\n"
                + "Happy Shopping!\n\n"
                + "Regards,\n"
                + "EcoPack Store Team";

        sendEmail(email, subject, body);
    }

}