package com.it342.nasms

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.OpenableColumns
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.it342.nasms.databinding.ActivityUploadBinding
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import java.io.File
import java.io.FileOutputStream

class UploadActivity : AppCompatActivity() {

    private lateinit var binding: ActivityUploadBinding
    // private lateinit var apiService: ApiService

    private var schoolIdUri: Uri? = null
    private var gradesUri: Uri? = null

    // ActivityResultLauncher for picking files
    private val schoolIdPickerLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            result.data?.data?.let { uri ->
                schoolIdUri = uri
                binding.textViewSchoolIdFile.text = getString(R.string.text_school_id_selected, getFileName(uri))
            }
        }
    }
    private val gradesPickerLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            result.data?.data?.let { uri ->
                gradesUri = uri
                binding.textViewGradesFile.text = getString(R.string.text_grades_selected, getFileName(uri))
            }
        }
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityUploadBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // apiService = RetrofitClient.instance

        binding.buttonSelectSchoolId.setOnClickListener {
            openFilePicker(schoolIdPickerLauncher)
        }
        binding.buttonSelectGrades.setOnClickListener {
            openFilePicker(gradesPickerLauncher)
        }
        binding.buttonUpload.setOnClickListener {
            uploadFiles()
        }
    }

    private fun openFilePicker(launcher: androidx.activity.result.ActivityResultLauncher<Intent>) {
        val intent = Intent(Intent.ACTION_GET_CONTENT).apply {
            type = "*/*" // Allow any file type, or specify (e.g., "image/*", "application/pdf")
            addCategory(Intent.CATEGORY_OPENABLE)
        }
        launcher.launch(intent)
    }

    // Helper to get file name from Uri
    private fun getFileName(uri: Uri): String? {
        var fileName: String? = null
        contentResolver.query(uri, null, null, null, null)?.use { cursor ->
            if (cursor.moveToFirst()) {
                val nameIndex = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME)
                if (nameIndex != -1) {
                    fileName = cursor.getString(nameIndex)
                }
            }
        }
        return fileName ?: uri.lastPathSegment
    }

    // Helper function to get File from Uri (needed for Retrofit multipart)
    private fun getFileFromUri(uri: Uri): File? {
        return try {
            val inputStream = contentResolver.openInputStream(uri)
            val file = File(cacheDir, getFileName(uri) ?: "temp_file")
            val outputStream = FileOutputStream(file)
            inputStream?.copyTo(outputStream)
            inputStream?.close()
            outputStream.close()
            file
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }


    private fun uploadFiles() {
        val schoolIdFile = schoolIdUri?.let { getFileFromUri(it) }
        val gradesFile = gradesUri?.let { getFileFromUri(it) }

        if (schoolIdFile == null || gradesFile == null) {
            Toast.makeText(this, "Please select both files", Toast.LENGTH_SHORT).show()
            return
        }

        // Create RequestBody instance from file
        val schoolIdRequestBody = schoolIdFile.asRequestBody(contentResolver.getType(schoolIdUri!!)?.toMediaTypeOrNull())
        val gradesRequestBody = gradesFile.asRequestBody(contentResolver.getType(gradesUri!!)?.toMediaTypeOrNull())


        // Create MultipartBody.Part instance using RequestBody instance
        val schoolIdPart = MultipartBody.Part.createFormData("school_id_file", schoolIdFile.name, schoolIdRequestBody) // "school_id_file" is the name expected by the backend
        val gradesPart = MultipartBody.Part.createFormData("grades_file", gradesFile.name, gradesRequestBody) // "grades_file" is the name expected by the backend

        // You might need to send other data (like user ID) as RequestBody parts too
        // val userId = "someUserId".toRequestBody("text/plain".toMediaTypeOrNull())

        // Show Loading
        // TODO: Implement API call using Retrofit (apiService.uploadDocuments(userId, schoolIdPart, gradesPart))
        // Use @Multipart annotation in your ApiService interface method
        // On Success: Show success message, maybe navigate away
        // On Failure: Show error
        // Hide Loading
        // Cleanup temp files if needed: schoolIdFile.delete(); gradesFile.delete()

        Toast.makeText(this,"TODO: API Call - Upload Files", Toast.LENGTH_SHORT).show()
    }
}