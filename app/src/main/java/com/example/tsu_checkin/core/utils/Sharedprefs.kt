package com.example.tsu_checkin.core.utils

import android.content.Context

const val PREFS_TOKEN = "tsu_token"
const val TOKEN_KEY = "token"

fun putInSharedPrefs(context: Context, value: String){
    val pref = context.getSharedPreferences(PREFS_TOKEN, Context.MODE_PRIVATE).edit()
    pref.putString(TOKEN_KEY, value)
    pref.apply()
}

fun getFromSharedPrefs(context: Context):String?{
    val pref = context.getSharedPreferences(PREFS_TOKEN, Context.MODE_PRIVATE)
    return pref.getString(TOKEN_KEY,"")
}

fun deleteInSharedPrefs(context: Context){
    val pref = context.getSharedPreferences(PREFS_TOKEN, Context.MODE_PRIVATE).edit()
    pref.putString(TOKEN_KEY, null)
    pref.apply()
}