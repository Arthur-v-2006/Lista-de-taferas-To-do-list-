# Lista de Tarefas

Aplicativo de desktop para organizar tarefas, com cadastro e login de usuários. Cada pessoa tem a própria lista. Feito com Electron, HTML, CSS e JavaScript puro.

## Funcionalidades

**Conta**
- Cadastro com nome, e-mail e senha
- Login com mensagem de erro para e-mail ou senha incorretos
- Botão para mostrar e ocultar a senha
- Cada usuário vê apenas as próprias tarefas
- Proteção da tela principal: sem login, o app volta para a tela de entrada

**Tarefas**
- Adicionar tarefa com texto, data, hora, prioridade (baixa, média ou alta) e categoria
- Editar e excluir tarefas
- Marcar como concluída
- Cor da faixa lateral de acordo com a prioridade
- Destaque em vermelho para tarefas atrasadas, considerando a hora
- Sugestão de categorias já usadas
- Contador de tarefas pendentes

**Organização**
- Filtros: todas, pendentes e concluídas
- Ordenação: mais recentes, por data ou por prioridade

## Tecnologias

- [Electron](https://www.electronjs.org/)
- HTML5, CSS3 e JavaScript (sem frameworks)
- `localStorage` para guardar usuários e tarefas

## Como rodar

**Requisito:** Node.js **22.12 ou mais novo**. Versões anteriores quebram a instalação do Electron.

```bash
git clone https://github.com/Arthur-v-2006/Lista-de-taferas-To-do-list-.git
cd Lista-de-taferas-To-do-list-
npm install
npm start
```

Para conferir a versão do Node, use `node -v`.

## Observações

- **Os dados ficam no computador.** Usuários e tarefas são guardados no `localStorage`, então cada ambiente tem os próprios dados: contas criadas no navegador não aparecem no app Electron, e vice-versa.
- **As senhas são salvas em texto puro.** Isso serve apenas para estudo. Um app real usaria um servidor e senhas com hash.

## Autor

Feito por Arthur como projeto de aprendizado.
