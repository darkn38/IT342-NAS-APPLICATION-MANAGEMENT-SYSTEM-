package edu.cit.nasamanagementsystem.controller;

import edu.cit.nasamanagementsystem.dto.DashboardStatsDTO;
import edu.cit.nasamanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "*")
public class AdminDashboardController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/stats")
    public DashboardStatsDTO getDashboardStats() {
        DashboardStatsDTO dto = new DashboardStatsDTO();
        dto.setTotal(userRepository.countAllApplicants());         // Uses your custom query
        dto.setApproved(userRepository.countApproved());           // Custom method
        dto.setPending(userRepository.countPending());             // Custom method
        dto.setRejected(userRepository.countRejected());           // Custom method
        return dto;
    }
}
