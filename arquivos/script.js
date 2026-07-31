/* ======================================================
   MY PERSONAL LIBRARY
   script.js
   Versão 0.1
======================================================*/

/* =====================================
   ELEMENTOS
===================================== */

const carrosseis = {

    watching: document.getElementById("watching-carousel"),

    completed: document.getElementById("completed-carousel"),

    airing: document.getElementById("airing-carousel"),

    ended: document.getElementById("ended-carousel")

};

const campoPesquisa = document.getElementById("search");

const modal = document.getElementById("series-modal");

const modalBody = document.getElementById("modal-body");

const fecharModal = document.getElementById("close-modal");


/* =====================================
   CALCULAR PROGRESSO
===================================== */

function calcularProgresso(serie){

    return Math.round(

        (serie.assistidos / serie.episodios) * 100

    );

}


/* =====================================
   CRIAR CARD
===================================== */

function criarCard(serie){

    const progresso = calcularProgresso(serie);

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

        <img src="${serie.capa}" alt="${serie.titulo}">

        <div class="card-body">

            <div class="card-title">

                ${serie.titulo}

            </div>

            <div class="card-progress">

                ${serie.assistidos} de ${serie.episodios} episódios

            </div>

            <div class="progress">

                <div
                    class="progress-fill"
                    style="width:${progresso}%">

                </div>

            </div>

            <div class="card-episode">

                T${serie.ultimaTemporada}
                •
                E${serie.ultimoEpisodio}

            </div>

        </div>

    `;

    card.addEventListener("click", () => {

        abrirModal(serie);

    });

    return card;

}


/* =====================================
   MOSTRAR TODAS AS SÉRIES
===================================== */

function carregarSeries(){

    Object.values(carrosseis).forEach(carrossel=>{

        carrossel.innerHTML = "";

    });

    series.forEach(serie=>{

        const card = criarCard(serie);

        carrosseis[serie.categoria].appendChild(card);

    });

}


/* =====================================
   MODAL
===================================== */

function abrirModal(serie){

    const progresso = calcularProgresso(serie);

    modalBody.innerHTML = `

        <img
            src="${serie.capa}"
            style="
                width:180px;
                border-radius:15px;
                display:block;
                margin:auto;
            ">

        <h2
            style="
                margin-top:20px;
                text-align:center;
            ">

            ${serie.titulo}

        </h2>

        <p>

            Plataforma:
            ${serie.plataforma}

        </p>

        <p>

            Temporadas:
            ${serie.temporadas}

        </p>

        <p>

            Episódios:
            ${serie.episodios}

        </p>

        <p>

            Assistidos:
            ${serie.assistidos}

        </p>

        <p>

            Progresso:
            ${progresso}%

        </p>

        <p>

            Último episódio:

            T${serie.ultimaTemporada}

            E${serie.ultimoEpisodio}

        </p>

    `;

    modal.classList.remove("hidden");

}


/* =====================================
   FECHAR MODAL
===================================== */

fecharModal.addEventListener("click",()=>{

    modal.classList.add("hidden");

});


modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.add("hidden");

    }

});


/* =====================================
   PESQUISA
===================================== */

campoPesquisa.addEventListener("input",()=>{

    const texto =
        campoPesquisa.value.toLowerCase();

    Object.values(carrosseis).forEach(carrossel=>{

        carrossel.innerHTML = "";

    });

    series.forEach(serie=>{

        if(

            serie.titulo
            .toLowerCase()
            .includes(texto)

        ){

            const card = criarCard(serie);

            carrosseis[serie.categoria]

            .appendChild(card);

        }

    });

});


/* =====================================
   INICIAR
===================================== */

carregarSeries();
