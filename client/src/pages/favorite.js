import styles from "./Favorites.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Favorite() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (!storedUser || !token) {
            navigate('/login');
            return;
        }
    }, [navigate]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.classList.toggle("open");
    };

    return (
        <div className="app">
            {/* Barra de topo com o logotipo */}
            <div className="barra-menu">
                <div className="logo">
                    <img src="/img/tec_fit-removebg-preview.png" width="120" alt="Tec Fit Logo" />
                </div>
            </div>

            {/* Botão para abrir/fechar o menu */}
            <button className="Tec" onClick={toggleMenu}>
                <span className="Tec-icon"></span>
            </button>

            {/* Menu lateral com links de navegação */}
            <div className={`menu ${menuOpen ? "active" : ""}`}>
                <nav>
                    <a href="/" style={{ animationDelay: "0.2s" }}>
                        <h6>Inicio</h6>
                    </a>
                    <a href="/sobre" style={{ animationDelay: "0.4s" }}>
                        <h6>Sobre</h6>
                    </a>
                    <a href="/contato" style={{ animationDelay: "0.6s" }}>
                        <h6>Usuário</h6>
                    </a>
                </nav>
            </div>

            {/* Seção "Favoritos" */}
            <div className={styles.favoritos}>
                <h2>Favoritos</h2>
                <h3>Lista de Favoritos</h3>
            </div>
        </div>
    );
}

export default Favorite;