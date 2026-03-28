"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TechnicalContextType {
    isTechnical: boolean;
    toggleTechnical: () => void;
}

const TechnicalContext = createContext<TechnicalContextType>({
    isTechnical: false,
    toggleTechnical: () => { },
});

export function TechnicalProvider({ children }: { children: ReactNode }) {
    const [isTechnical, setIsTechnical] = useState(false);

    const toggleTechnical = () => setIsTechnical((prev) => !prev);

    return (
        <TechnicalContext.Provider value={{ isTechnical, toggleTechnical }}>
            {children}
        </TechnicalContext.Provider>
    );
}

export const useTechnical = () => useContext(TechnicalContext);
