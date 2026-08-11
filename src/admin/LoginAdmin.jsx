import { useState } from "react"

function LoginAdmin({ entrar }) {

  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")


  function fazerLogin(e) {

    e.preventDefault()


    if (senha === "123456") {

      entrar()

    } else {

      setErro("Senha incorreta.")

    }

  }


  return (

    <section className="login-admin">

      <div className="login-box">

        <h1>Área Administrativa</h1>

        <p>
          Digite a senha para acessar o painel.
        </p>


        <form onSubmit={fazerLogin}>

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />


          <button type="submit">
            Entrar
          </button>

        </form>


        {erro && (
          <p className="erro-login">
            {erro}
          </p>
        )}

      </div>

    </section>

  )

}


export default LoginAdmin