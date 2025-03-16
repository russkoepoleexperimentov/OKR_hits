package com.example.tsu_checkin.screens.profile_screen.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Composable
fun InfoLabel(
    content:@Composable (BoxScope.() -> Unit)
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .shadow(8.dp, RoundedCornerShape(12.dp))
            .background(color = Color.White, shape = RoundedCornerShape(12.dp)),
        contentAlignment = Alignment.CenterStart,
    ){
        content()
    }
}

@Preview
@Composable
fun preview(){
    InfoLabel(
        content = {Text(
            text = "dsadsasddas",
            modifier = Modifier
                .padding(vertical = 12.dp, horizontal = 8.dp),
        )}
    )
}