package edu.cit.nasamanagementsystem.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.cit.nasamanagementsystem.entity.User;
import edu.cit.nasamanagementsystem.repository.UserRepository;
import edu.cit.nasamanagementsystem.security.jwt.JwtFilter;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class ApplicantController {

    @Autowired
    private UserRepository userRepository;

    /**
     * GET  /api/users/{id}
     *   → return the authenticated user’s own profile
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getMyProfile(@PathVariable Long id) {
        // 1) who is logged in?
        String email = JwtFilter.getAuthenticatedUserEmail();
        if (email == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        // 2) load their record
        Optional<User> maybe = userRepository.findByEmail(email);
        if (maybe.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }
        User me = maybe.get();

        // 3) guard: you can only view your own record
        if (!me.getId().equals(id)) {
            return ResponseEntity.status(403).body("Cannot view another user's profile");
        }

        // 4) OK
        return ResponseEntity.ok(me);
    }

    /**
     * PUT  /api/users/{id}
     *   → allow the authenticated user to update their own profile fields
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMyProfile(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
        String email = JwtFilter.getAuthenticatedUserEmail();
        if (email == null) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        Optional<User> maybe = userRepository.findByEmail(email);
        if (maybe.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }
        User me = maybe.get();

        if (!me.getId().equals(id)) {
            return ResponseEntity.status(403).body("Cannot modify another user");
        }

        // copy in only the updatable fields:
        me.setFirstName   (updatedUser.getFirstName());
        me.setLastName    (updatedUser.getLastName());
        me.setIdNumber    (updatedUser.getIdNumber());
        me.setAddress     (updatedUser.getAddress());
        me.setDepartment  (updatedUser.getDepartment());
        me.setYearLevel   (updatedUser.getYearLevel());
        me.setDocumentPath(updatedUser.getDocumentPath());
        // leave email/password/role/status/remarks untouched

        User saved = userRepository.save(me);
        return ResponseEntity.ok(saved);
    }
}
