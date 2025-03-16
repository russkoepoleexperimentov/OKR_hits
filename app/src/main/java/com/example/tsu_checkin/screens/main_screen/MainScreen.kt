package com.example.tsu_checkin.screens.main_screen

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.createGraph
import androidx.navigation.navArgument
import com.example.tsu_checkin.navigation.Routes
import com.example.tsu_checkin.screens.application_interation_screens.AddingScreen
import com.example.tsu_checkin.screens.application_interation_screens.EditingScreen
import com.example.tsu_checkin.screens.home_screen.HomeScreen
import com.example.tsu_checkin.screens.profile_screen.ProfileScreen
import okhttp3.Route

@Composable
fun MainScreen(){
    val navController = rememberNavController()

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = { BottomNavBar(navController) }
    ) {
        val graph =
            navController.createGraph(startDestination = Routes.Home.route) {
                composable(route = Routes.Home.route) {
                    HomeScreen(navController)
                }
                composable(route = Routes.Profile.route) {
                    ProfileScreen()
                }

                composable(Routes.Add.route)
                {
                    AddingScreen(navController)
                }

                composable(Routes.Edit.route, arguments = listOf(navArgument("id") { type = NavType.StringType }, navArgument("desc") { type = NavType.StringType }))
                {backStackEntry ->
                    val id = backStackEntry.arguments?.getString("id") ?: ""
                    val desc = backStackEntry.arguments?.getString("desc") ?: ""
                    EditingScreen(navController, id, desc)
                }
            }

        NavHost(
            navController = navController,
            graph = graph,
            modifier = Modifier.padding(it)
        )
    }
}