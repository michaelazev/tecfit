import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import LoginPage from './pages/login';
import Sobrepage from './pages/sobre';
import UserPage from './pages/user';
import Favorites from './pages/favorite';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./pages/Contextfavo";

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
      </Routes>
    </FavoritesProvider>
  </BrowserRouter>
);

