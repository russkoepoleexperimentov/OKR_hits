package com.example.tsu_checkin.screens.profile_screen

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tsu_checkin.network.dto.LoginDto
import com.example.tsu_checkin.network.dto.ProfileDto
import com.example.tsu_checkin.network.repositories.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {

    private var _profile = MutableStateFlow<ProfileDto?>(null)
    var profile = _profile.asStateFlow()

    init {
        getProfile()
    }

    fun getProfile(){
        viewModelScope.launch {
            _profile.value = authRepository.getProfile()
        }
    }
}