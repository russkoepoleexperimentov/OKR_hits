package com.example.tsu_checkin.network.dto

data class ApplicationListDtoItem(
    val author: Author,
    val createdAt: String,
    val description: String,
    val endDate: String,
    val id: String,
    val startDate: String,
    val status: String,
    val updatedAt: String
)