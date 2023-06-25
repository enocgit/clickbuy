'use client'

import { useEffect } from 'react'
import { themeChange } from 'theme-change'


const ThemeWrapper = ({children}: {children: React.ReactNode}) => {
    useEffect(() => {
      themeChange(false)
      // 👆 false parameter is required for react project
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}


export default ThemeWrapper