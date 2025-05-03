package edu.cit.nasamanagementsystem.controller;

import edu.cit.nasamanagementsystem.entity.User;
import edu.cit.nasamanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
                .filter(user -> user.getRole().equals("ADMIN"));
    }

    @PutMapping("/{id}")
    public String updateAdmin(@PathVariable Long id, @RequestBody User updatedAdmin) {
        Optional<User> adminOpt = userRepository.findById(id);
        if (adminOpt.isPresent() && adminOpt.get().getRole().equals("ADMIN")) {
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
        if (adminOpt.isPresent() && adminOpt.get().getRole().equals("ADMIN")) {
            userRepository.deleteById(id);
            return "Admin deleted successfully.";
        }
        return "Admin not found.";
    }
}