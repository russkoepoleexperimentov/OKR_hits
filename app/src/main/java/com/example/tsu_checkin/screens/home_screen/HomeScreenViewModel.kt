package com.example.tsu_checkin.screens.home_screen

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tsu_checkin.network.dto.ApplicationListDto
import com.example.tsu_checkin.network.dto.ProfileDto
import com.example.tsu_checkin.network.repositories.ApplicationRepository
import com.example.tsu_checkin.network.repositories.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class HomeScreenViewModel @Inject constructor(
    private val applicationRepository: ApplicationRepository,
    private val authRepository: AuthRepository
) : ViewModel() {
    private var _applications = MutableStateFlow<ApplicationListDto?>(null)
    var applications = _applications.asStateFlow()

    private var _profileState = MutableStateFlow<ProfileDto?>(null)
    var profileState = _profileState.asStateFlow()

    init {
        getApplication(null, null, false)
        getProfile()
    }

    fun getApplication(from: String?, to:String?, onlyChecking:Boolean){
        viewModelScope.launch {
            _applications.value = applicationRepository.getApplication(from, to, onlyChecking)
        }
    }

    fun getAllApplications(from: String?, to:String?, onlyChecking:Boolean){
        viewModelScope.launch {
            _applications.value = applicationRepository.getAllApplication(from, to, onlyChecking)
        }
    }

    private fun getProfile(){
        viewModelScope.launch {
            _profileState.value = authRepository.getProfile()
        }
    }
}






















































































































































































































































































































