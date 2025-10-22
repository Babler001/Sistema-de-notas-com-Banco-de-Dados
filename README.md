# Escolinha

## Descrição

Este projeto em **TypeScript** permite cadastrar alunos e suas matérias, calculando automaticamente a média de cada matéria e salvando todas as informações em um **banco de dados PostgreSQL**.

O programa é **console-based**, usando `readline-sync` para interação com o usuário, e `pg` para comunicação com o PostgreSQL.

---

## Funcionalidades

* Cadastrar novos alunos (nome, série, idade).
* Cadastrar múltiplas matérias por aluno (cada matéria deve ter 8 notas).
* Calcular a média das notas de cada matéria automaticamente.
* Salvar alunos e matérias no banco de dados PostgreSQL.
* Exibir resumo do aluno com suas matérias e médias no console.

---

## Pré-requisitos

* Node.js v18+
* PostgreSQL instalado e rodando
* Git (para clonar o repositório)

---

## Como rodar o projeto na sua máquina

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o banco de dados PostgreSQL

* Crie um banco chamado `db_profedu`
* Crie um usuário com permissão de acesso:

```sql
CREATE USER aluno WITH PASSWORD '102030';
CREATE DATABASE db_profedu;
GRANT ALL PRIVILEGES ON DATABASE db_profedu TO aluno;
```

* Crie as tabelas necessárias dentro do banco `db_profedu`:

```sql
CREATE TABLE IF NOT EXISTS alunos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    serie VARCHAR(20) NOT NULL,
    idade INT NOT NULL
);

CREATE TABLE IF NOT EXISTS materias (
    id SERIAL PRIMARY KEY,
    aluno_id INT NOT NULL REFERENCES alunos(id) ON DELETE CASCADE,
    nome_materia VARCHAR(100) NOT NULL,
    media NUMERIC(4,2) NOT NULL
);
```

---

### 4. Configurar conexão no código

No arquivo `escola.ts`, ajuste os parâmetros do `Pool` se necessário:

```ts
const pool = new Pool({
    user: 'aluno',
    host: 'localhost',
    database: 'db_profedu',
    password: '102030',
    port: 5432,
});
```

---

### 5. Compilar e rodar o projeto

**Opção 1: rodar diretamente com ts-node**

```bash
npx ts-node escola.ts
```

**Opção 2: compilar para JavaScript e rodar com Node**

```bash
npx tsc
node dist/escola.js
```

---

## Observações

* Cada matéria precisa ter exatamente **8 notas**.
* As notas devem estar entre **0 e 10**.
* Ao finalizar, o programa exibirá um resumo das matérias e médias do aluno.

---

## Tecnologias utilizadas

* Node.js
* TypeScript
* PostgreSQL
* readline-sync
* node-postgres (`pg`)

---

## Participantes

* **Matheus Babler Silva** - RA: 2506056
* **Eduardo Escuer** - RA: 2500241
* **Gustavo Facioni** - RA: 2506276
* **Gabriel Canuto Prestes** - RA: 2505604
* **Pedro Henrique
