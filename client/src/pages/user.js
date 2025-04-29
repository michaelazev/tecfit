import React, { useEffect, useState } from "react";
import "./user.css";
import backgroundImage from "../assets/background.jpg"; // Caminho relativo para a imagem

function User() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

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
                    <p className="roleName">Bombado</p>
                </div>
                <div className="right-container">
                    <h3 className="gradienttext">Seu Perfil</h3>
                    <table>
                        <tr>
                            <td>Nome:</td>
                            <td>{userData.username || "N/A"}</td>
                        </tr>
                        <tr>    
                            <td>Email:</td>
                            <td>{userData.email || "N/A"}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default User;