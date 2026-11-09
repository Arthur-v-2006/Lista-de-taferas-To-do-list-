const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    sincronizarLembretes: (tarefas) => {
        const tarefasSeguras = tarefas.map((tarefa) => ({
            id: tarefa.id,
            texto: tarefa.texto,
            data: tarefa.data,
            hora: tarefa.hora,
            concluida: tarefa.concluida
        }));

        ipcRenderer.send("sincronizar-lembretes", tarefasSeguras);
    }
});