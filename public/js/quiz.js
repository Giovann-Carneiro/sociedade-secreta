// =============================================
// QUIZ - Sociedade Secreta
// Mostra uma tela por vez, guarda as respostas
// e calcula o perfil de investigador.
// =============================================


// ---------- DADOS ----------

// Lista de perguntas do caso "O último brinde da Galeria Duarte".
// Cada pergunta traz uma pista nova no enunciado.
// Cada alternativa está ligada a UMA competência.
// Não existe resposta certa ou errada.
const perguntas = [
    {
        enunciado: "Você chega à galeria meia hora depois do crime. Qual é o seu primeiro passo?",
        alternativas: [
            { texto: "Percorro o escritório devagar, reparando em cada objeto fora do lugar.", competencia: "Observador" },
            { texto: "Fecho as saídas e organizo a ordem em que cada pessoa será ouvida.", competencia: "Estrategista" },
            { texto: "Peço a lista de convidados com os horários de entrada e saída.", competencia: "Analista" },
            { texto: "Presto atenção em quem parece nervoso demais, ou calmo demais.", competencia: "Intuitivo" }
        ]
    },
    {
        enunciado: "A perícia encontrou veneno só na taça de Helena. A garrafa serviu outros seis convidados, e ninguém passou mal. O que você faz com isso?",
        alternativas: [
            { texto: "Concluo que o veneno foi colocado depois que o vinho foi servido.", competencia: "Analista" },
            { texto: "Examino a taça atrás de marcas de dedos ou de batom.", competencia: "Observador" },
            { texto: "Sinto que a garçonete não teria motivo e passo a olhar para os outros.", competencia: "Intuitivo" },
            { texto: "Peço que ninguém toque nas outras taças até a perícia recolher tudo.", competencia: "Estrategista" }
        ]
    },
    {
        enunciado: "Lívia, a sócia, brigou com Helena na frente de todos. A câmera da garagem mostra o carro dela saindo às 22h50. A morte aconteceu entre 23h10 e 23h30.",
        alternativas: [
            { texto: "A briga foi feia, mas algo me diz que ela não voltaria.", competencia: "Intuitivo" },
            { texto: "Comparo os horários: ela já tinha ido embora quando Helena morreu.", competencia: "Analista" },
            { texto: "Peço as imagens da rua para confirmar que o carro não voltou.", competencia: "Estrategista" },
            { texto: "Reparo que, no vídeo, ela está sozinha e com pressa.", competencia: "Observador" }
        ]
    },
    {
        enunciado: "Otávio, o marido, herda o seguro de vida. Das 23h às 23h30, ele fazia um discurso no salão para quarenta convidados.",
        alternativas: [
            { texto: "Ouço os convidados separados, para ver se as versões batem.", competencia: "Estrategista" },
            { texto: "O discurso parecia ensaiado, mas a tristeza dele me pareceu real.", competencia: "Intuitivo" },
            { texto: "Procuro nas fotos da festa se ele saiu do palco em algum momento.", competencia: "Observador" },
            { texto: "Um álibi com quarenta testemunhas é difícil de quebrar. Deixo ele em segundo plano.", competencia: "Analista" }
        ]
    },
    {
        enunciado: "No tapete do escritório há pequenas manchas com cheiro forte de solvente, do tipo usado para limpar quadros antigos.",
        alternativas: [
            { texto: "Fotografo as manchas e sigo o rastro até onde ele termina.", competencia: "Observador" },
            { texto: "Descubro quem na galeria tem acesso a esse produto.", competencia: "Analista" },
            { texto: "Não comento as manchas com ninguém, para ver quem toca no assunto.", competencia: "Estrategista" },
            { texto: "O cheiro me leva direto para a oficina de restauração, nos fundos.", competencia: "Intuitivo" }
        ]
    },
    {
        enunciado: "Rafael, o restaurador, diz que não saiu do salão a noite toda. O barman lembra que ele sumiu por uns vinte minutos, perto das 23h15.",
        alternativas: [
            { texto: "Peço que ele repita a história mais uma vez, esperando um deslize.", competencia: "Estrategista" },
            { texto: "Reparo nas mãos dele: as unhas têm restos de tinta.", competencia: "Observador" },
            { texto: "Ele responde rápido demais, como quem ensaiou.", competencia: "Intuitivo" },
            { texto: "Confronto o horário do sumiço com o horário da morte.", competencia: "Analista" }
        ]
    },
    {
        enunciado: "Na mesa de Helena há um laudo pedido por ela: o quadro mais valioso da galeria é falso, e a assinatura foi refeita na última restauração.",
        alternativas: [
            { texto: "Cruzo o laudo com o registro de quem fez a última restauração.", competencia: "Analista" },
            { texto: "Entendo que Helena descobriu algo que alguém queria esconder.", competencia: "Intuitivo" },
            { texto: "Comparo a assinatura do quadro com a de outras obras do mesmo pintor.", competencia: "Observador" },
            { texto: "Guardo o laudo para usar no interrogatório final.", competencia: "Estrategista" }
        ]
    },
    {
        enunciado: "Hora de fechar o caso. Como você junta as pistas?",
        alternativas: [
            { texto: "Confio na impressão que cada suspeito deixou em mim.", competencia: "Intuitivo" },
            { texto: "Monto a linha do tempo da noite e apresento para todos de uma vez.", competencia: "Estrategista" },
            { texto: "Elimino quem tem álibi comprovado e fico com quem sobra.", competencia: "Analista" },
            { texto: "Volto às fotos e aos objetos: a resposta está num detalhe.", competencia: "Observador" }
        ]
    }
];

