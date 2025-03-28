package edu.cit.nasamanagementsystem.service;

import edu.cit.nasamanagementsystem.dto.LoginRequest;
import edu.cit.nasamanagementsystem.dto.SignUpRequest;
import edu.cit.nasamanagementsystem.entity.User;
import edu.cit.nasamanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String signup(SignUpRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists!";
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // Hash this later!
        user.setRole(request.getRole());

        userRepository.save(user);
        return "User registered successfully.";
    }

    @Override
    public String login(LoginRequest request) {
        return userRepository.findByEmail(request.getEmail())
                .filter(user -> user.getPassword().equals(request.getPassword()))
                .map(user -> "Login successful.")
                .orElse("Invalid credentials.");
    }
}
