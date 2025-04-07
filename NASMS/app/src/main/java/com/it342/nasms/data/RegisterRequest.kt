package com.it342.nasms.data

// TODO: Adjust field names and types to match your backend API request for registration.
// Add/remove fields based on what your registration form collects (name, studentId, etc.)
// Use @SerializedName("api_field_name") if JSON names differ.
data class RegisterRequest(
    val name: String,
    val studentId: String,
    val email: String,
    val password: String
    // Add any other required fields (e.g., department, yearLevel if needed at registration)
)