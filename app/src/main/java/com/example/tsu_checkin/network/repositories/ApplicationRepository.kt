package com.example.tsu_checkin.network.repositories

import android.content.SharedPreferences
import com.example.tsu_checkin.core.utils.TOKEN_KEY
import com.example.tsu_checkin.network.ApiService
import com.example.tsu_checkin.network.dto.ApplicationAddingDto
import com.example.tsu_checkin.network.dto.ApplicationListDto
import com.example.tsu_checkin.network.dto.ApplicationListDtoItem
import retrofit2.Response
import javax.inject.Inject

class ApplicationRepository @Inject constructor(
    private val api: ApiService,
    private val sharedPreferences: SharedPreferences
) {
    suspend fun getApplication(from:String?, to:String?, onlyChecking:Boolean): ApplicationListDto? {
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        val response = api.getApplication("Bearer $token", from, to, onlyChecking)

        if (response.isSuccessful){
            return response.body()
        }

        return null
    }

    suspend fun getApplicationById(applicationId:String) : ApplicationListDtoItem?{
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        val response = api.getApplicationById("Bearer $token", applicationId)

        if (response.isSuccessful){
            return response.body()
        }

        return null
    }

    suspend fun addApplication(applicationAddingDto: ApplicationAddingDto) {
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        api.addApplication("Bearer $token", applicationAddingDto)
    }

    suspend fun editApplication(applicationId:String, applicationAddingDto: ApplicationAddingDto) {
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        api.editApplication("Bearer $token", applicationId, applicationAddingDto)
    }

    suspend fun deleteApplication(applicationId:String) {
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        api.deleteApplication("Bearer $token", applicationId)
    }
}