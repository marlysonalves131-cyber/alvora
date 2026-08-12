import "./Hero.css"

function Hero() {
  return (
    <section className="alvora-hero">

      <div className="gold-orb orb-1"></div>
      <div className="gold-orb orb-2"></div>

      <div className="diamond diamond-1"></div>
      <div className="diamond diamond-2"></div>
      <div className="diamond diamond-3"></div>

      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>
      <div className="wave wave-4"></div>

      <div className="hero-content">

        <span className="hero-label">
          ALVORA
        </span>

        <h1>
          Seu estilo começa aqui
        </h1>

        <p>
          Descubra peças que combinam com você
          e encontre acessórios com personalidade,
          elegância e estilo.
        </p>

        <button
          className="hero-button"
          onClick={() => {
            document
              .getElementById("produtos")
              ?.scrollIntoView({
                behavior: "smooth"
              })
          }}
        >
          Explorar Produtos
        </button>

      </div>

    </section>
  )
}

export default Hero