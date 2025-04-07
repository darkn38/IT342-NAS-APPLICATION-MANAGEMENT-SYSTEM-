package com.it342.nasms

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.it342.nasms.databinding.ActivityLoginBinding
// Import Retrofit service

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    // private lateinit var apiService: ApiService // Initialize your Retrofit service

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // apiService = RetrofitClient.instance // Get Retrofit instance

        binding.buttonLogin.setOnClickListener {
            val username = binding.editTextUsername.text.toString().trim()
            val password = binding.editTextPassword.text.toString().trim()

            if (username.isNotEmpty() && password.isNotEmpty()) {
                // Show loading indicator
                loginUser(username, password)
            } else {
                Toast.makeText(this, R.string.error_required_field, Toast.LENGTH_SHORT).show()
            }
        }

        binding.textViewCreateAccountPrompt.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun loginUser(username: String, password: String) {
        // TODO: Implement API call using Retrofit (e.g., apiService.login(...))
        // On Success:
        // - Save authentication token (e.g., in SharedPreferences)
        // - Navigate to MainActivity/ProfileActivity
        // - finish()
        // On Failure:
        // - Show error message (Toast)
        // Hide loading indicator
        Toast.makeText(this,"TODO: API Call - Login", Toast.LENGTH_SHORT).show()
        // Example navigation on success:
        // startActivity(Intent(this, MainActivity::class.java))
        // finish()
    }
}