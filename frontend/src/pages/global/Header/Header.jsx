import React from 'react';
import './header.css';
import { useTheme } from "../../../context/ThemeContext";

// o header é o cabeçalho da página, onde fica o título, o botão de mudar o tema e o botao de abrir e fechar o menu lateral

function Header() {

  /*
    Função que abre e fecha o menu lateral
    ela passa a classe 'toggle-sidebar' para o body, que é responsável por abrir e fechar o menu lateral
    se ele estiver aberto, ele fecha, se ele estiver fechado, ele abre  
   */
  const handleToggleSideBar = () => {
    document.body.classList.toggle('toggle-sidebar')
  };    

  // pega o tema e a função para mudar o tema do context
  const {theme , toggleTheme} = useTheme();

  return (
    <header className="header d-flex align-items-center justify-content-between p-3 position-fixed top-0">
      <div className="header-title d-flex flex-row align-items-center">
        <h1>UniSystem</h1>
        <i className="bi bi-list mx-3" onClick={handleToggleSideBar}></i>
      </div>

      <div className="nav d-flex flex-row align-items-center">
        <div onClick={toggleTheme}>
          {theme === 'light' ?  <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon"></i>}
        </div>
      </div>
    </header>
  );
}

export default Header;