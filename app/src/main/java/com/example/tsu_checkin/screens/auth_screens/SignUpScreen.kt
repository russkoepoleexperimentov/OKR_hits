package com.example.tsu_checkin.screens.auth_screens

import android.widget.EditText
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.tsu_checkin.R
import com.example.tsu_checkin.default_components.BackFab
import com.example.tsu_checkin.default_components.StyledButton
import com.example.tsu_checkin.navigation.Routes
import com.example.tsu_checkin.screens.auth_screens.components.InputField


@Composable
fun SignUpScreen(
    navController: NavController
) {
    val viewModel = hiltViewModel<SignInViewModel>()

    var email by remember { mutableStateOf(TextFieldValue("")) }
    var name by remember { mutableStateOf(TextFieldValue("")) }
    var phone by remember { mutableStateOf(TextFieldValue("")) }
    var password by remember { mutableStateOf(TextFieldValue("")) }

    Column(
        verticalArrangement = Arrangement.SpaceBetween,
        modifier = Modifier
            .fillMaxSize()
            .background(color = Color.White)
            .padding(bottom = 32.dp)
    ) {
        BackFab{
            navController.navigate(Routes.Welcome.route)
        }

        Column(
            modifier = Modifier.fillMaxWidth().padding(horizontal = 24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            InputField(email, { email = it }, "Почта")
            InputField(name, { name = it }, "ФИО")
            InputField(phone, { phone = it }, "Телефон")
            InputField(password, { password = it }, "Пароль")
        }

        StyledButton(
            text = "Зарегистрироваться",
            containerColor = Color(0xFF1890FF),
            onClick = {
                viewModel.reister(email.text,password.text,name.text, phone.text)
                navController.navigate(Routes.Main.route)
            }
        )
    }
}