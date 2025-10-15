// script.minimo.js
// Versão mínima e comentada linha-a-linha para aula

// URL base da API
const API_BASE = 'https://proweb.leoproti.com.br/alunos';

// Função que busca os alunos e popula a tabela
async function carregar(){
  // Faz GET /alunos
  const resp = await fetch(API_BASE);
  // Lê resposta como JSON (array de alunos)
  const alunos = await resp.json();
  // Encontra o tbody da tabela onde vamos inserir as linhas
  const tbody = document.querySelector('#alunos-table tbody');
  // Monta as linhas ou uma mensagem caso não existam alunos
  tbody.innerHTML = alunos.length ? alunos.map(p => 
    `
    <tr data-id="${p.id}">
      <td>${p.id}</td>
      <td>${p.nome}</td>
      <td>${p.turma}</td>
      <td>${p.curso}</td>
      <td>${p.matricula}</td>
      
      <td>
        <a class="btn btn-sm btn-primary" href="form.html?id=${p.id}">Editar</a>
        <button class="btn btn-sm btn-danger btn-del">Excluir</button>
      </td>
    </tr>
    `
  ).join('') : '<tr><td colspan="5" class="text-center">Nenhum aluno</td></tr>';
}

// Usamos event delegation: um único listener para cliques na página
// Isso evita precisar adicionar um listener por botão gerado dinamicamente
document.addEventListener('click', async (e) => {
  // Se o alvo do clique tiver a classe 'btn-del', tratamos como exclusão
  if(e.target.classList.contains('btn-del')){
    // Encontra a linha (<tr>) mais próxima para pegar o data-id
    const tr = e.target.closest('tr');
    const id = tr.dataset.id;
    // Pergunta confirmação ao usuário
    if(confirm('Confirmar exclusão?')){
      // Chama DELETE /alunos/{id}
      await fetch(API_BASE + '/' + id, { method: 'DELETE' });
      // Recarrega a lista
      carregar();
    }
  }
});

// Quando o DOM estiver pronto, carrega os alunos
document.addEventListener('DOMContentLoaded', carregar);
