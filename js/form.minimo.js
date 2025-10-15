// form.minimo.js
// Versão mínima e comentada para aula: cria ou atualiza aluno com POST/PUT

// URL base da API
const API = 'https://proweb.leoproti.com.br/alunos';

// Quando o DOM estiver carregado executamos este bloco
document.addEventListener('DOMContentLoaded', async () => {
  // Pega id da query string, se existir (ex.: form.html?id=123)
  const id = new URLSearchParams(location.search).get('id');
  // Referências aos campos do formulário
  const nome = document.querySelector('#nome');
  const turma = document.querySelector('#turma');
  const curso = document.querySelector('#curso');
  const matricula = document.querySelector('#matricula');
  const form = document.querySelector('#aluno-form');

  // Se estivermos no modo edição (tem id), busca os dados do aluno
  if(id){
    // GET /alunos/{id}
    const r = await fetch(API + '/' + id);
    const p = await r.json();
    // Preenche os campos com os valores obtidos
    nome.value = p.nome;
    turma.value = p.turma;
    curso.value = p.curso;
    matricula.value = p.matricula;
    // Atualiza o título do formulário para indicar edição
    document.getElementById('form-title').textContent = 'Editar Aluno';
  }

  // Ao submeter o formulário, criamos ou atualizamos o aluno
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault(); // evita reload automático
    // Monta o corpo da requisição a partir dos campos
    const body = JSON.stringify({
      nome: nome.value.trim(),
      turma: turma.value.trim(),
      curso: curso.value.trim(),
      matricula: matricula.value.trim()
    });

    if(id) {
      // PUT /alunos/{id}
      await fetch(API + '/' + id, {
        method: 'PUT', headers: {
          'Content-Type':'application/json'},
        body });
    } else {
      // POST /alunos
      await fetch(API, { method: 'POST', headers: {'Content-Type':'application/json'}, body });
    }
    // Após salvar, volta para a lista
    location.href = 'index.html';
  });
});