# Sistema-de-notas-com-Banco-de-Dados

Projeto API de Gestão Escolar em TypeScript
Esta é uma API RESTful de backend desenvolvida com Node.js, Express e TypeScript, projetada para gerenciar dados acadêmicos de alunos. O sistema armazena informações de alunos, matérias e notas em um banco de dados PostgreSQL, e calcula automaticamente a média das notas.

Funcionalidades Principais
Cadastro de Disciplinas: Endpoint para registrar uma nova matéria para um aluno.

Armazenamento de Dados: Salva informações como nome do aluno, série, idade, matéria e um array de notas.

Cálculo de Média: O sistema exige exatamente 8 notas e calcula automaticamente a média aritmética antes de salvar no banco.

Persistência de Dados: Utiliza um banco de dados PostgreSQL para armazenamento seguro dos dados.

Ambiente Controlado: Utiliza variáveis de ambiente (.env) para gerenciar as credenciais de banco de dados e configurações do servidor.

Pré-requisitos
Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

Node.js (v18 ou superior)

NPM (geralmente incluído no Node.js)

Git

Um servidor PostgreSQL em execução

(Opcional, mas recomendado) pgAdmin 4 para gerenciar o banco de dados.

1. Instalação e Configuração
Siga os passos abaixo para configurar o projeto localmente.

1.1. Clonar o Repositório
Bash

# Clone este repositório para sua máquina local
git clone <URL_DO_SEU_REPOSITORIO_AQUI>

# Entre na pasta do projeto
cd <NOME_DA_PASTA_DO_PROJETO>
1.2. Instalar Dependências
Use o NPM para instalar todos os pacotes necessários definidos no package.json.

Bash

npm install
1.3. Configurar o Banco de Dados (PostgreSQL)
Você precisa criar o banco de dados e a tabela que a API usará.

Abra o pgAdmin e conecte-se ao seu servidor PostgreSQL.

Crie um novo banco de dados (ex: escola_api).

Abra a "Query Tool" (Ferramenta de Consulta) para esse banco de dados.

Copie e execute o seguinte comando SQL para criar a tabela disciplinas:

SQL

CREATE TABLE IF NOT EXISTS disciplinas (
    id SERIAL PRIMARY KEY,
    nome_aluno VARCHAR(255) NOT NULL,
    serie_aluno VARCHAR(50),
    idade_aluno INTEGER,
    materia VARCHAR(100) NOT NULL,
    notas NUMERIC(4, 2)[], -- Um array de números
    media NUMERIC(4, 2),   -- A média calculada
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
1.4. Configurar Variáveis de Ambiente
Para conectar a API ao seu banco de dados, você precisa fornecer as credenciais.

Crie um arquivo chamado .env na raiz do projeto.

Copie o conteúdo abaixo para dentro do arquivo .env e substitua os valores com suas próprias credenciais do PostgreSQL.

Fragmento do código

# Configuração do Servidor
PORT=3000

# Credenciais do Banco de Dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_secreta_aqui
DB_DATABASE=nome_do_seu_banco_de_dados
2. Rodando a Aplicação
Com o banco de dados e as dependências prontas, você pode iniciar o servidor.

Este projeto usa tsx para rodar o TypeScript diretamente com hot-reload (reinicia automaticamente quando você salva um arquivo).

Bash

# Inicia o servidor em modo de desenvolvimento
npx tsx --watch src/index.ts
Ao executar com sucesso, você verá as seguintes mensagens no terminal:

Conexão com o banco de dados PostgreSQL estabelecida com sucesso! 🐘
🚀 Servidor rodando em http://localhost:3000
3. Como Usar a API
O servidor agora está "ouvindo" por requisições na porta definida (ex: 3000). Você pode testar usando um cliente de API como Postman, Insomnia ou curl no terminal.

Exemplo: Cadastrar uma nova disciplina (com curl)
Abra um segundo terminal (deixe o servidor rodando no primeiro) e use o comando abaixo para enviar um POST para a API, cadastrando uma matéria e suas 8 notas.

Bash

curl -X POST http://localhost:3000/disciplinas \
-H "Content-Type: application/json" \
-d '{"nome": "Aluno Teste", "serie": "3C", "idade": 18, "materia": "Matemática", "notas": [10, 8.5, 7, 9, 6.5, 8, 9, 7.5]}'
Resposta de Sucesso (201 Created)
Se tudo der certo, a API irá responder com um JSON contendo os dados que foram salvos no banco, incluindo o id e a media calculada:

JSON

{
  "id": 1,
  "nome_aluno": "Aluno Teste",
  "serie_aluno": "3C",
  "idade_aluno": 18,
  "materia": "Matemática",
  "notas": [10, 8.5, 7, 9, 6.5, 8, 9, 7.5],
  "media": "8.19",
  "data_criacao": "2025-10-22T23:05:10.123Z"
}
Participantes
Matheus Babler Silva - RA: 2506056

Eduardo Escuer - RA: 2500241

Gustavo Facioni - RA: 2506276

Gabriel Canuto Prestes - RA: 2505604

Pedro Henrique Tonhon - RA: 2507542
