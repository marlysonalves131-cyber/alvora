import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function Cursos() {

  const [busca, setBusca] = useState("")
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos")
  const [favoritos, setFavoritos] = useState([])

  const [cursos, setCursos] = useState([])


  const cursosPadrao = [
    {
      nome: "Marketing Digital",
      categoria: "Vendas",
      imagem: "https://via.placeholder.com/300x180",
      preco: "R$ 97,00",
      descricao: "Aprenda estratégias para vender produtos na internet."
    },

    {
      nome: "Informática Profissional",
      categoria: "Tecnologia",
      imagem: "https://via.placeholder.com/300x180",
      preco: "R$ 79,00",
      descricao: "Aprenda ferramentas usadas no mercado de trabalho."
    },

    {
      nome: "Inteligência Artificial",
      categoria: "Tecnologia",
      imagem: "https://via.placeholder.com/300x180",
      preco: "R$ 147,00",
      descricao: "Use IA para melhorar seus resultados."
    },

    {
      nome: "Design Gráfico",
      categoria: "Criatividade",
      imagem: "https://via.placeholder.com/300x180",
      preco: "R$ 89,00",
      descricao: "Crie artes e conteúdos profissionais."
    },

    {
      nome: "Inglês Online",
      categoria: "Idiomas",
      imagem: "https://via.placeholder.com/300x180",
      preco: "R$ 120,00",
      descricao: "Aprenda inglês do básico ao avançado."
    },

    {
      nome: "Negócios Digitais",
      categoria: "Empreendedorismo",
      imagem: "https://via.placeholder.com/300x180",
      preco: "R$ 197,00",
      descricao: "Aprenda a criar negócios pela internet."
    }
  ]


  useEffect(() => {

    const cursosSalvos = localStorage.getItem("cursos")

    if (cursosSalvos) {

      const cursosAdmin = JSON.parse(cursosSalvos)

      setCursos([
        ...cursosPadrao,
        ...cursosAdmin
      ])

    } else {

      setCursos(cursosPadrao)

    }

  }, [])


  const categorias = [
    "Todos",
    "Vendas",
    "Tecnologia",
    "Criatividade",
    "Idiomas",
    "Empreendedorismo"
  ]


  function adicionarFavorito(curso) {

    if (!favoritos.includes(curso.nome)) {

      setFavoritos([
        ...favoritos,
        curso.nome
      ])

    }

  }


  const cursosFiltrados = cursos.filter((curso) => {

    const nomeEncontrado = curso.nome
      .toLowerCase()
      .includes(busca.toLowerCase())


    const categoriaEncontrada =
      categoriaSelecionada === "Todos" ||
      curso.categoria === categoriaSelecionada


    return nomeEncontrado && categoriaEncontrada

  })


  return (

    <section className="cursos">

      <h2>
        Cursos em Destaque
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
        placeholder="Pesquisar curso..."
        value={busca}
        onChange={(e) =>
          setBusca(e.target.value)
        }
      />


      <div className="cards">

        {cursosFiltrados.map((curso, index) => (

          <div
            className="card"
            key={`${curso.nome}-${index}`}
          >

            <img
              src={curso.imagem}
              alt={curso.nome}
            />


            <h3>
              {curso.nome}
            </h3>


            <span>
              {curso.categoria}
            </span>


            <p>
              {curso.descricao ||
                "Confira este curso no Mundo Vendas."}
            </p>


            <h4>
              {curso.preco}
            </h4>


            <Link
              to="/curso"
              state={{ curso }}
              className="botao-curso"
            >
              Ver Curso
            </Link>


            <button
              className="favorito"
              onClick={() =>
                adicionarFavorito(curso)
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


export default Cursos