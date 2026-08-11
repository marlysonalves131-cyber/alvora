import { useLocation, Link } from "react-router-dom"

function Curso() {

  const location = useLocation()

  const curso = location.state?.curso


  if (!curso) {

    return (

      <section className="curso-page">

        <h1>Curso não encontrado</h1>

        <p>
          Volte para o catálogo e escolha um curso.
        </p>

        <Link to="/">
          ← Voltar para os cursos
        </Link>

      </section>

    )

  }


  return (

    <section className="curso-page">

      <div className="curso-detalhes">


        <img
          src={curso.imagem}
          alt={curso.nome}
          className="curso-imagem"
        />


        <div className="curso-info">

          <span className="curso-categoria">
            {curso.categoria}
          </span>


          <h1>
            {curso.nome}
          </h1>


          <p>
            {curso.descricao ||
              "Confira todos os detalhes deste curso."}
          </p>


          <h2>
            {curso.preco}
          </h2>


          {curso.link && (

            <a
              href={curso.link}
              target="_blank"
              rel="noopener noreferrer"
              className="botao-comprar"
            >
              🛒 Quero conhecer o curso
            </a>

          )}


          <Link
            to="/"
            className="voltar"
          >
            ← Voltar para cursos
          </Link>

        </div>

      </div>

    </section>

  )

}


export default Curso