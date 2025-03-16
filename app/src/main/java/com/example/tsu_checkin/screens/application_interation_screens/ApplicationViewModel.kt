package com.example.tsu_checkin.screens.application_interation_screens

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tsu_checkin.network.dto.ApplicationAddingDto
import com.example.tsu_checkin.network.dto.ApplicationListDto
import com.example.tsu_checkin.network.dto.ApplicationListDtoItem
import com.example.tsu_checkin.network.repositories.ApplicationRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ApplicationViewModel @Inject constructor(
    private val applicationRepository: ApplicationRepository,
) : ViewModel(){
    private var _application = MutableStateFlow<ApplicationListDtoItem?>(null)
    var application = _application.asStateFlow()


    fun getApplicationById(applicationId: String){
        viewModelScope.launch {
            _application.value = applicationRepository.getApplicationById(applicationId)
        }
    }

    fun addApplication(description:String, startDate:String, endDate:String){
        viewModelScope.launch {
            applicationRepository.addApplication(ApplicationAddingDto(description, startDate, endDate))
        }
    }

    fun editApplication(applicationId:String, description:String, startDate:String, endDate:String){
        viewModelScope.launch {
            applicationRepository.editApplication(applicationId, ApplicationAddingDto(description, startDate, endDate))
        }
    }

    fun deleteApplication(applicationId:String){
        viewModelScope.launch {
            applicationRepository.deleteApplication(applicationId)
        }
    }
}