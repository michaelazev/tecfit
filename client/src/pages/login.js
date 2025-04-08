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

    const [confirmarSenha, setConfirmarSenha] = useState(""); // Estado para a confirmação da senha
    const [cadastroErrorMessage, setCadastroErrorMessage] = useState(""); // Estado para mensagem de erro no cadastro

    // Função para lidar com o envio do formulário de cadastro
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

        fetch("https://tecfit-back.vercel.app/auth/register", {
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
                setIsOpen(true); // Exibe a mensagem de sucesso
            
                // Salva os dados do usuário no localStorage
                localStorage.setItem('user', JSON.stringify({
                    username: usuario.username,
                    email: usuario.email
                }));
            
                console.log('Cadastro realizado com sucesso:', data);
            })
            .catch((error) => {
                console.error('Erro ao registrar usuário:', error);
            });
    };

    // Função para exibir os dados do usuário no console
    const handleUser = (event) => {
        const usuario = {
            nome: nome,
            email: email,
            senha: senha,
        };
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
    const [errorMessage, setErrorMessage] = useState(""); // Estado para armazenar a mensagem de erro
    // Função para lidar com o login
    const handleLogin = (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário
        const usuario = {
            email: email,
            password: senha
        };

        fetch("https://tecfit-back.vercel.app/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then((response) => {
                if (!response.ok) {
                    // Log detalhado da resposta para depuração
                    console.error('Erro na resposta do servidor:', response.status, response.statusText);
                    return response.json().then((errorData) => {
                        console.error('Detalhes do erro:', errorData);
                        setErrorMessage("Credenciais inválidas!");
                        throw new Error('Erro ao fazer login');
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('Login realizado com sucesso:', data);
                setErrorMessage("");
            
                // Salva os dados do usuário no localStorage
                localStorage.setItem('user', JSON.stringify({
                    email: usuario.email
                }));
            
                // Redireciona para a página do usuário
                navigate('/user');
            })
            .catch((error) => {
                console.error('Erro ao fazer login:', error);
            });
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
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email} // Vincula o valor ao estado 'email'
                                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado 'email'
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                value={senha} // Vincula o valor ao estado 'senha'
                                onChange={(e) => setSenha(e.target.value)} // Atualiza o estado 'senha'
                            />
                            <button type="submit" onClick={handleLogin}>Entrar</button>
                            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
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
                        <p>Lorem Ipsum has been the industry´s standard dummy tex</p>
                        <button className="cadastroButton" ref={cadastroButtonRef}>Cadastra-se</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login; // Exporta o componente Login