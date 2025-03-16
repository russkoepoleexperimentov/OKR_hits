package com.example.tsu_checkin.screens.main_screen

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.Home
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemColors
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.graphics.Color
import androidx.navigation.NavController
import com.example.tsu_checkin.navigation.NavItem
import com.example.tsu_checkin.navigation.Routes

@Composable
fun BottomNavBar(
    navController: NavController
){
    val selectedNavigationIndex = rememberSaveable {
        mutableIntStateOf(0)
    }

    NavigationBar(
        containerColor = Color.White
    ) {
        navItems.forEachIndexed { index, item ->
            NavigationBarItem(
                alwaysShowLabel = true,
                selected = selectedNavigationIndex.intValue == index,
                onClick = {
                    selectedNavigationIndex.intValue = index
                    navController.navigate(item.route)
                },
                icon = {
                    Icon(imageVector = item.icon, contentDescription = null)
                },
                label = {
                    Text(
                        text = item.title
                    )
                },
                colors = NavigationBarItemColors(
                    selectedIconColor = Color.Black,
                    selectedTextColor = Color.Black,
                    selectedIndicatorColor = Color(0xFF1890FF),
                    unselectedIconColor = Color.Gray,
                    unselectedTextColor = Color.Gray,
                    disabledIconColor = Color.Black,
                    disabledTextColor = Color.Black,
                ),
            )
        }
    }
}

private val navItems = listOf<NavItem>(
    NavItem(
        title = "Главная",
        icon = Icons.Default.Home,
        route = Routes.Home.route
    ),
    NavItem(
        title = "Профиль",
        icon = Icons.Default.AccountCircle,
        route = Routes.Profile.route
    )
)