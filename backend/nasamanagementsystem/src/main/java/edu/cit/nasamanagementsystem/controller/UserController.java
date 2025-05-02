package edu.cit.nasamanagementsystem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.cit.nasamanagementsystem.dto.SignUpRequest;
import edu.cit.nasamanagementsystem.entity.User;
import edu.cit.nasamanagementsystem.repository.UserRepository;
import edu.cit.nasamanagementsystem.service.AuthService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://it-342-nas-application-management-system-84f5.vercel.app"
})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService; // ✅ Add this!

    // CREATE USER
    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            return ResponseEntity.badRequest().body("Cannot create admin via this endpoint.");
        }

        // ✅ Use your service to ensure password is encoded!
        SignUpRequest request = new SignUpRequest();
        request.setEmail(user.getEmail());
        request.setPassword(user.getPassword());
        request.setRole(user.getRole());

        String result = authService.signup(request);

        if (result.contains("already exists")) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);
    }

    // READ ALL USERS (exclude admins)
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findByRoleNot("ADMIN");
    }

    // READ ONE USER BY ID (only if not admin)
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent() && !"ADMIN".equalsIgnoreCase(userOpt.get().getRole())) {
            return ResponseEntity.ok(userOpt.get());
        }
        return ResponseEntity.status(404).body("User not found or is an admin.");
    }

    // UPDATE USER (only if not admin)
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
            userRepository.save(user);
            return ResponseEntity.ok("User updated successfully.");
        }
        return ResponseEntity.status(404).body("User not found.");
    }

    // DELETE USER (only if not admin)
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
}
