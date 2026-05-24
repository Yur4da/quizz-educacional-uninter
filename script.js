// =========================================
// BANCO DE PERGUNTAS
// =========================================
const perguntas = [
  // ========== INGLÊS ==========
  { categoria: "ingles", pergunta: "Como se diz 'computador' em inglês?", opcoes: ["Computer", "Computator", "Compute", "Comper"], correta: 0 },
  { categoria: "ingles", pergunta: "Qual a tradução de 'Hello, how are you?'", opcoes: ["Olá, onde você está?", "Olá, como você está?", "Oi, o que você faz?", "Olá, quem é você?"], correta: 1 },
  { categoria: "ingles", pergunta: "O que significa 'keyboard' em português?", opcoes: ["Tela", "Mouse", "Teclado", "Quadro"], correta: 2 },
  { categoria: "ingles", pergunta: "Qual é a tradução de 'file'?", opcoes: ["Pasta", "Janela", "Arquivo", "Botão"], correta: 2 },
  { categoria: "ingles", pergunta: "Como se diz 'segunda-feira' em inglês?", opcoes: ["Sunday", "Monday", "Tuesday", "Saturday"], correta: 1 },
  { categoria: "ingles", pergunta: "O que significa 'string' em programação?", opcoes: ["Um número inteiro", "Uma sequência de caracteres", "Um botão da interface", "Um tipo de erro"], correta: 1 },
  { categoria: "ingles", pergunta: "Qual a tradução de 'I am a student'?", opcoes: ["Eu sou um estudante", "Eu tenho um estudante", "Eu vou estudar", "Eu fui um estudante"], correta: 0 },
  { categoria: "ingles", pergunta: "O que significa 'password'?", opcoes: ["Usuário", "Senha", "Cadastro", "Email"], correta: 1 },
  { categoria: "ingles", pergunta: "Como se diz 'amarelo' em inglês?", opcoes: ["Red", "Blue", "Green", "Yellow"], correta: 3 },
  { categoria: "ingles", pergunta: "O que significa 'download'?", opcoes: ["Enviar", "Baixar", "Apagar", "Editar"], correta: 1 },

  // ========== LÓGICA ==========
  { categoria: "logica", pergunta: "Qual é o resultado de 5 + 3 * 2?", opcoes: ["16", "11", "13", "10"], correta: 1 },
  { categoria: "logica", pergunta: "O que é uma 'variável' em programação?", opcoes: ["Um tipo de erro", "Um espaço para guardar informações", "Um botão do teclado", "Um programa antivírus"], correta: 1 },
  { categoria: "logica", pergunta: "Se idade >= 18, a pessoa é considerada:", opcoes: ["Criança", "Adolescente", "Maior de idade", "Idoso"], correta: 2 },
  { categoria: "logica", pergunta: "Qual estrutura é usada para repetir ações em código?", opcoes: ["Variável", "Loop", "Função única", "Pasta"], correta: 1 },
  { categoria: "logica", pergunta: "O que significa o operador '==' em programação?", opcoes: ["Diferente", "Maior que", "Igual a (comparação)", "Adição"], correta: 2 },
  { categoria: "logica", pergunta: "Qual estrutura toma decisões baseada em condições?", opcoes: ["if / else", "for", "while", "print"], correta: 0 },
  { categoria: "logica", pergunta: "Em programação, o que é um 'array' (vetor)?", opcoes: ["Um único valor", "Uma lista de valores", "Um tipo de erro", "Um sistema operacional"], correta: 1 },
  { categoria: "logica", pergunta: "Qual o resultado de (10 > 5) em lógica?", opcoes: ["Falso", "Verdadeiro", "Erro", "Nulo"], correta: 1 },
  { categoria: "logica", pergunta: "O que faz a função 'console.log()' em JavaScript?", opcoes: ["Apaga o código", "Exibe uma mensagem no console", "Reinicia o computador", "Salva o arquivo"], correta: 1 },
  { categoria: "logica", pergunta: "Qual é o primeiro passo para resolver um problema com lógica?", opcoes: ["Escrever o código", "Entender o problema", "Apagar tudo", "Pedir ajuda"], correta: 1 }
];

// =========================================
// ESTADO
// =========================================
let estado = {
  nome: "",
  categoria: "todas",
  perguntasFiltradas: [],
  indiceAtual: 0,
  acertos: 0,
  erros: 0,
  pontos: 0,
  totalPerguntas: 10
};

// =========================================
// REFS
// =========================================
const telas = {
  inicial: document.getElementById("tela-inicial"),
  quiz: document.getElementById("tela-quiz"),
  resultado: document.getElementById("tela-resultado")
};

const inputNome = document.getElementById("nome-jogador");
const btnIniciar = document.getElementById("btn-iniciar");
const btnsCat = document.querySelectorAll(".cat-btn");
const btnProxima = document.getElementById("btn-proxima");
const btnJogarNovamente = document.getElementById("btn-jogar-novamente");
const btnTrocarCat = document.getElementById("btn-trocar-cat");

