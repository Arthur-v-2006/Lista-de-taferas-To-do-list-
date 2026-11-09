const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

app.setAppUserModelId("lista-de-tarefas");

const lembretesAgendados = new Map();

function agendarLembretes(tarefas) {
    for (const temporizador of lembretesAgendados.values()) {
        clearTimeout(temporizador);
    }

    lembretesAgendados.clear();

    if (!Array.isArray(tarefas)) {
        return;
    }

    tarefas.forEach((tarefa) => {
        if (
            !tarefa ||
            tarefa.concluida ||
            !tarefa.data ||
            !tarefa.hora ||
            typeof tarefa.texto !== "string"
        ) {
            return;
        }

        const horario = new Date(
            `${tarefa.data}T${tarefa.hora}`
        ).getTime();

        const tempoAteLembrete = horario - Date.now();

        if (!Number.isFinite(horario) || tempoAteLembrete <= 0) {
            return;
        }

        const temporizador = setTimeout(() => {
            new Notification({
                title: "Lembrete de tarefa",
                body: `Está na hora: ${tarefa.texto}`
            }).show();

            lembretesAgendados.delete(tarefa.id);
        }, tempoAteLembrete);

        lembretesAgendados.set(tarefa.id, temporizador);
    });
}

ipcMain.on("sincronizar-lembretes", (_event, tarefas) => {
    agendarLembretes(tarefas);
});

function criarJanela() {
    const janela = new BrowserWindow({
        width: 900,
        height: 700,
        minWidth: 420,
        minHeight: 500,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "../assets/icone.png"),
        webPreferences: {
            preload: path.join(__dirname, "../preload/preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    janela.loadFile(
        path.join(__dirname, "../renderer/telaLogin.html")
    );
}

app.whenReady().then(() => {
    criarJanela();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});