import { Link } from "react-router-dom"
import ThemeButton from "./ThemeButton"

function Header({ quantidadeCarrinho = 0 }) {

  return (

    <header className="alvora-header">

      <div className="header-container">

        {/* LOGO */}

        <Link
          to="/"
          className="alvora-logo"
        >
          <span className="logo-mark">
            A
          </span>

          <span className="logo-name">
            ALVORA
          </span>
        </Link>


        {/* MENU */}

        <nav className="alvora-nav">

          <Link to="/">
            Início
          </Link>

          <Link to="/">
            Produtos
          </Link>

          <Link to="/">
            Blog
          </Link>

          <Link to="/">
            Contato
          </Link>

        </nav>


        {/* AÇÕES */}

        <div className="header-actions">

          <Link
            to="/carrinho"
            className="header-cart"
          >
            <span className="cart-icon">
              🛒
            </span>

            <span>
              Carrinho
            </span>

            {quantidadeCarrinho > 0 && (

              <strong>
                {quantidadeCarrinho}
              </strong>

            )}

          </Link>


          <Link
            to="/admin"
            className="header-admin"
          >
            Admin
          </Link>


          <ThemeButton />

        </div>

      </div>

    </header>

  )

}

export default Header