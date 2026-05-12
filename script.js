const musicasIniciais = [
    {
        titulo: "Blinding Lights",
        artista: "The Weeknd",
        album: "After Hours",
        genero: "Pop",
        duracao: 200,
        plays: 950000
    },
    {
        titulo: "Lose Yourself",
        artista: "Eminem",
        album: "8 Mile",
        genero: "Rap",
        duracao: 326,
        plays: 870000
    },
    {
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        album: "A Night at the Opera",
        genero: "Rock",
        duracao: 354,
        plays: 1200000
    },
    {
        titulo: "Titanium",
        artista: "David Guetta",
        album: "Nothing but the Beat",
        genero: "Eletrônica",
        duracao: 245,
        plays: 630000
    },
    {
        titulo: "Baile de Favela",
        artista: "MC João",
        album: "Single",
        genero: "Funk",
        duracao: 180,
        plays: 450000
    },
    {
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        album: "Divide",
        genero: "Pop",
        duracao: 240,
        plays: 1500000
    },
    {
        titulo: "Smells Like Teen Spirit",
        artista: "Nirvana",
        album: "Nevermind",
        genero: "Rock",
        duracao: 301,
        plays: 720000
    },
    {
        titulo: "Without Me",
        artista: "Eminem",
        album: "The Eminem Show",
        genero: "Rap",
        duracao: 290,
        plays: 940000
    }
];

let musicas =
    JSON.parse(localStorage.getItem("musicas"))
    || musicasIniciais;

const listaMusicas =
    document.getElementById("listaMusicas");

const pesquisaInput =
    document.getElementById("pesquisa");

const formMusica =
    document.getElementById("formMusica");

function renderizarMusicas(lista) {

    listaMusicas.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {

        const musica = lista[i];

        const card =
            document.createElement("div");

        card.classList.add("card-musica");

        card.innerHTML = `
            <h3>${musica.titulo}</h3>

            <p>
                <strong>Artista:</strong>
                ${musica.artista}
            </p>

            <p>
                <strong>Álbum:</strong>
                ${musica.album}
            </p>

            <p>
                <strong>Gênero:</strong>
                ${musica.genero}
            </p>

            <p>
                <strong>Duração:</strong>
                ${musica.duracao}s
            </p>

            <p>
                <strong>Plays:</strong>
                ${musica.plays.toLocaleString()}
            </p>

            <button
                class="btn-remover"
                data-index="${i}"
            >
                Remover
            </button>
        `;

        listaMusicas.appendChild(card);
    }

    adicionarEventosRemover();
}

function renderizarIndicadores() {

    const totalMusicas = musicas.length;

    let totalPlays = 0;

    let somaDuracao = 0;

    let musicaMaisTocada = musicas[0];

    for (let i = 0; i < musicas.length; i++) {

        totalPlays += musicas[i].plays;

        somaDuracao += musicas[i].duracao;

        if (
            musicas[i].plays >
            musicaMaisTocada.plays
        ) {
            musicaMaisTocada = musicas[i];
        }
    }

    const mediaDuracao =
        Math.round(
            somaDuracao / totalMusicas
        );

    document.getElementById(
        "totalMusicas"
    ).textContent = totalMusicas;

    document.getElementById(
        "totalPlays"
    ).textContent =
        totalPlays.toLocaleString();

    document.getElementById(
        "mediaDuracao"
    ).textContent =
        `${mediaDuracao}s`;

    document.getElementById(
        "maisTocada"
    ).textContent =
        musicaMaisTocada.titulo;
}

function filtrarMusicas() {

    const textoPesquisa =
        pesquisaInput.value.toLowerCase();

    const musicasFiltradas =
        musicas.filter((musica) => {

            return (

                musica.titulo
                    .toLowerCase()
                    .includes(textoPesquisa)

                ||

                musica.artista
                    .toLowerCase()
                    .includes(textoPesquisa)

            );

        });

    renderizarMusicas(
        musicasFiltradas
    );
}

function adicionarMusica(event) {

    event.preventDefault();

    const novaMusica = {

        titulo:
            document
                .getElementById("titulo")
                .value,

        artista:
            document
                .getElementById("artista")
                .value,

        album:
            document
                .getElementById("album")
                .value,

        genero:
            document
                .getElementById("genero")
                .value,

        duracao:
            Number(
                document
                    .getElementById("duracao")
                    .value
            ),

        plays:
            Number(
                document
                    .getElementById("plays")
                    .value
            )
    };

    musicas.push(novaMusica);

    salvarLocalStorage();

    renderizarMusicas(musicas);

    renderizarIndicadores();

    formMusica.reset();
}

function removerMusica(index) {

    musicas.splice(index, 1);

    salvarLocalStorage();

    renderizarMusicas(musicas);

    renderizarIndicadores();
}

function salvarLocalStorage() {

    localStorage.setItem(
        "musicas",
        JSON.stringify(musicas)
    );
}

pesquisaInput.addEventListener(
    "input",
    filtrarMusicas
);

formMusica.addEventListener(
    "submit",
    adicionarMusica
);

function adicionarEventosRemover() {

    const botoesRemover =
        document.querySelectorAll(
            ".btn-remover"
        );

    for (
        let i = 0;
        i < botoesRemover.length;
        i++
    ) {

        botoesRemover[i]
            .addEventListener(
                "click",
                function () {

                    removerMusica(i);

                }
            );
    }
}

renderizarMusicas(musicas);

renderizarIndicadores();