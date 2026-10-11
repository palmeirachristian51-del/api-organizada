const API_URL = "http://127.0.0.1:5000";

async function criarUsuario() {
    try {
        let formNome = document.getElementById("usuario_nome").value;
        let formEmail = document.getElementById("usuario_email").value;
        let formIdade = parseInt(document.getElementById("usuario_idade").value);
        let formAltura = parseFloat(document.getElementById("usuario_altura").value);

        const response = await fetch(`${API_URL}/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: formNome,
                email: formEmail,
                idade: formIdade,
                altura: formAltura
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar usuário");
        }

        window.location.replace("usuarios.html");

    } catch (error) {
        
    }
}






    