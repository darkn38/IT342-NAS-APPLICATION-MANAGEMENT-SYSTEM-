package edu.cit.nasamanagementsystem.service;

import edu.cit.nasamanagementsystem.dto.LoginRequest;
import edu.cit.nasamanagementsystem.dto.SignUpRequest;

import java.util.Map;

public interface AuthService {
    String signup(SignUpRequest request);
    Map<String, String> login(LoginRequest request);

}
