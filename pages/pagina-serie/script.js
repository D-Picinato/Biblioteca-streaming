const getParam = (query) => {
    return new URLSearchParams(new URL(window.location.href).search).get(query)
}

const idSeries = getParam('idserie')

const transfereData = (data) => {
    const dataArray = data.split('-')
    return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`
}

const transfereHoras = (hour) => {
    const horas = parseFloat(hour / 60).toFixed(0)
    const minutos = hour % 60
    return `${horas}h ${minutos}m`
}

getTMDB(`tv/${idSeries}`, 1).then(data => {
    document.querySelector('#nome-titulo').innerHTML = data.name
    document.querySelector('#descricao-titulo').innerHTML = data.overview
    document.querySelector('#data-lancamento-titulo').innerHTML = transfereData(data.first_air_date)
    document.querySelector('#vote').innerHTML = parseFloat(data.vote_average).toFixed(0)
    document.querySelector('#vote').classList.add((data.vote_average > 5 && data.vote_average < 7) ? 'yellow' : (data.vote_average >= 7) && 'green')
    data.genres.forEach(genero => {
        document.querySelector('#genres').innerHTML += `${genero.name}, `
    })
    document.querySelector('#eps').innerHTML = `${data.number_of_episodes} episódios,`
    document.querySelector('#temporadas').innerHTML = `${data.number_of_seasons} temporadas`
    document.querySelector('#img-titulo').src = getIMG(data.poster_path, 'w500')
    document.querySelector('#filme-fundo').style.backgroundImage = `linear-gradient(to right, #000 150px, #00000058 100%), url(${getIMG(data.backdrop_path, 'original')})`
    document.querySelector('#titutlo-original').innerHTML = data.original_name
    document.querySelector('#titulo-nome').innerHTML = data.name
    document.querySelector('#released').innerHTML = data.status == "Released" ? 'Lançado' : 'Está em lançamento'
})

getTMDB(`tv/${idSeries}/credits`, 1).then(data => {
    data.cast.forEach(pessoa => {
        document.querySelector('#peoples').innerHTML += (`
            <a href="/pages/pagina-pessoa/?idpessoa=${pessoa.id}" class="col-6 col-md-3 mb-4">
                <div class="card">
                    <img src="${pessoa.profile_path ? getIMG(pessoa.profile_path, 'w300') : '/assets/img/imagemvazia.png'}"
                        alt="..." class="card-img-top imagem">
                    <h5 class="card-title pt-2 px-2 titulo">${pessoa.name}</h5>
                    <p class="card-text pb-2 px-2">${pessoa.character}</p>
                </div>
            </a>
        `)
    })
})

getTMDB(`tv/${idSeries}/similar`, 1).then(data => {
    data.results.forEach(filme => {
        document.querySelector('#listaItens').innerHTML += (`
            <div class="col-12 col-md-3" style="margin-bottom: 20px;">
                <div class="card">
                    <a href="./pages/pagina-serie/?idserie=${filme.id}">
                        <img src="${filme.poster_path ? getIMG(filme.poster_path, 'w500') : '/assets/img/imagemvazia.png'}" alt="..." class="card-img-top imagem">
                    </a>
                    <a href="./pages/pagina-serie/?idserie=${filme.id}">
                        <h5 class="card-title pt-2 px-2 titulo">${filme.title || filme.name}</h5>
                    </a>
                    <div class="classificacao ${(filme.vote_average > 5 && filme.vote_average < 7) ? 'yellow' : (filme.vote_average >= 7) && 'green'}"> ${parseFloat(filme.vote_average).toFixed(1)} </div>
                </div>
            </div>
        `)
    })
})