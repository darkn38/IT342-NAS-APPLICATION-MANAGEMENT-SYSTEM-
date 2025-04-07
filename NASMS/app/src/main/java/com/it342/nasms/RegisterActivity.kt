package com.it342.nasms

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.it342.nasms.databinding.ActivityRegisterBinding // Import ViewBinding for your register layout
// Import Retrofit service
// Import RegisterRequest data class (you'll need to define this)
// Import RegisterResponse data class (you'll need to define this)

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    // private lateinit var apiService: ApiService // Initialize your Retrofit service

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // apiService = RetrofitClient.instance // Get Retrofit instance

        binding.buttonRegister.setOnClickListener {
            if (validateInput()) {
                registerUser()
            }
        }

        binding.textViewLoginPrompt.setOnClickListener {
            // Navigate back to LoginActivity
            finish() // Close RegisterActivity
            // Or use: startActivity(Intent(this, LoginActivity::class.java)) if you prefer
        }
    }

    private fun validateInput(): Boolean {
        val name = binding.editTextName.text.toString().trim() // Assuming you have editTextName
        val studentId = binding.editTextStudentId.text.toString().trim() // Assuming you have editTextStudentId
        val email = binding.editTextEmail.text.toString().trim()
        val password = binding.editTextPassword.text.toString().trim()
        val confirmPassword = binding.editTextConfirmPassword.text.toString().trim()

        if (name.isEmpty() || studentId.isEmpty() || email.isEmpty() || password.isEmpty() || confirmPassword.isEmpty()) {
            Toast.makeText(this, R.string.error_required_field, Toast.LENGTH_SHORT).show()
            return false
        }

        if (password != confirmPassword) {
            binding.editTextConfirmPassword.error = "Passwords do not match" // Show error on the field
            Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show()
            return false
        }

        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            binding.editTextEmail.error = "Invalid email format"
            Toast.makeText(this, "Invalid email format", Toast.LENGTH_SHORT).show()
            return false
        }

        // TODO: Add any other specific validation rules (e.g., password complexity)

        // Clear previous errors if any
        binding.editTextConfirmPassword.error = null
        binding.editTextEmail.error = null

        return true
    }

    private fun registerUser() {
        val name = binding.editTextName.text.toString().trim()
        val studentId = binding.editTextStudentId.text.toString().trim()
        val email = binding.editTextEmail.text.toString().trim()
        val password = binding.editTextPassword.text.toString().trim()

        // Create the request object based on your data class
        // val registerRequest = RegisterRequest(name, studentId, email, password, /* other fields */)

        // Show loading indicator
        // binding.progressBar.visibility = View.VISIBLE // Assuming you have a ProgressBar

        // TODO: Implement API call using Retrofit (e.g., apiService.register(registerRequest))
        // Use a coroutine scope to launch the suspend function
        // lifecycleScope.launch {
        //    try {
        //        val response = apiService.register(registerRequest)
        //        if (response.isSuccessful) {
        //            // Handle successful registration
        //            // Maybe show a success message and navigate to Login
        //            Toast.makeText(this@RegisterActivity, "Registration Successful!", Toast.LENGTH_LONG).show()
        //            finish() // Go back to Login screen
        //        } else {
        //            // Handle API error (e.g., email already exists)
        //            val errorBody = response.errorBody()?.string() // Get error message from backend if available
        //            Toast.makeText(this@RegisterActivity, "Registration failed: $errorBody", Toast.LENGTH_LONG).show()
        //        }
        //    } catch (e: Exception) {
        //        // Handle network or other exceptions
        //        Toast.makeText(this@RegisterActivity, "An error occurred: ${e.message}", Toast.LENGTH_LONG).show()
        //    } finally {
        //         // Hide loading indicator
        //         // binding.progressBar.visibility = View.GONE
        //    }
        // }

        Toast.makeText(this,"TODO: API Call - Register User", Toast.LENGTH_SHORT).show() // Placeholder
    }
}