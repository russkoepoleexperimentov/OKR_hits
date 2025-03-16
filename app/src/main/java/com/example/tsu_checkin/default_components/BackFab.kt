package com.example.tsu_checkin.default_components

import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.unit.dp
import com.example.tsu_checkin.R

@Composable
fun BackFab(
    onClick:()->Unit
){
    FloatingActionButton(
        modifier = Modifier
            .padding(horizontal = 32.dp, vertical = 32.dp)
            .size(40.dp),
        onClick = onClick,
        containerColor = Color.White
    ) {
        Icon(
            imageVector = ImageVector.vectorResource(R.drawable.ic_back),
            contentDescription = null,
            tint = Color(0xFF1890FF)
        )
    }
}