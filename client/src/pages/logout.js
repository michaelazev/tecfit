import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Henrique
function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token"); // Remove o token de autenticação
        navigate("/"); // Redireciona para o home
    }, [navigate]);

    return null;
}

export default Logout;