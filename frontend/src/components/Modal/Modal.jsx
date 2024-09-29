import React from "react";
import "./modal.css" 

// Componente de modal
// Recebe como parâmetro o título e o conteúdo do modal
// Exibe um modal com o conteúdo passado como parâmetro
// O modal é exibido em tela cheia

function Modal({ title, id, children }) {
  return (
    <>
      <div className="button-expand" data-bs-toggle="tooltip" data-bs-placement="top" title="Expandir">
        <i
          className="bi bi-arrows-fullscreenbi bi-fullscreen"
          data-bs-toggle="modal"
          data-bs-target={`#${id}`}
        ></i>
      </div>

      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between alien-itens-center">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {title}
              </h1>
              <div className="button-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="bi bi-x-lg"></i>
              </div>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
