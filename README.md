# Pokémon MVP - Frontend

> **Pós Graduação em Desenvolvimento Full Stack - PUC Rio**  
> **MVP 02 - Desenvolvimento Back-end avançado**

Uma aplicação web moderna estilo Pokémon GO desenvolvida com Next.js, que permite aos usuários se cadastrar, capturar pokémons e gerenciar sua coleção através de uma interface intuitiva e responsiva.

## Descrição do Projeto

O **Pokémon MVP Frontend** é a interface de usuário de uma aplicação completa de gerenciamento de pokémons. A aplicação oferece uma experiência similar ao Pokémon GO, onde os usuários podem:

- **Autenticação**: Cadastro e login de usuários
- **Captura de Pokémons**: Encontrar e capturar pokémons aleatórios
- **Dashboard Interativo**: Visualizar pokémons capturados por região
- **Perfil do Usuário**: Gerenciar dados pessoais e estatísticas (somente visualizar por enquanto)
- **Libertação**: Libertar pokémons da coleção

A aplicação se comunica com uma API GraphQL backend que roda na porta 8000, fornecendo uma experiência de usuário fluida e moderna.

## Tecnologias Utilizadas

### Frontend
- **Next.js 15.5.4** - Framework React com App Router
- **React 19.1.0** - Biblioteca de interface de usuário
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS utilitário
- **Shadcn UI** - Componentes de interface modernos
- **Apollo Client 4.0.5** - Cliente GraphQL
- **Lucide React** - Ícones modernos
- **Sonner** - Sistema de notificações toast

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **Docker** - Containerização

## Instalação e Configuração

### Pré-requisitos para instalação local

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Docker** (opcional, para containerização)
- **Git**

### 1. Clone o Repositório

```bash
git clone https://github.com/davidcromianski-dev/pos-puc-mvp-02-frontend.git
cd pos-puc-mvp-02-frontend
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/graphql
```

> **Nota**: Certifique-se de que o backend GraphQL esteja rodando na porta 8000.

### 4. Execute o Projeto

#### Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

#### Build de Produção
```bash
npm run build
npm run start
```

#### Docker
```bash
docker-compose up --build
```

> **Nota**: Ao executar com Docker, as variáveis de ambiente devem ser configuradas no arquivo `docker-compose.yml`.

### 5. Verificação de Qualidade

```bash
npm run lint
```

## Estrutura do Projeto

```
src/
├── app/                   # App Router do Next.js
│   ├── dashboard/         # Página principal
│   ├── login/            # Autenticação
│   ├── user/             # Perfil do usuário
│   └── layout.tsx        # Layout principal
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (Shadcn UI)
│   └── ...              # Componentes específicos
├── contexts/            # Contextos React
├── features/            # Funcionalidades organizadas
│   ├── auth/           # Autenticação
│   ├── pokemon/        # Gerenciamento de pokémons
│   └── user/           # Dados do usuário
├── graphql/            # Configuração GraphQL
│   ├── client.ts       # Cliente Apollo
│   └── domains/        # Queries, mutations e tipos
├── hooks/              # Hooks customizados
└── lib/                # Utilitários
```

## Funcionalidades

### Sistema de Autenticação
- Cadastro de novos usuários
- Login com validação
- Gerenciamento de sessão
- Proteção de rotas

### Gerenciamento de Pokémons
- **Captura**: Encontrar pokémons aleatórios por região (por enquanto, somente a região inical de Kanto)
- **Visualização**: Dashboard com pokémons por região
- **Seleção**: Escolher pokemon ativo
- **Libertação**: Remover pokémons da coleção

### Interface do Usuário
- **Dashboard**: Visão geral da coleção
- **Perfil**: Dados pessoais e estatísticas
- **Responsivo**: Funciona em desktop e mobile
- **Notificações**: Feedback visual para ações

## Páginas Disponíveis

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/` | Página inicial com redirecionamentos | Público |
| `/login` | Login e cadastro de usuários | Público |
| `/dashboard` | Página principal da aplicação | Autenticado |
| `/user` | Dados e perfil do usuário | Autenticado |

## Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linter ESLint
```

## Fluxogramas

### Fluxograma de Autenticação

![Fluxograma de Autenticação](./docs/assets/fluxograma-autenticacao.png)

### Fluxograma de Captura de Pokémons

![Fluxograma de Captura de Pokémons](./docs/assets/fluxograma-captura-pokemons.png)

### Fluxograma de Libertação de Pokémons

![Fluxograma de Libertação de Pokémons](./docs/assets/fluxograma-libertacao-pokemons.png)