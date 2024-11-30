let token = null;

// Função para exibir mensagens
function showMessage(message, isError = true) {
    const messageBox = document.getElementById('message');
    messageBox.style.color = isError ? 'red' : 'green';
    messageBox.textContent = message;
}

// Login
document.getElementById('login').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showMessage('Por favor, insira email e senha!');
        return;
    }

    try {
        const response = await fetch('/logar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, senha: password })
        });

        const result = await response.json();

        if (response.ok) {
            token = result.token; // Armazena o token para usar nas próximas requisições
            showMessage('Login bem-sucedido!', false);

            // Redireciona para a página home após o login
            setTimeout(() => {
                window.location.href = '/home'; // Substitua '/home' pelo caminho da sua página inicial
            }, 1000); // Aguarda 1 segundo antes de redirecionar para mostrar a mensagem
        } else {
            showMessage(result.error || 'Erro no login.');
        }
    } catch (error) {
        showMessage('Erro ao conectar ao servidor.');
    }
});