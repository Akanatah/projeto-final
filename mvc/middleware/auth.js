const jwt = require('jsonwebtoken');
require('dotenv').config();

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Remove o prefixo "Bearer"

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ mensagem: 'Token inválido ou expirado' });
        }

        req.usuario = decoded; // Adiciona os dados decodificados ao objeto `req`
        next(); // Chama o próximo middleware ou rota
    });
}

module.exports = verificarToken;
