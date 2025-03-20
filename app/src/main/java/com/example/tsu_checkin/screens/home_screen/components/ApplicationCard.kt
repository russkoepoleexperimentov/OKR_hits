package com.example.tsu_checkin.screens.home_screen.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Composable
fun ApplicationCard(
    modifier: Modifier = Modifier,
    startDate:String,
    endDate:String,
    status:String,
    name:String,
    onClick:()->Unit
){
    Row(
        modifier = modifier
            .background(color = Color(0xFF40A9FF), RoundedCornerShape(12.dp))
            .padding(vertical = 24.dp, horizontal = 16.dp)
            .height(80.dp)
            .clickable{
                onClick()
            },
        verticalAlignment = Alignment.CenterVertically
    ) {
        Column(
            modifier = Modifier.fillMaxHeight().fillMaxWidth(0.5f),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = startDate
            )
            Text(
                text = endDate
            )
        }

        Column(
            modifier = Modifier.fillMaxHeight().fillMaxWidth(0.5f),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = status
            )
            Text(
                text = name
            )
        }
    }

}
