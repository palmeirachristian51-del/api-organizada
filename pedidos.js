const API_URL = "http://127.0.0.1:5000";


async function carregarPedidos() {

    try {

        const response = await fetch(`${API_URL}/pedidos`);

        if (!response.ok) {

            throw new Error("Erro ao carregar pedidos");

        }

        const pedidos = await response.json();

        const tbody = document.querySelector("#tabelaPedidos tbody");

        tbody.innerHTML = "";

        pedidos.forEach(pedido => {

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${pedido.id}</td>
                <td>${pedido.usuario}</td>
                <td>${pedido.produto}</td>
                <td>${pedido.Quantidade}</td>
                <td>R$ ${pedido.total.toFixed(2)}</td>
                
                <td>
        <button class="btn btn-danger"
            onclick="deletarPedido(${pedido.id})">
            Apagar
        </button>

        <a href="editarPedidos.html?id=${pedido.id}"
            class="btn btn-warning">
            Editar
        </a>
    </td>
`;

            tbody.appendChild(tr);

        });

    } catch (error) {

        alert("Erro: " + error.message);

    }

}


async function editarPedido(pedidoID) {

    window.location.href = `editarPedido.html?id=${pedidoID}`;

}

async function deletarPedido(id) {
    if (!confirm("Deseja realmente apagar este pedido?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/pedidos/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Erro ao apagar pedido");
        }

        listarPedidos();

    } catch (error) {
        alert("Erro ao apagar pedido.");
        console.error(error);
    }
}

carregarPedidos();