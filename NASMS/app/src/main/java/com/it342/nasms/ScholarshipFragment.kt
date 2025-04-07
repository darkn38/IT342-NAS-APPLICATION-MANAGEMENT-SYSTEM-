package com.it342.nasms

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.it342.nasms.data.Scholarship
import com.it342.nasms.databinding.FragmentScholarshipsBinding
import com.it342.nasms.databinding.ListItemScholarshipBinding
import com.it342.nasms.network.ApiService
import com.it342.nasms.network.RetrofitClient
import kotlinx.coroutines.launch


// --- Data Class ---
/*data class Scholarship(
    val id: String, // Adjust type if needed
    val name: String,
    val description: String?,
    val deadline: String? // Adjust type/format as needed
)*/

// --- ScholarshipsFragment ---
class ScholarshipsFragment : Fragment() {

    // Use a nullable backing property for ViewBinding
    private var _binding: FragmentScholarshipsBinding? = null
    private val binding get() = _binding!!

    private lateinit var scholarshipAdapter: ScholarshipAdapter
    private lateinit var apiService: ApiService

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // Inflate the layout using the auto-generated binding class
        _binding = FragmentScholarshipsBinding.inflate(inflater, container, false)
        apiService = RetrofitClient.instance // Initialize your ApiService
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        setupRecyclerView()
        fetchScholarships()
    }

    private fun setupRecyclerView() {
        scholarshipAdapter = ScholarshipAdapter { scholarship ->
            // Handle "Apply Now" click: navigate to ApplicationFormActivity
            val intent = Intent(activity, ApplicationFormActivity::class.java).apply {
                putExtra("SCHOLARSHIP_ID", scholarship.id)
                putExtra("SCHOLARSHIP_NAME", scholarship.name)
            }
            startActivity(intent)
        }
        binding.recyclerViewScholarships.apply {
            adapter = scholarshipAdapter
            layoutManager = LinearLayoutManager(context)
        }
    }

    private fun fetchScholarships() {
        showLoading(true) // Show progress, hide list/empty text

        viewLifecycleOwner.lifecycleScope.launch {
            try {
                val response = apiService.getScholarships()
                showLoading(false)

                if (response.isSuccessful) {
                    val scholarships = response.body()
                    if (!scholarships.isNullOrEmpty()) {
                        scholarshipAdapter.submitList(scholarships)
                        binding.recyclerViewScholarships.visibility = View.VISIBLE
                        binding.textViewEmptyList.visibility = View.GONE
                    } else {
                        binding.recyclerViewScholarships.visibility = View.GONE
                        binding.textViewEmptyList.visibility = View.VISIBLE
                    }
                } else {
                    showError("Error fetching scholarships: ${response.code()} ${response.message()}")
                    binding.recyclerViewScholarships.visibility = View.GONE
                    binding.textViewEmptyList.visibility = View.VISIBLE
                }
            } catch (e: Exception) {
                showLoading(false)
                showError("Failed to connect: ${e.message}")
                binding.recyclerViewScholarships.visibility = View.GONE
                binding.textViewEmptyList.visibility = View.VISIBLE
                e.printStackTrace()
            }
        }
    }

    private fun showLoading(isLoading: Boolean) {
        binding.progressBarScholarships.visibility = if (isLoading) View.VISIBLE else View.GONE
        if (isLoading) {
            binding.recyclerViewScholarships.visibility = View.GONE
            binding.textViewEmptyList.visibility = View.GONE
        }
    }

    private fun showError(message: String) {
        context?.let {
            Toast.makeText(it, message, Toast.LENGTH_LONG).show()
        }
    }

    // --- RecyclerView Adapter and ViewHolder ---
    class ScholarshipAdapter(private val onApplyClicked: (Scholarship) -> Unit) :
        ListAdapter<Scholarship, ScholarshipAdapter.ScholarshipViewHolder>(ScholarshipDiffCallback()) {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ScholarshipViewHolder {
            val binding = ListItemScholarshipBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
            return ScholarshipViewHolder(binding, onApplyClicked)
        }

        override fun onBindViewHolder(holder: ScholarshipViewHolder, position: Int) {
            val scholarship = getItem(position)
            if (scholarship != null) {
                holder.bind(scholarship)
            }
        }

        class ScholarshipViewHolder(
            private val binding: ListItemScholarshipBinding,
            private val onApplyClicked: (Scholarship) -> Unit
        ) : RecyclerView.ViewHolder(binding.root) {

            fun bind(scholarship: Scholarship) {
                binding.textViewScholarshipName.text = scholarship.name
                binding.textViewScholarshipDescription.text =
                    scholarship.description ?: "No description available."
                binding.textViewScholarshipDeadline.text = if (!scholarship.deadline.isNullOrBlank()) {
                    "Deadline: ${scholarship.deadline}"
                } else {
                    "No deadline specified."
                }

                binding.buttonApplyNowItem.setOnClickListener {
                    onApplyClicked(scholarship)
                }
            }
        }

        class ScholarshipDiffCallback : DiffUtil.ItemCallback<Scholarship>() {
            override fun areItemsTheSame(oldItem: Scholarship, newItem: Scholarship): Boolean {
                return oldItem.id == newItem.id
            }

            override fun areContentsTheSame(oldItem: Scholarship, newItem: Scholarship): Boolean {
                return oldItem == newItem
            }
        }
    }
    // --- End Adapter and ViewHolder ---

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
