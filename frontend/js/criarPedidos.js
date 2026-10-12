const API_URL = "http://127.0.0.1:5000";

async function criarPedidos() {
    try {
        let formUsuario = parseInt(document.getElementById("pedido_usuario").value);
        let formProduto = parseInt(document.getElementById("pedido_produto").value);
        let formQuantidade = parseInt(document.getElementById("pedido_quantidade").value);

        const response = await fetch(`${API_URL}/pedidos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario_id: formUsuario,
                produto_id: formProduto,
                quantidade: formQuantidade
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar pedido");
        }

        window.location.replace("pedidos.html");

    } catch (error) {

    }
}