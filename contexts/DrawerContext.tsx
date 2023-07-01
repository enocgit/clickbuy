"use client"

import { createContext, useState } from "react"

export const DrawerContext = createContext({})


export const DrawerProvider = ({children}: {children: React.ReactNode}) => {
    const [isShowing, setIsShowing] = useState<boolean>(false)

    const handleMenuClick = () => {
        setIsShowing(true)
        document.body.style.overflow = "hidden"
    }
    const handleCancelClick = () => {
        setIsShowing(false)
        document.body.style.overflow = "initial"
    }

    return (
        <DrawerContext.Provider value={{ isShowing, handleMenuClick, handleCancelClick}}>
            {children}
        </DrawerContext.Provider>
    )
}