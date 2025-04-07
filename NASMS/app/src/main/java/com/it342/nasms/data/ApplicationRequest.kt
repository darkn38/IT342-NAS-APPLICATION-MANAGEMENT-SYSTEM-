package com.it342.nasms.data

// TODO: Adjust field names and types to match EXACTLY what your backend API expects for application submission.
// Include fields for ALL the data collected in your application form.
// Use @SerializedName("api_field_name") if JSON names differ.
data class ApplicationRequest(
    val scholarshipId: String, // ID of the scholarship being applied for
    // Personal Info
    val fullName: String,
    val address: String,
    val contactNumber: String,
    // Academic Info
    val department: String,
    val yearLevel: Int,
    val gpa: Double, // Or String if GPA format varies
    // Add other fields from your form (e.g., essay answers, family income if applicable)
    // val essayQuestion1: String?,
    // val familyIncome: Double?
)