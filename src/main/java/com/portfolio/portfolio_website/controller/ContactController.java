package com.portfolio.portfolio_website.controller;

import com.portfolio.portfolio_website.model.ContactMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Portfolio API is running! ✅");
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> contact(
            @RequestBody ContactMessage msg) {

        System.out.println("📩 New Message from: " + msg.getName());
        System.out.println("📧 Email: " + msg.getEmail());
        System.out.println("💬 Message: " + msg.getMessage());

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Thank you " + msg.getName() + "! I will reply soon.");

        return ResponseEntity.ok(response);
    }
}
