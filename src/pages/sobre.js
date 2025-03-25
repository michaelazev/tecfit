import React from 'react';

function Sobre() {
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

      {/* Conteúdo principal */}
      <div className="conteudo">
        <h1>Bem-vindo à página Qualquer Coisa</h1>
        <p>Esta é uma página de exemplo com qualquer coisa.</p>
      </div>
    </div>
  );
}

export default Sobre;