// Recuperar carrinho do localStorage
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const carrinhoContainer = document.getElementById("carrinho-itens");
const totalElement = document.getElementById("total");

// Função para renderizar o carrinho
function renderizarCarrinho() {
  carrinhoContainer.innerHTML = "";

  if (carrinho.length === 0) {
    carrinhoContainer.innerHTML = "<p>O carrinho está vazio.</p>";
    totalElement.textContent = "R$ 0,00";
    return;
  }

  let total = 0;

  carrinho.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("carrinho-item");
    itemElement.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" class="item-img">
      <div class="item-info">
        <h3>${item.nome}</h3>
        <p>Preço: R$ ${item.preco.toFixed(2)}</p>
        <div class="quantidade">
          <button class="diminuir" data-index="${index}">-</button>
          <span>${item.quantidade}</span>
          <button class="aumentar" data-index="${index}">+</button>
        </div>
        <button class="remover" data-index="${index}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
    carrinhoContainer.appendChild(itemElement);
    total += item.preco * item.quantidade;
  });

  totalElement.textContent = `R$ ${total.toFixed(2)}`;

  // Adicionar eventos para os botões
  document.querySelectorAll(".aumentar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      carrinho[index].quantidade += 1;
      salvarCarrinho();
    });
  });

  document.querySelectorAll(".diminuir").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade -= 1;
      } else {
        carrinho.splice(index, 1);
      }
      salvarCarrinho();
    });
  });

  document.querySelectorAll(".remover").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      carrinho.splice(index, 1);
      salvarCarrinho();
    });
  });
}

// Função para salvar o carrinho no localStorage e atualizar a tela
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

// Carregar carrinho ao abrir a página
renderizarCarrinho();
