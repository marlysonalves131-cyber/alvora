import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Produtos() {

  const [produtos, setProdutos] = useState([])

  const [categoriaSelecionada, setCategoriaSelecionada] =
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
    ...new Set(
      produtos
        .map((produto) => produto.categoria)
        .filter(Boolean)
    )
  ]

  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtos
      : produtos.filter(
          (produto) =>
            produto.categoria ===
            categoriaSelecionada
        )

  return (

    <section className="alvora-produtos">

      <div className="produtos-container">

        {/* CABEÇALHO */}

        <div className="produtos-header">

          <span className="produtos-label">
            COLEÇÃO ALVORA
          </span>

          <h2>
            Peças que combinam com você
          </h2>

          <p>
            Descubra acessórios selecionados
            para deixar seu estilo ainda mais
            marcante.
          </p>

        </div>


        {/* CATEGORIAS */}

        {produtos.length > 0 && (

          <div className="produtos-categorias">

            {categorias.map(
              (categoria) => (

                <button
                  key={categoria}
                  className={
                    categoriaSelecionada ===
                    categoria
                      ? "categoria-ativa"
                      : ""
                  }
                  onClick={() =>
                    setCategoriaSelecionada(
                      categoria
                    )
                  }
                >
                  {categoria}
                </button>

              )
            )}

          </div>

        )}


        {/* PRODUTOS */}

        {produtosFiltrados.length === 0 ? (

          <div className="produtos-vazio">

            <div className="vazio-icon">
              A
            </div>

            <h3>
              Nenhum produto disponível
            </h3>

            <p>
              Os produtos da ALVORA aparecerão
              aqui assim que forem cadastrados.
            </p>

          </div>

        ) : (

          <div className="produtos-grid">

            {produtosFiltrados.map(
              (produto, index) => (

                <article
                  className="produto-card-alvora"
                  key={
                    produto.nome + index
                  }
                >

                  {/* IMAGEM */}

                  <Link
                    to={`/produto?nome=${encodeURIComponent(
                      produto.nome
                    )}`}
                    className="produto-imagem-alvora"
                  >

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

                    {Number(
                      produto.estoque
                    ) <= 0 && (

                      <span className="produto-esgotado">
                        Esgotado
                      </span>

                    )}

                  </Link>


                  {/* INFORMAÇÕES */}

                  <div className="produto-card-info">

                    <span className="produto-categoria">
                      {produto.categoria ||
                        "Acessório"}
                    </span>

                    <Link
                      to={`/produto?nome=${encodeURIComponent(
                        produto.nome
                      )}`}
                      className="produto-nome"
                    >
                      {produto.nome}
                    </Link>

                    <p className="produto-descricao">

                      {produto.descricao ||
                        "Produto exclusivo ALVORA."}

                    </p>


                    <div className="produto-card-bottom">

                      <strong className="produto-preco">
                        {produto.preco}
                      </strong>

                      <span className="produto-estoque">

                        {Number(
                          produto.estoque
                        ) > 0

                          ? `${produto.estoque} disponível`
                          : "Sem estoque"}

                      </span>

                    </div>


                    <Link
                      to={`/produto?nome=${encodeURIComponent(
                        produto.nome
                      )}`}
                      className="produto-ver"
                    >
                      Ver produto
                      <span>
                        →
                      </span>
                    </Link>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </div>

    </section>

  )

}

export default Produtos