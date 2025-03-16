package com.example.tsu_checkin.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.tsu_checkin.screens.auth_screens.SignInScreen
import com.example.tsu_checkin.screens.auth_screens.SignUpScreen
import com.example.tsu_checkin.screens.main_screen.MainScreen
import com.example.tsu_checkin.screens.welcome_screen.WelcomeScreen

@Composable
fun AuthNavigation(){
    val navController = rememberNavController()

    NavHost(navController, startDestination = Routes.Welcome.route){
        composable(Routes.Welcome.route){
            WelcomeScreen(navController)
        }

        composable(Routes.SignIn.route){
            SignInScreen(navController)
        }

        composable(Routes.SignUp.route){
            SignUpScreen(navController)
        }

        composable(Routes.Main.route) {
            MainScreen()
        }
    }
}