import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Produtos() {

  const [busca, setBusca] = useState("")
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos")
  const [favoritos, setFavoritos] = useState([])

  const [produtos, setProdutos] = useState([])


  const produtosPadrao = [
    {
      nome: "Relógio Masculino",
      categoria: "Relógios",
      imagem: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
      preco: "R$ 89,90",
      descricao: "Relógio masculino elegante para uso diário."
    },

    {
      nome: "Pulseira Masculina",
      categoria: "Pulseiras",
      imagem: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a",
      preco: "R$ 49,90",
      descricao: "Pulseira moderna para complementar seu estilo."
    },

    {
      nome: "Corrente Masculina",
      categoria: "Correntes",
      imagem: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
      preco: "R$ 69,90",
      descricao: "Corrente elegante para diferentes ocasiões."
    },

    {
      nome: "Anel Masculino",
      categoria: "Anéis",
      imagem: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
      preco: "R$ 59,90",
      descricao: "Anel moderno com design sofisticado."
    },

    {
      nome: "Óculos de Sol",
      categoria: "Óculos",
      imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
      preco: "R$ 79,90",
      descricao: "Óculos de sol para completar seu visual."
    }
  ]


  useEffect(() => {

    const produtosSalvos =
      localStorage.getItem("produtos")

    if (produtosSalvos) {

      const produtosAdmin =
        JSON.parse(produtosSalvos)

      setProdutos([
        ...produtosPadrao,
        ...produtosAdmin
      ])

    } else {

      setProdutos(produtosPadrao)

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


  function adicionarFavorito(produto) {

    if (!favoritos.includes(produto.nome)) {

      setFavoritos([
        ...favoritos,
        produto.nome
      ])

    }

  }


  const produtosFiltrados = produtos.filter((produto) => {

    const nomeEncontrado =
      produto.nome
        .toLowerCase()
        .includes(busca.toLowerCase())


    const categoriaEncontrada =
      categoriaSelecionada === "Todos" ||
      produto.categoria === categoriaSelecionada


    return nomeEncontrado && categoriaEncontrada

  })


  return (

    <section className="cursos">

      <h2>
        🛍️ Produtos em Destaque
      </h2>


      <p>
        ⭐ Favoritos: {favoritos.length}
      </p>


      <div className="categorias">

        {categorias.map((categoria) => (

          <button
            key={categoria}
            onClick={() =>
              setCategoriaSelecionada(categoria)
            }
          >
            {categoria}
          </button>

        ))}

      </div>


      <input
        className="pesquisa"
        type="text"
        placeholder="Pesquisar produto..."
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)
        }
      />


      <div className="cards">

        {produtosFiltrados.map((produto, index) => (

          <div
            className="card"
            key={`${produto.nome}-${index}`}
          >

            <img
              src={produto.imagem}
              alt={produto.nome}
            />


            <h3>
              {produto.nome}
            </h3>


            <span>
              {produto.categoria}
            </span>


            <p>
              {produto.descricao}
            </p>


            <h4>
              {produto.preco}
            </h4>


            <Link
              to="/produto"
              state={{ produto }}
              className="botao-curso"
            >
              Ver Produto
            </Link>


            <button
              className="favorito"
              onClick={() =>
                adicionarFavorito(produto)
              }
            >
              ❤️ Favoritar
            </button>

          </div>

        ))}

      </div>

    </section>

  )

}


export default Produtos