package edu.cit.nasamanagementsystem.controller;

import edu.cit.nasamanagementsystem.entity.User;
import edu.cit.nasamanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Get All Applicants
    @GetMapping
    public List<User> getAllApplicants() {
        return userRepository.findAll();
    }

    // ✅ Get Single Applicant by ID
    @GetMapping("/{id}")
    public User getApplicantById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Applicant not found with id " + id));
    }

    // ✅ Create New Applicant
    @PostMapping
    public User createApplicant(@RequestBody User user) {
        return userRepository.save(user);
    }

    // ✅ Update Applicant Status + Remarks
    @PatchMapping("/{id}/status")
    public User updateStatusAndRemarks(@PathVariable Long id,
                                       @RequestParam String status,
                                       @RequestParam String remarks) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Applicant not found with id " + id));
        existingUser.setStatus(status);
        existingUser.setRemarks(remarks);
        return userRepository.save(existingUser);
    }

    // ✅ Update All Applicant Info (Full Edit)
    @PutMapping("/{id}")
    public User updateApplicant(@PathVariable Long id, @RequestBody User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Applicant not found with id " + id));

        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setDepartment(updatedUser.getDepartment());
        existingUser.setYearLevel(updatedUser.getYearLevel());
        existingUser.setIdNumber(updatedUser.getIdNumber());
        existingUser.setAddress(updatedUser.getAddress());
        existingUser.setStatus(updatedUser.getStatus());
        existingUser.setRemarks(updatedUser.getRemarks());

        return userRepository.save(existingUser);
    }

    // ✅ Delete Applicant
    @DeleteMapping("/{id}")
    public void deleteApplicant(@PathVariable Long id) {
        userRepository.deleteById(id);
    }
}