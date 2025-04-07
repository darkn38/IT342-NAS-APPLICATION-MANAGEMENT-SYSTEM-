package com.it342.nasms.network

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {

    private const val BASE_URL = "http://your_backend_ip_or_domain/" // !!! REPLACE WITH ACTUAL BACKEND URL !!!

    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY // Log request/response body (remove for production)
    }

    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor) // Add logging interceptor
        // .addInterceptor { chain -> // Optional: Add Auth Token Interceptor here
        //     val original = chain.request()
        //     val token = // Get saved token from SharedPreferences
        //     val requestBuilder = original.newBuilder()
        //         .header("Authorization", "Bearer $token") // Add header if token exists
        //         .method(original.method, original.body)
        //     val request = requestBuilder.build()
        //     chain.proceed(request)
        // }
        .build()

    val instance: ApiService by lazy {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        retrofit.create(ApiService::class.java)
    }
}