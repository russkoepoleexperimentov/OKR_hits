package com.example.tsu_checkin.search_screen.components

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.tsu_checkin.R

@Composable
fun UserItem(
    name:String
){

    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Image(
            painterResource(R.drawable.ic_pfp),
            contentDescription = null,
            modifier = Modifier.padding(end = 24.dp).size(48.dp)
        )
        Text(
            text = name,
            fontSize = 18.sp,
            color = Color.Black
        )
    }
}

@Preview
@Composable
fun qewqeqwewq(){
    UserItem("Чел")
}