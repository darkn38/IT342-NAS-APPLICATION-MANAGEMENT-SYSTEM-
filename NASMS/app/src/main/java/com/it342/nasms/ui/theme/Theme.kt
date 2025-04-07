package com.it342.nasms.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

// Define a light color scheme using your palette
private val LightColorScheme = lightColorScheme(
    primary = Color(0xFFBC363C),      // Sanguine Brown
    onPrimary = Color.White,
    secondary = Color(0xFFB8949C),    // Thatch
    onSecondary = Color.Black,
    background = Color(0xFF170F04),   // Acadia
    onBackground = Color.White,
    surface = Color(0xFFF1D88A),      // Buff
    onSurface = Color.Black
)

@Composable
fun NASMSTheme(
    useDarkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    // For now, we'll always use the LightColorScheme.
    MaterialTheme(
        colorScheme = LightColorScheme,
        content = content
    )
}
