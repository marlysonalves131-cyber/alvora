import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
function Admin() {

  const [produto, setProduto] = useState({
    nome: "",
    categoria: "",
    preco: "",
    imagem: "",
    descricao: "",
    estoque: 0
  })

  const [produtos, setProdutos] = useState([])

  const [editando, setEditando] = useState(null)


  useEffect(() => {

    const produtosSalvos =
      localStorage.getItem("produtos")

    if (produtosSalvos) {
      setProdutos(JSON.parse(produtosSalvos))
    }

  }, [])


  function salvarProduto() {

    if (
      !produto.nome ||
      !produto.categoria ||
      !produto.preco
    ) {
      alert("Preencha nome, categoria e preço.")
      return
    }

    const produtoFinal = {
      ...produto,
      estoque: Number(produto.estoque)
    }

    let novosProdutos

    if (editando !== null) {

      novosProdutos = produtos.map((item, index) =>
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

    setProduto({
      nome: "",
      categoria: "",
      preco: "",
      imagem: "",
      descricao: "",
      estoque: 0
    })

    setEditando(null)

  }


  function editarProduto(item, index) {

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


  return (

    <section className="admin">

      <h1>
        🛍️ Painel Administrativo ALVORA
      </h1>
<Link
  to="/admin/pedidos"
  className="botao-pedidos"
>
  📦 Ver Pedidos
</Link>

      <div className="admin-box">

        <h2>
          {editando !== null
            ? "✏️ Editar Produto"
            : "➕ Cadastrar Produto"}
        </h2>


        <input
          type="text"
          placeholder="Nome do produto"
          value={produto.nome}
          onChange={(e) =>
            setProduto({
              ...produto,
              nome: e.target.value
            })
          }
        />


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


        <input
          type="text"
          placeholder="Preço (ex: R$ 89,90)"
          value={produto.preco}
          onChange={(e) =>
            setProduto({
              ...produto,
              preco: e.target.value
            })
          }
        />


        <input
          type="number"
          min="0"
          placeholder="Quantidade em estoque"
          value={produto.estoque}
          onChange={(e) =>
            setProduto({
              ...produto,
              estoque: e.target.value
            })
          }
        />


        <input
          type="text"
          placeholder="URL da imagem do produto"
          value={produto.imagem}
          onChange={(e) =>
            setProduto({
              ...produto,
              imagem: e.target.value
            })
          }
        />


        <textarea
          placeholder="Descrição do produto"
          value={produto.descricao}
          onChange={(e) =>
            setProduto({
              ...produto,
              descricao: e.target.value
            })
          }
        />


        {produto.imagem && (

          <img
            src={produto.imagem}
            alt="Prévia do produto"
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "10px",
              margin: "10px auto"
            }}
          />

        )}


        <button onClick={salvarProduto}>

          {editando !== null
            ? "💾 Salvar Alterações"
            : "➕ Cadastrar Produto"}

        </button>


        {editando !== null && (

          <button
            onClick={() => {

              setProduto({
                nome: "",
                categoria: "",
                preco: "",
                imagem: "",
                descricao: "",
                estoque: 0
              })

              setEditando(null)

            }}
          >
            ❌ Cancelar Edição
          </button>

        )}

      </div>


      <h2>
        Produtos cadastrados
      </h2>


      {produtos.length === 0 && (

        <p>
          Nenhum produto cadastrado.
        </p>

      )}


      {produtos.map((item, index) => (

        <div
          key={index}
          className="curso-admin"
        >

          {item.imagem && (

            <img
              src={item.imagem}
              alt={item.nome}
              style={{
                width: "200px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

          )}


          <h3>
            {item.nome}
          </h3>


          <p>
            Categoria: {item.categoria}
          </p>


          <p>
            Preço: {item.preco}
          </p>


          <p>
            Estoque: {item.estoque} unidade(s)
          </p>


          <button
            onClick={() =>
              editarProduto(item, index)
            }
          >
            ✏️ Editar
          </button>


          <button
            onClick={() =>
              excluirProduto(index)
            }
          >
            🗑️ Excluir
          </button>

        </div>

      ))}

    </section>

  )
}


export default Admin