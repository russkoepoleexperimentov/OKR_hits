package com.example.tsu_checkin.screens.application_interation_screens

import android.net.Uri
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
import okhttp3.ResponseBody
import java.io.File
import javax.inject.Inject

@HiltViewModel
class ApplicationViewModel @Inject constructor(
    private val applicationRepository: ApplicationRepository,
) : ViewModel(){
    private var _application = MutableStateFlow<ApplicationListDtoItem?>(null)
    var application = _application.asStateFlow()

    private var _file = MutableStateFlow(mutableListOf<ResponseBody?>())
    var file = _file.asStateFlow()


    fun getApplicationById(applicationId: String){
        viewModelScope.launch {
            _application.value = applicationRepository.getApplicationById(applicationId)
        }
    }

    fun addApplication(description:String, startDate:String, endDate:String, uris:List<File?>){
        viewModelScope.launch {
            val id = applicationRepository.addApplication(ApplicationAddingDto(description, startDate, endDate))

            id?.let {idNonNull->
                repeat(uris.size){
                    addAttachment(idNonNull, uris[it])
                }
            }
        }
    }

    fun editApplication(applicationId:String, description:String, startDate:String, endDate:String, uris:List<File?>){
        viewModelScope.launch {
            val id = applicationRepository.editApplication(applicationId, ApplicationAddingDto(description, startDate, endDate))

            id?.let {idNonNull->
                repeat(uris.size){
                    addAttachment(idNonNull, uris[it])
                }
            }
        }
    }

    fun deleteApplication(applicationId:String){
        viewModelScope.launch {
            applicationRepository.deleteApplication(applicationId)
        }
    }

    fun addAttachment(id:String, file:File?){
        viewModelScope.launch {
            file?.let {
                applicationRepository.addAttachment(id, it)
            }
        }
    }

    fun getAttachmentsId(id:String){
        viewModelScope.launch {
            val ids = applicationRepository.getAttachmentsById(id)

            repeat(ids?.size ?: 0){
                loadImage(ids?.get(it) ?: "")
            }
        }
    }

    suspend fun loadImage(id:String){
        _file.value = _file.value.toMutableList().apply { add(applicationRepository.getAttachment(id)) }
    }
}