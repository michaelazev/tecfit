import "./user.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaShareAlt, FaEdit, FaTrash } from "react-icons/fa";

// Popup de edição de academia
function EditGymPopup({ academia, onClose, onSave }) {
    const [form, setForm] = useState({
        name: academia.name || "",
        address: academia.address || "",
        open_time: academia.open_time || "",
        email_address: academia.email_address || "",
        phone: academia.phone || ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id"); // Adicionado
    try {
        const response = await fetch(`https://tecfit-back.vercel.app/api/data/gym/${academia.gym_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...form,
                user_responsible: userId // Incluído no corpo da requisição
            })
        });
        if (response.ok) {
            alert("Academia atualizada!");
            const updated = await response.json();
            onSave(updated);
            onClose();
        } else {
            alert("Erro ao atualizar academia.");
        }
    } catch (error) {
        alert("Erro ao conectar com o servidor.");
    }
};

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>Editar Academia</h2>
                <form onSubmit={handleSubmit} className="edit-gym-form">
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
                    <button type="submit">Salvar</button>
                </form>
            </div>
            <style>{`
                .popup-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .popup-content {
                    background: #918e8e;
                    padding: 32px 24px 24px 24px;
                    border-radius: 8px;
                    min-width: 320px;
                    position: relative;
                }
                .close-btn {
                    position: absolute;
                    top: -1rem;
                    left: 16rem;
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                }
                .edit-gym-form div {
                    margin-bottom: 12px;
                }
                .edit-gym-form label {
                    color: #fff;
                    display: block;
                    margin-bottom: 4px;
                }
                .edit-gym-form input {
                    color: #000000;
                    width: 100%;
                    padding: 6px 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .edit-gym-form button[type="submit"] {
                    margin-top: 8px;
                    padding: 8px 16px;
                    background: #2ecc71;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}

function User() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [academias, setAcademias] = useState([]);
    const [editAcademia, setEditAcademia] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        const nomeSalvo = localStorage.getItem("nome");
        if (nomeSalvo) setNome(nomeSalvo);

        fetch("https://tecfit-back.vercel.app/api/data/gym")
            .then((res) => res.json())
            .then((data) => setAcademias(data))
            .catch(() => setAcademias([]));
    }, [navigate]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.classList.toggle("open");
    };

    const handleAddGym = () => {
        navigate("/new_gym");
    };

    const handleEditGym = (academia) => {
        setEditAcademia(academia);
    };

    const handleSaveEdit = (updatedAcademia) => {
        setAcademias(academias.map(a => a.gym_id === updatedAcademia.gym_id ? updatedAcademia : a));
    };

    return (
        <div className="app">
            <div className="barra-menu">
                <div className="logo">
                    <img src="/img/tec_fit-removebg-preview.png" width="120" alt="Tec Fit Logo" />
                </div>
            </div>

            <button className="Tec" onClick={toggleMenu}>
                <span className="Tec-icon"></span>
            </button>

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
                        <span><b>{academias.length}</b> Projetos</span>
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
                        {academias.map((academia, idx) => (
                            <div className="project-card" key={idx}>
                                <img src={academia.imagem || "/img/acad3.jpg"} alt={academia.name} />
                                <div className="project-info">
                                    <span>{academia.name}</span>
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "2px",
                                            height: "100%",
                                        }}
                                    >
                                        <FaEdit
                                            style={{ marginUp: "0px", verticalAlign: "middle", cursor: "pointer" }}
                                            title="Editar academia"
                                            onClick={() => handleEditGym(academia)}
                                        />
                                        <FaTrash
                                            style={{
                                                cursor: "pointer",
                                                color: "#e74c3c",
                                                marginLeft: "4px",
                                                verticalAlign: "middle"
                                            }}
                                            title="Deletar academia"
                                            onClick={async () => {
                                                try {
                                                    await fetch(`https://tecfit-back.vercel.app/api/data/gym/${academia.gym_id}`, {
                                                        method: "DELETE",
                                                    });
                                                    setAcademias(academias.filter((a) => a.gym_id !== academia.gym_id));
                                                    alert("Academia deletada com sucesso!");
                                                } catch (err) {
                                                    alert("Erro ao deletar academia.");
                                                }
                                            }}
                                        />
                                    </span>
                                </div>
                            </div>
                        ))}
                        <button className="add-project" onClick={handleAddGym}>
                            + Add Academia
                        </button>
                    </div>
                </div>
            </div>
            {editAcademia && (
                <EditGymPopup
                    academia={editAcademia}
                    onClose={() => setEditAcademia(null)}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
}

export default User;