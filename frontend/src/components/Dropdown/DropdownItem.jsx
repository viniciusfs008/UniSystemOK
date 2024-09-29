import React from "react";
import "./dropDown.css";

// Componente de item do dropdown
// Recebe como parâmetro a função que será executada ao clicar no item e o texto que será exibido

export default function DropdownItem({ onClick, children }) {
  return (
    <li>
      <a className="dropdown-item" onClick={onClick}>
        {children}
      </a>
    </li>
  );
}
