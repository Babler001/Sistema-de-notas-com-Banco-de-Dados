"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const pg_1 = require("pg");
// Configuração do banco
const pool = new pg_1.Pool({
    user: 'aluno',
    host: 'localhost',
    database: 'db_profedu',
    password: '102030',
    port: 5432,
});
// Função para calcular média
function calcularMedia(notas) {
    if (notas.length !== 8) {
        throw new Error('Cada matéria precisa ter exatamente 8 notas');
    }
    const soma = notas.reduce((a, b) => a + b, 0);
    return soma / 8;
}
// Função principal
async function cadastrarAluno() {
    console.log('--- Cadastro de Novo Aluno ---');
    const nome = readline_sync_1.default.question('Digite o nome: ');
    const serie = readline_sync_1.default.question('Digite a série: ');
    const idade = readline_sync_1.default.questionInt('Digite a idade: ');
    if (!nome || !serie || !idade) {
        console.error('Erro: Todos os campos são obrigatórios! Operação cancelada.');
        await pool.end();
        return;
    }
    // Cadastro de matérias
    const materias = [];
    const quantidadeMaterias = readline_sync_1.default.questionInt('Quantas matérias deseja cadastrar? ');
    for (let i = 0; i < quantidadeMaterias; i++) {
        console.log(`\n--- Matéria ${i + 1} ---`);
        const nomeMateria = readline_sync_1.default.question('Nome da matéria: ');
        const notas = [];
        for (let j = 0; j < 8; j++) {
            const nota = readline_sync_1.default.questionFloat(`Digite a nota ${j + 1} (0-10): `);
            if (nota < 0 || nota > 10) {
                console.error('Nota inválida, deve estar entre 0 e 10.');
                j--; // repete a nota
            }
            else {
                notas.push(nota);
            }
        }
        materias.push({ nome: nomeMateria, notas });
    }
    const client = await pool.connect();
    try {
        console.log('\nInserindo dados no banco de dados...');
        await client.query('BEGIN');
        // Inserir aluno
        const alunoResult = await client.query('INSERT INTO alunos (nome, serie, idade) VALUES ($1, $2, $3) RETURNING id', [nome, serie, idade]);
        const alunoId = alunoResult.rows[0].id;
        // Inserir matérias com médias
        for (const materia of materias) {
            const media = calcularMedia(materia.notas);
            await client.query('INSERT INTO materias (aluno_id, nome_materia, media) VALUES ($1, $2, $3)', [alunoId, materia.nome, media]);
        }
        await client.query('COMMIT');
        console.log('\nAluno cadastrado com sucesso!');
        console.log(`Nome: ${nome}, Série: ${serie}, Idade: ${idade}`);
        materias.forEach((m) => {
            console.log(`Matéria: ${m.nome}, Média: ${calcularMedia(m.notas).toFixed(2)}`);
        });
    }
    catch (err) {
        await client.query('ROLLBACK');
        console.error('Erro ao salvar no banco de dados:', err);
    }
    finally {
        client.release();
        await pool.end();
        console.log('Conexão com o banco encerrada.');
    }
}
// Executa a função principal
cadastrarAluno();
