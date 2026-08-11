import { useState } from "react"

function ThemeButton() {

  const [escuro, setEscuro] = useState(false)


  function mudarTema() {

    setEscuro(!escuro)

    document.body.classList.toggle("dark")

  }


  return (

    <button 
      className="tema"
      onClick={mudarTema}
    >
      {escuro ? "☀️ Claro" : "🌙 Escuro"}
    </button>

  )

}

export default ThemeButton