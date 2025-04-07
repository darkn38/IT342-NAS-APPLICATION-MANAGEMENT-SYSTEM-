package com.it342.nasms

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.it342.nasms.databinding.ActivityLandingBinding // Import ViewBinding

class LandingActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLandingBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLandingBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Optional: Check if user is already logged in (e.g., saved token)
        // if (isUserLoggedIn()) {
        //     startActivity(Intent(this, MainActivity::class.java)) // Go to main dashboard
        //     finish()
        //     return
        // }

        binding.buttonGoToLogin.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
        }

        binding.buttonGoToRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    // private fun isUserLoggedIn(): Boolean {
    //    // TODO: Implement logic to check for saved authentication token
    //    return false
    // }
}