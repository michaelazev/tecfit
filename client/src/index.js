import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import LoginPage from './pages/login';
import Sobrepage from './pages/sobre';
import UserPage from './pages/user';
import Favorites from './pages/favorite';
import NewGym from './pages/new_gym';
import Logout from './pages/logout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./pages/Contextfavo";

//importação do React Router para navegação entre páginas (BrowserRouter, Routes, Route) - Michael, Henrique, Emilio
//importação do Context API para gerenciar o estado global de favoritos (FavoritesProvider) - Emilio

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sobre" element={<Sobrepage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/new_gym" element={<NewGym />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </FavoritesProvider>
  </BrowserRouter>
);

