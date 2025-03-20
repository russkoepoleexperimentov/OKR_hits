package com.example.tsu_checkin.network.dto

data class EditProfileDto(
    val credentials: String,
    val email: String,
    val phone: String
)