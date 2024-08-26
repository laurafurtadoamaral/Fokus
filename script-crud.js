const bntAdicionarTarefa = document.querySelector(".app__button--add-task");
const formularioAdicionarTarefa = document.querySelector(".app__form-add-task");
const btnDeletarNovaTarefa = document.querySelector(
  ".app__form-footer__button--delete"
);
const btnCancelarNovaTarefa = document.querySelector(
  ".app__form-footer__button--cancel"
);

const btnSalvarTarefa = document.querySelector(
  ".app__form-footer__button--confirm"
);
const tituloTarefa = document.querySelector(".app__form-textarea");
const listaDeTarefas = document.querySelector(".app__section-task-list");
const btnExcluirTarefasConcluidas = document.getElementById(
  "btn-remover-concluidas"
);
const btnExcluirTodasTarefas = document.getElementById("btn-remover-todas");
const itemTarefa = document.querySelector(".app__section-task-list-item");
const tarefaEmAndamento = document.querySelector(
  ".app__section-active-task-description"
);

function atualizarLocaStorage() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

bntAdicionarTarefa.addEventListener("click", () => {
  adicionarTarefa();
});

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let tarefaSelecionada = null;
let liTarefaSelecionada = null;
let tarefasConcluidas = [];

let proximoId;
if (tarefas.length > 0) {
  proximoId = tarefas[tarefas.length - 1]["id"] + 1;
} else {
  proximoId = 1;
}

exibirTarefas();

function adicionarTarefa() {
  formularioAdicionarTarefa.classList.remove("hidden");
}

btnDeletarNovaTarefa.addEventListener("click", limparTarefa);

btnCancelarNovaTarefa.addEventListener("click", cancelarTarefa);

formularioAdicionarTarefa.addEventListener("submit", (event) => {
  event.preventDefault();
});

btnSalvarTarefa.addEventListener("click", () => {
  salvarTarefa();
});

btnExcluirTodasTarefas.addEventListener("click", excluirTodasTarefas);

btnExcluirTarefasConcluidas.addEventListener("click", excluirTarefasConcluidas);

function cancelarTarefa() {
  formularioAdicionarTarefa.classList.add("hidden");
  limparTarefa();
}

function limparTarefa() {
  tituloTarefa.value = "";
}

function salvarTarefa() {
  let id = proximoId;
  let titulo = tituloTarefa.value;
  if (titulo == "") {
    alert("Dê um nome para a tarefa");
    return;
  }
  tarefas.push({ id: id, titulo: titulo });
  proximoId++;
  console.log(tarefas);
  atualizarLocaStorage();
  limparTarefa();
  exibirTarefas();
  formularioAdicionarTarefa.classList.add("hidden");
}

function exibirTarefas() {
  listaDeTarefas.innerHTML = "";
  for (let i = 0; i < tarefas.length; i++) {
    let titulo = tarefas[i].titulo;
    const tarefaCriada = criarElementoTarefa(titulo);
    if (tarefas[i].concluida) {
      tarefaCriada.classList.add("app__section-task-list-item-complete");
      tarefaCriada.querySelector("button").setAttribute("disabled", "disabled");
    }
    listaDeTarefas.append(tarefaCriada);
  }
}

function criarElementoTarefa(titulo) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");
  const svg = document.createElement("svg");
  svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>`;
  const paragrafo = document.createElement("p");
  paragrafo.classList.add("app__section-task-list-item-description");
  paragrafo.textContent = titulo;
  const botao = document.createElement("button");
  botao.classList.add("app_button-edit");
  botao.onclick = () => {
    editarTarefa(titulo);
  };
  const imgEditar = document.createElement("img");
  imgEditar.src = "/imagens/edit.png";
  botao.append(imgEditar);

  li.append(svg);
  li.append(paragrafo);
  li.append(botao);

  li.onclick = () => {
    document.querySelectorAll(".app__section-task-list-item").forEach((e) => {
      e.classList.remove("app__section-task-list-item-active");
      tarefaEmAndamento.textContent = titulo;
    });
    if (tarefaSelecionada == titulo) {
      tarefaEmAndamento.textContent = "";
      tarefaSelecionada = null;
      liTarefaSelecionada = null;
      return;
    }
    li.classList.add("app__section-task-list-item-active");
    tarefaSelecionada = titulo;
    liTarefaSelecionada = li;
  };
  return li;
}

function editarTarefa(titulo) {
  let id = obterIdPorTitulo(titulo);
  console.log(`id: ${id}`);
  tarefas.forEach((tarefa) => {
    if (tarefa.id == id) {
      let novoNome = prompt("Digite o nome correto para a tarefa");
      if (novoNome) {
        tarefa.titulo = novoNome;
      }
    }
  });
  atualizarLocaStorage();
  exibirTarefas();
}

function excluirTarefa(titulo) {
  let id = obterIdPorTitulo(titulo);
  tarefas.forEach((tarefa) => {
    if (tarefa.id == id) {
      tarefas.remove(tarefa);
    }
  });
  limparTarefa();
  atualizarLocaStorage();
  exibirTarefas();
}

function excluirTodasTarefas() {
  tarefas = [];
  atualizarLocaStorage();
  exibirTarefas();
}

function excluirTarefasConcluidas() {
  tarefas = tarefas.filter((tarefa) => !tarefa.concluida);
  atualizarLocaStorage();
  exibirTarefas();
}

function obterIdPorTitulo(titulo) {
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].titulo == titulo) {
      let id = tarefas[i].id;
      return id;
    }
  }
}

document.addEventListener("focoFinalizado", () => {
  if (tarefaSelecionada && liTarefaSelecionada) {
    liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
    liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    liTarefaSelecionada
      .querySelector("button")
      .setAttribute("disabled", "disabled");
    for (let i = 0; i < tarefas.length; i++) {
      if (tarefas[i].titulo == tarefaSelecionada) {
        tarefas[i].concluida = true;
        atualizarLocaStorage();
      }
    }
    exibirTarefas();
  }
});
