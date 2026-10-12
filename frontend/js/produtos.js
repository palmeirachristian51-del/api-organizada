const API_URL = "http://127.0.0.1:5000";


async function carregarProdutos() {

    try {

        const response = await fetch(`${API_URL}/produtos`);

        if (!response.ok) {
            throw new Error("Erro ao carregar produtos");
        }

        const produtos = await response.json();

        const tbody = document.querySelector("#tabelaProdutos tbody");

        tbody.innerHTML = "";

        produtos.forEach(produto => {

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>R$ ${produto["Preço"].toFixed(2)}</td>
                <td>${produto["Quantidade"]}</td>

                <td>
                    <button
                        class="btn btn-warning"
                        onclick="editarProduto(${produto.id})">
                        Editar
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deletarProduto(${produto.id})">
                        Apagar
                    </button>
                </td>
            `;

            tbody.appendChild(tr);

        });

    } catch (error) {

        alert("Erro: " + error.message);

    }

}


async function deletarProduto(produtoID) {

    if (confirm("Tem certeza que deseja deletar este produto?")) {

        try {

            const response = await fetch(
                `${API_URL}/produtos/${produtoID}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao deletar produto");
            }

            carregarProdutos();

        } catch (error) {

            alert("Erro: " + error.message);

        }

    }

}


function editarProduto(produtoID) {

    window.location.href = `editarProdutos.html?id=${produtoID}`;

}


carregarProdutos()