import "./login.css";
import React, { useRef, useEffect } from 'react';

function Login() {
    const cardRef = useRef(null);
    const loginButtonRef = useRef(null);
    const cadastroButtonRef = useRef(null);

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

    return (
        <section class= "conteinerPai">
            <div class="card loginActive">
                <div class="esquerda">
                    <div class="formLogin">
                        <h2>Fazer Login</h2>
                    <form>
                        <input type="email" placeholder="E-mail" />
                        <input type="password" placeholder="Senha" />
                        <button type ="submit">Entrar</button>
                    </form>
                    </div>
                    <div class="facaLogin">
                        <h2>Já tem <br />uma conta?</h2>
                        <p>Lorem Ipsum has been the industry´s standard dummy tex
                        ever since the 1500s</p>
                        <button class="loginButton">Faça Login</button>
                    </div>
                </div>
                <div class="direita">
                    <div class="formCadastro">
                        <h2>Cadastro</h2>
                        <form>
                            <input type="text" placeholder="Nome" />
                            <input type="email" placeholder="E-mail" />
                            <input type="password" placeholder="Senha" />
                            <input type="password" placeholder="Confirme a sua senha" />
                            <button type="submit">Cadastrar</button>
                        </form>
                    </div>
                    <div class="facaCadastro">
                        <h2>Não tem <br />uma conta?</h2>
                        <p>Lorem Ipsum has been the industry´s standard dummy tex</p>
                        <button class="cadastroButton">Cadastra-se</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;