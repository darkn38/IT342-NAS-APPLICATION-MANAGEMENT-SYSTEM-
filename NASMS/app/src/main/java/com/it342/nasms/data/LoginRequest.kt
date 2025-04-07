package com.it342.nasms.data

// TODO: Adjust field names (e.g., 'username' vs 'email') and types to match your backend API request for login.
// Use @SerializedName("api_field_name") if JSON names differ from variable names.
data class LoginRequest(
    val username: String, // Or maybe email? Check with backend dev.
    val password: String
)