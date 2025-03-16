package com.example.tsu_checkin.navigation

sealed class Routes(val route:String) {
    object Welcome:Routes("welcome")
    object SignIn:Routes("signin")
    object SignUp:Routes("signup")
    object Home:Routes("home")
    object Main:Routes("main")
    object Profile:Routes("profile")
    object Add:Routes("add")
    object Edit:Routes("edit/{id}/{desc}")
}