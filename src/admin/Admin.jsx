import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Admin() {

  const produtoInicial = {
    nome: "",
    categoria: "",
    preco: "",
    imagem: "",
    descricao: "",
    estoque: 0
  }

  const [produto, setProduto] =
    useState(produtoInicial)

  const [produtos, setProdutos] =
    useState([])

  const [editando, setEditando] =
    useState(null)

  const [busca, setBusca] =
    useState("")

  useEffect(() => {

    const produtosSalvos =
      localStorage.getItem("produtos")

    if (produtosSalvos) {
      setProdutos(
        JSON.parse(produtosSalvos)
      )
    }

  }, [])

  function salvarProduto() {

    if (
      !produto.nome ||
      !produto.categoria ||
      !produto.preco
    ) {

      alert(
        "Preencha nome, categoria e preço."
      )

      return
    }

    const produtoFinal = {
      ...produto,
      estoque: Number(produto.estoque)
    }

    let novosProdutos

    if (editando !== null) {

      novosProdutos =
        produtos.map((item, index) =>
          index === editando
            ? produtoFinal
            : item
        )

    } else {

      novosProdutos = [
        ...produtos,
        produtoFinal
      ]

    }

    setProdutos(novosProdutos)

    localStorage.setItem(
      "produtos",
      JSON.stringify(novosProdutos)
    )

    setProduto(produtoInicial)

    setEditando(null)

  }

  function editarProduto(
    item,
    index
  ) {

    setProduto({
      ...item,
      estoque: item.estoque ?? 0
    })

    setEditando(index)

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })

  }

  function excluirProduto(index) {

    const confirmar =
      window.confirm(
        "Deseja realmente excluir este produto?"
      )

    if (!confirmar) {
      return
    }

    const novosProdutos =
      produtos.filter(
        (_, i) => i !== index
      )

    setProdutos(novosProdutos)

    localStorage.setItem(
      "produtos",
      JSON.stringify(novosProdutos)
    )

  }

  function cancelarEdicao() {

    setProduto(produtoInicial)

    setEditando(null)

  }

  const produtosFiltrados =
    produtos.filter((item) => {

      const texto =
        busca.toLowerCase()

      return (
        item.nome
          ?.toLowerCase()
          .includes(texto) ||

        item.categoria
          ?.toLowerCase()
          .includes(texto)
      )

    })

  const totalProdutos =
    produtos.length

  const totalEstoque =
    produtos.reduce(
      (total, item) =>
        total + Number(item.estoque || 0),
      0
    )

  const produtosSemEstoque =
    produtos.filter(
      (item) =>
        Number(item.estoque) <= 0
    ).length

  return (

    <main className="admin-novo">

      {/* CABEÇALHO */}

      <section className="admin-header">

        <div>

          <span className="admin-label">
            ALVORA ADMIN
          </span>

          <h1>
            Painel Administrativo
          </h1>

          <p>
            Gerencie seus produtos,
            estoque e pedidos.
          </p>

        </div>

        <Link
          to="/admin/pedidos"
          className="admin-pedidos-button"
        >
          📦 Ver pedidos
        </Link>

      </section>


      {/* RESUMO */}

      <section className="admin-stats">

        <div className="admin-stat">

          <span>
            Produtos
          </span>

          <strong>
            {totalProdutos}
          </strong>

        </div>


        <div className="admin-stat">

          <span>
            Estoque total
          </span>

          <strong>
            {totalEstoque}
          </strong>

        </div>


        <div className="admin-stat">

          <span>
            Sem estoque
          </span>

          <strong>
            {produtosSemEstoque}
          </strong>

        </div>

      </section>


      {/* CADASTRO */}

      <section className="admin-form-card">

        <div className="admin-section-title">

          <div>

            <span>
              {editando !== null
                ? "EDIÇÃO"
                : "NOVO PRODUTO"}
            </span>

            <h2>
              {editando !== null
                ? "Editar produto"
                : "Cadastrar produto"}
            </h2>

          </div>

        </div>


        <div className="admin-form">

          <div className="admin-field">

            <label>
              Nome do produto
            </label>

            <input
              type="text"
              placeholder="Ex: Relógio Alvora"
              value={produto.nome}
              onChange={(e) =>
                setProduto({
                  ...produto,
                  nome: e.target.value
                })
              }
            />

          </div>


          <div className="admin-field">

            <label>
              Categoria
            </label>

            <select
              value={produto.categoria}
              onChange={(e) =>
                setProduto({
                  ...produto,
                  categoria: e.target.value
                })
              }
            >

              <option value="">
                Selecione uma categoria
              </option>

              <option value="Relógios">
                Relógios
              </option>

              <option value="Pulseiras">
                Pulseiras
              </option>

              <option value="Correntes">
                Correntes
              </option>

              <option value="Anéis">
                Anéis
              </option>

              <option value="Óculos">
                Óculos
              </option>

              <option value="Outros">
                Outros acessórios
              </option>

            </select>

          </div>


          <div className="admin-field">

            <label>
              Preço
            </label>

            <input
              type="text"
              placeholder="R$ 89,90"
              value={produto.preco}
              onChange={(e) =>
                setProduto({
                  ...produto,
                  preco: e.target.value
                })
              }
            />

          </div>


          <div className="admin-field">

            <label>
              Estoque
            </label>

            <input
              type="number"
              min="0"
              placeholder="Quantidade"
              value={produto.estoque}
              onChange={(e) =>
                setProduto({
                  ...produto,
                  estoque: e.target.value
                })
              }
            />

          </div>


          <div className="admin-field admin-field-full">

            <label>
              URL da imagem
            </label>

            <input
              type="text"
              placeholder="Cole aqui o endereço da imagem"
              value={produto.imagem}
              onChange={(e) =>
                setProduto({
                  ...produto,
                  imagem: e.target.value
                })
              }
            />

          </div>


          <div className="admin-field admin-field-full">

            <label>
              Descrição
            </label>

            <textarea
              placeholder="Descreva o produto..."
              value={produto.descricao}
              onChange={(e) =>
                setProduto({
                  ...produto,
                  descricao: e.target.value
                })
              }
            />

          </div>

        </div>


        {/* PRÉVIA */}

        {produto.imagem && (

          <div className="admin-preview">

            <span>
              PRÉVIA
            </span>

            <img
              src={produto.imagem}
              alt="Prévia do produto"
            />

          </div>

        )}


        <div className="admin-actions">

          <button
            className="admin-save-button"
            onClick={salvarProduto}
          >
            {editando !== null
              ? "💾 Salvar alterações"
              : "＋ Cadastrar produto"}
          </button>


          {editando !== null && (

            <button
              className="admin-cancel-button"
              onClick={cancelarEdicao}
            >
              Cancelar edição
            </button>

          )}

        </div>

      </section>


      {/* PRODUTOS */}

      <section className="admin-products-section">

        <div className="admin-products-header">

          <div>

            <span>
              CATÁLOGO
            </span>

            <h2>
              Produtos cadastrados
            </h2>

          </div>


          <input
            className="admin-search"
            type="text"
            placeholder="🔎 Buscar produto..."
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
          />

        </div>


        {produtosFiltrados.length === 0 ? (

          <div className="admin-empty">

            <div>
              📦
            </div>

            <h3>
              Nenhum produto encontrado
            </h3>

            <p>
              Cadastre seu primeiro produto
              acima.
            </p>

          </div>

        ) : (

          <div className="admin-products-grid">

            {produtosFiltrados.map(
              (item, index) => {

                const estoque =
                  Number(
                    item.estoque || 0
                  )

                const indexOriginal =
                  produtos.findIndex(
                    (produtoOriginal) =>
                      produtoOriginal === item
                  )

                return (

                  <article
                    className="admin-product-card"
                    key={`${item.nome}-${index}`}
                  >

                    <div className="admin-product-image">

                      {item.imagem ? (

                        <img
                          src={item.imagem}
                          alt={item.nome}
                        />

                      ) : (

                        <div>
                          ALVORA
                        </div>

                      )}

                    </div>


                    <div className="admin-product-info">

                      <span>
                        {item.categoria}
                      </span>

                      <h3>
                        {item.nome}
                      </h3>

                      <strong>
                        {item.preco}
                      </strong>

                      <p>
                        Estoque:{" "}
                        {estoque} unidade(s)
                      </p>

                    </div>


                    <div className="admin-product-actions">

                      <button
                        onClick={() =>
                          editarProduto(
                            item,
                            indexOriginal
                          )
                        }
                      >
                        ✏️ Editar
                      </button>


                      <button
                        onClick={() =>
                          excluirProduto(
                            indexOriginal
                          )
                        }
                      >
                        🗑️ Excluir
                      </button>

                    </div>

                  </article>

                )
              }
            )}

          </div>

        )}

      </section>

    </main>
  )
}

export default Admin