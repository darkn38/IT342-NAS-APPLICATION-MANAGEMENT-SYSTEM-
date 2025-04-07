package com.it342.nasms.network

import com.it342.nasms.data.LoginRequest // Define your data classes
import com.it342.nasms.data.LoginResponse
import com.it342.nasms.data.UserProfile
import com.it342.nasms.data.Scholarship
import com.it342.nasms.data.ApplicationRequest // Etc.
import com.it342.nasms.data.RegisterRequest
import com.it342.nasms.data.RegisterResponse
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Response // Use Response for detailed status codes
import retrofit2.http.*

interface ApiService {

    @POST("api/auth/login") // Replace with actual endpoint
    suspend fun login(@Body request: LoginRequest): Response<LoginResponse>

    @POST("api/auth/register") // Replace with actual endpoint
    suspend fun register(@Body request: RegisterRequest): Response<RegisterResponse> // Define RegisterRequest/Response

    @GET("api/user/profile") // Replace with actual endpoint
    suspend fun getUserProfile(@Header("Authorization") token: String): Response<UserProfile> // Assuming token auth

    @GET("api/scholarships") // Replace with actual endpoint
    suspend fun getScholarships(): Response<List<Scholarship>>

    @POST("api/applications") // Replace with actual endpoint
    suspend fun submitApplication(
        @Header("Authorization") token: String,
        @Body applicationData: ApplicationRequest
    ): Response<Void> // Or some response object

    @Multipart
    @POST("api/user/upload") // Replace with actual endpoint
    suspend fun uploadDocuments(
        @Header("Authorization") token: String,
        @Part("user_id") userId: RequestBody?, // Example: If backend needs user ID separately
        @Part schoolId: MultipartBody.Part,
        @Part grades: MultipartBody.Part
    ): Response<Void> // Or some response object
}