<h1 align="center">
    <img src="https://i.imgur.com/E9hTV64.png" alt="Limbo Logo" width="100">
    <p>Limbo</p>
</h1>

<div align="center">
    <p>Um simples e descontraido bot de discord desenvolvido em Node.js</p>
    <img alt="License" src="https://img.shields.io/github/license/netosep/limbo-bot?color=black&logo=apache&logoColor=white">
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

- Pré requisitos: `npm >= 7.x e node >= 16.x`

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

- Subistitua os valores descritos entre `"aspas"`
```env
BOT_TOKEN="bot_token"

BOT_PREFIX="?"

BOT_OWNER_ID="000000000000000"

MONGODB_URL="mongodb_url"

PANEL_URL="http://localhost"

STEAM_API_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

- Execute o bot
```bash
  npm start
```

#

### 📑 Licença

- [GPL-3.0](https://github.com/netosep/limbo-bot/blob/main/LICENSE.md)
