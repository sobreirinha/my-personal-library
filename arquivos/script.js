/* ===========================================
   MY PERSONAL LIBRARY
   Script Principal
=========================================== */

const carrosseis = {
    watching: document.getElementById("watching-carousel"),
    completed: document.getElementById("completed-carousel"),
    airing: document.getElementById("airing-carousel"),
    ended: document.getElementById("ended-carousel"),
    start: document.getElementById("start-carousel")
};

const modal = document.getElementById("series-modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.getElementById("close-modal");

let series = [];

/* ===========================================
   LISTA DOS JSONS
=========================================== */

const arquivos = [
    "rick-and-morty.json",
     "avatar-netflix.json",
     "a-casa-do-dragao.json",
     "the-100.json",
     "ataque-dos-titas.json",
     "the-boys.json",
     "gen-v.json",
     "dark.json",
     "arcane.json",
     "mandalorian.json",
     "one-piece-netflix.json",
     "loki.json",
     "cavaleiro-dos-sete-reinos.json",
     "fundacao.json",
     "presidente-curtis.json",
     "invencible.json",
     "problema-dos-tres-corpos.json", 
     "fallout.json", 
     "o-silo.json", 
     "trigun-stampede.json", 
     "o-pacificador.json", 
     "ahsoka.json",
     "the-last-of-us.json",
     "the-witcher.json",
     "wandinha.json",
     "halo.json",
     "pluribus.json",
     "star-trek-strange-new-worlds.json",
    // "breaking-bad.json",
];

/* ===========================================
   CARREGAR SÉRIES
=========================================== */

async function carregarSeries() {

    for (const arquivo of arquivos) {

        try {

            const resposta = await fetch(`/my-personal-library/arquivos/data/series/${arquivo}`);

            if (!resposta.ok) {
                throw new Error(arquivo);
            }

            const dados = await resposta.json();

            series.push({ ...dados, arquivo: arquivo});

        } catch (erro) {

            console.error("Erro ao carregar:", erro);

        }

    }

    mostrarSeries();

}

/* ===========================================
   PROGRESSO
=========================================== */

function calcularProgresso(serie) {

    let total = 0;
    let assistidos = 0;

    serie.temporadas.forEach(temporada => {

        temporada.episodios.forEach(ep => {

            total++;

            if (ep.assistido) assistidos++;

        });

    });

    return Math.round((assistidos / total) * 100);

}

/* ===========================================
   ÚLTIMO EPISÓDIO
=========================================== */

function ultimoAssistido(serie) {

    let ultimo = "-";

    serie.temporadas.forEach(temp => {

        temp.episodios.forEach(ep => {

            if (ep.assistido) {

                ultimo = `T${temp.numero} • E${ep.numero}`;

            }

        });

    });

    return ultimo;

}

/* ===========================================
   CRIAR CARD
=========================================== */

function criarCard(serie) {

    const progresso = calcularProgresso(serie);

    const card = document.createElement("article");

    card.className = "card";
    card.dataset.id = serie.id;

    card.innerHTML = `
        <img src="${serie.imagem}" alt="${serie.titulo}">

        <div class="card-body">

            <h3 class="card-title">${serie.titulo}</h3>

            <p class="card-progress">${progresso}% concluído</p>

            <div class="progress">
                <div
                    class="progress-fill"
                    style="width:${progresso}%">
                </div>
            </div>

            <div class="card-episode">
                ${ultimoAssistido(serie)}
            </div>

        </div>
    `;

    card.addEventListener("click", () => abrirModal(serie));

    return card;

}

/* ===========================================
   MOSTRAR TODAS
=========================================== */

function mostrarSeries() {

    Object.values(carrosseis).forEach(c => c.innerHTML = "");

    series.forEach(serie => {

        const destino = carrosseis[serie.status];

        if (destino) {

            destino.appendChild(criarCard(serie));

        }

    });

}

/* ===========================================
   MODAL
=========================================== */

function abrirModal(serie){

    const progresso = calcularProgresso(serie);


    let temporadasHTML = "";


    serie.temporadas.forEach(temporada => {


        let episodiosHTML = "";


        temporada.episodios.forEach(ep => {


            episodiosHTML += `

                <label class="episodio">

                    <input 
                    type="checkbox"
                    class="check-episodio"
                    data-temporada="${temporada.numero}"
                    data-episodio="${ep.numero}"
                    ${ep.assistido ? "checked" : ""}
                    >

                    T${temporada.numero}E${ep.numero}
                    - ${ep.titulo}

                </label>
                <br>

            `;


        });



        temporadasHTML += `


            <details class="temporada">

                <summary>

                    Temporada ${temporada.numero}

                </summary>

                <button 
                class="marcar-temporada" style="padding: 5px; margin-left: 100px;"
                data-temporada="${temporada.numero}">

                    ✓ Marcar todos

                </button>
             

                <div class="lista-episodios">

                    ${episodiosHTML}

                </div>


            </details>


        `;


    });



    modalBody.innerHTML = `


        <img
            src="${serie.imagem}"
            style="
                 display:block;
                width:220px;
                height:320px;
                object-fit:cover;
                border-radius:18px;
                margin:0 auto 20px;
            ">

            <button class="finalizar-serie">
                Em dia
            </button>

            <button class="encerrar-serie">
                Encerrada
            </button>
            
            <button class="continuar-serie">
                Continuar assistindo
            </button>

            <button class="assistir-mais-tarde">
                Assistir mais tarde
            </button>

        <h2>${serie.titulo}</h2>

        <p style="margin-top:15px;">
            ${serie.sinopse || ""}
        </p>

        <br>

        <p>
            Progresso:
            <strong>${progresso}%</strong>
        </p>


        <div class="progress">

            <div 
            class="progress-fill"
            style="width:${progresso}%">

            </div>

        </div>



        ${temporadasHTML}


    `;


    modal.classList.remove("hidden");
    id="s9a0qe"

    document.querySelectorAll(".marcar-temporada")
.forEach(botao => {

    botao.addEventListener("click", () => {


         // impede fechar a temporada
        event.stopPropagation();

        const numeroTemporada =
        Number(botao.dataset.temporada);



        const temporada =
        serie.temporadas.find(
            t => t.numero === numeroTemporada
        );



        temporada.episodios.forEach(ep => {


    ep.assistido = true;


    fetch("/salvar-episodio", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            arquivo: serie.arquivo,

            temporada: numeroTemporada,

            episodio: ep.numero,

            assistido:true

        })

    })

    .then(res => res.json())

    .then(data => {

        console.log(
            "Episódio salvo:",
            ep.numero,
            data
        );

    })

    .catch(err => {

        console.error(
            "Erro:",
            err
        );

    });


});



        // muda somente os checkbox da tela
        document
        .querySelectorAll(
            `.check-episodio[data-temporada="${numeroTemporada}"]`
        )
        .forEach(check => {

            check.checked = true;

        });


        atualizarCard(serie);


    });

});

