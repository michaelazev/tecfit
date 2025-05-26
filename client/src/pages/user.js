import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./user.css";
import backgroundImage from "../assets/background.jpg"; // Caminho relativo para a imagem

function User() {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (!storedUser || !token) {
            // Se não estiver autenticado, redireciona para login
            navigate('/login');
            return;
        }
        setUserData(JSON.parse(storedUser));
    }, [navigate]);

    return (
        <div
            className="container"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="card1">
                <div className="left-container">
                    <img className="imgProfile" src="https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358__480.jpg" alt="Profile Image" />
                    <h2 className="gradienttext2">{userData.username || "Usuário"}</h2>
                    <p className="roleName">Usuário</p>
                </div>
                <div className="right-container">
                    <h3 className="gradienttext">Seu Perfil</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>Nome:</td>
                                <td>{userData.username || "N/A"}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{userData.email || "N/A"}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="logout-button" onClick={() => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        navigate('/login');
                    }}> Sair </button>
                </div>
            </div>
        </div>
    );
}

export default User;