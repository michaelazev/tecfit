import React, { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para abrir/fechar menu lateral
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("open");
  };

  // Configuração do ScrollReveal para animações na página
  useEffect(() => {
    const scrollRevealOption = {
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    };
    
  // Aplica animações aos elementos do cabeçalho
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

  // Listas de unidades de academias com informações
  const units = [
    {
      name: "HI ACADEMIA",
      address: "Avenida Coronel Estevam - 415 - Alecrim - CEP 59035-000",
      status: "Em Breve",
      image: "/img/acad1.jpg" 
    },
    {
      name: "SMART-FIT",
      address: "Av. Jurua, 307 - Alphaville - CEP 06455-010 - Recife - PE",
      status: (
        <a href="/login" style={{ textDecoration: "none", color: "inherit" }}>
          Matricule-se
        </a>
      ),
      image: "/img/acad2.jpg" 
    },
    {
      name: "SELFIT",
      address: "Rua Sacadura Cabral, 1079 - Aclimação - CEP 38406-396 - Uberlândia - MG",
      status: "Em Breve",
      image: "/img/acad3.jpg" 
    },
  ];

  const units2 = [
    {
      name: "SKYFIT",
      address: "Avenida Coronel Estevam - 415 - Alecrim - CEP 59035-000 - Natal - RN",
      status: "Em Breve",
      image: "/img/acad4.jpg" 
    },
    {
      name: "SMART-FIT",
      address: "Av. Jurua, 307 - Alphaville - CEP 06455-010 - Barueri - SP",
      status: (
        <a href="/login" style={{ textDecoration: "none", color: "inherit" }}>
          Matricule-se
        </a>
      ),
      image: "/img/acad1.jpg" 
    },
    {
      name: "MARTFIT",
      address: "Rua Sacadura Cabral, 1079 - Aclimação - CEP 38406-396 - Uberlândia - MG",
      status: "Em Breve",
      image: "/img/acad2.jpg" 
    },
  ];

  return (
    <div className={`app ${menuOpen ? "open" : ""}`}> {/* Classe condicional para menu aberto */}

      {/* Barra de topo com logo e botão de login */}
  <div className="barra-topo">
    <div className="logo">
      <img src="/img/tec_fit-removebg-preview.png" width="120" alt="Tec Fit Logo" />
    </div>
    <div className="botoes">
      <a href="/login"><button class="login">Login</button></a>
    </div>
  </div>

      {/* Botão para abrir/fechar menu lateral */}
  <button className="Tec" onClick={toggleMenu}>
    <span className="Tec-icon"></span>
  </button>

      {/* Menu lateral com links */}
      <div className={`menu ${menuOpen ? "active" : ""}`}>
        <nav>
          <a href="/sobre" style={{ animationDelay: "0.2s" }}>
            <h6>Sobre</h6>
          </a>
          <a href="/favorite" style={{ animationDelay: "0.4s" }}>
            <h6>Favorito</h6>
          </a>
          <a href="/contato" style={{ animationDelay: "0.6s" }}>
            <h6>Usuário</h6>
          </a>
        </nav>
      </div>

      {/* Cabeçalho com título e imagem */}
  <header>
    <div className="section__container header__container" id="home">
      <div className="header__content">
        <h1>BEM VINDO <br /> A TEC FIT!</h1>
        <h2>PRIMEIRO MÊS GRATIS</h2>
        <p>
        Cada repetição te aproxima da sua melhor versão. A dor passa, o progresso fica. Quando quiser parar, lembre-se: é agora que a evolução acontece. Faça UMA A MAIS e conquiste!
        </p>

      {/* sobre nos */}
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

      {/* Seção "Vamos crescer juntos!" */}
    <div className="map-section">
    <div className="map-content">
      <img src="/img/tec_fit-removebg-preview.png" alt="Logo" className="map-logo" />
      <h2>Encontre academia <br/> mais próxima de você.</h2>
    <button className="map-button">Ver mais</button>
    </div>
    <div className="map-image">
      <img src="/img/mapa1.png" alt="Mapa das Unidades" />
    </div>
    </div>
  
      {/* Lista de academias disponíveis */}
    <div className="unit-list">
      <h2 className="title">Redes Proximas</h2>     
    <div className="units">
      {units.map((unit, index) => (
    <div key={index} className="unit-card">
      <img src={unit.image} alt={unit.name} className="unit-image" />
    <div className="unit-header">{unit.name}</div>
    <div className="unit-body">
        <p className="unit-address">📍{unit.address}</p>
        <p className="unit-plans">
      <span className="bold">Plano Anual</span> <span className="prime">Plano Plus</span>
        </p>
    <button className="unit-button">{unit.status}</button>
    </div>
  </div>
  ))}
  </div>
</div>
      {/* Lista de academias disponíveis 2 */}
  <div className="unit-list">
    <div className="units">
      {units2.map((unit, index) => (
    <div key={index} className="unit-card">
        <img src={unit.image} alt={unit.name} className="unit-image" />
        <div className="unit-header">{unit.name}</div>
        <div className="unit-body">
          <p className="unit-address">📍{unit.address}</p>
          <p className="unit-plans">
            <span className="bold">Plano Anual</span> <span className="prime">Plano Prime</span>
          </p>
          <button className="unit-button">{unit.status}</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default App;