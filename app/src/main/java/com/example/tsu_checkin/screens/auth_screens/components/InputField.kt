package com.example.tsu_checkin.screens.auth_screens.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.unit.dp

@Composable
fun InputField(
    textFieldValue: TextFieldValue,
    onValueChange:(TextFieldValue)->Unit,
    textHint:String
){
    OutlinedTextField(
        value = textFieldValue,
        onValueChange = onValueChange,
        placeholder = { Text(text = textHint) },
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xFFD3D4D7), RoundedCornerShape(12.dp)),
        colors = TextFieldDefaults.colors(
            focusedTextColor = Color.Black,
            unfocusedTextColor = Color.Black,
            cursorColor = Color.Black,
            unfocusedContainerColor = Color.Transparent,
            disabledContainerColor = Color.Transparent
        ),
        )
}