package com.example.tsu_checkin.screens.welcome_screen

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.tsu_checkin.default_components.StyledButton
import com.example.tsu_checkin.navigation.Routes
import com.example.tsu_checkin.screens.auth_screens.SignInScreen

@Composable
fun WelcomeScreen(
    navController: NavController
) {
    Column(
        modifier = Modifier
            .background(Color.White)
            .fillMaxSize(),
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 64.dp),
            text = "Доброе утро!",
            textAlign = TextAlign.Center,
            fontSize = 32.sp
        )

        Column(
            verticalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.padding(bottom = 32.dp)
        ) {
            StyledButton(
                text = "Вход в аккаунт",
                containerColor = Color(0xFF1890FF),
                onClick = {
                    navController.navigate(Routes.SignIn.route)
                }
            )

            StyledButton(
                text = "Регистрация",
                containerColor = Color.Black,
                onClick = {
                    navController.navigate(Routes.SignUp.route)
                }
            )
        }
    }
}