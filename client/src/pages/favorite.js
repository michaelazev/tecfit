import { useState, useEffect } from "react";
import { useFavoriteContext } from "./Contextfavo";
import { Link, useNavigate } from "react-router-dom";
import styles from "./favorite.module.css";

function Favorite() {
    const { favorite, addFavorite } = useFavoriteContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica se o usuário está autenticado (exemplo usando token no localStorage)
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        document.body.classList.toggle("open");
    };

    const favoriteUnits = favorite;

    return (
        <div className="app">
            <div className="barra-menu">
                <div className="logo">
                    <img
                        src="/img/tec_fit-removebg-preview.png"
                        width="120"
                        alt="Tec Fit Logo"
                    />
                </div>
            </div>
            <button className="Tec" onClick={toggleMenu}>
                <span className="Tec-icon"></span>
            </button>
            <div className={`menu ${menuOpen ? "active" : ""}`}>
                <nav>
                    <Link to="/" style={{ animationDelay: "0.2s" }}>
                        <h6>Inicio</h6>
                    </Link>
                    <Link to="/sobre" style={{ animationDelay: "0.4s" }}>
                        <h6>Sobre</h6>
                    </Link>
                    <Link to="/contato" style={{ animationDelay: "0.6s" }}>
                        <h6>Usuário</h6>
                    </Link>
                    <a href="/logout" style={{ animationDelay: "0.8s" }}>
                        <h6>Sair</h6>
                    </a>
                </nav>
            </div>
            {/* Lista de favoritos */}
            <div className="unit-list">
                <h2 className="title">Favoritos</h2>
                <div className="units">
                    {favoriteUnits.length === 0 && null}
                    {favoriteUnits.map((unit) => {
                        const icone = "/img/unfavorite.png";
                        const plano =
                            unit.id === "smartfit_barueri" ||
                            unit.id === "martfit_uberlandia"
                                ? "Plano Prime"
                                : "Plano Plus";
                        return (
                            <div key={unit.id} className="unit-card">
                                <div className="favori">
                                    <img
                                        src={unit.image}
                                        alt={unit.name}
                                        className="unit-image"
                                    />
                                    <figure className="icon">
                                        <img
                                            src={icone}
                                            alt="unfavorite"
                                            className="favorite1"
                                            onClick={() => addFavorite(unit)}
                                        />
                                    </figure>
                                </div>
                                <div className="unit-header">{unit.name}</div>
                                <div className="unit-body">
                                    <p className="unit-address">📍{unit.address}</p>
                                    <p className="unit-plans">
                                        <span className="bold">Plano Anual</span>{" "}
                                        <span className="prime">{plano}</span>
                                    </p>
                                    <button className="unit-button">{unit.status}</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Favorite;