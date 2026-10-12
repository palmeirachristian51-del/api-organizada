
const API_URL = "http://127.0.0.1:5000";

const id = new URLSearchParams(window.location.search).get("id");

async function carregarProduto() {
    try {
        const response = await fetch(`${API_URL}/produtos/${id}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar produto");
        }

        const dados = await response.json();
        const produto = Array.isArray(dados) ? dados[0] : dados;

        document.getElementById("produto_nome").value = produto.nome;
        document.getElementById("produto_preco").value =
            produto.preco ?? produto.preço ?? produto.peço;
        document.getElementById("produto_quantidade").value =
            produto.quantidade ?? produto.Quantidade;

    } catch (error) {
        alert("Não foi possível carregar o produto.");
        console.error(error);
    }
}

async function editarProdutos() {
    try {
        const nome = document.getElementById("produto_nome").value;
        const preco = parseFloat(document.getElementById("produto_preco").value);
        const quantidade = parseInt(document.getElementById("produto_quantidade").value);

        const response = await fetch(`${API_URL}/produtos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                preço: preco,
                quantidade: quantidade
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar produto");
        }

        window.location.replace("produtos.html");

    } catch (error) {
        alert("Erro ao editar produto. Verifique os dados e o servidor.");
        console.error(error);
    }
}

if (id) {
    carregarProduto();
} else {
    alert("ID do produto não informado.");
}
