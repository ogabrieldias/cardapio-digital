import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCkO2_nDY3XuMmEgX7sWg2uHyy_jT7qupE",
    authDomain: "cardapio-digital-82ff8.firebaseapp.com",
    projectId: "cardapio-digital-82ff8",
    storageBucket: "cardapio-digital-82ff8.firebasestorage.app",
    messagingSenderId: "466179124525",
    appId: "1:466179124525:web:885f8360e4c2c45370b7a4"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Pegar ID do produto na URL
const params = new URLSearchParams(window.location.search);
const produtoId = params.get("id");

// Função para buscar detalhes do produto
async function loadDetalhes() {
  if (!produtoId) {
    document.getElementById("produto-detalhes").innerHTML = "<p>Produto não encontrado.</p>";
    return;
  }

  const docRef = doc(db, "cardapio", produtoId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("produto-detalhes").innerHTML = `
      <img src="${data.imagem}" alt="${data.nome}">
      <h2>${data.nome}</h2>
      <p>${data.descricao}</p>
      <p class="preco">Preço: R$ ${data.preco}</p>
    `;

    // Adiciona o evento de clique para adicionar ao carrinho
    document.getElementById("add-to-cart").addEventListener("click", () => {
      adicionarAoCarrinho(produtoId, data);
    });
  } else {
    document.getElementById("produto-detalhes").innerHTML = "<p>Produto não encontrado.</p>";
  }
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(id, produto) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let itemExistente = carrinho.find(item => item.id === id);
  
    if (itemExistente) {
      itemExistente.quantidade += 1; // Se já existe, só aumenta a quantidade
    } else {
      carrinho.push({ id, ...produto, quantidade: 1 }); // Se não existe, adiciona com quantidade 1
    }
  
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
}

// Carregar os detalhes do produto
window.onload = loadDetalhes;
