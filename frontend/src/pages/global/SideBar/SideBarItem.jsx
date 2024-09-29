import React from 'react'
import './sideBarItem.css'

// o sideBarItem é o item do menu lateral que redireciona para uma página

function SideBarItem({nome, icon, path}) {
  return (
    <li className="list-itens" id="list">
        <div className="item collapsed"
        data-bs-target={"#" + nome + "filho"}
        data-bs-toggle="collapse">
            {icon}
            <span>{nome}</span>
            <i className="bi bi-chevron-down"></i>
        </div>
        <ul id={nome + "filho"}
            className="sub-item collapse"
            data-bs-parent="#list">
            <li>
                <a className="sub-item-intern"
                href={"/" + path + "-almoxarifado"}>
                    <i className="bi bi-bell"></i>
                    {/*aqui é onde vai colocar o nome do sub menu, ou seja, oq vai aparecer quando clicar no botao*/}
                    <span>Almoxarifado</span>
                </a>
            </li>
            <li>
                <a className="sub-item-intern"
                href={"/" + path + "-despesas"}>
                    <i className="bi bi-activity"></i>
                    {/*aqui é onde vai colocar o nome do sub menu, ou seja, oq vai aparecer quando clicar no botao*/}
                    <span>Despesas</span>
                </a>
            </li>
            <li>
                <a className="sub-item-intern"
                href={"/" + path + "-rec_humanos"}>
                    <i className="bi bi-pause"></i>
                    {/*aqui é onde vai colocar o nome do sub menu, ou seja, oq vai aparecer quando clicar no botao*/}
                    <span>Rec. Humanos</span>
                </a>
            </li>
        </ul>
    </li>
  );
};

export default SideBarItem;