document
    .querySelectorAll(".check-episodio")
    .forEach(check => {

        check.addEventListener("change", async () => {

            const temporadaNumero =
                Number(check.dataset.temporada);

            const episodioNumero =
                Number(check.dataset.episodio);

            const temporada =
                serie.temporadas.find(
                    t => t.numero === temporadaNumero
                );

            if (!temporada) {
                console.error("Temporada não encontrada");
                return;
            }

            const episodio =
                temporada.episodios.find(
                    e => e.numero === episodioNumero
                );

            if (!episodio) {
                console.error("Episódio não encontrado");
                return;
            }

            // Atualiza o estado local
            episodio.assistido = check.checked;

            try {

                const resposta = await fetch(
                    "/salvar-episodio",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            arquivo: serie.arquivo,

                            temporada: temporadaNumero,

                            episodio: episodioNumero,

                            assistido: check.checked

                        })
                    }
                );

                if (!resposta.ok) {
                    throw new Error(
                        "Erro ao salvar episódio"
                    );
                }

                const dados =
                    await resposta.json();

                console.log(
                    "Episódio salvo:",
                    dados
                );

                // Atualiza o card somente depois
                // que o backend confirmou
                atualizarCard(serie);

            } catch (erro) {

                console.error(
                    "Erro ao salvar episódio:",
                    erro
                );

                // Se o backend falhou,
                // desfaz a alteração visual
                check.checked = !check.checked;

                episodio.assistido =
                    check.checked;

            }

        });

    });

    atualizarCard(serie);

});

});

document
.querySelector(".finalizar-serie")
.addEventListener("click",()=>{


    serie.status = "completed";

    serie.finalizada = true;


    mostrarSeries();


    modal.classList.add("hidden");


});
document
.querySelector(".encerrar-serie")
.addEventListener("click",()=>{


    serie.status = "ended";

    serie.encerrada = true;


    mostrarSeries();


    modal.classList.add("hidden");


});

document
.querySelector(".continuar-serie")
.addEventListener("click",()=>{


    serie.status = "watching";


    salvarStatusSerie(
        serie,
        "watching"
    );


    mostrarSeries();

    modal.classList.add("hidden");


});

document
.querySelector(".finalizar-serie")
.addEventListener("click",()=>{


    serie.status = "completed";


    salvarStatusSerie(
        serie,
        "completed"
    );


    mostrarSeries();

    modal.classList.add("hidden");


});

document
.querySelector(".encerrar-serie")
.addEventListener("click",()=>{


    serie.status = "ended";


    salvarStatusSerie(
        serie,
        "ended"
    );


    mostrarSeries();

    modal.classList.add("hidden");


});

document
.querySelector(".assistir-mais-tarde")
.addEventListener("click",()=>{


    serie.status = "start";


    salvarStatusSerie(
        serie,
        "start"
    );


    mostrarSeries();

    modal.classList.add("hidden");


});

}


/* ===========================================
   FECHAR MODAL
=========================================== */


function salvarStatusSerie(serie, status){


    fetch("/salvar-serie", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            arquivo: serie.arquivo,

            status: status

        })

    })

    .then(res=>res.json())

    .then(data=>{

        console.log(
            "Status atualizado:",
            data
        );

    })

    .catch(err=>{

        console.error(
            "Erro:",
            err
        );

    });


}


function atualizarCard(serie){

    const progresso =
    calcularProgresso(serie);


    const card =
    document.querySelector(
        `[data-id="${serie.id}"]`
    );


    if(card){

        card.querySelector(".progress-fill")
        .style.width = progresso + "%";


        card.querySelector(".card-progress")
        .textContent =
        `${progresso}% concluído`;

    }

}


closeModal.addEventListener("click", () => {

    modal.classList.add("hidden");

});

modal.addEventListener("click", e => {

    if (e.target === modal) {

        modal.classList.add("hidden");

    }

});

/* ===========================================
   PESQUISA
=========================================== */

document.getElementById("search").addEventListener("input", e => {

    const texto = e.target.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {

        const titulo = card.querySelector(".card-title").textContent.toLowerCase();

        card.style.display = titulo.includes(texto)
            ? "block"
            : "none";

    });

});

/* ===========================================
   INICIAR
=========================================== */

carregarSeries();
