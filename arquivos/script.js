/* =====================================
   MY PERSONAL LIBRARY
   Carregamento por arquivos JSON
===================================== */


const carrosseis = {

    watching:
    document.getElementById("watching-carousel"),

    completed:
    document.getElementById("completed-carousel"),

    airing:
    document.getElementById("airing-carousel"),

    ended:
    document.getElementById("ended-carousel")

};


let series = [];


/* =====================================
   CARREGAR ARQUIVOS JSON
===================================== */


async function carregarSeries(){


    const arquivos = [

        "rick-and-morty.json"

    ];


    for(let arquivo of arquivos){


        const resposta = await fetch(

            `data/series/${arquivo}`

        );


        const dados = await resposta.json();


        series.push(dados);


    }


    mostrarSeries();

}



/* =====================================
   CALCULAR PROGRESSO
===================================== */


function calcularProgresso(serie){


    let total = 0;

    let assistidos = 0;


    serie.temporadas.forEach(temporada=>{


        temporada.episodios.forEach(ep=>{


            total++;


            if(ep.assistido){

                assistidos++;

            }


        });


    });


    return Math.round(

        (assistidos / total) * 100

    );


}



/* =====================================
   CRIAR CARD
===================================== */


function criarCard(serie){


    const progresso =
    calcularProgresso(serie);



    const card =
    document.createElement("div");



    card.className="card";



    card.innerHTML = `


        <img src="${serie.imagem}">


        <div class="card-body">


            <div class="card-title">

                ${serie.titulo}

            </div>


            <div class="card-progress">

                ${progresso}% concluído

            </div>


            <div class="progress">


                <div
                class="progress-fill"
                style="width:${progresso}%">

                </div>


            </div>


        </div>


    `;



    return card;


}



/* =====================================
   MOSTRAR NA TELA
===================================== */


function mostrarSeries(){


    series.forEach(serie=>{


        const card =
        criarCard(serie);



        if(
            carrosseis[serie.status]
        ){

            carrosseis[serie.status]
            .appendChild(card);

        }


    });


}



/* =====================================
   INICIAR
===================================== */


carregarSeries();
