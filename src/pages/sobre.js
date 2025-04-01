import "./sobre.css";
import React, { useState } from "react";

function Sobre() {
  // Estado para controlar a abertura do menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para alternar o estado do menu (aberto/fechado)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("open");  // Adiciona ou remove a classe "open" no body
  };


  return (
    <div className="app">
      {/* Barra de topo com o logotipo */}
      <div className="barra-menu">
        <div className="logo">
          <img src="/img/tec_fit-removebg-preview.png" width="120" alt="Tec Fit Logo" />
      </div>
    </div>

      {/* Botão para abrir/fechar o menu */}
    <button className="Tec" onClick={toggleMenu}>
      <span className="Tec-icon"></span>
    </button>

      {/* Menu lateral com links de navegação */}
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

      {/* Seção "Vamos crescer juntos!" */}
    <section class="gym container">
      <div class="gym-1">
        <h2><span>Vamos crescer</span> juntos!</h2>
          <p>Na Tec Fit, acreditamos que o verdadeiro crescimento acontece quando evoluímos juntos. Nossa
          missão vai além de oferecer tecnologia e inovação no mundo fitness; queremos construir uma
          comunidade forte, onde cada cliente, parceiro e colaborador possa alcançar seu potencial máximo.</p>
      </div>
      <div class="gym-2">
        <img class="img-1" src="/img/academia4.jpg" alt="gym" />
      </div>
    </section>
      
      {/* Seção "Nossa Missão" */}
    <section class="gym container">
      <div class="gym-2">
        <img class="img-4" src="/img/academia.jpg" alt="gym" />
      </div>

      <div class="gym-3">
        <h2><span>Nossa</span> missão </h2>
        <p class="p2">Na Tec Fit, acreditamos que a jornada para um estilo de vida saudável começa no lugar certo.
          Nossa missão é conectar você à academia perfeita, onde seus objetivos se tornam realidade e
          sua experiência de treino é transformadora.
          Sabemos que cada pessoa tem uma necessidade diferente—alguns buscam performance, outros
          bem-estar, motivação ou simplesmente um ambiente acolhedor. É por isso que trabalhamos para
          facilitar essa escolha, trazendo tecnologia, inovação e informações para que você encontre
          a academia dos seus sonhos com facilidade.</p>
      </div>
    </section>
      
      {/* Seção "Nossa História" */}
  <section class="gym container">
    <div class="gym-1">
        <h2><span>Nossa</span> Historia </h2>
        <p>A Tec Fit nasceu da vontade de transformar a forma como as pessoas encontram e vivem a
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
    </div>

        <div class="gym-2">
          <img class="img-1" src="/img/tec_fit-removebg-preview.png" alt="gym" />
        </div>
      </section>
    
      {/* Seção de Benefícios e Vantagens */}
    <div class="semi">
    <h1>Benefícios & vantagens</h1>
    <hr />
    <div>
        <h2>Encontre a Academia Perfeita</h2>
        <p>Comparamos diversas academias para te ajudar a encontrar aquela que combina com seu estilo de treino, localização e preferências.</p>
    </div>
    <div>
        <h2>Filtros Inteligentes</h2>
        <hr />
        <p>Busque academias por localização, modalidades, estrutura, preço e muito mais.</p>
    </div>
    <div>
        <h2>Sem Complicação</h2>
        <hr />
        <p>Entre em contato direto com a academia, agende uma visita ou faça sua inscrição de forma simples e rápida.</p>
    </div>
    <div>
        <h2>Descubra Novas Experiências</h2>
        <hr />
        <p>Conheça academias que oferecem desde musculação até modalidades exclusivas como crossfit, yoga, pilates, lutas e muito mais.</p>
    </div>
</div>

      {/* Contato */}
<div class="contato">
    <div class="item">
        <img src="/img/WhatsApp .png" alt="WhatsApp" />
        <p>(81) 99000-0000</p>
    </div>
    <div class="item">
        <img src="/img/Email.png" alt="Email" />
        <p>contato@tecfit.com.br</p>
    </div>
    <div class="item">
        <img src="/img/Privacy.png" alt="Política de Privacidade" />
        <p>Política de Privacidade</p>
    </div>
    <div class="item">
        <img src="/img/Instagram.png" alt="Instagram" />
        <p>Tec Fit Oficial</p>
    </div>
    <div class="item">
        <img src="/img/Facebook.png" alt="Facebook" />
        <p>Tec Fit Oficial</p>
    </div>
    <div class="logo">
        <img src="/img/tec_fit-removebg-preview.png" alt="Hi Academia Logo" />
        <p>Tec Fit</p>
    </div>
    </div>

    {/* Rodapé */}
    <div class="footer">
        <p>© Tec Fit 2025. Todos os direitos reservados. <span class="painel">Painel</span></p>
        <p>Tec. Desenvolvido pela Capta Comunicação.</p>
    </div>
  </div>
  );
}

export default Sobre;