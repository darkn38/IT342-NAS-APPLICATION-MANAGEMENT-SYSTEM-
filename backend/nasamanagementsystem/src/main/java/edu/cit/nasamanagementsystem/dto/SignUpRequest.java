package edu.cit.nasamanagementsystem.dto;

public class SignUpRequest {
    private String email;
    private String password;
    private String role;

    // ✅ Additional applicant details
    private String firstName;
    private String lastName;
    private String department;
    private String yearLevel;
    private String idNumber;
    private String address;

    // ✅ Document path as text for now
    private String documentPath;

    // === Getters ===

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getDepartment() {
        return department;
    }

    public String getYearLevel() {
        return yearLevel;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public String getAddress() {
        return address;
    }

    public String getDocumentPath() {
        return documentPath;
    }

    // === Setters ===

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setYearLevel(String yearLevel) {
        this.yearLevel = yearLevel;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDocumentPath(String documentPath) {
        this.documentPath = documentPath;
    }
}
