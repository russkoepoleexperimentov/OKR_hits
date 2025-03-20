package com.example.tsu_checkin.screens.application_interation_screens

import android.content.ContentResolver
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.ImageDecoder
import android.net.Uri
import android.os.Build
import android.provider.MediaStore
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathEffect
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
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
import java.io.File


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddingScreen(
    navController: NavController
){
    val context = LocalContext.current

    val startDatePickerState = rememberDatePickerState()
    val endDatePickerState = rememberDatePickerState()

    var description by remember { mutableStateOf(TextFieldValue("")) }

    val viewModel = hiltViewModel<ApplicationViewModel>()

    var selectedFiles by remember { mutableStateOf<List<Uri>>(emptyList()) }

    val filePickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetMultipleContents()
    ) { uris: List<Uri> ->
        selectedFiles = uris
    }

    Box(modifier = Modifier
        .fillMaxSize()
        .background(Color.White)){
        BackFab {
            navController.navigate(Routes.Home.route)
        }

        Column(
            verticalArrangement = Arrangement.Center,
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 24.dp)
        ){
            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(16.dp),
                modifier = Modifier
                    .padding(start = 24.dp, end = 24.dp, top = 86.dp)
                    .fillMaxSize()
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
                        startDatePickerState
                    )
                }

                item {
                    DatePickerDocked(
                        "Дата окончания",
                        endDatePickerState
                    )
                }

                itemsIndexed(selectedFiles, key = { _, uri -> uri.toString() }) { index, uri ->
                    val stream = context.contentResolver.openInputStream(uri)
                    val byteArray: ByteArray? = stream?.let { it1 -> getBytes(it1) }
                    val bitmap =
                        byteArray?.let { it1 -> BitmapFactory.decodeByteArray(byteArray, 0, it1.size).asImageBitmap() }


                    if (bitmap != null) {
                        Image(
                            bitmap = bitmap,
                            contentDescription = null
                        )
                    }
                }

                item {
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
                                        pathEffect = PathEffect.dashPathEffect(floatArrayOf(10f, 10f), 0f),
                                    ),
                                )
                            },
                        onClick = {
                            filePickerLauncher.launch("image/*")
                        }
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
                }

                item{
                    StyledButton(
                        text = "Отправить",
                        containerColor = Color(0xFF1890FF),
                        modifier = Modifier
                            .fillMaxWidth()
                            .align(Alignment.End),
                        onClick = {
                            viewModel.addApplication(
                                description.text,
                                startDatePickerState.selectedDateMillis?.let { convertMillisToDate(it) } ?: "",
                                endDatePickerState.selectedDateMillis?.let { convertMillisToDate(it) } ?: "",
                                uris = selectedFiles.map { it.toFile(context) }
                            )
                            navController.navigate(Routes.Home.route)
                        }
                    )
                }
            }
        }
    }
}

fun Uri.toFile(context: Context): File? {
    val inputStream = context.contentResolver.openInputStream(this) ?: return null
    val tempFile = File.createTempFile("upload", null, context.cacheDir)
    tempFile.outputStream().use { outputStream ->
        inputStream.copyTo(outputStream)
    }
    return tempFile
}

fun uriToBitmap(context: Context, uri: Uri): Bitmap? {
    var bitmap: Bitmap? = null
    val contentResolver: ContentResolver = context.contentResolver
    try {
        val source = ImageDecoder.createSource(contentResolver, uri)
        return ImageDecoder.decodeBitmap(source)
    } catch (e: Exception) {
        e.printStackTrace()
        return null
    }
}