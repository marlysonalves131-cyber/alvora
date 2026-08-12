function Footer() {

  return (

    <footer className="alvora-footer">

      <div className="footer-conteudo">

        {/* MARCA */}

        <div className="footer-marca">

          <div className="footer-logo">
            A
          </div>

          <h2>
            ALVORA
          </h2>

          <p className="footer-slogan">
            Seu estilo, sua essência.
          </p>

          <p className="footer-descricao">
            Acessórios selecionados para
            quem valoriza personalidade,
            elegância e autenticidade.
          </p>

        </div>


        {/* LINKS */}

        <div className="footer-links">

          <h3>
            Navegação
          </h3>

          <a href="/">
            Início
          </a>

          <a href="/">
            Produtos
          </a>

          <a href="/carrinho">
            Carrinho
          </a>

          <a href="/admin">
            Área administrativa
          </a>

        </div>


        {/* ATENDIMENTO */}

        <div className="footer-atendimento">

          <h3>
            ALVORA
          </h3>

          <p>
            Encontre peças que combinam
            com o seu estilo.
          </p>

          <a
            href="/"
            className="footer-botao"
          >
            Explorar produtos
          </a>

        </div>

      </div>


      {/* LINHA FINAL */}

      <div className="footer-bottom">

        <span>
          © 2026 ALVORA
        </span>

        <span>
          Todos os direitos reservados.
        </span>

      </div>

    </footer>

  )

}

export default Footer