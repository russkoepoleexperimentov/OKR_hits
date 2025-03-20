package com.example.tsu_checkin.screens.profile_screen

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.painter.Painter
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.tsu_checkin.R
import com.example.tsu_checkin.default_components.StyledButton
import com.example.tsu_checkin.screens.auth_screens.components.InputField
import com.example.tsu_checkin.screens.profile_screen.components.InfoLabel

@Composable
fun ProfileScreen(){
    val viewModel: ProfileViewModel = hiltViewModel()
    val profileState by viewModel.profile.collectAsState()

    var email by remember{ mutableStateOf(TextFieldValue(profileState?.email ?: "")) }
    var phone by remember{ mutableStateOf(TextFieldValue(profileState?.phone ?: "")) }

    LaunchedEffect(profileState) {
        profileState?.let {
            email = TextFieldValue(profileState?.email ?: "")
            phone = TextFieldValue(profileState?.phone ?: "")
        }
    }

    Box(
        modifier = Modifier.fillMaxSize().background(Color.White)
    ){
        Column(
            modifier = Modifier.fillMaxSize().padding(top = 64.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Image(
                painterResource(R.drawable.ic_pfp),
                contentDescription = null,
                modifier = Modifier.size(96.dp)
            )

            Text(
                text = profileState?.credentials ?: "",
                fontSize = 24.sp
            )
            Spacer(modifier = Modifier.height(16.dp))

            Spacer(modifier = Modifier.height(2.dp).fillMaxWidth().background(color = Color.Black))

            Column(
                modifier = Modifier.fillMaxWidth().padding(horizontal = 32.dp, vertical = 64.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                InfoLabel {
                    Text(
                        text = ((("Группа " + (profileState?.groupId ?: "не назначена")))),
                        modifier = Modifier
                            .padding(vertical = 12.dp, horizontal = 8.dp),
                        fontSize = 16.sp
                    )
                }

                InfoLabel {
                    Text(
                        text = profileState?.role ?: "",
                        modifier = Modifier
                            .padding(vertical = 12.dp, horizontal = 8.dp),
                        fontSize = 16.sp
                    )
                }

                InputField(
                    textFieldValue = email,
                    onValueChange = {
                        email = it
                    },
                    textHint = "Почта"
                )

                InputField(
                    textFieldValue = phone,
                    onValueChange = {
                        phone = it
                    },
                    textHint = "Телефон"
                )

                Spacer(Modifier.weight(1f))

                StyledButton(
                    modifier = Modifier.fillMaxWidth().padding(bottom = 24.dp),
                    containerColor = Color(0xFF1890FF),
                    onClick = {
                        viewModel.editProfile(profileState?.credentials ?: "", email.text, phone.text)
                    },
                    text = "Сохранить"
                )
            }
        }
    }
}

@Preview
@Composable
fun profilePreview(){
    ProfileScreen()
}
