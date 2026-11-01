const { app, BrowserWindow } = require("electron");
const path = require("path");

app.setAppUserModelId("lista-de-tarefas");

function criarJanela() {
    const janela = new BrowserWindow({
        width: 900,
        height: 700,
        minWidth: 420,
        minHeight: 500,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "../assets/icone.png")
    });

    janela.loadFile(path.join(__dirname, "../renderer/telaLogin.html"));
}

app.whenReady().then(() => {
    criarJanela();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});