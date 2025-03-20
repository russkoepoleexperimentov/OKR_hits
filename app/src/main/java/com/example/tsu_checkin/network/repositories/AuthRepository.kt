package com.example.tsu_checkin.network.repositories

import android.content.SharedPreferences
import com.example.tsu_checkin.core.utils.TOKEN_KEY
import com.example.tsu_checkin.network.ApiService
import com.example.tsu_checkin.network.dto.EditProfileDto
import com.example.tsu_checkin.network.dto.LoginDto
import com.example.tsu_checkin.network.dto.ProfileDto
import com.example.tsu_checkin.network.dto.TokenResponse
import retrofit2.Response
import javax.inject.Inject

class AuthRepository @Inject constructor(
    private val api:ApiService,
    private val sharedPreferences: SharedPreferences
) {

    suspend fun signIn(loginDto: LoginDto): TokenResponse? {
        val response = api.login(loginDto)

        if(response.isSuccessful){
            sharedPreferences.edit().putString(TOKEN_KEY, response.body()?.token).apply()
            return response.body()
        }

        return null
    }

    suspend fun getProfile(): ProfileDto?{
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        val response = api.getProfile("Bearer $token")

        if (response.isSuccessful){
            return response.body()
        }

        return null
    }

    suspend fun editProfile(editProfileDto: EditProfileDto) : Unit{
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        val response = api.editProfile("Bearer $token", editProfileDto)

        return
    }
}