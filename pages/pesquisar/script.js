const getParam = (query) => {
    return new URLSearchParams(new URL(window.location.href).search).get(query)
}

const setTMDB = (typeContent, query, page) => {
    let listPageBtn = ''
    let pages = []
    let listPagesActual = []
    let listFilmes = ''

    getSearchTMDB(typeContent, query, page)
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
                        <button style="width: 40px;" onclick="setTMDB('${typeContent}', '${query}', ${i})" class="page-link">${i}</button>
                    </li>
                `)
            })
            document.querySelector('#listPageBtn').innerHTML = listPageBtn

            data.results.forEach(filme => {
                let tipo = ''
                if (filme.media_type == 'movie') {
                    tipo = 'filme'
                } else if (filme.media_type == 'tv') {
                    tipo = 'serie'
                } else {
                    tipo = 'pessoa'
                }
                listFilmes += tipo != 'pessoa'
                    ? (`
                    <div class="col-12 col-md-3" style="margin-bottom: 20px;">
                        <div class="card">
                            <a href="/pages/pagina-${tipo}/?id${tipo}=${filme.id}">
                                <img src="${filme.poster_path ? getIMG(filme.poster_path, 'w500') : filme.profile_path ? getIMG(filme.profile_path, 'w500') : '/assets/img/imagemvazia.png'}" alt="..." class="card-img-top imagem">
                            </a>
                            <a href="/pages/pagina-${tipo}/?id${tipo}=${filme.id}">
                                <h5 class="card-title pt-2 px-2 titulo">${filme.title || filme.name}</h5>
                            </a>
                            <div class="classificacao ${(filme.vote_average > 5 && filme.vote_average < 7) ? 'yellow' : (filme.vote_average >= 7) && 'green'}"> ${parseFloat(filme.vote_average).toFixed(1)} </div>
                        </div>
                    </div>
                `)
                    : (`
                    <div class="col-12 col-md-3" style="margin-bottom: 20px;">
                        <div class="card">
                            <a href="/pages/pagina-${tipo}/?id${tipo}=${filme.id}">
                                <img src="${filme.poster_path ? getIMG(filme.poster_path, 'w500') : filme.profile_path ? getIMG(filme.profile_path, 'w500') : '/assets/img/imagemvazia.png'}" alt="..." class="card-img-top imagem">
                            </a>
                            <a href="/pages/pagina-${tipo}/?id${tipo}=${filme.id}">
                                <h5 class="card-title pt-2 px-2 titulo">${filme.title || filme.name}</h5>
                            </a>
                            <div class="classificacao ${(filme.popularity > 50 && filme.popularity < 100) ? 'yellow' : (filme.popularity >= 100) && 'green'}"> ${parseFloat(filme.popularity).toFixed(1)} </div>
                        </div>
                    </div>
                `)
                document.querySelector('#listaItens').innerHTML = listFilmes
            })
        })
}

const filtro_tipo = document.querySelector('#filtro-tipo')

if (getParam('typecontent')) {
    filtro_tipo.value = getParam('typecontent')
}

filtro_tipo.addEventListener('change', (event) => {
    let newURL = new URL(window.location.href)
    newURL.searchParams.set('typecontent', event.target.value)
    window.location.href = newURL.toString()
})

setTMDB((getParam('typecontent') ? getParam('typecontent') : filtro_tipo.value), (getParam('search') ? getParam('search') : ''), 1)