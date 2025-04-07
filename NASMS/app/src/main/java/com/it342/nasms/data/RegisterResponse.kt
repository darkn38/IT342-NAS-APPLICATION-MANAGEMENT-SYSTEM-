package com.it342.nasms.data

// TODO: Adjust field names and types to match your backend API response for registration.
// Could be simple (just a success/error message) or complex (like LoginResponse if auto-login).
// Use @SerializedName("api_field_name") if JSON names differ.
data class RegisterResponse(
    val success: Boolean, // Was registration successful?
    val message: String?  // Success or error message
    // Optionally include token, userId etc. if user is logged in immediately after register
)