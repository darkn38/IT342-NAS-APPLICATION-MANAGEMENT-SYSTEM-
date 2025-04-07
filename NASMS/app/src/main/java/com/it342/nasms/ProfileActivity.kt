package com.it342.nasms

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.it342.nasms.databinding.ActivityProfileBinding
// Import Retrofit service
// Import User data class

class ProfileActivity : AppCompatActivity() {

    private lateinit var binding: ActivityProfileBinding
    // private lateinit var apiService: ApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityProfileBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // apiService = RetrofitClient.instance
        fetchUserProfile()

        // TODO: Handle OAuth2 Button Click if required
        // binding.buttonOAuthLogin.setOnClickListener { initiateOAuth() }
    }

    private fun fetchUserProfile() {
        // Show Loading
        // TODO: Get user ID or token
        // TODO: Implement API call to fetch user profile data (apiService.getUserProfile(...))
        // On Success:
        // - Parse response into User object
        // - Update UI (binding.textViewName.text = user.name, etc.)
        // On Failure:
        // - Show error message
        // Hide Loading
        Toast.makeText(this,"TODO: API Call - Fetch Profile", Toast.LENGTH_SHORT).show()
        // Example Data Update:
        // binding.textViewNameValue.text = "Juan Dela Cruz"
        // binding.textViewEmailValue.text = "juan@example.com"
        // binding.textViewStatusValue.text = "Pending"
        // binding.textViewRemarksValue.text = "Incomplete requirements"
    }

    // private fun initiateOAuth() {
    //     // VERY COMPLEX - Placeholder
    //     // Use libraries like AppAuth-Android or provider-specific SDKs (Google Sign-In)
    //     // Requires setup in Google Cloud Console/provider dashboard, backend changes,
    //     // handling redirects (custom tabs or intents).
    //     Toast.makeText(this, "OAuth2 Implementation Required", Toast.LENGTH_LONG).show()
    // }
}