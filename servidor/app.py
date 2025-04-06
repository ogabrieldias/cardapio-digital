from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe
import os
from dotenv import load_dotenv

# Carrega as variáveis do .env
load_dotenv()

app = Flask(__name__)

# Libera CORS para todos os domínios ou define seu domínio do GitHub Pages
CORS(app, resources={r"/*": {"origins": "*"}})  # Para desenvolvimento
# CORS(app, resources={r"/*": {"origins": "https://ogabrieldias.github.io"}})  # Produção segura

# Chave secreta do Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# ✅ Rota raiz para teste
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Servidor do cardápio digital está online 🚀"})

# ✅ Rota de criação da sessão de pagamento
@app.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    data = request.json
    carrinho = data.get("carrinho", [])
    total = data.get("total", 0)

    if not carrinho:
        return jsonify({"error": "Carrinho vazio"}), 400

    line_items = []
    for item in carrinho:
        line_items.append({
            "price_data": {
                "currency": "brl",
                "product_data": {
                    "name": item["nome"],
                },
                "unit_amount": int(item["preco"] * 100),  # em centavos
            },
            "quantity": item["quantidade"],
        })

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],  # Pode adicionar "pix" se quiser
            line_items=line_items,
            mode="payment",
            success_url="https://ogabrieldias.github.io/cardapio-digital/html/sucesso.html",
            cancel_url="https://ogabrieldias.github.io/cardapio-digital/html/checkout.html",
        )
        return jsonify({"id": session.id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=4242)
