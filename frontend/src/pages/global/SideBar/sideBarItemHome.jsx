import React from 'react'

// o sideBarItemHome é o item do menu lateral que redireciona para a página inicial
// ele é composto por um link para a página inicial
// o link é composto por um icone e um texto

function sideBarItemHome() {
  return (
    <li className="list-itens" id="list">
        <a className="item collapsed" href='/'>
            <i className="bi bi-house-door"></i>
            <span>Home</span>
        </a>
    </li>
  )
}

export default sideBarItemHome