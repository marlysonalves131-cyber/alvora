import { Link } from "react-router-dom"

function Carrinho({
  carrinho,
  alterarQuantidade,
  removerProduto
}) {

  const total = carrinho.reduce(
    (soma, item) => {

      const preco =
        Number(
          String(item.preco)
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
        ) || 0

      return soma +
        preco * item.quantidade
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

  if (carrinho.length === 0) {

    return (

      <main className="carrinho-page">

        <div className="carrinho-vazio">

          <div className="carrinho-vazio-icon">
            🛍️
          </div>

          <span>
            SEU CARRINHO
          </span>

          <h1>
            Seu carrinho está vazio
          </h1>

          <p>
            Explore nossos produtos e
            encontre algo especial para você.
          </p>

          <Link
            to="/"
            className="carrinho-voltar"
          >
            Explorar produtos
          </Link>

        </div>

      </main>

    )
  }

  return (

    <main className="carrinho-page">

      <div className="carrinho-container">

        {/* CABEÇALHO */}

        <div className="carrinho-header">

          <span>
            ALVORA SHOP
          </span>

          <h1>
            Seu carrinho
          </h1>

          <p>
            Confira seus produtos antes
            de finalizar a compra.
          </p>

        </div>


        <div className="carrinho-layout">

          {/* PRODUTOS */}

          <section className="carrinho-produtos">

            {carrinho.map(
              (item, index) => {

                const preco =
                  Number(
                    String(item.preco)
                      .replace("R$", "")
                      .replace(/\./g, "")
                      .replace(",", ".")
                  ) || 0

                const subtotal =
                  preco * item.quantidade

                return (

                  <article
                    className="carrinho-item"
                    key={`${item.nome}-${index}`}
                  >

                    {/* IMAGEM */}

                    <div className="carrinho-item-imagem">

                      {item.imagem ? (

                        <img
                          src={item.imagem}
                          alt={item.nome}
                        />

                      ) : (

                        <span>
                          ALVORA
                        </span>

                      )}

                    </div>


                    {/* INFORMAÇÕES */}

                    <div className="carrinho-item-info">

                      <span>
                        {item.categoria}
                      </span>

                      <h2>
                        {item.nome}
                      </h2>

                      <p>
                        {item.preco}
                      </p>


                      {/* QUANTIDADE */}

                      <div className="carrinho-quantidade">

                        <button
                          onClick={() =>
                            alterarQuantidade(
                              index,
                              item.quantidade - 1
                            )
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
                        >
                          +
                        </button>

                      </div>

                    </div>


                    {/* SUBTOTAL */}

                    <div className="carrinho-item-total">

                      <strong>
                        {formatarPreco(
                          subtotal
                        )}
                      </strong>

                      <button
                        onClick={() =>
                          removerProduto(index)
                        }
                        className="carrinho-remover"
                      >
                        Remover
                      </button>

                    </div>

                  </article>

                )
              }
            )}

          </section>


          {/* RESUMO */}

          <aside className="carrinho-resumo">

            <span>
              RESUMO
            </span>

            <h2>
              Sua compra
            </h2>


            <div className="resumo-linha">

              <span>
                Produtos
              </span>

              <strong>
                {carrinho.reduce(
                  (total, item) =>
                    total + item.quantidade,
                  0
                )}
              </strong>

            </div>


            <div className="resumo-linha resumo-total">

              <span>
                Total
              </span>

              <strong>
                {formatarPreco(total)}
              </strong>

            </div>


            <Link
              to="/checkout"
              className="carrinho-finalizar"
            >
              Finalizar compra
            </Link>


            <Link
              to="/"
              className="carrinho-continuar"
            >
              Continuar comprando
            </Link>

          </aside>

        </div>

      </div>

    </main>

  )
}

export default Carrinho