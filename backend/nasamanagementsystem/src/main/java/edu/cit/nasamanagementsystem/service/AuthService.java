package edu.cit.nasamanagementsystem.service;

import edu.cit.nasamanagementsystem.dto.LoginRequest;
import edu.cit.nasamanagementsystem.dto.SignUpRequest;

import java.util.Map;

public interface AuthService {

    // ✅ Public user registration (applicant, mobile side)
    String signup(SignUpRequest request);

    // ✅ User login (both applicant and admin)
    Map<String, String> login(LoginRequest request);

}
