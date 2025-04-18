package edu.cit.nasamanagementsystem.repository;

import edu.cit.nasamanagementsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(String role);

    List<User> findByRoleNot(String role); // For fetching all users except admins

    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'APPLICANT'")
    long countAllApplicants();

    @Query("SELECT COUNT(u) FROM User u WHERE u.status = 'APPROVED' AND u.role = 'APPLICANT'")
    long countApproved();

    @Query("SELECT COUNT(u) FROM User u WHERE u.status = 'PENDING' AND u.role = 'APPLICANT'")
    long countPending();

    @Query("SELECT COUNT(u) FROM User u WHERE u.status = 'REJECTED' AND u.role = 'APPLICANT'")
    long countRejected();


}
