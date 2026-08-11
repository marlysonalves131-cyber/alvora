import { Link } from "react-router-dom"

function Carrinho({
  carrinho,
  alterarQuantidade,
  removerProduto
}) {

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


  return (

    <section className="carrinho-page">

      <h1>
        🛒 Meu Carrinho
      </h1>


      {carrinho.length === 0 ? (

        <div className="carrinho-vazio">

          <h2>
            Seu carrinho está vazio.
          </h2>

          <p>
            Encontre um produto na ALVORA
            e adicione ao seu carrinho.
          </p>

          <Link to="/">
            ← Continuar comprando
          </Link>

        </div>

      ) : (

        <>

          <div className="carrinho-lista">

            {carrinho.map(
              (item, index) => {

                const preco =
                  converterPreco(
                    item.preco
                  )

                const subtotal =
                  preco * item.quantidade


                return (

                  <div
                    className="item-carrinho"
                    key={`${item.nome}-${index}`}
                  >

                    <img
                      src={item.imagem}
                      alt={item.nome}
                    />


                    <div className="item-info">

                      <h3>
                        {item.nome}
                      </h3>


                      <p>
                        {item.categoria}
                      </p>


                      <p>
                        Preço unitário:
                        {" "}
                        {item.preco}
                      </p>


                      <div className="quantidade">

                        <button
                          onClick={() =>
                            alterarQuantidade(
                              index,
                              item.quantidade - 1
                            )
                          }
                          disabled={
                            item.quantidade <= 1
                          }
                        >
                          −
                        </button>


                        <strong>
                          {item.quantidade}
                        </strong>


                        <button
                          onClick={() =>
                            alterarQuantidade(
                              index,
                              item.quantidade + 1
                            )
                          }
                          disabled={
                            item.quantidade >=
                            Number(
                              item.estoque
                            )
                          }
                        >
                          +
                        </button>

                      </div>


                      <h3>
                        Subtotal: R${" "}
                        {subtotal
                          .toFixed(2)
                          .replace(".", ",")}
                      </h3>


                      <button
                        onClick={() =>
                          removerProduto(index)
                        }
                      >
                        🗑️ Remover
                      </button>

                    </div>

                  </div>

                )

              }
            )}

          </div>


          <div className="carrinho-resumo">

            <h2>
              Resumo da compra
            </h2>


            <h3>
              Total: R${" "}
              {total
                .toFixed(2)
                .replace(".", ",")}
            </h3>


           <Link
  to="/checkout"
  className="botao-finalizar"
>
  Finalizar compra
</Link>
          </div>


          <Link to="/">
            ← Continuar comprando
          </Link>

        </>

      )}

    </section>

  )

}


export default Carrinho