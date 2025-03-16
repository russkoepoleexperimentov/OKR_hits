package com.example.tsu_checkin.screens.home_screen

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material3.Checkbox
import androidx.compose.material3.DatePicker
import androidx.compose.material3.DatePickerState
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Popup
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import androidx.navigation.navArgument
import com.example.tsu_checkin.R
import com.example.tsu_checkin.navigation.Routes
import com.example.tsu_checkin.screens.home_screen.components.ApplicationCard
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    navController: NavController
) {
    var filterVisibility by remember { mutableStateOf(false) }
    var checked by remember { mutableStateOf(false) }

    val viewModel = hiltViewModel<HomeScreenViewModel>()
    val state = viewModel.applications.collectAsState()

    val startDatePickerState = rememberDatePickerState()
    val endDatePickerState = rememberDatePickerState()

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(color = Color.White)
    ) {

        FloatingActionButton(
            modifier = Modifier
                .padding(horizontal = 32.dp, vertical = 32.dp)
                .size(48.dp)
                .align(Alignment.TopEnd),
            onClick = {
                filterVisibility = !filterVisibility
            },
            containerColor = Color.White
        ) {
            Icon(
                imageVector = ImageVector.vectorResource(R.drawable.ic_filter),
                contentDescription = null,
                tint = Color(0xFF1890FF),
                modifier = Modifier.size(32.dp)
            )
        }

        AnimatedVisibility(visible = filterVisibility) {
            Column(
                modifier = Modifier.background(Color.White),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                DatePickerDocked(
                    "Дата начала",
                    startDatePickerState
                )

                DatePickerDocked(
                    "Дата окончания",
                    endDatePickerState
                )

                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(text = "Показать записи на проверке", fontSize = 16.sp)
                    Checkbox(checked = checked, onCheckedChange = { checked = !checked })
                }

                TextButton(
                    onClick = {
                        viewModel.getApplication(
                            startDatePickerState.selectedDateMillis?.let { convertMillisToDate(it) }
                                ?: "",
                            endDatePickerState.selectedDateMillis?.let { convertMillisToDate(it) }
                                ?: "",
                            checked
                        )
                    }
                ) {
                    Text("Применить")
                }
            }
        }

        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 24.dp, end = 24.dp, top = 100.dp, bottom = 32.dp)
        ) {
            item {
                IconButton(
                    modifier = Modifier
                        .height(80.dp)
                        .fillMaxWidth()
                        .background(color = Color.Transparent, shape = RoundedCornerShape(12.dp))
                        .drawBehind {
                            drawRoundRect(
                                color = Color(0xFF40A9FF),
                                style = Stroke(
                                    width = 4f,
                                    pathEffect = PathEffect.dashPathEffect(
                                        floatArrayOf(10f, 10f),
                                        0f
                                    ),
                                ),
                            )
                        },
                    onClick = {
                        navController.navigate(Routes.Add.route)
                    }
                ) {
                    Icon(
                        imageVector = ImageVector.vectorResource(R.drawable.ic_add),
                        contentDescription = null,
                        tint = Color(0xFF1890FF)
                    )
                }
            }

            items(state.value?.size ?: 0) {
                ApplicationCard(
                    modifier = Modifier.fillMaxWidth(),
                    startDate = state.value?.get(it)?.startDate ?: "",
                    endDate = state.value?.get(it)?.endDate ?: "",
                    status = state.value?.get(it)?.status ?: "",
                    onClick = {
                        navController.navigate(
                            "edit" + "/" + state.value?.get(it)?.id + "/" + state.value?.get(it)?.description
                        )
                    }
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DatePickerDocked(
    label: String,
    state: DatePickerState,
    defaultDate: String = ""
) {
    var showDatePicker by remember { mutableStateOf(false) }

    val selectedDate = state.selectedDateMillis?.let { convertMillisToDate(it) } ?: defaultDate

    Box(modifier = Modifier.fillMaxWidth()) {
        OutlinedTextField(
            value = selectedDate,
            onValueChange = { },
            label = { Text(label) },
            readOnly = true,
            trailingIcon = {
                IconButton(onClick = { showDatePicker = true }) {
                    Icon(
                        imageVector = Icons.Default.DateRange,
                        contentDescription = "Выберите дату"
                    )
                }
            },
            modifier = Modifier
                .fillMaxWidth()
                .height(64.dp)
        )

        if (showDatePicker) {
            Popup(
                onDismissRequest = { showDatePicker = false },
                alignment = Alignment.TopStart
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .offset(y = 64.dp)
                        .shadow(elevation = 4.dp)
                        .background(MaterialTheme.colorScheme.surface)
                        .padding(16.dp)
                ) {
                    DatePicker(
                        state = state,
                        showModeToggle = false
                    )
                }
            }
        }
    }

    LaunchedEffect(state.selectedDateMillis) {
        if (state.selectedDateMillis != null) {
            showDatePicker = false
        }
    }
}

fun convertMillisToDate(millis: Long): String {
    val formatter = SimpleDateFormat("yyyy-mm-dd", Locale.getDefault())
    return formatter.format(Date(millis))
}
