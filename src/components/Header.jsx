import { Link } from "react-router-dom"
import ThemeButton from "./ThemeButton"

function Header({ quantidadeCarrinho = 0 }) {

  return (
    <header className="alvora-header">

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

        <Link to="/carrinho">
          🛒 Carrinho ({quantidadeCarrinho})
        </Link>

        <Link to="/admin">
          🔐 Admin
        </Link>

        <ThemeButton />

      </nav>

    </header>
  )
}

export default Header