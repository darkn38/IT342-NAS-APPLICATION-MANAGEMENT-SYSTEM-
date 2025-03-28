package edu.cit.nasamanagementsystem.controller;

import edu.cit.nasamanagementsystem.dto.LoginRequest;
import edu.cit.nasamanagementsystem.dto.SignUpRequest;
import edu.cit.nasamanagementsystem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // Allow frontend access
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public String signup(@RequestBody SignUpRequest request) {
        return authService.signup(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
