<h1 align="center">
    <img src="https://i.imgur.com/E9hTV64.png" alt="Limbo Logo" width="100">
    <p>Limbo</p>
</h1>

<div align="center">
    <p>Simples e descontraido bot de discord desenvolvido em <a href="https://nodejs.dev/download/">node.js</a></p>
    <img alt="Discord" src="https://img.shields.io/discord/688110275789979657?color=black&label=discord&logo=discord&logoColor=white">
    <img alt="License" src="https://img.shields.io/github/license/netosep/limbo-bot?color=black">
    <img alt="Stars" src="https://img.shields.io/github/stars/netosep/limbo-bot?color=black&logo=node.js&logoColor=white">
</div>

#

### 🔗 Links úteis:
<ul>
    <li><a href="https://account.mongodb.com/account/login">Site mongodb</a></li>
    <li><a href="#">Como criar um banco de dados mongodb</a></li>
    <li><a href="https://discord.com/developers/applications">Painel de desenvolvedor do discord</a></li>
    <li><a href="#">Como criar um bot e obter o token</a></li>
    <li><a href="https://steamcommunity.com/dev/apikey">Steam API Key</a></li>
    <li><a href="https://github.com/netosep/limbo-bot/archive/refs/heads/main.zip">Baixar o reposítório</a></li>
</ul>

#

### 👨‍💻 Executando localmente:
- Clone o projeto utilizando o comando abaixo
```
  git clone https://github.com/netosep/limbo-bot.git
```

- Abra o diretório do projeto
```
  cd limbo-bot
```

- Instale as dependencias
```
  npm install
```

- Renomeie o arquivo `.env.example` para `.env` e altere os valores abaixo:
```env
# mongo database url
MONGODB_URL=<url_mongodb_database>

# token do bot
BOT_TOKEN=<token_bot>

# prefixo padrão do bot (também definido no banco de dados)
BOT_PREFIX=?

# id do usuário do discord dono do bot
BOT_OWNER_ID=0000000000000

# link para o painel web do bot - repósitório do painel: (em desenvolvimento)
LEVELS_URL=http://localhost

# canal para salvar os logs do bot de forma global (será removido)
LOG_CHANNEL_ID=000000000000

# steamapikey para o comando steam
STEAM_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

- Execute o bot
```bash
  npm start
```

#

### 📑 Licença

- [GPL-3.0](https://github.com/netosep/limbo-bot/blob/main/LICENSE.md)
