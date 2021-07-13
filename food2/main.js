import { data } from './data.js'

var valor = 0

function montarDivProduto(id, nome, preco, imagem) {
  return `
    <li class = "licardapio" data-id="${id}">
      <a class="item-menu" href="#">
        <div class="item-img">
          <img src="${imagem}" alt="" width="65px" height="60px">
        </div>
        <span class="item-title">${nome}</span>
        <span class="item-preco">R$${preco}</span>
      </a>
    </li>
  `
}

function carregarCardapio(categoriaSelected = null) {
  const cardapio = document.querySelector('.list')

  const listaProdutosMenu = data.reduce(function (accumulator, { id, nome, preco, imagem, categoria }) {
    if (!categoriaSelected) {
      accumulator += montarDivProduto(id, nome, preco, imagem)
    }
    if (categoriaSelected === categoria) {
      accumulator += montarDivProduto(id, nome, preco, imagem)
    }
    return accumulator
  }, '')

  cardapio.innerHTML = listaProdutosMenu
  carregarCardapioClicado()
}
carregarCardapio()

const categorias = document.querySelectorAll('.menu_le')

categorias.forEach(categoria => {
  categoria.addEventListener('click', (event) => {

    const categoriaSelected = event.currentTarget.dataset.categoria
    carregarCardapio(categoriaSelected)

  })
})

const ulPedido = document.querySelector('.listpedidos')


function montarLIpedido(imagem, nome, preco) {
  return `<li class="lipedido">
  <a class="pedido-menu" href="#">
  <div class="pedido-img"><img src="${imagem}" width="60px" ></div>
  <span class="pedido-title">${nome}</span>
  <span class="pedido-preco">${preco.toFixed(2)}</span>
</a>`
}

let listaDepedidos = ''
const valorfinal = document.getElementById('valor')

function montarPedido(produtoEscolhido) {
  listaDepedidos = listaDepedidos + montarLIpedido(produtoEscolhido.imagem, produtoEscolhido.nome, produtoEscolhido.preco)
  valor = valor + produtoEscolhido.preco
  valorfinal.innerHTML = valor.toFixed(2)
  ulPedido.innerHTML = listaDepedidos
}

function carregarCardapioClicado() {

  const recebeProduto = document.querySelectorAll('.licardapio')

  recebeProduto.forEach(produto => {
    produto.addEventListener('click', function (event) {
      const idprodutoSelecionado = event.currentTarget.dataset.id
      let produtoEscolhido = data.find(function (data) {
        return Number(idprodutoSelecionado) === data.id
      })
      montarPedido(produtoEscolhido)
    })
  })
}