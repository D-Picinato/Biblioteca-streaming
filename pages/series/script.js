const anoAtual = new Date().getFullYear()

const setTMDB = (typeContent, url, page) => {
    let listPageBtn = ''
    let pages = []
    let listPagesActual = []
    let listFilmes = ''
    let endpoint = `${typeContent}${url}`

    getTMDB(endpoint, page, null)
        .then(data => {
            for (let i = 1; i <= data.total_pages; i++) {
                pages.push(i)
            }

            pages.forEach(i => {
                if ((i > data.page - 5) && (i < data.page + 6)) {
                    listPagesActual.push(i)
                }
            })

            listPagesActual.forEach(i => {
                listPageBtn += (`
                    <li class="page-item active">
                        <button style="width: 40px;" onclick="setTMDB('tv', ${url ? `'${url}'` : null}, ${i})" class="page-link">${i}</button>
                    </li>
                `)
            })
            document.querySelector('#listPageBtn').innerHTML = listPageBtn

            data.results.forEach(filme => {
                listFilmes += (`
                    <div class="col-12 col-md-3" style="margin-bottom: 20px;">
                        <div class="card">
                            <a href="../pagina-serie/?idserie=${filme.id}">
                                <img src="${filme.poster_path ? getIMG(filme.poster_path, 'w500') : '../../assets/img/imagemvazia.png'}" alt="..." class="card-img-top imagem">
                            </a>
                            <a href="../pagina-serie/?idserie=${filme.id}">
                                <h5 class="card-title pt-2 px-2 titulo">${filme.name}</h5>
                            </a>
                            <div class="classificacao ${(filme.vote_average > 5 && filme.vote_average < 7) ? 'yellow' : (filme.vote_average >= 7) && 'green'}"> ${parseFloat(filme.vote_average).toFixed(1)} </div>
                        </div>
                    </div>
                `)
                document.querySelector('#listaItens').innerHTML = listFilmes
            })
        })
}

setTMDB('tv', document.querySelector('#filtro-busca').value, 1)

document.querySelector('#filtro-busca').addEventListener('change', (event) => {
    setTMDB('tv', event.target.value, 1)
})