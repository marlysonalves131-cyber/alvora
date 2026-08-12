import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Produtos() {

  const [produtos, setProdutos] = useState([])

  const [categoria, setCategoria] =
    useState("Todos")

  useEffect(() => {

    const produtosSalvos =
      localStorage.getItem("produtos")

    if (produtosSalvos) {

      setProdutos(
        JSON.parse(produtosSalvos)
      )

    }

  }, [])

  const categorias = [
    "Todos",
    "Relógios",
    "Pulseiras",
    "Correntes",
    "Anéis",
    "Óculos",
    "Outros"
  ]

  const produtosFiltrados =
    categoria === "Todos"
      ? produtos
      : produtos.filter(
          (produto) =>
            produto.categoria === categoria
        )

  return (

    <section
      className="produtos"
      id="produtos"
    >

      {/* CABEÇALHO */}

      <div className="produtos-header">

        <span className="produtos-label">
          COLEÇÃO ALVORA
        </span>

        <h2>
          Encontre seu estilo
        </h2>

        <p>
          Escolha entre nossas peças
          e encontre o acessório perfeito
          para você.
        </p>

      </div>


      {/* CATEGORIAS */}

      <div className="produtos-categorias">

        {categorias.map(
          (item) => (

            <button
              key={item}
              className={
                categoria === item
                  ? "categoria-ativa"
                  : ""
              }
              onClick={() =>
                setCategoria(item)
              }
            >
              {item}
            </button>

          )
        )}

      </div>


      {/* PRODUTOS */}

      {produtosFiltrados.length === 0 ? (

        <div className="produtos-vazio">

          <div>
            📦
          </div>

          <h3>
            Nenhum produto encontrado
          </h3>

          <p>
            Os produtos cadastrados no
            painel administrativo aparecerão
            aqui.
          </p>

        </div>

      ) : (

        <div className="produtos-grid">

          {produtosFiltrados.map(
            (produto, index) => (

              <article
                className="produto-card"
                key={`${produto.nome}-${index}`}
              >

                {/* IMAGEM */}

                <div className="produto-imagem">

                  {produto.imagem ? (

                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                    />

                  ) : (

                    <div className="produto-sem-imagem">
                      ALVORA
                    </div>

                  )}

                </div>


                {/* INFORMAÇÕES */}

                <div className="produto-info">

                  <span className="produto-categoria">
                    {produto.categoria}
                  </span>

                  <h3>
                    {produto.nome}
                  </h3>

                  <p className="produto-descricao">
                    {produto.descricao}
                  </p>

                  <strong className="produto-preco">
                    {produto.preco}
                  </strong>

                  <p className="produto-estoque">

                    {Number(produto.estoque) > 0
                      ? `${produto.estoque} unidade(s) disponíveis`
                      : "Produto sem estoque"}

                  </p>


                  {/* BOTÃO */}

                  {Number(produto.estoque) > 0 ? (

                    <Link
                      to={`/produto?nome=${encodeURIComponent(
                        produto.nome
                      )}`}
                      className="produto-button"
                    >
                      Ver produto
                    </Link>

                  ) : (

                    <button
                      className="produto-button produto-indisponivel"
                      disabled
                    >
                      Sem estoque
                    </button>

                  )}

                </div>

              </article>

            )
          )}

        </div>

      )}

    </section>

  )
}

export default Produtos