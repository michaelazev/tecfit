import React, { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para abrir/fechar menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("open");
  };

  // Configuração do ScrollReveal
  useEffect(() => {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };

    ScrollReveal().reveal(".header__image img", {
      ...scrollRevealOption,
      origin: "right",
    });
    ScrollReveal().reveal(".header__content h1", {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal(".header__content h2", {
      ...scrollRevealOption,
      delay: 1000,
    });
    ScrollReveal().reveal(".header__content p", {
      ...scrollRevealOption,
      delay: 1500,
    });
    ScrollReveal().reveal(".header__btn", {
      ...scrollRevealOption,
      delay: 2000,
    });
  }, []);

  return (
    <div className={`app ${menuOpen ? "open" : ""}`}>
      {/* Barra de topo */}
      <div className="barra-topo">
        <div className="logo">
          <img src="/img/tec_fit-removebg-preview.png" width="120" alt="Tec Fit Logo" />
        </div>
        <div className="botoes">
        <a href="/login"><button class="login">Login</button></a>
        </div>
      </div>

      {/* Botão de menu */}
      <button className="Tec" onClick={toggleMenu}>
        <span className="Tec-icon"></span>
      </button>

      {/* Menu lateral */}
      <div className={`menu ${menuOpen ? "active" : ""}`}>
        <nav>
          <a href="/sobre" style={{ animationDelay: "0.2s" }}>
            <h6>Sobre</h6>
          </a>
          <a href="/servico" style={{ animationDelay: "0.4s" }}>
            <h6>Serviços</h6>
          </a>
          <a href="/contato" style={{ animationDelay: "0.6s" }}>
            <h6>Contato</h6>
          </a>
        </nav>
      </div>

      {/* Cabeçalho */}
      <header>
        <div className="section__container header__container" id="home">
          <div className="header__content">
            <h1>BEM VINDO <br /> A TEC FIT!</h1>
            <h2>GET FIT TO HAPPY</h2>
            <p>
              Unlock your full potential with our expert training and state-of-the-art facilities.
            </p>
            <div className="header__btn">
              <a href="/sobre">
                <button className="btn login">Sobre nós</button>
              </a>
            </div>
          </div>
          <div className="header__image">
            <img src="/img/mulher_malh-removebg-preview.png" alt="header" />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
