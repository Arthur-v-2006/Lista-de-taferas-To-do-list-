const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

if (!usuario) {
    window.location.href = "telaLogin.html";
    throw new Error("Nenhum usuário logado");
}

document.getElementById("nome-usuario").textContent = usuario.nome;

document.querySelector("#logout").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "telaLogin.html";
});

const formTarefa = document.getElementById("form-tarefa");
const tarefaTexto = document.getElementById("tarefa-texto");
const tarefaData = document.getElementById("tarefa-data");
const tarefaPrioridade = document.getElementById("tarefa-prioridade");
const tarefaCategoria = document.getElementById("tarefa-categoria");
const categorias = document.getElementById("categorias");
const listaTarefas = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador");
const ordenar = document.getElementById("ordenar");
const filtros = document.querySelectorAll(".filtro");
const btnAdicionar = formTarefa.querySelector(".btn-adicionar");

const CHAVE_TAREFAS = "tarefas_" + usuario.email;
let tarefas = JSON.parse(localStorage.getItem(CHAVE_TAREFAS)) || [];

let idEditar = null;

function salvarTarefas() {
    localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
}

function formatarData(data) {
    return data.split("-").reverse().join("/");
}

function nomePrioridade(prioridade) {
    const nomes = { baixa: "Baixa", media: "Média", alta: "Alta" };
    return nomes[prioridade];
}

function criarSelo(texto, classeExtra) {
    const selo = document.createElement("span");
    selo.classList.add("selo");
    if (classeExtra) {
        selo.classList.add(classeExtra);
    }
    selo.textContent = texto;
    return selo;
}

function sairDoModoEditar() {
    idEditar = null;
    btnAdicionar.textContent = "Adicionar";
    formTarefa.reset();
}

function renderizar() {
    listaTarefas.innerHTML = "";

    tarefas.forEach((tarefa) => {
        const li = document.createElement("li");
        li.classList.add("tarefa", "prioridade-" + tarefa.prioridade);
        if (tarefa.concluida) {
            li.classList.add("concluida");
        }
        li.dataset.id = tarefa.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;
        checkbox.setAttribute("aria-label", "Concluir tarefa");

        const texto = document.createElement("span");
        texto.classList.add("tarefa-texto");
        texto.textContent = tarefa.texto;

        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.classList.add("btn-editar");
        btnEditar.textContent = "Editar";

        const btnExcluir = document.createElement("button");
        btnExcluir.type = "button";
        btnExcluir.classList.add("btn-excluir");
        btnExcluir.textContent = "Excluir";

        li.append(checkbox, texto);

        if (tarefa.data) {
            li.appendChild(criarSelo(formatarData(tarefa.data), "selo-data"));
        }
        if (tarefa.categoria) {
            li.appendChild(criarSelo(tarefa.categoria));
        }
        li.appendChild(criarSelo(nomePrioridade(tarefa.prioridade)));

        li.append(btnEditar, btnExcluir);
        listaTarefas.appendChild(li);
    });
}

formTarefa.addEventListener("submit", (e) => {
    e.preventDefault();

    const texto = tarefaTexto.value.trim();

    if (!texto) {
        return;
    }

    if (idEditar !== null) {
        const tarefa = tarefas.find((t) => t.id === idEditar);

        tarefa.texto = texto;
        tarefa.data = tarefaData.value;
        tarefa.prioridade = tarefaPrioridade.value;
        tarefa.categoria = tarefaCategoria.value.trim();

        idEditar = null;
        btnAdicionar.textContent = "Adicionar";
    } else {
        const novaTarefa = {
            id: Date.now(),
            texto: texto,
            data: tarefaData.value,
            prioridade: tarefaPrioridade.value,
            categoria: tarefaCategoria.value.trim(),
            concluida: false
        };

        tarefas.push(novaTarefa);
    }

    salvarTarefas();
    renderizar();

    formTarefa.reset();
    tarefaTexto.focus();
});

listaTarefas.addEventListener("click", (e) => {
    const li = e.target.closest(".tarefa");

    if (!li) {
        return;
    }

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("btn-excluir")) {
        if (id === idEditar) {
            sairDoModoEditar();
        }

        tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
        salvarTarefas();
        renderizar();
    }

    if (e.target.classList.contains("btn-editar")) {
        const tarefa = tarefas.find((t) => t.id === id);

        tarefaTexto.value = tarefa.texto;
        tarefaData.value = tarefa.data;
        tarefaPrioridade.value = tarefa.prioridade;
        tarefaCategoria.value = tarefa.categoria;

        idEditar = id;
        btnAdicionar.textContent = "Salvar";
        tarefaTexto.focus();
    }
});

listaTarefas.addEventListener("change", (e) => {
    if (e.target.type !== "checkbox") {
        return;
    }

    const li = e.target.closest(".tarefa");
    const id = Number(li.dataset.id);

    const tarefa = tarefas.find((t) => t.id === id);
    tarefa.concluida = e.target.checked;

    salvarTarefas();
    renderizar();
});

renderizar();