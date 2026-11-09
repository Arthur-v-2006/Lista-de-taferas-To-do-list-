# Lista de Tarefas

Aplicativo desktop para organizar tarefas pessoais. Foi desenvolvido com Electron, HTML, CSS e JavaScript.

## Funcionalidades

### Conta
- Cadastro com nome, e-mail e senha
- Login com mensagem de erro quando os dados estão incorretos
- Botão para mostrar ou ocultar a senha
- Lista de tarefas separada por usuário

### Tarefas
- Adicionar tarefas com texto, data, hora, prioridade e categoria
- Editar tarefas e cancelar a edição
- Excluir tarefas com confirmação em um modal
- Marcar tarefas como concluídas
- Mostrar a prioridade por meio de uma faixa colorida
- Destacar tarefas atrasadas
- Sugerir categorias já usadas
- Exibir mensagens quando não há tarefas na lista ou no filtro selecionado

### Organização e lembretes
- Filtrar tarefas: todas, pendentes e concluídas
- Ordenar por data de criação, data da tarefa ou prioridade
- Exibir a quantidade de tarefas conforme o filtro
- Receber uma notificação nativa do Electron quando chegar o horário de uma tarefa

## Fluxo de uso

1. O usuário cria uma conta ou entra com uma conta existente.
2. Na tela principal, adiciona tarefas e, se quiser, define data, hora, prioridade e categoria.
3. Pode editar, cancelar a edição, concluir ou excluir cada tarefa.
4. Os filtros e a ordenação ajudam a localizar tarefas.
5. Se uma tarefa pendente tiver data e hora futuras, o aplicativo agenda um lembrete.

## Tecnologias

- [Electron](https://www.electronjs.org/ )
- HTML5, CSS3 e JavaScript
- `localStorage` para armazenar usuários e tarefas no computador
- `preload.js` e comunicação IPC do Electron para agendar lembretes e exibir notificações nativas

## Como executar

**Requisito:** Node.js 22.12 ou mais recente.

```bash
git clone https://github.com/Arthur-v-2006/Lista-de-taferas-To-do-list-.git
cd Lista-de-taferas-To-do-list-
npm install
npm start


Para conferir a versão do Node.js:

```bash
node -v
```

## Limitações e observações

- Os dados ficam armazenados localmente no `localStorage` do aplicativo. Dados usados no navegador não são compartilhados automaticamente com o Electron.
- As senhas são armazenadas em texto puro. Essa é uma limitação desta versão de estudo; não use senhas reais.
- Para receber os lembretes, o aplicativo precisa estar aberto quando chegar a data e o horário da tarefa.
- As notificações dependem de estarem permitidas nas configurações do sistema operacional.
- Tarefas concluídas ou sem data e hora não geram lembretes.

## Autor

Projeto desenvolvido por Arthur como atividade de programação desktop