import { useState } from "react"
import { Link } from "react-router-dom"

function Checkout({ carrinho }) {

  const [cliente, setCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: ""
  })

  const [enviado, setEnviado] = useState(false)

  const total = carrinho.reduce(
    (soma, item) => {

      const preco =
        Number(
          String(item.preco)
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
        ) || 0

      return soma + preco * item.quantidade
    },
    0
  )


  function formatarPreco(valor) {

    return valor.toLocaleString(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL"
      }
    )

  }


  function alterarCampo(e) {

    const { name, value } = e.target

    setCliente({
      ...cliente,
      [name]: value
    })

  }


  function finalizarPedido(e) {

    e.preventDefault()

    if (
      !cliente.nome ||
      !cliente.email ||
      !cliente.telefone ||
      !cliente.endereco ||
      !cliente.cidade ||
      !cliente.estado ||
      !cliente.cep
    ) {

      alert(
        "Preencha todos os campos."
      )

      return
    }


    const pedidosSalvos =
      localStorage.getItem("pedidos")

    const pedidos =
      pedidosSalvos
        ? JSON.parse(pedidosSalvos)
        : []


    const novoPedido = {

      id: Date.now(),

      cliente,

      produtos: carrinho,

      total,

      data:
        new Date().toLocaleString(
          "pt-BR"
        ),

      status:
        "Novo pedido"

    }


    localStorage.setItem(
      "pedidos",
      JSON.stringify([
        ...pedidos,
        novoPedido
      ])
    )


    setEnviado(true)

  }


  if (carrinho.length === 0) {

    return (

      <main className="checkout-page">

        <div className="checkout-vazio">

          <div>
            🛒
          </div>

          <h1>
            Seu carrinho está vazio
          </h1>

          <p>
            Adicione algum produto antes
            de finalizar a compra.
          </p>

          <Link to="/">
            Explorar produtos
          </Link>

        </div>

      </main>

    )
  }


  if (enviado) {

    return (

      <main className="checkout-page">

        <div className="checkout-sucesso">

          <div className="checkout-sucesso-icon">
            ✓
          </div>

          <span>
            PEDIDO RECEBIDO
          </span>

          <h1>
            Obrigado pela sua compra!
          </h1>

          <p>
            Seu pedido foi registrado
            com sucesso.
          </p>

          <Link to="/">
            Voltar para a loja
          </Link>

        </div>

      </main>

    )
  }


  return (

    <main className="checkout-page">

      <div className="checkout-container">

        {/* CABEÇALHO */}

        <div className="checkout-header">

          <span>
            ALVORA SHOP
          </span>

          <h1>
            Finalizar compra
          </h1>

          <p>
            Preencha seus dados para
            registrar o pedido.
          </p>

        </div>


        <div className="checkout-layout">

          {/* FORMULÁRIO */}

          <form
            className="checkout-form"
            onSubmit={finalizarPedido}
          >

            <h2>
              Seus dados
            </h2>


            <div className="checkout-fields">

              <div className="checkout-field">

                <label>
                  Nome completo
                </label>

                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  value={cliente.nome}
                  onChange={alterarCampo}
                />

              </div>


              <div className="checkout-field">

                <label>
                  E-mail
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={cliente.email}
                  onChange={alterarCampo}
                />

              </div>


              <div className="checkout-field">

                <label>
                  Telefone
                </label>

                <input
                  type="tel"
                  name="telefone"
                  placeholder="(00) 00000-0000"
                  value={cliente.telefone}
                  onChange={alterarCampo}
                />

              </div>


              <div className="checkout-field">

                <label>
                  CEP
                </label>

                <input
                  type="text"
                  name="cep"
                  placeholder="00000-000"
                  value={cliente.cep}
                  onChange={alterarCampo}
                />

              </div>


              <div className="checkout-field checkout-field-full">

                <label>
                  Endereço
                </label>

                <input
                  type="text"
                  name="endereco"
                  placeholder="Rua, número e complemento"
                  value={cliente.endereco}
                  onChange={alterarCampo}
                />

              </div>


              <div className="checkout-field">

                <label>
                  Cidade
                </label>

                <input
                  type="text"
                  name="cidade"
                  placeholder="Sua cidade"
                  value={cliente.cidade}
                  onChange={alterarCampo}
                />

              </div>


              <div className="checkout-field">

                <label>
                  Estado
                </label>

                <input
                  type="text"
                  name="estado"
                  placeholder="SE"
                  maxLength="2"
                  value={cliente.estado}
                  onChange={alterarCampo}
                />

              </div>

            </div>


            <button
              type="submit"
              className="checkout-finalizar"
            >
              Confirmar pedido
            </button>

          </form>


          {/* RESUMO */}

          <aside className="checkout-resumo">

            <span>
              RESUMO
            </span>

            <h2>
              Seu pedido
            </h2>


            <div className="checkout-lista">

              {carrinho.map(
                (item, index) => (

                  <div
                    className="checkout-item"
                    key={`${item.nome}-${index}`}
                  >

                    <div className="checkout-item-imagem">

                      {item.imagem ? (

                        <img
                          src={item.imagem}
                          alt={item.nome}
                        />

                      ) : (

                        <span>
                          A
                        </span>

                      )}

                    </div>


                    <div>

                      <strong>
                        {item.nome}
                      </strong>

                      <p>
                        Quantidade:
                        {" "}
                        {item.quantidade}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>


            <div className="checkout-total">

              <span>
                Total
              </span>

              <strong>
                {formatarPreco(total)}
              </strong>

            </div>

          </aside>

        </div>

      </div>

    </main>

  )

}

export default Checkout