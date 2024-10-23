import React from 'react'
import { useEffect, useState } from 'react'
import {ThemeProvider} from './contexts/ThemeContext.js'
import App from './App.jsx'


function Theme() {
    const [themeMode, setThemeMode] = useState("light")

    const lightTheme = () => {
        setThemeMode("light")
    }

    const darkTheme = () => {
        setThemeMode("dark")
    }


    useEffect(() => {
        document.querySelector('html').classList.remove("light", "dark")
        document.querySelector('html').classList.add(themeMode)
    }, [themeMode])


    return (
        <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
            <App />
        </ThemeProvider>
    )
}

export default Theme