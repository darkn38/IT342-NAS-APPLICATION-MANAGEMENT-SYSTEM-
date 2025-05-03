package edu.cit.nasamanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.cit.nasamanagementsystem.entity.User;
import edu.cit.nasamanagementsystem.enums.ApplicationStatus;
import edu.cit.nasamanagementsystem.repository.UserRepository;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "*")
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
    public User updateStatusAndRemarks(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status,
            @RequestParam String remarks
    ) {
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
        existingUser.setDocumentPath(updatedUser.getDocumentPath());
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