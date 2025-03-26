import "./sobre.css";
import React, { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";

function Sobre() {
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
    <div className="app">
      {/* Barra de topo */}
      <div className="barra-topo">
        <div className="logo">
          <img src="/img/tec_fit-removebg-preview.png" width="120" alt="Tec Fit Logo" />
        </div>
        <div className="botoes">
          <a href="/login" className="login">Login</a>
        </div>
      </div>

      {/* Botão de menu */}
      <button className="Tec" onClick={toggleMenu}>
        <span className="Tec-icon"></span>
      </button>

      {/* Menu lateral */}
      <div className={`menu ${menuOpen ? "active" : ""}`}>
        <nav>
          <a href="/" style={{ animationDelay: "0.2s" }}>
            <h6>Inicio</h6>
          </a>
          <a href="/servico" style={{ animationDelay: "0.4s" }}>
            <h6>Serviços</h6>
          </a>
          <a href="/contato" style={{ animationDelay: "0.6s" }}>
            <h6>Contato</h6>
          </a>
        </nav>
      </div>

      {/* Conteúdo principal */}
      <div className="A1">
        <h1>Vamos crescer <br /> juntos</h1>
        <img src="/img/tec_fit-removebg-preview.png" alt="Tec Fit" />
        <p>
          Na Tec Fit, acreditamos que o verdadeiro crescimento acontece quando evoluímos juntos. Nossa
          missão vai além de oferecer tecnologia e inovação no mundo fitness; queremos construir uma
          comunidade forte, onde cada cliente, parceiro e colaborador possa alcançar seu potencial máximo.
        </p>
      </div>

      <div className="A2">
        <img src="academia1.png" className="I1" alt="Academia 1" />
        <h1 className="B1">Nossa missão</h1>
        <p className="C1">
          Na Tec Fit, acreditamos que a jornada para um estilo de vida saudável começa no lugar certo.
          Nossa missão é conectar você à academia perfeita, onde seus objetivos se tornam realidade e
          sua experiência de treino é transformadora. Sabemos que cada pessoa tem uma necessidade diferente—alguns
          buscam performance, outros bem-estar, motivação ou simplesmente um ambiente acolhedor. É por isso que
          trabalhamos para facilitar essa escolha, trazendo tecnologia, inovação e informações para que você encontre
          a academia dos seus sonhos com facilidade.
        </p>
        <h1 className="B2">Nossa Historia</h1>
        <p className="C2">
          A Tec Fit nasceu da vontade de transformar a forma como as pessoas encontram e vivem a 
          experiência em academias. Percebemos que, muitas vezes, escolher um local para treinar pode
          ser um desafio—falta de informação, dificuldades para comparar opções e até mesmo a frustração
          de não encontrar um ambiente que realmente combine com seu estilo de vida. Foi aí que tivemos 
          uma ideia: e se pudéssemos usar a tecnologia para conectar as pessoas às academias ideais?
          Com essa visão, começamos a desenvolver uma plataforma que simplifica essa busca, tornando o 
          processo mais intuitivo, rápido e eficiente. Não queremos apenas ajudar você a encontrar uma academia;
          queremos garantir que sua escolha seja baseada no que realmente importa: suas preferências, objetivos
          e estilo de treino. Ao longo do tempo, crescemos, aprimoramos nossas soluções e fortalecemos nossa missão
          de unir tecnologia, inovação e bem-estar. Hoje, a Tec Fit é mais do que uma plataforma—somos uma comunidade
          que acredita no poder da conexão certa para transformar vidas.
        </p>
        <img src="Academia2.jpg" className="I2" alt="Academia 2" />
      </div>

      <div className="A3">
        <h1 className="B3">Beneficios & vantagens</h1>
        <div className="A4"></div>
        <h2 className="B4">Encontre a Academia Perfeita</h2>
        <p className="C3">
          Comparamos diversas academias para te ajudar a encontrar aquela que combina
          com seu estilo de treino, localização e preferências.
        </p>
        <h2 className="B5">Filtros Inteligentes</h2>
        <p className="C4">
          Busque academias por localização, modalidades, estrutura, preço e muito mais.
        </p>
        <h2 className="B6">Sem Complicação</h2>
        <p className="C5">
          Entre em contato direto com a academia, agende uma visita ou faça sua inscrição
          de forma simples e rápida.
        </p>
        <h2 className="B7">Descubra Novas Experiências</h2>
        <p className="C6">
          Conheça academias que oferecem desde musculação até modalidades exclusivas como crossfit,
          yoga, pilates, lutas e muito mais.
        </p>
      </div>
    </div>
  );
}

export default Sobre;