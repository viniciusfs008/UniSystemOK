import React from "react";
import "../Modal/modal.css" 
import "./dropDown.css";

// Componente de dropdown
// Recebe como parâmetro os elementos que serão exibidos no dropdown

export default function Dropdown({ children }) {
  return (
    <>
      <div className="dropdown">
        <div className="" data-bs-toggle="dropdown" aria-expanded="false">
          <div className="button-menuzin">
            <i className="bi bi-filter-square" data-bs-toggle="tooltip" data-bs-placement="top" title="Tipos"></i>
          </div>
          <ul className="dropdown-menu">{children}</ul>
        </div>
      </div>
    </>
  );
}
