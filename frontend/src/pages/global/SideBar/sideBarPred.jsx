import React from 'react'

// o sideBarItemPred é o item do menu lateral que redireciona para a página de prediçoes

function sideBarItemPred() {
  return (
    <li className="list-itens" id="list">
        <a className="item collapsed" href='dash'>
        <i className="bi bi-graph-up"></i>
            <span>Dashboard</span>
        </a>
    </li>
  )
}

export default sideBarItemPred