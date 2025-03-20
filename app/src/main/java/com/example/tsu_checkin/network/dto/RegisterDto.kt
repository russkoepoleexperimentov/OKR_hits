package com.example.tsu_checkin.network.dto

data class RegisterDto(
    val email:String,
    val password:String,
    val credentials: String,
    val phone:String
)
