const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carrega as variáveis do arquivo .env
const DataBaseMySQL = require('../../database/DataBase');

class Login {
    #email;
    #senha;

    constructor(email, senha) {
        this.#email = email;
        this.#senha = senha;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get senha() {
        return this.#senha;
    }

    set senha(value) {
        this.#senha = value;
    }

    permitirEntrada(dados) {
        return dados.length > 0;
    }

    toJson() {
        return {
            email: this.#email,
            senha: this.#senha,
        };
    }
}

class LoginDAO {
    #db;

    constructor() {
        this.#db = new DataBaseMySQL();
    }

    // Método para realizar o login
    async logar(email, senha) {
        const query = await this.#db.selectOrganizadorLogin(email, senha);

        if (query.length > 0) {
            const user = query[0]; // Obter o usuário retornado

            // Gerar o token JWT
            const token = jwt.sign(
                {
                    id_usuario: user.id_usuario,
                    tipo_usuario: user.tipo_usuario,
                },
                process.env.JWT_SECRET, // Chave secreta
                {
                    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Expiração do token
                }
            );
            console.log(token)
            return { token, user }; // Retorna o token e as informações do usuário
            
        } else {
            return null; // Credenciais inválidas
        }
    }

    // Buscar dados do usuário por ID
    async buscarDadosUsuario(userId) {
        const query = await this.#db.selectOrganizadorId(userId);
        return query;
    }
}

module.exports = LoginDAO;
