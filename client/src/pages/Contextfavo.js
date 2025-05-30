import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorite, setFavorite] = useState([]);

    // Função para adicionar ou remover unidades dos favoritos (Emilio)
function addFavorite(unit) {
    setFavorite((prev) => {
        const alreadyFavorite = prev.some((fav) => fav.id === unit.id);
        if (alreadyFavorite) {
        // Remove dos favoritos
        return prev.filter((fav) => fav.id !== unit.id);
    } else {
        // Adiciona aos favoritos
        return [...prev, unit];
    }
    });
}

// Contexto que será utilizado para fornecer o estado de favoritos (Emilio)
return (
    <FavoritesContext.Provider value={{ favorite, addFavorite }}>
        {children}
    </FavoritesContext.Provider>
);
}

export function useFavoriteContext() {
    return useContext(FavoritesContext);
}