import { useState } from "react"
import { Link } from "react-router-dom"

function Checkout({ carrinho }) {

  const [dados, setDados] = useState({
    nome: "",
    telefone: "",
    email: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    pagamento: ""
  })


  function alterarCampo(e) {

    setDados({
      ...dados,
      [e.target.name]: e.target.value
    })

  }


  function converterPreco(preco) {

    return Number(
      String(preco)
        .replace("R$", "")
        .replace(/\s/g, "")
        .replace(/\./g, "")
        .replace(",", ".")
    )

  }


  const total = carrinho.reduce(
    (soma, item) => {

      const preco =
        converterPreco(item.preco)

      return soma +
        preco * item.quantidade

    },
    0
  )


  function finalizarPedido(e) {

    e.preventDefault()


    if (!dados.pagamento) {

      alert(
        "Selecione uma forma de pagamento."
      )

      return

    }


   const pedidos =
  JSON.parse(localStorage.getItem("pedidos")) || []

const numeroPedido =
  `ALV-${String(pedidos.length + 1).padStart(4, "0")}`

const novoPedido = {

  numero: numeroPedido,

  cliente: dados,

  produtos: carrinho,

  total: total,

  pagamento: dados.pagamento,

  status: "Aguardando pagamento",

  data: new Date().toLocaleString("pt-BR")

}

pedidos.push(novoPedido)

localStorage.setItem(
  "pedidos",
  JSON.stringify(pedidos)
)
localStorage.removeItem("carrinho")
alert(
  `Pedido ${numeroPedido} realizado com sucesso!`
)

  }


  if (carrinho.length === 0) {

    return (

      <section className="checkout">

        <h1>
          Checkout
        </h1>

        <p>
          Seu carrinho está vazio.
        </p>

        <Link to="/">
          ← Voltar para a loja
        </Link>

      </section>

    )

  }


  return (

    <section className="checkout">

      <h1>
        🛍️ Finalizar compra
      </h1>


      <div className="checkout-container">


        <form
          className="checkout-form"
          onSubmit={finalizarPedido}
        >

          <h2>
            📦 Dados para entrega
          </h2>


          <label>
            Nome completo
          </label>

          <input
            type="text"
            name="nome"
            value={dados.nome}
            onChange={alterarCampo}
            required
          />


          <label>
            Telefone / WhatsApp
          </label>

          <input
            type="tel"
            name="telefone"
            value={dados.telefone}
            onChange={alterarCampo}
            required
          />


          <label>
            E-mail
          </label>

          <input
            type="email"
            name="email"
            value={dados.email}
            onChange={alterarCampo}
            required
          />


          <label>
            CEP
          </label>

          <input
            type="text"
            name="cep"
            value={dados.cep}
            onChange={alterarCampo}
            placeholder="00000-000"
            required
          />


          <label>
            Endereço
          </label>

          <input
            type="text"
            name="endereco"
            value={dados.endereco}
            onChange={alterarCampo}
            required
          />


          <label>
            Número
          </label>

          <input
            type="text"
            name="numero"
            value={dados.numero}
            onChange={alterarCampo}
            required
          />


          <label>
            Bairro
          </label>

          <input
            type="text"
            name="bairro"
            value={dados.bairro}
            onChange={alterarCampo}
            required
          />


          <label>
            Cidade
          </label>

          <input
            type="text"
            name="cidade"
            value={dados.cidade}
            onChange={alterarCampo}
            required
          />


          <label>
            Estado
          </label>

          <input
            type="text"
            name="estado"
            value={dados.estado}
            onChange={alterarCampo}
            maxLength="2"
            placeholder="SE"
            required
          />


          <h2>
            💳 Forma de pagamento
          </h2>


          <div className="pagamentos">


            <label className="pagamento">

              <input
                type="radio"
                name="pagamento"
                value="Pix"
                checked={
                  dados.pagamento === "Pix"
                }
                onChange={alterarCampo}
              />

              <span>
                💠 Pix
              </span>

            </label>


            <label className="pagamento">

              <input
                type="radio"
                name="pagamento"
                value="Cartão de crédito"
                checked={
                  dados.pagamento ===
                  "Cartão de crédito"
                }
                onChange={alterarCampo}
              />

              <span>
                💳 Cartão de crédito
              </span>

            </label>


            <label className="pagamento">

              <input
                type="radio"
                name="pagamento"
                value="Cartão de débito"
                checked={
                  dados.pagamento ===
                  "Cartão de débito"
                }
                onChange={alterarCampo}
              />

              <span>
                💳 Cartão de débito
              </span>

            </label>


            <label className="pagamento">

              <input
                type="radio"
                name="pagamento"
                value="Boleto"
                checked={
                  dados.pagamento ===
                  "Boleto"
                }
                onChange={alterarCampo}
              />

              <span>
                🧾 Boleto
              </span>

            </label>

          </div>


          <button
            type="submit"
            className="botao-finalizar"
          >
            Continuar
          </button>

        </form>


        <div className="checkout-resumo">

          <h2>
            🛒 Seu pedido
          </h2>


          {carrinho.map(
            (item, index) => {

              const preco =
                converterPreco(item.preco)

              const subtotal =
                preco * item.quantidade


              return (

                <div
                  key={`${item.nome}-${index}`}
                  className="checkout-item"
                >

                  <img
                    src={item.imagem}
                    alt={item.nome}
                  />


                  <div>

                    <h3>
                      {item.nome}
                    </h3>

                    <p>
                      Quantidade:
                      {" "}
                      {item.quantidade}
                    </p>

                    <strong>
                      R${" "}
                      {subtotal
                        .toFixed(2)
                        .replace(".", ",")}
                    </strong>

                  </div>

                </div>

              )

            }
          )}


          <hr />


          <h2>
            Total: R${" "}
            {total
              .toFixed(2)
              .replace(".", ",")}
          </h2>


          <Link to="/carrinho">
            ← Voltar ao carrinho
          </Link>

        </div>

      </div>

    </section>

  )

}


export default Checkout