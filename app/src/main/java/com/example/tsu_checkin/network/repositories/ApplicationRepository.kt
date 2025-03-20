package com.example.tsu_checkin.network.repositories

import android.content.SharedPreferences
import com.example.tsu_checkin.core.utils.TOKEN_KEY
import com.example.tsu_checkin.network.ApiService
import com.example.tsu_checkin.network.dto.ApplicationAddingDto
import com.example.tsu_checkin.network.dto.ApplicationListDto
import com.example.tsu_checkin.network.dto.ApplicationListDtoItem
import com.example.tsu_checkin.network.dto.Author
import com.example.tsu_checkin.network.dto.Group
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.asRequestBody
import okhttp3.ResponseBody
import retrofit2.Response
import java.io.File
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

    suspend fun getAllApplication(from:String?, to:String?, onlyChecking:Boolean): ApplicationListDto? {
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        val response = api.getAllApplications("Bearer $token", from, to, onlyChecking)

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

    suspend fun addApplication(applicationAddingDto: ApplicationAddingDto) : String? {
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        val response = api.addApplication("Bearer $token", applicationAddingDto)

        if(response.isSuccessful){
            return response.body()
        }

        return null
    }

    suspend fun addAttachment(id:String, file: File){
        val token = sharedPreferences.getString(TOKEN_KEY, "")
        val part = MultipartBody.Part.createFormData("file", file.getName(),
            file.asRequestBody("image/*".toMediaTypeOrNull())
        )

        api.addAttachment("Bearer $token", id, part)
    }

    suspend fun editApplication(applicationId:String, applicationAddingDto: ApplicationAddingDto) :String? {
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        val response = api.editApplication("Bearer $token", applicationId, applicationAddingDto)

        if(response.isSuccessful){
            return response.body()
        }

        return null
    }

    suspend fun deleteApplication(applicationId:String) {
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        api.deleteApplication("Bearer $token", applicationId)
    }

    suspend fun getGroups() : List<Group>?{
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        val response = api.getGroups("Bearer $token")

        if(response.isSuccessful){
            return response.body()
        }

        return null
    }

    suspend fun getGroupUsers(id:String):List<Author>?{
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        val response = api.getGroupUsers("Bearer $token", id)

        if(response.isSuccessful){
            return response.body()
        }

        return null
    }

    suspend fun getAttachmentsById(id:String) : List<String>?{
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        val response = api.getAttachmentsId("Bearer $token", id)

        if(response.isSuccessful){
            return response.body()
        }

        return null
    }

    suspend fun getAttachment(id:String) : ResponseBody?{
        val token = sharedPreferences.getString(TOKEN_KEY, "")

        val response = api.getAttachment("Bearer $token", id)

        if(response.isSuccessful){
            return response.body()
        }

        return null
    }
}