const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const flash = require('express-flash');

const app = express();
const port = 5000;

// Configuração da conexão MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'ALUNO',
    database: 'Blog'
});

// Conectar ao MySQL
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL!');

        // Criar a tabela 'usuarios' se não existir
        const createUsuariosTableQuery = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `;

        connection.query(createUsuariosTableQuery, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela usuarios:', err);
            } else {
                console.log('Tabela usuarios criada ou já existente.');
            }
        });
    }
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    async (username, password, done) => {
        // Consultar usuário no MySQL
        connection.query('SELECT * FROM usuarios WHERE username = ?', [username], async (err, results) => {
            if (err) throw err;

            if (results.length === 0) {
                return done(null, false, { message: 'Nome de usuário incorreto.' });
            }

            const user = results[0];

            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Senha incorreta.' });
            }

            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    connection.query('SELECT * FROM usuarios WHERE id = ?', [id], async (err, results) => {
        if (err) throw err;

        const user = results[0];
        done(null, user);
    });
});

function verificaAutenticacao(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin');
}

const criarUsuarioInicial = async () => {
    try {
        const username = 'Wesley';
        const senha = 'wesker';

        // Verificar se o usuário já existe
        connection.query('SELECT * FROM usuarios WHERE username = ?', [username], async (err, results) => {
            if (err) throw err;

            if (results.length === 0) {
                // Criar hash da senha
                const senhaHash = await bcrypt.hash(senha, 10);

                // Inserir novo usuário no MySQL
                connection.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, senhaHash], (err) => {
                    if (err) throw err;
                    console.log(`Usuário "${username}" criado com sucesso.`);
                });
            } else {
                console.log(`Usuário "${username}" já existe.`);
            }
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
};

criarUsuarioInicial();

app.get('/', (req, res) => res.sendFile(__dirname + '/home.html'));
app.use(express.static(__dirname + '/css'));
app.use('/assets', express.static(__dirname + '/assets'));
app.get('/sobre', (req, res) => res.sendFile(__dirname + '/sobre.html'));
app.get('/contato', (req, res) => res.sendFile(__dirname + '/contato.html'));
app.get('/postagens', (req, res) => res.sendFile(__dirname + '/postagens.html'));
app.get('/login', (req, res) => res.sendFile(__dirname + '/login.html'));
app.use(express.static(__dirname + '/css'))

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/erro',
        failureFlash: true
    })
);

app.get('/admin/painel', verificaAutenticacao, (req, res) => res.sendFile(__dirname + '/home.html'));

/// Rota para fazer logout



app.get('/admin/logout', (req, res) => {
    req.session.destroy(()=> {
    res.redirect('/admin');});
});
 

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));