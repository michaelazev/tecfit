import "./login.css";
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const cardRef = useRef(null);
    const loginButtonRef = useRef(null);
    const cadastroButtonRef = useRef(null);

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [cadastroErrorMessage, setCadastroErrorMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/user");
        }
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (senha !== confirmarSenha) {
            setCadastroErrorMessage("As senhas não coincidem!");
            return;
        }

        const usuario = {
            username: nome,
            email: email,
            password: senha
        };

        fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao registrar usuário');
                }
                return response.json();
            })
            .then((data) => {
                setNome('');
                setEmail('');
                setSenha('');
                setConfirmarSenha('');
                setCadastroErrorMessage("");
                setIsOpen(true);

                localStorage.setItem('user', JSON.stringify({
                    username: usuario.username,
                    email: usuario.email
                }));

                localStorage.setItem('nome', usuario.username);

                console.log('Cadastro realizado com sucesso:', data);
            })
            .catch((error) => {
                console.error('Erro ao registrar usuário:', error);
            });
    };

    useEffect(() => {
        const card = cardRef.current;
        const loginButton = loginButtonRef.current;
        const cadastroButton = cadastroButtonRef.current;

        loginButton.onclick = () => {
            card.classList.remove("cadastroActive");
            card.classList.add("loginActive");
        };

        cadastroButton.onclick = () => {
            card.classList.remove("loginActive");
            card.classList.add("cadastroActive");
        };
    }, []);

    // Função para buscar o user_id após login, caso não venha no retorno do login
    const fetchUserId = (email, token) => {
    fetch(`https://tecfit-back.vercel.app/api/data/users`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(userData => {
        let user = userData;
        // Se vier um array, procura pelo e-mail
        if (Array.isArray(userData)) {
            user = userData.find(u => u.Email === email);
        }
        if (user && (user.UserId || user._id)) {
            localStorage.setItem('user_id', user.UserId || user._id);
        }
        if (user && (user.Username || user.username)) {
            localStorage.setItem('nome', user.Username || user.username);
        }
        navigate('/user');
    })
    .catch(err => {
        console.error('Erro ao buscar UserId:', err);
        navigate('/user');
    });
};

    const handleLogin = (e) => {
        e.preventDefault();
        const usuario = {
            email: email,
            password: senha
        };

        fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then((response) => {
                if (!response.ok) {
                    setErrorMessage("Credenciais inválidas!");
                    throw new Error('Erro ao fazer login');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Login realizado com sucesso:', data);
                setErrorMessage("");

                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);

                // Salva o id do usuário no localStorage para uso futuro
                if (data.user && (data.user.UserId || data.user._id)) {
                    localStorage.setItem('user_id', data.user.UserId || data.user._id);
                    if (data.user.username) {
                        localStorage.setItem('nome', data.user.username);
                    }
                    navigate('/user');
                } else {
                    // Se não vier o id, busca pelo e-mail
                    fetchUserId(email, data.token);
                }
            })
            .catch((error) => {
                console.error('Erro ao fazer login:', error);
            });
    };

    return (
        <section className="conteinerPai">
            <div className="card loginActive" ref={cardRef}>
                <div className="esquerda">
                    <div className="formLogin">
                        <h2>Fazer Login</h2>
                        <form>
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <button type="submit" onClick={handleLogin}>Entrar</button>
                            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
                        </form>
                    </div>
                    <div className="facaLogin">
                        <h2>Já tem <br />uma conta?</h2>
                        <p>Faça o Login!</p>
                        <button className="loginButton" ref={loginButtonRef}>Faça Login</button>
                    </div>
                </div>
                <div className="direita">
                    <div className="formCadastro">
                        <h2>Cadastro</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirme a sua senha"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                            />
                            <button type="submit">Cadastrar</button>
                            {cadastroErrorMessage && (
                                <div className="errorMessage">{cadastroErrorMessage}</div>
                            )}
                            {isOpen && (
                                <div className="registerComplete">
                                    Conta criada com sucesso!
                                </div>
                            )}
                        </form>
                    </div>
                    <div className="facaCadastro">
                        <h2>Não tem <br />uma conta?</h2>
                        <p>Crie agora!</p>
                        <button className="cadastroButton" ref={cadastroButtonRef}>Cadastra-se</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;