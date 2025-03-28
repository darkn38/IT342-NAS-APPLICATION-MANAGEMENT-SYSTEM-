package edu.cit.nasamanagementsystem.service;

import edu.cit.nasamanagementsystem.dto.LoginRequest;
import edu.cit.nasamanagementsystem.dto.SignUpRequest;

public interface AuthService {
    String signup(SignUpRequest request);
    String login(LoginRequest request);
}
