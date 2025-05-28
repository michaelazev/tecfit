import styles from "./new_gym.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importação adicionada

function New_gym() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); // Hook para navegação

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.classList.toggle("open");
    };

    // Estado do formulário
    const [form, setForm] = useState({
        name: "",
        address: "",
        open_time: "",
        email_address: "",
        phone: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("user_id");
        try {
            const response = await fetch("https://tecfit-back.vercel.app/api/data/gym", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...form,
                    user_responsible: userId
                })
            });
            if (response.ok) {
                alert("Academia adicionada!");
                setForm({
                    name: "",
                    address: "",
                    open_time: "",
                    email_address: "",
                    phone: ""
                });
                navigate("/user"); // Redireciona para /user após sucesso
            } else {
                alert("Erro ao adicionar academia.");
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
        }
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
                    <a href="/user" style={{ animationDelay: "0.6s" }}>
                        <h6>Usuário</h6>
                    </a>
                </nav>
            </div>

            {/* Seção "Adicionar Academia" */}
            <div className={styles.favoritos}>
                <h2>Adicionar Academia</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label>Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Endereço</label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Horário de Funcionamento</label>
                        <input
                            type="text"
                            name="open_time"
                            value={form.open_time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>E-mail</label>
                        <input
                            type="email"
                            name="email_address"
                            value={form.email_address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Telefone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Adicionar</button>
                </form>
            </div>
        </div>
    );
}

export default New_gym;