// =========================================
// HELPERS
// =========================================
function embaralhar(array) {
  const c = [...array];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function trocarTela(nome) {
  Object.values(telas).forEach(t => t.classList.remove("ativa"));
  telas[nome].classList.add("ativa");
}

// =========================================
// CATEGORIA
// =========================================
btnsCat.forEach(btn => {
  btn.addEventListener("click", () => {
    btnsCat.forEach(b => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    estado.categoria = btn.dataset.cat;
  });
});

// =========================================
// INICIAR
// =========================================
btnIniciar.addEventListener("click", () => {
  const nome = inputNome.value.trim();
  if (!nome) {
    inputNome.parentElement.style.borderColor = "var(--red)";
    inputNome.placeholder = "Digite seu nome para começar";
    inputNome.focus();
    return;
  }

  estado.nome = nome;
  estado.acertos = 0;
  estado.erros = 0;
  estado.pontos = 0;
  estado.indiceAtual = 0;

  let filtradas = estado.categoria === "todas"
    ? [...perguntas]
    : perguntas.filter(p => p.categoria === estado.categoria);

  filtradas = embaralhar(filtradas);
  estado.perguntasFiltradas = filtradas.slice(0, estado.totalPerguntas);
  estado.totalPerguntas = estado.perguntasFiltradas.length;

  document.getElementById("num-total").textContent = estado.totalPerguntas;

  trocarTela("quiz");
  exibirPergunta();
});

inputNome.addEventListener("keydown", e => {
  if (e.key === "Enter") btnIniciar.click();
});

// =========================================
// PERGUNTA
// =========================================
function exibirPergunta() {
  const p = estado.perguntasFiltradas[estado.indiceAtual];
  const numAtual = estado.indiceAtual + 1;

  document.getElementById("num-atual").textContent = numAtual;
  document.getElementById("pontos-display").textContent = estado.pontos;
  document.getElementById("texto-pergunta").textContent = `"${p.pergunta}"`;
  document.getElementById("counter-num").textContent = String(numAtual).padStart(2, "0");

  const tag = document.getElementById("categoria-tag");
  tag.textContent = p.categoria === "ingles" ? "Inglês" : "Lógica";
  tag.classList.toggle("logica", p.categoria === "logica");

  // Progress
  const progresso = (numAtual / estado.totalPerguntas) * 100;
  document.getElementById("barra-fill").style.width = progresso + "%";

  // Counter ring
  const offset = 100 - ((numAtual - 1) / estado.totalPerguntas) * 100;
  document.getElementById("counter-progress").style.strokeDashoffset = offset;

  // Opções
  const opcoesComIndice = p.opcoes.map((texto, i) => ({ texto, original: i }));
  const opcoesEmbaralhadas = embaralhar(opcoesComIndice);

  const containerOpcoes = document.getElementById("opcoes");
  containerOpcoes.innerHTML = "";

  opcoesEmbaralhadas.forEach(op => {
    const btn = document.createElement("button");
    btn.className = "opcao";
    btn.textContent = op.texto;
    btn.addEventListener("click", () => responder(op.original === p.correta, opcoesEmbaralhadas, p.correta, btn));
    containerOpcoes.appendChild(btn);
  });

  document.getElementById("feedback").classList.add("oculto");
  btnProxima.classList.add("oculto");
  btnProxima.querySelector("span").textContent =
    estado.indiceAtual === estado.totalPerguntas - 1 ? "Ver resultado" : "Próxima";
}

// =========================================
// RESPONDER
// =========================================
function responder(acertou, opcoes, indiceCorreto, botaoClicado) {
  const todosBtns = document.querySelectorAll(".opcao");
  todosBtns.forEach((btn, i) => {
    btn.disabled = true;
    if (opcoes[i].original === indiceCorreto) btn.classList.add("correta");
  });

  const feedback = document.getElementById("feedback");

  if (acertou) {
    estado.acertos++;
    estado.pontos += 10;
    feedback.className = "feedback acerto";
    feedback.textContent = "✓ Correto · +10 pontos";
  } else {
    estado.erros++;
    botaoClicado.classList.add("incorreta");
    feedback.className = "feedback erro";
    feedback.textContent = "✗ Resposta incorreta · A correta está destacada";
  }

  document.getElementById("pontos-display").textContent = estado.pontos;
  feedback.classList.remove("oculto");
  btnProxima.classList.remove("oculto");
}

// =========================================
// PRÓXIMA
// =========================================
btnProxima.addEventListener("click", () => {
  estado.indiceAtual++;
  if (estado.indiceAtual >= estado.totalPerguntas) {
    exibirResultado();
  } else {
    exibirPergunta();
  }
});

// =========================================
// RESULTADO
// =========================================
function exibirResultado() {
  document.getElementById("stat-acertos").textContent = estado.acertos;
  document.getElementById("stat-erros").textContent = estado.erros;
  document.getElementById("stat-pontos").textContent = estado.pontos;

  const pct = (estado.acertos / estado.totalPerguntas) * 100;
  let emoji, titulo, msg;

  if (pct === 100) {
    emoji = "🏆"; titulo = "Perfeito!";
    msg = "Você acertou todas as perguntas. Excelente desempenho!";
  } else if (pct >= 70) {
    emoji = "🎉"; titulo = "Muito bem!";
    msg = "Bom desempenho. Continue praticando para melhorar ainda mais.";
  } else if (pct >= 50) {
    emoji = "👏"; titulo = "Bom trabalho!";
    msg = "Você está no caminho certo. Tente novamente para subir a pontuação.";
  } else {
    emoji = "💪"; titulo = "Continue!";
    msg = "A prática leva à perfeição. Que tal jogar de novo?";
  }

  document.getElementById("emoji-resultado").textContent = emoji;
  document.getElementById("titulo-resultado").textContent = titulo;
  document.getElementById("msg-resultado").textContent = msg;

  trocarTela("resultado");
}

btnJogarNovamente.addEventListener("click", () => btnIniciar.click());
btnTrocarCat.addEventListener("click", () => trocarTela("inicial"));
