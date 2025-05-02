package edu.cit.nasamanagementsystem.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.cit.nasamanagementsystem.entity.User;
import edu.cit.nasamanagementsystem.repository.UserRepository;

@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "*")

public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public String createAdmin(@RequestBody User admin) {
        admin.setRole("ADMIN");
        userRepository.save(admin);
        return "Admin created successfully.";
    }

    @GetMapping
    public List<User> getAllAdmins() {
        return userRepository.findByRole("ADMIN");
    }

    @GetMapping("/{id}")
    public Optional<User> getAdminById(@PathVariable Long id) {
        return userRepository.findById(id)
                .filter(user -> "ADMIN".equals(user.getRole()));
    }

    @PutMapping("/{id}")
    public String updateAdmin(@PathVariable Long id, @RequestBody User updatedAdmin) {
        Optional<User> adminOpt = userRepository.findById(id);
        if (adminOpt.isPresent() && "ADMIN".equals(adminOpt.get().getRole())) {
            User admin = adminOpt.get();
            admin.setEmail(updatedAdmin.getEmail());
            admin.setPassword(updatedAdmin.getPassword());
            userRepository.save(admin);
            return "Admin updated successfully.";
        }
        return "Admin not found.";
    }

    @DeleteMapping("/{id}")
    public String deleteAdmin(@PathVariable Long id) {
        Optional<User> adminOpt = userRepository.findById(id);
        if (adminOpt.isPresent() && "ADMIN".equals(adminOpt.get().getRole())) {
            userRepository.deleteById(id);
            return "Admin deleted successfully.";
        }
        return "Admin not found.";
    }
}
