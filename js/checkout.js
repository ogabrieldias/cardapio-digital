// ✅ Carrega os itens do carrinho e o total
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const total = parseFloat(localStorage.getItem("totalCarrinho")) || 0.00;

// ✅ Referências aos elementos HTML
const itensPedido = document.getElementById("itens-pedido");
const valorTotal = document.getElementById("valor-total");
const botaoFinalizar = document.getElementById("finalizar-pedido");

// ✅ Renderiza os produtos do carrinho na tela
function renderizarItensCarrinho() {
  if (!itensPedido) return;

  if (carrinho.length === 0) {
    itensPedido.innerHTML = "<p>O carrinho está vazio.</p>";
    valorTotal.textContent = "R$ 0,00";
    return;
  }

  itensPedido.innerHTML = "";

  carrinho.forEach((item) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("item-resumo");

    const precoTotal = (item.preco * item.quantidade).toFixed(2).replace('.', ',');

    itemEl.innerHTML = `
      <span><strong>${item.nome}</strong> (x${item.quantidade})</span>
      <span>R$ ${precoTotal}</span>
    `;

    itensPedido.appendChild(itemEl);
  });

  valorTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// ✅ Espera o DOM carregar para adicionar eventos
document.addEventListener("DOMContentLoaded", () => {
  renderizarItensCarrinho();

  const stripe = Stripe("pk_test_51RAK5yEtEZnDFJIfLQL9zOndq2A7xby6pl7dTWXsvmeijnFpcjjyib8fLzocNrUjhFFQwALdWz31xSEsNy07cg7d00BNZeBt5m");

  if (botaoFinalizar) {
    botaoFinalizar.addEventListener("click", async () => {
      const response = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carrinho, total }),
      });

      if (!response.ok) {
        alert("Erro ao iniciar pagamento.");
        return;
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    });
  }
});
