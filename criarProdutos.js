const API_URL = "http://127.0.0.1:5000";

async function criarProdutos() {
    try {
        let formNome = document.getElementById("produto_nome").value;
        let formPreco = parseFloat(document.getElementById("produto_preco").value);
        let formQuantidade = parseInt(document.getElementById("produto_quantidade").value);

        const response = await fetch(`${API_URL}/produtos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: formNome,
                preço: formPreco,
                quantidade: formQuantidade
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar produto");
        }

        window.location.replace("produtos.html");

    } catch (error) {

    }
}