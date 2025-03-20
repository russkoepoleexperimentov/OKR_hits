package com.example.tsu_checkin.search_screen

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.tsu_checkin.search_screen.components.UserItem

@Composable
fun SearchScreen() {
    Box {
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            items(20){
                UserItem("test")
            }
        }
    }
}

@Preview
@Composable
fun dasdsa(){
    SearchScreen()
}