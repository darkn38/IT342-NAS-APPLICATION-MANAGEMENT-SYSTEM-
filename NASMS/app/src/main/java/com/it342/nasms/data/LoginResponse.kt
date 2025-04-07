package com.it342.nasms.data

// TODO: Adjust field names and types to match your backend API response for successful login.
// Common fields include a token, user ID, user role, etc.
// Also consider fields returned on login *failure* (e.g., message).
// Use @SerializedName("api_field_name") if JSON names differ.
data class LoginResponse(
    val token: String?, // Authentication token (e.g., JWT) - often nullable if login fails
    val userId: String?, // User's unique ID - nullable if login fails
    val role: String?,   // User's role (e.g., "applicant") - nullable if login fails
    val message: String? // Message, especially useful for error responses
)