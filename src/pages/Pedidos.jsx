import { useEffect, useState } from "react"

function Pedidos() {

  const [pedidos, setPedidos] = useState([])


  useEffect(() => {

    const pedidosSalvos =
      JSON.parse(localStorage.getItem("pedidos")) || []


    setPedidos(pedidosSalvos)

  }, [])


  return (

    <section className="pedidos">

      <h1>
        📦 Pedidos da ALVORA
      </h1>


      {
        pedidos.length === 0 ? (

          <p>
            Nenhum pedido realizado ainda.
          </p>

        ) : (


          pedidos.map((pedido) => (

            <div
              className="pedido-card"
              key={pedido.numero}
            >

              <h2>
                {pedido.numero}
              </h2>


              <p>
                📅 {pedido.data}
              </p>


              <h3>
                Cliente
              </h3>

              <p>
                Nome: {pedido.cliente.nome}
              </p>

              <p>
                Telefone: {pedido.cliente.telefone}
              </p>


              <h3>
                Produtos
              </h3>


              {
                pedido.produtos.map(
                  (produto, index) => (

                    <p key={index}>
                      {produto.nome} -
                      Quantidade: {produto.quantidade}
                    </p>

                  )
                )
              }


              <h3>
                Pagamento
              </h3>

              <p>
                {pedido.pagamento}
              </p>


              <h3>
                Total
              </h3>

              <p>
                R$ {pedido.total
                  .toFixed(2)
                  .replace(".", ",")}
              </p>


              <strong>
                Status: {pedido.status}
              </strong>


            </div>

          ))

        )
      }


    </section>

  )

}


export default Pedidos