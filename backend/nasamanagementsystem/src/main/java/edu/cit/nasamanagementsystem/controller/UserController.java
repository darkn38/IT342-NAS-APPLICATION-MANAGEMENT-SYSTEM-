package edu.cit.nasamanagementsystem.controller;

import edu.cit.nasamanagementsystem.dto.DashboardStatsDTO;
import edu.cit.nasamanagementsystem.entity.User;
import edu.cit.nasamanagementsystem.enums.ApplicationStatus;
import edu.cit.nasamanagementsystem.repository.UserRepository;
import edu.cit.nasamanagementsystem.dto.SignUpRequest;
import edu.cit.nasamanagementsystem.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/admin/users")
@PreAuthorize("hasAuthority('ADMIN')")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    // ✅ CREATE NEW APPLICANT (Admin only)
    @PostMapping
    public ResponseEntity<String> createApplicant(@RequestBody User user) {
        if (!"APPLICANT".equalsIgnoreCase(user.getRole())) {
            return ResponseEntity.badRequest().body("Admin can only create applicant accounts.");
        }

        SignUpRequest request = new SignUpRequest();
        request.setEmail(user.getEmail());
        request.setPassword(user.getPassword());
        request.setRole(user.getRole());
        request.setFirstName(user.getFirstName());
        request.setLastName(user.getLastName());
        request.setDepartment(user.getDepartment());
        request.setYearLevel(user.getYearLevel());
        request.setIdNumber(user.getIdNumber());
        request.setAddress(user.getAddress());
        request.setDocumentPath(user.getDocumentPath());

        String result = authService.signup(request);

        if (result.contains("already exists")) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);
    }

    // ✅ GET ALL USERS (exclude admins)
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findByRoleNot("ADMIN");
    }

    // ✅ GET USER BY ID (exclude admin)
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent() && !"ADMIN".equalsIgnoreCase(userOpt.get().getRole())) {
            return ResponseEntity.ok(userOpt.get());
        }
        return ResponseEntity.status(404).body("User not found or is an admin.");
    }

    // ✅ UPDATE USER (exclude admin) — ✅ Now includes status and remarks
    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if ("ADMIN".equalsIgnoreCase(user.getRole())) {
                return ResponseEntity.status(403).body("Cannot update admin accounts.");
            }

            user.setEmail(updatedUser.getEmail());
            user.setPassword(updatedUser.getPassword());
            user.setRole(updatedUser.getRole());
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setDepartment(updatedUser.getDepartment());
            user.setYearLevel(updatedUser.getYearLevel());
            user.setIdNumber(updatedUser.getIdNumber());
            user.setAddress(updatedUser.getAddress());
            user.setDocumentPath(updatedUser.getDocumentPath());

            // ✅ Add status and remarks (clean!)
            user.setStatus(updatedUser.getStatus());
            user.setRemarks(updatedUser.getRemarks());

            userRepository.save(user);
            return ResponseEntity.ok("User updated successfully.");
        }
        return ResponseEntity.status(404).body("User not found.");
    }

    // ✅ PATCH: Update status & remarks only (Admin clean operation!)
    @PatchMapping("/{id}/status")
    public ResponseEntity<String> updateApplicantStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status,
            @RequestParam String remarks) {

        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if ("ADMIN".equalsIgnoreCase(user.getRole())) {
                return ResponseEntity.status(403).body("Cannot update admin accounts.");
            }

            user.setStatus(status);
            user.setRemarks(remarks);

            userRepository.save(user);

            return ResponseEntity.ok("Applicant status and remarks updated successfully.");
        }

        return ResponseEntity.status(404).body("User not found.");
    }

    // ✅ DELETE USER (exclude admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            if ("ADMIN".equalsIgnoreCase(userOpt.get().getRole())) {
                return ResponseEntity.status(403).body("Cannot delete admin accounts.");
            }
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully.");
        }
        return ResponseEntity.status(404).body("User not found.");
    }

    @GetMapping("/dashboard-stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        stats.setTotal(userRepository.countAllApplicants());
        stats.setApproved(userRepository.countApproved());
        stats.setPending(userRepository.countPending());
        stats.setRejected(userRepository.countRejected());

        return ResponseEntity.ok(stats);
    }

}
