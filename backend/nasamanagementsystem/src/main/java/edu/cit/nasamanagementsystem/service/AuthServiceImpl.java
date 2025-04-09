package edu.cit.nasamanagementsystem.service;

import edu.cit.nasamanagementsystem.dto.LoginRequest;
import edu.cit.nasamanagementsystem.dto.SignUpRequest;
import edu.cit.nasamanagementsystem.entity.User;
import edu.cit.nasamanagementsystem.repository.UserRepository;
import edu.cit.nasamanagementsystem.security.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public String signup(SignUpRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists!";
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // ✅ Encrypt password
        user.setRole(request.getRole());

        userRepository.save(user);
        return "User registered successfully.";
    }

    @Override
    public Map<String, String> login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        Map<String, String> response = new HashMap<>();

        if (userOptional.isPresent()) {
            User user = userOptional.get();

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                response.put("error", "Invalid credentials");
                return response;
            }

            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
            String token = jwtUtil.generateToken(userDetails, user.getId());

            if (token == null || token.isEmpty()) {
                response.put("error", "Token generation failed");
                return response;
            }

            response.put("message", "Login successful");
            response.put("token", token);
            response.put("role", user.getRole());
            response.put("isAdmin", "ADMIN".equalsIgnoreCase(user.getRole()) ? "true" : "false");

            return response;

        } else {
            response.put("error", "Invalid credentials");
            return response;
        }
    }
}
