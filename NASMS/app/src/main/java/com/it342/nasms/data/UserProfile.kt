package com.it342.nasms.data

// TODO: Adjust field names and types to match your backend API response for user profile.
// Match the fields you want to display on the profile screen.
// Use @SerializedName("api_field_name") if JSON names differ.
data class UserProfile(
    val id: String,
    val name: String,
    val email: String,
    val studentId: String?, // Make nullable if potentially missing
    val department: String?, // Example extra field
    val yearLevel: Int?,     // Example extra field
    val applicationStatus: String?, // Status of their scholarship application
    val remarks: String? // Remarks related to their application status
)