// Suspeitos (os mesmos da tela do caso) e quem é o culpado
const suspeitos = ["Beatriz Leme", "Otávio Duarte", "Rafael Moura", "Lívia Prado"];
const assassino = "Rafael Moura";

// Ordem de desempate do perfil
const ordemCompetencias = ["Observador", "Estrategista", "Analista", "Intuitivo"];


// ---------- ESTADO DO QUIZ ----------

// Índice da pergunta atual (0 = primeira)
let perguntaAtual = 0;

// Respostas na ordem: [{ pergunta: 1, competencia: "Observador" }, ...]
// Será usada depois no gráfico de linha.
let respostas = [];


// ---------- TROCAR DE TELA ----------

// Esconde todas as telas e mostra só a do id recebido
function mostrarTela(idDaTela) {
    const telas = document.querySelectorAll(".tela");
    for (let i = 0; i < telas.length; i++) {
        telas[i].hidden = true;
    }
    document.getElementById(idDaTela).hidden = false;
}


// ---------- TELAS ----------

// Tela 1: abertura
function mostrarAbertura() {
    mostrarTela("tela-abertura");
}

// Tela 2: descrição do caso
function mostrarCaso() {
    mostrarTela("tela-caso");
}

// Tela 3: monta a pergunta atual na tela
function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];

    // "Pergunta X de 8"
    document.getElementById("contador").textContent =
        "Pergunta " + (perguntaAtual + 1) + " de " + perguntas.length;

    document.getElementById("enunciado").textContent = pergunta.enunciado;

    // Cria as 4 alternativas como botões de rádio (só dá pra marcar uma)
    let html = "";
    for (let i = 0; i < pergunta.alternativas.length; i++) {
        const alternativa = pergunta.alternativas[i];
        html += '<label>' +
                '<input type="radio" name="alternativa" value="' + alternativa.competencia + '"> ' +
                alternativa.texto +
                '</label><br>';
    }
    document.getElementById("alternativas").innerHTML = html;

    // Limpa o aviso da pergunta anterior
    document.getElementById("aviso-pergunta").textContent = "";

    mostrarTela("tela-perguntas");
}

// Tela 4: lista os suspeitos para a acusação
function mostrarVeredito() {
    let html = "";
    for (let i = 0; i < suspeitos.length; i++) {
        html += '<label>' +
                '<input type="radio" name="suspeito" value="' + suspeitos[i] + '"> ' +
                suspeitos[i] +
                '</label><br>';
    }
    document.getElementById("suspeitos").innerHTML = html;
    document.getElementById("aviso-veredito").textContent = "";

    mostrarTela("tela-veredito");
}

// Tela 5: calcula e mostra o perfil
function mostrarResultado() {
    const pontos = somarPontos();
    const perfil = decidirPerfil(pontos);

    document.getElementById("texto-perfil").textContent = "Você é um(a) " + perfil;

    // Objeto que depois será enviado para a API
    const resultado = {
        perfil: perfil,
        pontos: pontos,
        respostas: respostas
    };
    console.log(resultado);

    mostrarTela("tela-resultado");
}


// ---------- CÁLCULOS ----------

// Conta quantas vezes cada competência foi escolhida
function somarPontos() {
    const pontos = {
        Observador: 0,
        Estrategista: 0,
        Analista: 0,
        Intuitivo: 0
    };
    for (let i = 0; i < respostas.length; i++) {
        const competencia = respostas[i].competencia;
        pontos[competencia] = pontos[competencia] + 1;
    }
    return pontos;
}

// Escolhe a competência com mais pontos.
// Percorre na ordem de desempate e só troca se for MAIOR,
// então em empate fica a que vem primeiro na ordem.
function decidirPerfil(pontos) {
    let perfil = ordemCompetencias[0];
    for (let i = 1; i < ordemCompetencias.length; i++) {
        const competencia = ordemCompetencias[i];
        if (pontos[competencia] > pontos[perfil]) {
            perfil = competencia;
        }
    }
    return perfil;
}


// ---------- AÇÕES DOS BOTÕES ----------

// Guarda a resposta e avança
function proximaPergunta() {
    // Procura a alternativa marcada
    const marcada = document.querySelector('input[name="alternativa"]:checked');

    if (marcada == null) {
        document.getElementById("aviso-pergunta").textContent = "Escolha uma alternativa.";
        return; // para aqui e não avança
    }

    respostas.push({
        pergunta: perguntaAtual + 1,
        competencia: marcada.value
    });

    perguntaAtual++;

    // Ainda tem pergunta? Mostra a próxima. Se não, vai para o veredito.
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarVeredito();
    }
}

// Confere se a pessoa acertou o assassino
function acusar() {
    const marcado = document.querySelector('input[name="suspeito"]:checked');
    const aviso = document.getElementById("aviso-veredito");

    if (marcado == null) {
        aviso.textContent = "Escolha um suspeito.";
        return;
    }

    if (marcado.value == assassino) {
        mostrarResultado();
    } else {
        // Errou: as respostas continuam guardadas, só tenta de novo
        aviso.textContent = "Não foi " + marcado.value + ". Revise as pistas e tente de novo.";
    }
}


// ---------- LIGAR OS BOTÕES ----------

document.getElementById("botao-comecar").addEventListener("click", mostrarCaso);
document.getElementById("botao-investigar").addEventListener("click", mostrarPergunta);
document.getElementById("botao-proxima").addEventListener("click", proximaPergunta);
document.getElementById("botao-acusar").addEventListener("click", acusar);

// Começa pela tela de abertura
mostrarAbertura();
