import React, { useState, useEffect, useRef } from "react";
import "../Dashboard.css";
import { fetchDataGet, fetchDataPost } from "../../controler/comunicacao.js";
import Modal from "../../components/Modal/Modal.jsx";
import ChartBar from "../../components/Charts/ChartBar.jsx";
import ChartLine from "../../components/Charts/ChartLine.jsx";
import InfoCard from "../../components/InfoCard/InfoCard.jsx";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation.jsx";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import DropdownItem from "../../components/Dropdown/DropdownItem.jsx";
import DropdownToolTip from "../../components/Dropdown/DropdownToolTip.jsx";
import ChartGastos from "../../components/Charts/ChartGastos.jsx";
import ChatExpandableTextbox from "../../components/ChatExpandableTextbox.jsx";

function DashDesp() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataGet("/dashboard/despesas")
      .then((res) => {
        console.log(res); // Adicione isso para ver a resposta
        setData(res.data); // Altere para res.data
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="container-fluid dashboard px-0">
      {/* TITULO */}
      <div className="row mb-3">
        <div className="col-12">
          <div className="titulo p-3 d-flex justify-content-between align-items-center">
            <div className="titulo-nome">Relatórios Despesas</div>
            <div className="filter-button" onClick={() => setFlag(!flag)}>
              Filtros
            </div>
          </div>
        </div>
      </div>

      {/* FILTROS */}
      <div className={"on " + (flag ? "show mb-3" : "hide mb-0")}>
        <div className="row on-content">
          <div className="col-12">
            <div className="titulo p-3">
              <div className="titulo-nome">Filtros</div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOCOS INFORMATIVOS */}

      {/* CARDS */}

      <div className="row gx-3 mb-3">
        {/* CARD Tipo */}

        <div className="col-sm-12 col-md-12 col-lg-6 mb-3 m-md-0">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="m-0">Total por Tipo</h5>

              <div className="d-inline-flex align-items-center">
                <DropdownToolTip>
                  <p className="mb-0">Teste</p>
                </DropdownToolTip>

                <Modal title="Total por Tipo" id="ModalRaca">
                  <ChartGastos
                    data={data} // Aqui será o array res.data
                    xKey="TipoDespesa" // A chave para o eixo X, no seu caso, 'Tipo'
                    yKey="Valor" // O valor calculado a partir de 'Quantidade' x 'ValorUnitario'
                    calculateYValue={(item) => item.Valor}
                    title1="Tipo de Despesa" // Título para o eixo X
                    title2="Gastos (R$)" // Título para o eixo Y
                    horizontal={false} // Define o gráfico como vertical
                  />
                </Modal>
              </div>
            </div>
            <div className="card-body card-body-graph ps-1">
              {loading === true ? (
                <LoadingAnimation />
              ) : (
                <div className="seila">
                  <ChartGastos
                    data={data} // Aqui será o array res.data
                    xKey="TipoDespesa" // A chave para o eixo X, no seu caso, 'Tipo'
                    yKey="Valor" // O valor calculado a partir de 'Quantidade' x 'ValorUnitario'
                    calculateYValue={(item) => item.Valor}
                    title1="Tipo de Despesa" // Título para o eixo X
                    title2="Gastos (R$)" // Título para o eixo Y
                    horizontal={false} // Define o gráfico como vertical
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CARD Tipo */}

        <div className="col-sm-12 col-md-12 col-lg-6 mb-3 m-md-0">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="m-0">Total por Periodicidade</h5>

              <div className="d-inline-flex align-items-center">
                <DropdownToolTip>
                  <p className="mb-0">Teste</p>
                </DropdownToolTip>

                <Modal title="Total por Fornecedor" id="ModalPer">
                  <ChartGastos
                    data={data} // Aqui será o array res.data
                    xKey="Periodicidade" // A chave para o eixo X, no seu caso, 'Tipo'
                    yKey="Gastos" // O valor calculado a partir de 'Quantidade' x 'ValorUnitario'
                    calculateYValue={(item) => item.Valor}
                    title1="Periodicidade" // Título para o eixo X
                    title2="Gastos (R$)" // Título para o eixo Y
                    horizontal={false} // Define o gráfico como vertical
                  />
                </Modal>
              </div>
            </div>
            <div className="card-body card-body-graph ps-1">
              {loading === true ? (
                <LoadingAnimation />
              ) : (
                <div className="seila">
                  <ChartGastos
                    data={data} // Aqui será o array res.data
                    xKey="Periodicidade" // A chave para o eixo X, no seu caso, 'Tipo'
                    yKey="Gastos" // O valor calculado a partir de 'Quantidade' x 'ValorUnitario'
                    calculateYValue={(item) => item.Valor}
                    title1="Periodicidade" // Título para o eixo X
                    title2="Gastos (R$)" // Título para o eixo Y
                    horizontal={false} // Define o gráfico como vertical
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row gx-3 mb-3">
        {/* CARD Tipo */}

        <div className="col-sm-12 col-md-12 mb-3 m-md-0">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="m-0">Total por Fornecedor</h5>

              <div className="d-inline-flex align-items-center">
                <DropdownToolTip>
                  <p className="mb-0">Teste</p>
                </DropdownToolTip>

                <Modal title="Total por Tipo" id="ModalFor">
                  <ChartGastos
                    data={data} // Aqui será o array res.data
                    xKey="Fornecedor" // A chave para o eixo X, no seu caso, 'Tipo'
                    yKey="Gastos" // O valor calculado a partir de 'Quantidade' x 'ValorUnitario'
                    calculateYValue={(item) => item.Valor}
                    title1="Fornecedor" // Título para o eixo X
                    title2="Gastos (R$)" // Título para o eixo Y
                    horizontal={false} // Define o gráfico como vertical
                  />
                </Modal>
              </div>
            </div>
            <div className="card-body card-body-graph ps-1">
              {loading === true ? (
                <LoadingAnimation />
              ) : (
                <div className="seila">
                  <ChartGastos
                    data={data} // Aqui será o array res.data
                    xKey="Fornecedor" // A chave para o eixo X, no seu caso, 'Tipo'
                    yKey="Gastos" // O valor calculado a partir de 'Quantidade' x 'ValorUnitario'
                    calculateYValue={(item) => item.Valor}
                    title1="Fornecedor" // Título para o eixo X
                    title2="Gastos (R$)" // Título para o eixo Y
                    horizontal={false} // Define o gráfico como vertical
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ChatExpandableTextbox />
    </section>
  );
}

export default DashDesp;
