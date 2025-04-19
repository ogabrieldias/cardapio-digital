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
    
    // Salva total zerado no localStorage
    localStorage.setItem("totalCarrinho", "0.00");
    return;
  }

  let total = 0;

  carrinho.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("carrinho-item");
    itemElement.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" class="item-img">
      <div class="descricao">
        <h3>${item.nome}</h3>
        <p>Preço: R$ ${item.preco.toFixed(2)}</p>
      </div>
      <div class="quantidade">
        <button class="quantidade-btn aumentar" data-index="${index}">
          <i class="fa-solid fa-plus"></i>
        </button>
        <span>${item.quantidade}</span>
        <button class="quantidade-btn diminuir" data-index="${index}">
          <i class="fa-solid fa-minus"></i>
        </button>
      </div>
      <button class="remover" data-index="${index}">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;
    carrinhoContainer.appendChild(itemElement);
    total += item.preco * item.quantidade;
  });

  totalElement.textContent = `R$ ${total.toFixed(2)}`;

  // Salvar o total no localStorage para usar no checkout
  localStorage.setItem("totalCarrinho", total.toFixed(2));

  // Adicionar eventos para os botões
  document.querySelectorAll(".aumentar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.closest("button").dataset.index;
      if (carrinho[index]) {
        carrinho[index].quantidade += 1;
        salvarCarrinho();
      } else {
        console.error("Item não encontrado no carrinho para aumentar a quantidade.");
      }
    });
  });

  document.querySelectorAll(".diminuir").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.closest("button").dataset.index;
      if (carrinho[index]) {
        if (carrinho[index].quantidade > 1) {
          carrinho[index].quantidade -= 1;
        } else {
          carrinho.splice(index, 1);
        }
        salvarCarrinho();
      } else {
        console.error("Item não encontrado no carrinho para diminuir a quantidade.");
      }
    });
  });

  document.querySelectorAll(".remover").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.closest("button").dataset.index;
      if (carrinho[index]) {
        carrinho.splice(index, 1);
        salvarCarrinho();
      } else {
        console.error("Item não encontrado no carrinho para remover.");
      }
    });
  });
}
// document.getElementById("zerar-carrinho").addEventListener("click", () => {
//   if (confirm("Tem certeza de que deseja zerar o carrinho?")) {
//     localStorage.removeItem("carrinho");
//     carrinho = [];
//     renderizarCarrinho();
//   }
// });
// Função para salvar o carrinho no localStorage e atualizar a tela
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

// Carregar carrinho ao abrir a página
renderizarCarrinho();
