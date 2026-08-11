import { useState } from "react"
import "./App.css"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Header from "./components/Header"
import Banner from "./components/Banner"
import Produtos from "./components/Produtos"
import Footer from "./components/Footer"
import Carrinho from "./components/Carrinho"
import Checkout from "./pages/Checkout"
import Produto from "./pages/Produto"
import Pedidos from "./pages/Pedidos"
import Admin from "./admin/Admin"
import LoginAdmin from "./admin/LoginAdmin"


function App() {

  const [adminLogado, setAdminLogado] = useState(false)

  const [carrinho, setCarrinho] = useState([])


  function adicionarAoCarrinho(produto, quantidade) {

    setCarrinho((carrinhoAtual) => {

      const produtoExistente =
        carrinhoAtual.find(
          (item) => item.nome === produto.nome
        )


      if (produtoExistente) {

        return carrinhoAtual.map((item) => {

          if (item.nome === produto.nome) {

            const novaQuantidade =
              item.quantidade + quantidade

            return {
              ...item,
              quantidade: Math.min(
                novaQuantidade,
                Number(item.estoque)
              )
            }

          }

          return item

        })

      }


      return [
        ...carrinhoAtual,
        {
          ...produto,
          quantidade
        }
      ]

    })

  }


  function alterarQuantidade(index, novaQuantidade) {

    setCarrinho((carrinhoAtual) => {

      return carrinhoAtual.map((item, i) => {

        if (i === index) {

          const quantidadeFinal = Math.max(
            1,
            Math.min(
              novaQuantidade,
              Number(item.estoque)
            )
          )

          return {
            ...item,
            quantidade: quantidadeFinal
          }

        }

        return item

      })

    })

  }


  function removerProduto(index) {

    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.filter(
        (_, i) => i !== index
      )
    )

  }


  const quantidadeCarrinho =
    carrinho.reduce(
      (total, item) =>
        total + item.quantidade,
      0
    )


  return (

    <BrowserRouter>

      <Header
        quantidadeCarrinho={
          quantidadeCarrinho
        }
      />


      <Routes>

        <Route
          path="/"
          element={
            <>
              <Banner />
              <Produtos />
            </>
          }
        />
<Route 
  path="/admin/pedidos" 
  element={<Pedidos />} 
/>

        <Route
          path="/produto"
          element={
            <Produto
              adicionarAoCarrinho={
                adicionarAoCarrinho
              }
            />
          }
        />


        <Route
          path="/carrinho"
          element={
            <Carrinho
              carrinho={carrinho}
              alterarQuantidade={
                alterarQuantidade
              }
              removerProduto={
                removerProduto
              }
            />
          }
        />


        <Route
          path="/admin"
          element={
            adminLogado ? (
              <Admin />
            ) : (
              <LoginAdmin
                entrar={() =>
                  setAdminLogado(true)
                }
              />
            )
          }
        />
<Route
  path="/checkout"
  element={
    <Checkout
      carrinho={carrinho}
    />
  }
/>
      </Routes>


      <Footer />

    </BrowserRouter>

  )

}


export default App