# 💸 Woovi Bank Challenge - Backend

Este projeto foi desenvolvido como parte do desafio técnico da **Woovi**, com foco em back-end. Ele simula operações bancárias básicas usando GraphQL, Relay, Prisma e MongoDB.

---

## 🚀 Funcionalidades

- Criar contas de usuário (`createUser`)
- Realizar transações entre usuários (`sendTransaction`)
- Consultar histórico de transações por usuário (`transactionHistory`)
- Consultar transações com paginação estilo Relay (`transactions`)
- Atualização automática de saldo após cada transação

---

## 🛠️ Tecnologias

- **Node.js**
- **Koa.js**
- **GraphQL** + **Relay**
- **Prisma ORM**
- **MongoDB**
- **TypeScript**
- **Insomnia** para requisições

---

## 📦 Como rodar o projeto

```bash
# Clonar o repositório
git clone https://github.com/hugoandrade001/woovi-bank-challenge.git
cd woovi-bank-challenge

# Instalar dependências
npm install

# Gerar o Prisma Client
npx prisma generate

#Entrar na pasta do projeto
cd apps/server

# Rodar localmente
npm run dev

A aplicação estará disponível em: http://localhost:4000/graphql

🔌 Insomnia Collection
Todas as requisições do back-end foram organizadas e exportadas via Insomnia.

📁 Insomnia Collection: [`woovi-backend.yaml`](./woovi-backend.yaml)

Inclui:

createUser

sendTransaction

transactionHistory

Para importar no Insomnia:

Abra o Insomnia

Clique em Import > From File

Selecione o arquivo woovi-backend.yaml


👨‍💻 Autor
Hugo Andrade
📧 hugoandrade6@hotmail.com
🔗 github.com/hugoandrade001
