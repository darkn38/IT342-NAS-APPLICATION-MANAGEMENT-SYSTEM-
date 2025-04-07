package com.it342.nasms.data

// TODO: Adjust field names and types to match your backend API response for a single scholarship.
// Match fields needed for the list item display and potentially the application form.
// Use @SerializedName("api_field_name") if JSON names differ.
data class Scholarship(
    val id: String, // Or Int
    val name: String,
    val description: String?,
    val deadline: String?, // Consider using a Date type if backend sends a standard format
    val requirements: String?, // Example extra field
    val slotsAvailable: Int?  // Example extra field
)