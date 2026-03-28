"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface ThemeContextType {
    theme: "premium";
    setTheme: (theme: "premium") => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "premium",
    setTheme: () => { },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeContext.Provider value={{ theme: "premium", setTheme: () => { } }}>
            <div className="min-h-screen theme-bg theme-text">
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
