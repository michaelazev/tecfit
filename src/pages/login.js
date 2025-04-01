import "./login.css"; // Importa o arquivo de estilos CSS para a página de login
import React, { useRef, useEffect, useState } from 'react'; // Importa hooks do React
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação entre páginas

function Login() {
    // Referências para manipular elementos DOM
    const cardRef = useRef(null);
    const loginButtonRef = useRef(null);
    const cadastroButtonRef = useRef(null);

    // Hook para navegação
    const navigate = useNavigate();

    // Estados para armazenar os dados do formulário
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Função para lidar com o envio do formulário de cadastro
    const handleSubmit = (event) => {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        const usuario = {
            nome: nome,
            email: email,
            senha: senha
    };

        // Faz uma requisição POST para a API
    fetch("http://localhost:8080/usuario", {
        mode: 'no-cors', // Desabilita o CORS (não recomendado para produção)
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(usuario), // Converte o objeto para JSON
        })
            .then((response) => response.json()) // Converte a resposta para JSON
            .then((data) => {
                // Limpa os campos do formulário após o cadastro
                setNome('');
                setEmail('');
                setSenha('');
                console.log('Cadastro realizado com sucesso:', data);
        });
    };

    // Função para exibir os dados do usuário no console
    const handleUser = (event) => {
        const usuario = {
            nome: nome,
            email: email,
            senha: senha,
        };
        console.log(usuario);
    };

    // Hook useEffect para manipular classes de elementos DOM
    useEffect(() => {
        const card = cardRef.current;
        const loginButton = loginButtonRef.current;
        const cadastroButton = cadastroButtonRef.current;

        // Alterna entre as classes "loginActive" e "cadastroActive"
        loginButton.onclick = () => {
            card.classList.remove("cadastroActive");
            card.classList.add("loginActive");
        };

        cadastroButton.onclick = () => {
            card.classList.remove("loginActive");
            card.classList.add("cadastroActive");
        };
    }, []);

    // Estado para exibir uma mensagem de sucesso
    const [isOpen, setIsOpen] = useState(false);

    // Função para lidar com o login
    const handleLogin = (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário
        navigate('/user'); // Redireciona para a página do usuário
    };

return (
    <section className="conteinerPai">
        {/* Card que alterna entre login e cadastro */}
        <div className="card loginActive" ref={cardRef}>

            {/* Seção da esquerda (Login) */}
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

                {/* Seção da direita (Cadastro) */}
        <div className="direita">
            <div className="formCadastro">
                <h2>Cadastro</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nome" />
                    <input type="email" placeholder="E-mail" />
                    <input type="password" placeholder="Senha" />
                    <input type="password" placeholder="Confirme a sua senha" />
                    <button type="submit" onClick={() => {
                        setIsOpen(true);
                        handleUser();
                    }}>Cadastrar</button>
                        {/* Mensagem de sucesso ao criar conta */}
                    {isOpen && (
                        <div className="registerComplete">
                            Conta criada com sucesso!
                        </div>
                    )}
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

export default Login; // Exporta o componente Login