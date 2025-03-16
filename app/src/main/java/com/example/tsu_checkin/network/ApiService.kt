package com.example.tsu_checkin.network

import com.example.tsu_checkin.network.dto.ApplicationAddingDto
import com.example.tsu_checkin.network.dto.ApplicationListDto
import com.example.tsu_checkin.network.dto.ApplicationListDtoItem
import com.example.tsu_checkin.network.dto.LoginDto
import com.example.tsu_checkin.network.dto.ProfileDto
import com.example.tsu_checkin.network.dto.TokenResponse
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

interface ApiService {
    @POST("api/User/login")
    suspend fun login(@Body loginDto: LoginDto) : Response<TokenResponse>

    @GET("api/User/profile")
    suspend fun getProfile(@Header("Authorization") token:String):Response<ProfileDto>

    @GET("api/StudentApplication")
    suspend fun getApplication(@Header("Authorization") token:String, @Query("from") from:String?, @Query("to") to:String?, @Query("onlyChecking") onlyChecking:Boolean):Response<ApplicationListDto>

    @GET("api/StudentApplication/{id}")
    suspend fun getApplicationById(@Header("Authorization") token:String, @Path("id") id: String): Response<ApplicationListDtoItem?>

    @POST("api/StudentApplication")
    suspend fun addApplication(@Header("Authorization") token:String, @Body applicationAddingDto: ApplicationAddingDto)

    @PUT("api/StudentApplication")
    suspend fun editApplication(@Header("Authorization") token:String, @Query("id") applicationId:String, @Body applicationAddingDto: ApplicationAddingDto)

    @DELETE("api/StudentApplication")
    suspend fun deleteApplication(@Header("Authorization") token:String, @Query("id") applicationId:String)

}