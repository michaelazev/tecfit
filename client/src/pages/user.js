import "./user.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaShareAlt, FaRegBookmark } from "react-icons/fa";

function User() {
    // Estado para controlar a abertura do menu
    const [menuOpen, setMenuOpen] = useState(false);
    const [nome, setNome] = useState(""); // Novo estado para o nome
    const navigate = useNavigate();

    // Verifica autenticação ao montar o componente
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        const nomeSalvo = localStorage.getItem("nome");
        if (nomeSalvo) setNome(nomeSalvo);
    }, [navigate]);

    // Função para alternar o estado do menu (aberto/fechado)
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
                    <a href="/favorite" style={{ animationDelay: "0.4s" }}>
                        <h6>Favorito</h6>
                    </a>
                    <a href="/contato" style={{ animationDelay: "0.6s" }}>
                        <h6>Contato</h6>
                    </a>
                    <a href="/logout" style={{ animationDelay: "0.8s" }}>
                        <h6>Sair</h6>
                    </a>
                </nav>
            </div>

            <div className="profile-page">
                <div className="profile-sidebar">
                    <img
                        className="profile-pic"
                        src="/img/renato.cariani.jpg"
                        alt="Profile"
                    />
                    <div className="profile-header">
                        <h3>{nome || "Usuário"}</h3>
                    </div>
                    <div className="stats">
                        <span><b>2</b> Projetos</span>
                        <span><b>6k</b> Views</span>
                        <span><b>9</b> Pastas</span>
                    </div>
                    <button className="share-link">
                        <FaShareAlt /> Compartilhar link do perfil
                    </button>
                    <button className="follow-button">Seguir</button>

                    <div className="section">
                        <h3>Sobre</h3>
                    </div>
                    <div className="sobre-texto">
                        <p>
                            Venha conhecer a nossa academia!
                        </p>
                    </div>

                    <div className="section">
                        <h3>Experiencias</h3>
                        <div className="tags">
                            <span className="tag musculacao">Musculação</span>
                            <span className="tag danca">Prof Dança</span>
                            <span className="tag instrutor">Instrutor</span>
                            <span className="tag professor">Professor</span>
                        </div>
                    </div>

                    <div className="section">
                        <h3>Área</h3>
                        <span className="tag area">Personal Trainer</span>
                    </div>

                    <button className="contact-button">Contate-me</button>
                    <div className="socials">
                        <FaInstagram />
                        <FaLinkedin />
                    </div>
                </div>

                <div className="profile-main">
                    <h3>
                        <span className="active">ADICIONE SUA ACADEMIA AQUI</span>
                    </h3>
                    <div className="project-gallery">
                        <div className="project-card">
                            <img src="/img/acad3.jpg" alt="Projeto 1" />
                            <div className="project-info">
                                <span>Selfit</span>
                                <FaRegBookmark />
                            </div>
                        </div>
                        <div className="project-card">
                            <img src="/img/acad4.jpg" alt="Projeto 3" />
                            <div className="project-info">
                                <span>Smart Fit</span>
                                <FaRegBookmark />
                            </div>
                        </div>
                        <button className="add-project">
                            + Add Academia
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;