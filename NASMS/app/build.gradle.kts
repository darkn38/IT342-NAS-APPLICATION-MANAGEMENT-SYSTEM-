plugins {
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.jetbrainsKotlinAndroid)
}

android {
    namespace = "com.it342.nasms"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.it342.nasms"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        // Source/target compatibility remains 1.8, which is fine
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
    buildFeatures {
        // !!! Enable ViewBinding, Disable Compose !!!
        viewBinding = true
        compose = true // Compose is removed, so this line is not needed
    }
    // !!! Remove composeOptions block if it exists !!!
     composeOptions {
        kotlinCompilerExtensionVersion = "1.5.1"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {

    // --- Core Android & Kotlin ---
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx) // Keep for lifecycle awareness

    // --- UI - Traditional View System ---
    implementation(libs.androidx.appcompat)          // Added: For AppCompatActivity, themes
    implementation(libs.google.material)          // Added: For Material Design Components (Buttons, TextInputLayouts)
    implementation(libs.androidx.constraintlayout)  // Added: For ConstraintLayout

    // --- Networking - Retrofit & OkHttp ---
    implementation(libs.retrofit)                     // Added: Retrofit core
    implementation(libs.converter.gson)               // Added: Gson converter for Retrofit
    implementation(libs.okhttp.logging.interceptor) // Added: For logging network calls (optional but helpful)

    // --- Coroutines ---
    implementation(libs.kotlinx.coroutines.android)   // Added: For background tasks
    implementation(libs.androidx.lifecycle.viewmodel.ktx) // Added: For ViewModelScope coroutines

    // --- Testing ---
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)

    // --- REMOVED COMPOSE DEPENDENCIES ---
    // Make sure all lines referencing Compose libraries are removed or commented out
    // implementation(libs.androidx.activity.compose)
    // implementation(platform(libs.androidx.compose.bom))
    // implementation(libs.androidx.ui)
    // implementation(libs.androidx.ui.graphics)
    // implementation(libs.androidx.ui.tooling.preview)
    // implementation(libs.androidx.material3)
    // androidTestImplementation(platform(libs.androidx.compose.bom))
    // androidTestImplementation(libs.androidx.ui.test.junit4)
    // debugImplementation(libs.androidx.ui.tooling)
    // debugImplementation(libs.androidx.ui.test.manifest)
    implementation(libs.androidx.activity.compose)
    implementation(platform("androidx.compose:compose-bom:2025.03.01"))
    //noinspection UseTomlInstead
    implementation("androidx.compose.ui:ui")
    //noinspection UseTomlInstead
    implementation("androidx.compose.ui:ui-graphics")
    //noinspection UseTomlInstead
    implementation("androidx.compose.material3:material3")
    //noinspection UseTomlInstead
    implementation("androidx.compose.ui:ui-tooling-preview")
    //noinspection UseTomlInstead
    debugImplementation("androidx.compose.ui:ui-tooling")
    //noinspection UseTomlInstead
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
}