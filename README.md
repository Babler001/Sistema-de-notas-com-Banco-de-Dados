# Escolinha

## Descrição

Este projeto em **TypeScript** permite cadastrar alunos e suas matérias, calculando automaticamente a média de cada matéria e salvando todas as informações em um **banco de dados PostgreSQL**.  

O programa é **console-based**, usando `readline-sync` para interação com o usuário, e `pg` para comunicação com o PostgreSQL.

---

## Funcionalidades

- Cadastrar novos alunos (nome, série, idade).  
- Cadastrar múltiplas matérias por aluno (cada matéria deve ter 8 notas).  
- Calcular a média das notas de cada matéria automaticamente.  
- Salvar alunos e matérias no banco de dados PostgreSQL.  
- Exibir resumo do aluno com suas matérias e médias no console.

---

## Pré-requisitos

- Node.js v18+  
- PostgreSQL instalado e rodando  
- Git (para clonar o repositório)  

---

## Como rodar o projeto na sua máquina

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
