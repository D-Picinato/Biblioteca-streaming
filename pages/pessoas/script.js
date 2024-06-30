const getParam = (query) => {
    return new URLSearchParams(new URL(window.location.href).search).get(query)
}

const setTMDB = (url, page) => {
    let listPageBtn = ''
    let pages = []
    let listPagesActual = []
    let listFilmes = ''

    getTMDB(url, page)
        .then(data => {
            console.log(data)

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
                        <button style="width: 40px;" onclick="setTMDB('person/popular', ${i})" class="page-link">${i}</button>
                    </li>
                `)
            })
            document.querySelector('#listPageBtn').innerHTML = listPageBtn

            data.results.forEach(filme => {
                listFilmes += (`
                    <div class="col-12 col-md-3" style="margin-bottom: 20px;">
                        <div class="card">
                            <a href="./pages/pagina-filme/#${filme.id}">
                                <img src="${filme.profile_path ? getIMG(filme.profile_path, 'w500') : '../../assets/img/imagemvazia.png'}" alt="..." class="card-img-top imagem">
                            </a>
                            <a href="./pages/pagina-filme/#${filme.id}">
                                <h5 class="card-title pt-2 px-2 titulo">${filme.name}</h5>
                            </a>
                            <div class="classificacao ${(filme.popularity > 5 && filme.popularity < 7) ? 'yellow' : (filme.popularity >= 7) && 'green'}"> ${parseFloat(filme.popularity).toFixed(1)} </div>
                        </div>
                    </div>
                `)
                document.querySelector('#listaItens').innerHTML = listFilmes
            })
        })
}

setTMDB('person/popular', 1)