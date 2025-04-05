import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

// Configuração do Firebase (substitua pelos seus valores)
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

// Função para carregar o cardápio
async function loadCardapio() {
  const querySnapshot = await getDocs(collection(db, "cardapio"));
  const cardapioContainer = document.getElementById("cardapio");
  const searchQuery = document.getElementById("search").value.toLowerCase();

  cardapioContainer.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const nome = data.nome.toLowerCase();

    if (nome.includes(searchQuery)) {
      const cardapioItem = document.createElement("a");
      cardapioItem.classList.add("cardapio-item");
      cardapioItem.href = `detalhes.html?id=${doc.id}`; // Link para a página de detalhes

      cardapioItem.innerHTML = `
        <img src="${data.imagem}" alt="${data.nome}">
        <div class="info">
          <h3>${data.nome}</h3>
          <p>${data.descricao}</p>
          <p class="preco">R$ ${data.preco}</p>
        </div>
      `;

      cardapioContainer.appendChild(cardapioItem);
    }
  });
}

// Filtro de pesquisa
document.getElementById("search").addEventListener("input", loadCardapio);
window.onload = loadCardapio;