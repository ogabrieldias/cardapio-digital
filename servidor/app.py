from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe
import os
from dotenv import load_dotenv

# Carrega as variáveis do .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # Libera acesso CORS para o frontend

# Chave secreta da API do Stripe
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    data = request.json
    carrinho = data.get("carrinho", [])

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
            payment_method_types=["card"],  # Ou inclua "pix" para permitir Pix também
            line_items=line_items,
            mode="payment",
            success_url="http://localhost:5500/sucesso.html",  # Página de sucesso
            cancel_url="http://localhost:5500/checkout.html",  # Página de erro ou cancelamento
        )
        return jsonify({"id": session.id})
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == "__main__":
    app.run(port=4242)
