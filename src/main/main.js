const { app, BrowserWindow } = require("electron");
const path = require("path");

function criarJanela() {
    const janela = new BrowserWindow({
        width: 800,
        height: 600
    })

    janela.loadFile(path.join(__dirname, "../renderer/telaLogin.html"));
}

app.whenReady().then(() =>{
    criarJanela()
});

app.on("window-all-closed", () =>{
    if (process.platform !== "darwin") {
        app.quit()
    }
});