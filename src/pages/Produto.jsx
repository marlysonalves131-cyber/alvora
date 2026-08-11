import { useState } from "react"
import { useLocation, Link } from "react-router-dom"

function Produto({ adicionarAoCarrinho }) {

  const location = useLocation()

  const produto = location.state?.produto

  const [quantidade, setQuantidade] = useState(1)


  if (!produto) {

    return (

      <section className="produto-page">

        <h1>
          Produto não encontrado
        </h1>

        <p>
          Volte para a loja e escolha um produto.
        </p>

        <Link to="/">
          ← Voltar para a loja
        </Link>

      </section>

    )

  }


  const estoque = Number(
    produto.estoque || 0
  )


  function aumentarQuantidade() {

    if (quantidade < estoque) {

      setQuantidade(
        quantidade + 1
      )

    }

  }


  function diminuirQuantidade() {

    if (quantidade > 1) {

      setQuantidade(
        quantidade - 1
      )

    }

  }


  function adicionar() {

    adicionarAoCarrinho(
      produto,
      quantidade
    )

    alert(
      "Produto adicionado ao carrinho! 🛒"
    )

  }


  return (

    <section className="produto-page">

      <div className="produto-detalhes">


        <img
          src={produto.imagem}
          alt={produto.nome}
          className="produto-imagem"
        />


        <div className="produto-info">

          <span className="produto-categoria">
            {produto.categoria}
          </span>


          <h1>
            {produto.nome}
          </h1>


          <p>
            {produto.descricao ||
              "Confira os detalhes deste produto."}
          </p>


          <h2>
            {produto.preco}
          </h2>


          <p>
            📦 Estoque disponível: {estoque}
          </p>


          {estoque > 0 ? (

            <>

              <h3>
                Quantidade
              </h3>


              <div className="quantidade">

                <button
                  onClick={
                    diminuirQuantidade
                  }
                  disabled={
                    quantidade <= 1
                  }
                >
                  −
                </button>


                <strong>
                  {quantidade}
                </strong>


                <button
                  onClick={
                    aumentarQuantidade
                  }
                  disabled={
                    quantidade >= estoque
                  }
                >
                  +
                </button>

              </div>


              <p>
                Você selecionou:{" "}

                <strong>
                  {quantidade} unidade(s)
                </strong>
              </p>


              <button
                className="botao-carrinho"
                onClick={adicionar}
              >
                🛒 Adicionar ao carrinho
              </button>


              <br />


              <Link to="/carrinho">
                🛒 Ver carrinho
              </Link>

            </>

          ) : (

            <h3>
              ❌ Produto esgotado
            </h3>

          )}


          <br />


          <Link
            to="/"
            className="voltar"
          >
            ← Voltar para produtos
          </Link>

        </div>

      </div>

    </section>

  )

}


export default Produto