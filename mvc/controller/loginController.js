const jwt = require('jsonwebtoken');
const LoginDAO = require('../model/loginModel'); // Supondo que você tenha implementado o LoginDAO
require('dotenv').config();

module.exports = (app) => {
    const verificarAutenticacao = (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido!' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = decoded; // Adiciona os dados do token ao request
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido ou expirado!' });
        }
    };

    // Todos os gets
    app.get('/conta', verificarAutenticacao, (req, res) => {
        res.status(200).send({ message: 'Bem-vindo à sua conta!', usuario: req.usuario });
    });

    app.get('/check-session', (req, res) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.json({ isAuth: false, message: 'Nenhum token fornecido.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.json({ isAuth: true, usuario: decoded });
        } catch (error) {
            res.json({ isAuth: false, message: 'Token inválido ou expirado.' });
        }
    });

    app.get('/login', (req,res) => {
        res.render('login.ejs')
    })

    // Todos os post
    app.post('/logar', async (req, res) => {
        console.log('Dados recebidos no login:', req.body);

        try {
            const { email, senha } = req.body;
            const loginDAO = new LoginDAO();

            const userId = await loginDAO.logar(email, senha);
            if (userId) {
                const token = jwt.sign(
                    { id_usuario: userId },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
                );

                console.log('Login bem-sucedido.');
                return res.status(200).json({ isAuth: true, token });
            } else {
                console.log('Login falhou: Credenciais incorretas.');
                return res.status(401).json({ isAuth: false, error: 'Credenciais incorretas.' });
            }
        } catch (error) {
            console.error('Erro no login:', error);
            return res.status(500).send('Erro interno do servidor.');
        }
    });

    app.post('/logout', verificarAutenticacao, (req, res) => {
        // Não é necessário destruir sessões ao usar JWT, mas você pode invalidar o token no cliente
        res.status(200).json({ success: true, message: 'Logout realizado com sucesso. Apenas remova o token do lado do cliente.' });
    });
};
