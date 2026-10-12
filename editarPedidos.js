
const API_URL = "http://127.0.0.1:5000";

const id = new URLSearchParams(window.location.search).get("id");

async function carregarPedido() {
    try {
        const response = await fetch(`${API_URL}/pedidos/${id}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar pedido");
        }

        const dados = await response.json();
        const pedido = Array.isArray(dados) ? dados[0] : dados;

        // A API GET retorna os nomes dos usuários e produtos,
        // por isso precisamos consultar seus IDs.
        const respostaUsuarios = await fetch(`${API_URL}/usuarios`);
        const usuarios = await respostaUsuarios.json();

        const respostaProdutos = await fetch(`${API_URL}/produtos`);
        const produtos = await respostaProdutos.json();

        const usuario = usuarios.find(
            u => u.nome === pedido.usuario
        );

        const produto = produtos.find(
            p => p.nome === pedido.produto
        );

        if (!usuario || !produto) {
            throw new Error("Usuário ou produto não encontrado");
        }

        document.getElementById("pedido_usuario").value = usuario.id;
        document.getElementById("pedido_produto").value = produto.id;

        document.getElementById("pedido_quantidade").value =
            pedido.quantidade ?? pedido.Quantidade;

    } catch (error) {
        alert("Não foi possível carregar o pedido.");
        console.error(error);
    }
}

async function editarPedido() {
    try {
        const usuarioId = parseInt(
            document.getElementById("pedido_usuario").value
        );

        const produtoId = parseInt(
            document.getElementById("pedido_produto").value
        );

        const quantidade = parseInt(
            document.getElementById("pedido_quantidade").value
        );

        const response = await fetch(`${API_URL}/pedidos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario_id: usuarioId,
                produto_id: produtoId,
                quantidade: quantidade
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar pedido");
        }

        window.location.replace("pedidos.html");

    } catch (error) {
        alert("Erro ao editar pedido. Verifique os dados e o servidor.");
        console.error(error);
    }
}

if (id) {
    carregarPedido();
} else {
    alert("ID do pedido não informado.");
}
