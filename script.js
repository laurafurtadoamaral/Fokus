const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnDescansoCurto = document.querySelector(".app__card-button--curto");
const btnDescansoLongo = document.querySelector(".app__card-button--longo");
const btnStartPause = document.getElementById("start-pause");
const btnStartPauseTexto = document.querySelector("#start-pause span");
// ou: const btnStartPauseTexto = btnStartPause.querySelector("span");
const imgFundo = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const tituloStrong = document.querySelector(".app__title-strong");
const timer = document.getElementById("timer");
const musicaInput = document.getElementById("alternar-musica");
const musicaFundo = new Audio("./sons/luna-rise-part-one.mp3");
const musicaPlay = new Audio("./sons/play.wav");
const musicaPause = new Audio("./sons/pause.mp3");
const musicaFim = new Audio("./sons/beep.mp3");
const imgPlayPause = document.querySelector(".app__card-primary-butto-icon");
musicaFundo.loop = true;
let tempoAPercorrer = 1500; // em segundos

btnFoco.addEventListener("click", () => {
  tempoAPercorrer = 1500;
  const tema = "foco";
  const tituloPrincipal = "Otimize sua produtividade,";
  const tituloDestaque = "mergulhe no que importa.";
  alterarTema(tema, tituloPrincipal, tituloDestaque);
  selecionarBotao(btnFoco);
});

musicaInput.addEventListener("change", () => {
  if (musicaFundo.paused) {
    musicaFundo.play();
  } else {
    musicaFundo.pause();
  }
});

btnDescansoCurto.addEventListener("click", () => {
  tempoAPercorrer = 300;
  const tema = "descanso-curto";
  const tituloPrincipal = "Que tal dar uma respirada?";
  const tituloDestaque = "Faça uma pausa curta!";
  alterarTema(tema, tituloPrincipal, tituloDestaque);
  selecionarBotao(btnDescansoCurto);
});

btnDescansoLongo.addEventListener("click", () => {
  tempoAPercorrer = 900;
  const tema = "descanso-longo";
  const tituloPrincipal = "Hora de voltar à superfície.";
  const tituloDestaque = "Faça uma pausa longa.";
  alterarTema(tema, tituloPrincipal, tituloDestaque);
  selecionarBotao(btnDescansoLongo);
});

function alterarTema(tema, tituloPrincipal, tituloDestaque) {
  html.setAttribute("data-contexto", `${tema}`);
  imgFundo.src = `./imagens/${tema}.png`;
  titulo.firstChild.textContent = tituloPrincipal;
  tituloStrong.textContent = tituloDestaque;
  exibeTimer();
}

function selecionarBotao(button) {
  allButtons = document.querySelectorAll(".app__card-button");
  allButtons.forEach((button) => button.classList.remove("active"));
  button.classList.add("active");
}

let ligaCronometro = null; // significa que o cronometro está parado
exibeTimer();

const tempoDecorrido = () => {
  if (tempoAPercorrer == 0) {
    musicaFim.play();
    imgPlayPause.src = "./imagens/play_arrow.png";
    btnStartPauseTexto.textContent = "Começar";
    zerarContagem();
    return;
  }
  tempoAPercorrer--;
  exibeTimer();
};

btnStartPause.addEventListener("click", iniciarPausarTemporizador);

function iniciarPausarTemporizador() {
  if (ligaCronometro) {
    musicaPause.play();
    imgPlayPause.src = "./imagens/play_arrow.png";
    btnStartPauseTexto.textContent = "Retomar";
    zerarContagem();
    return;
  }
  musicaPlay.play();
  imgPlayPause.src = "./imagens/pause.png";
  btnStartPauseTexto.textContent = "Pausar";
  ligaCronometro = setInterval(tempoDecorrido, 1000);
}

function zerarContagem() {
  ligaCronometro = clearInterval(ligaCronometro);
  ligaCronometro = null;
}

function exibeTimer() {
  const tempo = new Date(tempoAPercorrer * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  timer.innerHTML = `${tempoFormatado}`;
}
