import React from 'react'
import './infoCard.css'

// Componente de card de informações
// Recebe como parâmetro o título e o conteúdo do card

function InfoCard({title, children}) {
  return (
    <div className="infoCard-box p-3">
        <div className="infoCard-body">
            <h5>{title}</h5>
            {children}
        </div>
    </div>
  )
}

export default InfoCard