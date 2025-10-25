// Gerencia lista de tarefas, toast de confirmação e remoção de tarefas selecionadas
const input = document.getElementById('input-tarefa');
const btn = document.getElementById('btn-adicionar');
const lista = document.getElementById('lista-tarefas');
const toast = document.getElementById('toast');
const btnRemover = document.getElementById('btn-remover');

function showToast(msg = 'Tarefa adicionada!', time = 2000) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), time);
}

function createLi(text) {
  const li = document.createElement('li');
  li.className = 'tarefa-item';
  li.textContent = text;
  li.tabIndex = 0; // permite foco
  return li;
}

function addTarefa() {
  const texto = input.value.trim();
  if (!texto) {
    showToast('Digite uma tarefa antes de adicionar', 1800);
    return;
  }
  const li = createLi(texto);
  lista.appendChild(li);
  input.value = '';
  showToast('Tarefa adicionada com sucesso!', 1600);
}

btn.addEventListener('click', addTarefa);
// permitir Enter
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTarefa();
});

// Delegação: clicar em qualquer li toggla seleção
if (lista) {
  lista.addEventListener('click', (e) => {
    const li = e.target.closest('li.tarefa-item');
    if (!li) return;
    li.classList.toggle('selected');
  });
}

// remover tarefas selecionadas
if (btnRemover) {
  btnRemover.addEventListener('click', () => {
    const selecionadas = Array.from(lista.querySelectorAll('.tarefa-item.selected'));
    if (selecionadas.length === 0) {
      showToast('Selecione ao menos uma tarefa para remover', 1600);
      return;
    }
    selecionadas.forEach(li => li.remove());
    showToast(selecionadas.length === 1 ? 'Tarefa removida' : `${selecionadas.length} tarefas removidas` , 1600);
  });
}