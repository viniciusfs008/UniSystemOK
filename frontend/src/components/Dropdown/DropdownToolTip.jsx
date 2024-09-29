import React from "react";
import "../Modal/modal.css" 
import "./dropDown.css";

// Componente de dropdown de ajuda
// Recebe como parâmetro os elementos que serão exibidos no dropdown

export default function Dropdown({ children }) {
  return (
    <>
      <div className="dropdown">
        <div className="" data-bs-toggle="dropdown" aria-expanded="false">
          <div className="button-menuzin">
            <i className="bi bi-question-square" data-bs-toggle="tooltip" data-bs-placement="top" title="Ajuda"></i>
          </div>
          <div className="dropdown-menu tool-tip p-3">{children}</div>
        </div>
      </div>
    </>
  );
}
