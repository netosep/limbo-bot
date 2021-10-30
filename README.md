<h1 align="center">
    <img src="https://i.imgur.com/E9hTV64.png" alt="Limbo Logo" width="100">
    <p>Limbo</p>
</h1>

<div align="center">
    <p>Simples e descontraido bot de discord desenvolvido em Node.js</p>
    <img alt="Discord" src="https://img.shields.io/discord/688110275789979657?color=black&label=discord&logo=discord&logoColor=white">
    <img alt="License" src="https://img.shields.io/github/license/netosep/limbo-bot?color=black">
    <img alt="Stars" src="https://img.shields.io/github/stars/netosep/limbo-bot?color=black&logo=github&logoColor=white">
    <img alt="Discord.js Version" src="https://img.shields.io/npm/v/discord.js?color=black&label=discord.js&logo=discord&logoColor=white">
    <img alt="Node.js Version" src="https://img.shields.io/npm/v/node?color=black&label=node&logo=node.js&logoColor=white">
</div>

#

<p align="center">Adicione-o ao seu servidor <a href="https://discord.com/oauth2/authorize?=&client_id=699289718348578836&scope=bot&permissions=8">clicando aqui</a> 🖤</p>

### 🔗 Links úteis:
<ul>
    <li><a href="https://account.mongodb.com/account/login">MongoDB</a></li>
    <li><a href="https://discord.com/developers/applications">Portal do desenvolvedor do discord</a></li>
    <li><a href="https://steamcommunity.com/dev/apikey">Steam API Key</a></li>
    <li><a href="https://nodejs.org/pt-br/">Node.js</a></li>
</ul>

#

### 👨‍💻 Executando localmente:
- Clone o projeto utilizando o comando abaixo
```bash
  git clone https://github.com/netosep/limbo-bot.git
```

- Abra o diretório do projeto
```bash
  cd limbo-bot
```

- Instale as dependencias
```bash
  npm install
```

- Renomeie o arquivo `.env.example` para `.env`
```bash
  cp .env.example .env
```

- Altere os valores
```env
# URL de conexão do banco de dados MongoDB
# Veja mais em: https://www.mongodb.com/pt-br/basics/create-database
MONGODB_URL=<mongodb_url>

# Token de login do bot.
# Disponivel em: https://discord.com/developers/applications
BOT_TOKEN=<bot_token>

# Prefixo padrão do bot: ?
# Esse prefixo também é definido no banco de dados.
BOT_PREFIX=?

# ID de usuário do discord para comandos de desenvolvedor (dono do bot).
# Como pegar o seu ID: https://www.youtube.com/watch?v=xX-aWpqnphI
BOT_OWNER_ID=<000000000000000>

# ID do canal para salvar os logs do bot de forma global (será removido).
# Siga o mesmo video de cima para pegar o ID do canal (formas parecidas).
LOG_CHANNEL_ID=<000000000000000>

# URL do painel de configuração web do bot.
# Repósitório do painel: (em desenvolvimento).
PANEL_URL=http://localhost

# API Key da steam para usar os comandos ?steam e ?csgo.
# Acesse: https://steamcommunity.com/dev/apikey para obter a chave.
STEAM_API_KEY=<XXXXXXXXXXXXXXXXXXXXXXXXXXXX>
```

- Execute o bot
```bash
  npm start
```

#

### 📑 Licença

- [GPL-3.0](https://github.com/netosep/limbo-bot/blob/main/LICENSE.md)
