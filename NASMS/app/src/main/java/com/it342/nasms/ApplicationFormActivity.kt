package com.it342.nasms

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.it342.nasms.databinding.ActivityApplicationFormBinding
// Import PDF generation library (e.g., iText or Android PdfDocument)
// Import Retrofit service
// Import Application data class

class ApplicationFormActivity : AppCompatActivity() {

    private lateinit var binding: ActivityApplicationFormBinding
    // private lateinit var apiService: ApiService
    // private var selectedScholarshipId: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityApplicationFormBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // selectedScholarshipId = intent.getStringExtra("SCHOLARSHIP_ID") // Get ID if passed

        binding.buttonSubmitApplication.setOnClickListener {
            if (validateForm()) {
                submitApplicationData()
            }
        }

        binding.buttonGeneratePdf.setOnClickListener {
            generatePdf()
        }
    }

    private fun validateForm(): Boolean {
        // TODO: Implement validation for all form fields
        return true
    }

    private fun collectFormData(): Any { // Replace 'Any' with your Application data class
        // TODO: Create an Application data object from all EditTexts, Spinners etc.
        return Any()
    }

    private fun submitApplicationData() {
        val applicationData = collectFormData()
        // Show Loading
        // TODO: Implement API call to submit application data (apiService.submitApplication(...))
        // On Success: Navigate back or show success message
        // On Failure: Show error
        // Hide Loading
        Toast.makeText(this,"TODO: API Call - Submit Form", Toast.LENGTH_SHORT).show()
    }

    private fun generatePdf() {
        // COMPLEX IMPLEMENTATION
        // 1. Get data from form fields
        // 2. Use a PDF library (e.g., iText - check license, or Android's PdfDocument)
        // 3. Create a new PDF document
        // 4. Draw text, potentially images, onto PDF pages based on form data
        // 5. Save the PDF to device storage (handle permissions, scoped storage)
        // 6. Optionally offer to share/view the PDF
        Toast.makeText(this,"TODO: Implement PDF Generation", Toast.LENGTH_LONG).show()
    }
}