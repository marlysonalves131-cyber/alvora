import { useEffect, useState } from "react"

function Pedidos() {

  const [pedidos, setPedidos] = useState([])
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("Todos")

  useEffect(() => {

    const pedidosSalvos =
      JSON.parse(localStorage.getItem("pedidos")) || []

    setPedidos(pedidosSalvos)

  }, [])

  function alterarStatus(numero, novoStatus) {

    const pedidosAtualizados = pedidos.map((pedido) => {

      if (pedido.numero === numero) {
        return {
          ...pedido,
          status: novoStatus
        }
      }

      return pedido

    })

    setPedidos(pedidosAtualizados)

    localStorage.setItem(
      "pedidos",
      JSON.stringify(pedidosAtualizados)
    )
  }

  function excluirPedido(numero) {

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este pedido?"
    )

    if (!confirmar) {
      return
    }

    const pedidosAtualizados = pedidos.filter(
      (pedido) => pedido.numero !== numero
    )

    setPedidos(pedidosAtualizados)

    localStorage.setItem(
      "pedidos",
      JSON.stringify(pedidosAtualizados)
    )
  }

  const pedidosFiltrados = pedidos.filter((pedido) => {

    const texto = busca.toLowerCase()

    const nome =
      pedido.cliente?.nome?.toLowerCase() || ""

    const numero =
      pedido.numero?.toLowerCase() || ""

    const telefone =
      pedido.cliente?.telefone?.toLowerCase() || ""

    const correspondeBusca =
      nome.includes(texto) ||
      numero.includes(texto) ||
      telefone.includes(texto)

    const correspondeStatus =
      filtroStatus === "Todos" ||
      (pedido.status || "Aguardando pagamento") === filtroStatus

    return (
      correspondeBusca &&
      correspondeStatus
    )
  })

  const totalPedidos = pedidos.length

  const pedidosPendentes = pedidos.filter(
    (pedido) =>
      (pedido.status || "Aguardando pagamento") ===
      "Aguardando pagamento"
  ).length

  const pedidosEntregues = pedidos.filter(
    (pedido) =>
      pedido.status === "Entregue"
  ).length

  const totalVendas = pedidos.reduce(
    (soma, pedido) =>
      soma + Number(pedido.total || 0),
    0
  )

  return (

    <section className="pedidos">

      <h1>
        📦 Pedidos da ALVORA
      </h1>


      <div className="pesquisa-pedidos">

        <input
          type="text"
          placeholder="🔎 Pesquisar por pedido, cliente ou telefone..."
          value={busca}
          onChange={(e) =>
            setBusca(e.target.value)
          }
        />

        <select
          value={filtroStatus}
          onChange={(e) =>
            setFiltroStatus(e.target.value)
          }
        >

          <option value="Todos">
            Todos os pedidos
          </option>

          <option value="Aguardando pagamento">
            Aguardando pagamento
          </option>

          <option value="Pago">
            Pago
          </option>

          <option value="Enviado">
            Enviado
          </option>

          <option value="Entregue">
            Entregue
          </option>

          <option value="Cancelado">
            Cancelado
          </option>

        </select>

      </div>


      <div className="cards-admin">

        <div className="card-admin">

          <h3>
            Total de pedidos
          </h3>

          <h2>
            {totalPedidos}
          </h2>

        </div>


        <div className="card-admin">

          <h3>
            Vendas
          </h3>

          <h2>
            R$ {totalVendas
              .toFixed(2)
              .replace(".", ",")}
          </h2>

        </div>


        <div className="card-admin">

          <h3>
            Pendentes
          </h3>

          <h2>
            {pedidosPendentes}
          </h2>

        </div>


        <div className="card-admin">

          <h3>
            Entregues
          </h3>

          <h2>
            {pedidosEntregues}
          </h2>

        </div>

      </div>


      {pedidos.length === 0 ? (

        <div className="nenhum-pedido">

          <h2>
            📭 Nenhum pedido ainda
          </h2>

          <p>
            Quando um cliente realizar uma compra,
            o pedido aparecerá aqui.
          </p>

        </div>

      ) : pedidosFiltrados.length === 0 ? (

        <div className="nenhum-pedido">

          <h2>
            🔎 Nenhum pedido encontrado
          </h2>

          <p>
            Tente mudar a pesquisa ou o filtro.
          </p>

        </div>

      ) : (

        <div className="lista-pedidos">

          {pedidosFiltrados.map((pedido) => (

            <div
              className="pedido-card"
              key={pedido.numero}
            >

              <div className="pedido-topo">

                <h2>
                  {pedido.numero}
                </h2>

                <span>
                  {pedido.data}
                </span>

              </div>


              <hr />


              <h3>
                👤 Cliente
              </h3>

              <p>
                <strong>
                  Nome:
                </strong>{" "}
                {pedido.cliente?.nome}
              </p>

              <p>
                <strong>
                  Telefone:
                </strong>{" "}
                {pedido.cliente?.telefone}
              </p>

              <p>
                <strong>
                  E-mail:
                </strong>{" "}
                {pedido.cliente?.email}
              </p>


              <h3>
                📍 Endereço
              </h3>

              <p>
                {pedido.cliente?.endereco},{" "}
                {pedido.cliente?.numero}
              </p>

              <p>
                {pedido.cliente?.bairro}
              </p>

              <p>
                {pedido.cliente?.cidade} -{" "}
                {pedido.cliente?.estado}
              </p>

              <p>
                CEP: {pedido.cliente?.cep}
              </p>


              <h3>
                🛍️ Produtos
              </h3>

              <div className="produtos-pedido">

                {pedido.produtos?.map(
                  (produto, index) => (

                    <div
                      className="produto-pedido"
                      key={`${produto.nome}-${index}`}
                    >

                      {produto.imagem && (

                        <img
                          src={produto.imagem}
                          alt={produto.nome}
                        />

                      )}

                      <div>

                        <strong>
                          {produto.nome}
                        </strong>

                        <p>
                          Quantidade:{" "}
                          {produto.quantidade}
                        </p>

                        <p>
                          Preço: R${" "}
                          {String(produto.preco)}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>


              <div className="pedido-total">

                <strong>
                  Total da compra:
                </strong>

                <strong>
                  R$ {Number(pedido.total || 0)
                    .toFixed(2)
                    .replace(".", ",")}
                </strong>

              </div>


              <div className="pedido-pagamento">

                <strong>
                  💳 Pagamento:
                </strong>

                <span>
                  {pedido.pagamento ||
                    pedido.cliente?.pagamento ||
                    "Não informado"}
                </span>

              </div>


              <div className="pedido-status">

                <strong>
                  Status:
                </strong>

                <select
                  value={
                    pedido.status ||
                    "Aguardando pagamento"
                  }
                  onChange={(e) =>
                    alterarStatus(
                      pedido.numero,
                      e.target.value
                    )
                  }
                >

                  <option value="Aguardando pagamento">
                    Aguardando pagamento
                  </option>

                  <option value="Pago">
                    Pago
                  </option>

                  <option value="Enviado">
                    Enviado
                  </option>

                  <option value="Entregue">
                    Entregue
                  </option>

                  <option value="Cancelado">
                    Cancelado
                  </option>

                </select>

              </div>


              <button
                type="button"
                className="botao-excluir-pedido"
                onClick={() =>
                  excluirPedido(pedido.numero)
                }
              >
                🗑️ Excluir pedido
              </button>

            </div>

          ))}

        </div>

      )}

    </section>

  )
}

export default Pedidos