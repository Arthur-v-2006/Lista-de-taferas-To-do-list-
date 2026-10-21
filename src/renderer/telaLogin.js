const formLogin = document.getElementById("form-login");
const formCadastro = document.getElementById("form-cadastro");
const titulo = document.getElementById("titulo");

const emailLogin = document.getElementById("email");
const senhaLogin = document.getElementById("senha");
const erroLogin = document.getElementById("erro-login");

const nomeCadastro = document.getElementById("nome-cadastro");
const emailCadastro = document.getElementById("email-cadastro");
const senhaCadastro = document.getElementById("senha-cadastro");
const confirmarSenha = document.getElementById("confirmar-senha");
const erroCadastro = document.getElementById("erro-cadastro");

const TITULO_LOGIN = "Bem-vindo (a)";
const TITULO_CADASTRO = "Criar conta";
const CHAVE_USUARIOS = "usuarios";

function pegarUsuarios() {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];
}

function salvarUsuarios(lista) {
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista));
}

function mostrarLogin() {
    formCadastro.classList.add("oculto");
    formLogin.classList.remove("oculto");
    titulo.textContent = TITULO_LOGIN;
    erroCadastro.textContent = "";
}

function mostrarCadastro() {
    formLogin.classList.add("oculto");
    formCadastro.classList.remove("oculto");
    titulo.textContent = TITULO_CADASTRO;
    erroLogin.textContent = "";
}

document.getElementById("ir-cadastro").addEventListener("click", (e) => {
    e.preventDefault();
    mostrarCadastro();
});

document.getElementById("ir-login").addEventListener("click", (e) => {
    e.preventDefault();
    mostrarLogin();
});

formCadastro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = nomeCadastro.value.trim();
    const email = emailCadastro.value.trim().toLowerCase();
    const senha = senhaCadastro.value;

    if (senha.length < 6) {
        erroCadastro.textContent = "A senha precisa ter no mínimo 6 caracteres";
        return;
    }

    if (senha !== confirmarSenha.value) {
        erroCadastro.textContent = "As senhas não são iguais";
        return;
    }

    const usuarios = pegarUsuarios();

    if (usuarios.some((u) => u.email === email)) {
        erroCadastro.textContent = "Este e-mail já está cadastrado";
        return;
    }

    usuarios.push({ nome, email, senha });
    salvarUsuarios(usuarios);

    formCadastro.reset();
    mostrarLogin();
    emailLogin.value = email;
    senhaLogin.focus();
});

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailLogin.value.trim().toLowerCase();
    const senha = senhaLogin.value;

    const usuario = pegarUsuarios().find(
        (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
        erroLogin.textContent = "E-mail ou senha incorretos";
        return;
    }

    erroLogin.textContent = "";
    console.log("Login feito! Olá,", usuario.nome);
});