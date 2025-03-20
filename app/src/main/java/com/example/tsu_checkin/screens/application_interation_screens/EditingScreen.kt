package com.example.tsu_checkin.screens.application_interation_screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.tsu_checkin.R
import com.example.tsu_checkin.default_components.BackFab
import com.example.tsu_checkin.default_components.StyledButton
import com.example.tsu_checkin.navigation.Routes
import com.example.tsu_checkin.screens.home_screen.DatePickerDocked
import com.example.tsu_checkin.screens.home_screen.convertMillisToDate
import com.example.tsu_checkin.screens.profile_screen.components.AttachmentLabel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditingScreen(
    navController: NavController,
    id:String,
    descriptionString:String
){
    val startDatePickerState = rememberDatePickerState()
    val endDatePickerState = rememberDatePickerState()

    val viewModel = hiltViewModel<ApplicationViewModel>()
    viewModel.getApplicationById(id)
    val state by viewModel.application.collectAsState()

    var description by remember { mutableStateOf(TextFieldValue(descriptionString)) }

    Box(modifier = Modifier.fillMaxSize().background(Color.White)){
        BackFab {
            navController.navigate(Routes.Home.route)
        }

        Column(
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.fillMaxSize().padding(horizontal = 24.dp)
        ){
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                item {
                    OutlinedTextField(
                        value = description,
                        onValueChange = {
                            description = it
                        },
                        label = { Text("Описание") },
                        modifier = Modifier
                            .fillMaxWidth()
                    )
                }

                item {
                    DatePickerDocked(
                        "Дата начала",
                        startDatePickerState,
                        state?.startDate?.parseDate() ?: ""
                    )
                }

                item {
                    DatePickerDocked(
                        "Дата окончания",
                        endDatePickerState,
                        state?.endDate?.parseDate() ?: ""
                    )
                }

                    /*items(2){
                    AttachmentLabel("вложение")
                }*/
            }

            IconButton(
                modifier = Modifier
                    .height(200.dp)
                    .padding(vertical = 48.dp)
                    .fillMaxWidth()
                    .background(color = Color.Transparent, shape = RoundedCornerShape(12.dp))
                    .drawBehind {
                        drawRoundRect(
                            color = Color.Black,
                            style = Stroke(
                                width = 4f,
                                pathEffect = PathEffect.dashPathEffect(floatArrayOf(10f,10f), 0f),
                            ),
                        )
                    },
                onClick = {}
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Icon(
                        imageVector = ImageVector.vectorResource(R.drawable.ic_upload),
                        contentDescription = null,
                        tint = Color.Black
                    )
                    Text(
                        text = "Прикрепите файл",
                        textAlign = TextAlign.Center,
                        fontSize = 16.sp
                    )
                }
            }

            Row (
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxWidth().align(Alignment.End)
            ){
                StyledButton(
                    text = "Удалить",
                    containerColor = Color(0xFFFF1818),
                    modifier = Modifier.fillMaxWidth(0.5f),
                    onClick = {
                        viewModel.deleteApplication(
                            id
                        )
                        navController.navigate(Routes.Home.route)
                    }
                )

                StyledButton(
                    text = "Сохранить",
                    containerColor = Color(0xFF1890FF),
                    modifier = Modifier.fillMaxWidth(),
                    onClick = {
                        viewModel.editApplication(
                            id,
                            description.text,
                            startDatePickerState.selectedDateMillis?.let { convertMillisToDate(it) } ?: "",
                            endDatePickerState.selectedDateMillis?.let { convertMillisToDate(it) } ?: ""
                        )
                        navController.navigate(Routes.Home.route)
                    }
                )
            }
        }
    }
}

fun String.parseDate() : String{
    return this.slice(0..9)
}