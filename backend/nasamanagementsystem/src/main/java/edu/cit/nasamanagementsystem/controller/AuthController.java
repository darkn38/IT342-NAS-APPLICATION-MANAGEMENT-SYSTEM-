package edu.cit.nasamanagementsystem.controller;

import edu.cit.nasamanagementsystem.dto.LoginRequest;
import edu.cit.nasamanagementsystem.dto.SignUpRequest;
import edu.cit.nasamanagementsystem.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow CORS for frontend
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // ✅ Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequest request) {
        Map<String, String> response = authService.login(request);

        if (response.containsKey("error")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        return ResponseEntity.ok(response);
    }

    // ✅ Register endpoint (now secured with ADMIN creation restriction)
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody SignUpRequest request) {

        // ✅ Security: Prevent public creation of ADMIN accounts
        if ("ADMIN".equalsIgnoreCase(request.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Admin account creation is not allowed via public API.");
        }

        String result = authService.signup(request);

        if ("Email already exists!".equals(result)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }

        return ResponseEntity.ok(result);
    }
}
