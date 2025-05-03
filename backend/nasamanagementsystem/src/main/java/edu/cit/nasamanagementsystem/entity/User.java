package edu.cit.nasamanagementsystem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // ADMIN or APPLICANT

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String idNumber; // Student ID number

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String yearLevel;

    @Column(nullable = false)
    private String address;

    // ← NEW: store uploaded document path/URL
    @Column(name = "document_path")
    private String documentPath;

    @Column(nullable = false)
    private String status = "Pending"; // Default when created: "Pending"

    @Column(length = 500)
    private String remarks; // Optional remarks field

    // Constructors
    public User() {}

    public User(String email, String password, String role, String firstName, String lastName,
                String idNumber, String department, String yearLevel, String address,
                String documentPath, String status, String remarks) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.department = department;
        this.yearLevel = yearLevel;
        this.address = address;
        this.documentPath = documentPath;
        this.status = status;
        this.remarks = remarks;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getIdNumber() { return idNumber; }
    public void setIdNumber(String idNumber) { this.idNumber = idNumber; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getYearLevel() { return yearLevel; }
    public void setYearLevel(String yearLevel) { this.yearLevel = yearLevel; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    // ← NEW getter/setter for documentPath
    public String getDocumentPath() { 
        return documentPath; 
    }
    public void setDocumentPath(String documentPath) { 
        this.documentPath = documentPath; 
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    @Override
    public String toString() {
        return "User{" +
               "id=" + id +
               ", email='" + email + '\'' +
               ", role='" + role + '\'' +
               ", firstName='" + firstName + '\'' +
               ", lastName='" + lastName + '\'' +
               ", idNumber='" + idNumber + '\'' +
               ", department='" + department + '\'' +
               ", yearLevel='" + yearLevel + '\'' +
               ", address='" + address + '\'' +
               ", documentPath='" + documentPath + '\'' +    // include in toString if desired
               ", status='" + status + '\'' +
               ", remarks='" + remarks + '\'' +
               '}';
    }
}
