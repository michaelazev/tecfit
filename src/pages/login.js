import "./login.css";
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate

function Login() {
    const cardRef = useRef(null);
    const loginButtonRef = useRef(null);
    const cadastroButtonRef = useRef(null);
    const navigate = useNavigate(); // Inicializa o hook useNavigate

    useEffect(() => {
        const card = cardRef.current;
        const loginButton = loginButtonRef.current;
        const cadastroButton = cadastroButtonRef.current;

        loginButton.onclick = () => {
            card.classList.remove("cadastroActive");
            card.classList.add("loginActive");
        }

        cadastroButton.onclick = () => {
            card.classList.remove("loginActive");
            card.classList.add("cadastroActive");
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário
        // Aqui você pode adicionar lógica de autenticação, se necessário
        navigate('/user'); // Redireciona para a página do usuário
    };

    return (
        <section className="conteinerPai">
            <div className="card loginActive" ref={cardRef}>
                <div className="esquerda">
                    <div className="formLogin">
                        <h2>Fazer Login</h2>
                        <form>
                            <input type="email" placeholder="E-mail" />
                            <input type="password" placeholder="Senha" />
                            <button type="submit" onClick={handleLogin}>Entrar</button>
                        </form>
                    </div>
                    <div className="facaLogin">
                        <h2>Já tem <br />uma conta?</h2>
                        <p>Lorem Ipsum has been the industry´s standard dummy tex
                        ever since the 1500s</p>
                        <button className="loginButton" ref={loginButtonRef}>Faça Login</button>
                    </div>
                </div>
                <div className="direita">
                    <div className="formCadastro">
                        <h2>Cadastro</h2>
                        <form>
                            <input type="text" placeholder="Nome" />
                            <input type="email" placeholder="E-mail" />
                            <input type="password" placeholder="Senha" />
                            <input type="password" placeholder="Confirme a sua senha" />
                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                    <div className="facaCadastro">
                        <h2>Não tem <br />uma conta?</h2>
                        <p>Lorem Ipsum has been the industry´s standard dummy tex</p>
                        <button className="cadastroButton" ref={cadastroButtonRef}>Cadastra-se</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;