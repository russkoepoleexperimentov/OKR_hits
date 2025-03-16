package com.example.tsu_checkin.screens.auth_screens

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.tsu_checkin.network.dto.LoginDto
import com.example.tsu_checkin.network.repositories.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SignInViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {

    fun login(email:String, password:String){
        viewModelScope.launch{
            authRepository.signIn(LoginDto(email, password))
        }
    }
}