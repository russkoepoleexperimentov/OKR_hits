package com.example.tsu_checkin.network

import com.example.tsu_checkin.network.dto.ApplicationAddingDto
import com.example.tsu_checkin.network.dto.ApplicationListDto
import com.example.tsu_checkin.network.dto.ApplicationListDtoItem
import com.example.tsu_checkin.network.dto.Author
import com.example.tsu_checkin.network.dto.EditProfileDto
import com.example.tsu_checkin.network.dto.Group
import com.example.tsu_checkin.network.dto.LoginDto
import com.example.tsu_checkin.network.dto.ProfileDto
import com.example.tsu_checkin.network.dto.RegisterDto
import com.example.tsu_checkin.network.dto.TokenResponse
import okhttp3.MultipartBody
import okhttp3.ResponseBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Multipart
import retrofit2.http.PATCH
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Part
import retrofit2.http.Path
import retrofit2.http.Query
import retrofit2.http.Streaming

interface ApiService {
    @POST("api/User/login")
    suspend fun login(@Body loginDto: LoginDto) : Response<TokenResponse>

    @POST("api/User/register")
    suspend fun register(@Body registerDto: RegisterDto):Response<TokenResponse>

    @GET("api/User/profile")
    suspend fun getProfile(@Header("Authorization") token:String):Response<ProfileDto>

    @PUT("api/User/profile")
    suspend fun editProfile(@Header("Authorization") token:String, @Body editProfileDto: EditProfileDto):Response<ProfileDto>

    @GET("api/Group")
    suspend fun getGroups(@Header("Authorization") token:String) : Response<List<Group>>

    @GET("api/Group/{id}/users")
    suspend fun getGroupUsers(@Header("Authorization") token:String, @Path("id") id: String):Response<List<Author>>

    @GET("api/StudentApplication")
    suspend fun getApplication(@Header("Authorization") token:String, @Query("from") from:String?, @Query("to") to:String?, @Query("onlyChecking") onlyChecking:Boolean):Response<ApplicationListDto>

    @GET("api/StudentApplication/{id}")
    suspend fun getApplicationById(@Header("Authorization") token:String, @Path("id") id: String): Response<ApplicationListDtoItem?>

    @GET("api/StudentApplication/search")
    suspend fun getAllApplications(@Header("Authorization") token:String, @Query("from") from:String?, @Query("to") to:String?, @Query("onlyChecking") onlyChecking:Boolean):Response<ApplicationListDto>

    @POST("api/StudentApplication")
    suspend fun addApplication(@Header("Authorization") token:String, @Body applicationAddingDto: ApplicationAddingDto) : Response<String>

    @PUT("api/StudentApplication")
    suspend fun editApplication(@Header("Authorization") token:String, @Query("id") applicationId:String, @Body applicationAddingDto: ApplicationAddingDto) : Response<String>

    @DELETE("api/StudentApplication")
    suspend fun deleteApplication(@Header("Authorization") token:String, @Query("id") applicationId:String)

    @Multipart
    @POST("api/StudentApplication/{id}/attachment")
    suspend fun addAttachment(@Header("Authorization") token:String, @Path("id") id: String, @Part filePart: MultipartBody.Part) : Response<Unit>

    @GET("api/StudentApplication/{id}/attachment")
    suspend fun getAttachmentsId(@Header("Authorization") token:String, @Path("id") id: String) : Response<List<String>>

    @GET("api/Attachment/{id}")
    suspend fun getAttachment(@Header("Authorization") token:String, @Path("id") id: String):Response<ResponseBody>
}