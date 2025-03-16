package com.example.tsu_checkin.network.dto

data class ProfileDto(
    val createdAt: String,
    val credentials: String,
    val email: String,
    val groupId: String,
    val id: String,
    val phone: String,
    val role: String,
    val updatedAt: String
)