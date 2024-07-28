const getParam = (query) => {
    return new URLSearchParams(new URL(window.location.href).search).get(query)
}

const idPessoa = getParam('idpessoa')

const transfereData = (data) => {
    const dataArray = data.split('-')
    return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`
}

const transfereHoras = (hour) => {
    const horas = parseFloat(hour / 60).toFixed(0)
    const minutos = hour % 60
    return `${horas}h ${minutos}m`
}

getTMDB(`person/${idPessoa}`, 1).then(data => {
    document.querySelector('#vote').innerHTML = parseFloat(data.popularity).toFixed(0)
    document.querySelector('#vote').classList.add((data.popularity > 50 && data.popularity < 100) ? 'yellow' : (data.popularity >= 100) && 'green')
    document.querySelector('#nome-titulo').innerHTML = data.name
    document.querySelector('#descricao-titulo').innerHTML = data.biography ?? 'Esse ator não tem biografia'
    document.querySelector('#data-lancamento-titulo').innerHTML = data.birthday && `Nasceu em ${transfereData(data.birthday)}`
    document.querySelector('#data-morte').innerHTML = data.deathday && `, morreu em ${transfereData(data.deathday)}`
    document.querySelector('#img-titulo').src = getIMG(data.profile_path, 'w500')
})

getTMDB(`person/${idPessoa}/movie_credits`, 1).then(data => {
    data.cast.forEach(filme => {
        document.querySelector('#participacao-filmes').innerHTML += (`
            <div class="col-12 col-md-3" style="margin-bottom: 20px;">
                <div class="card">
                    <a href="/pages/pagina-filme/?idfilme=${filme.id}">
                        <img src="${filme.poster_path ? getIMG(filme.poster_path, 'w500') : '/assets/img/imagemvazia.png'}" alt="..." class="card-img-top imagem">
                    </a>
                    <a href="/pages/pagina-filme/?idfilme=${filme.id}">
                        <h5 class="card-title pt-2 px-2 titulo">${filme.title || filme.name}</h5>
                    </a>
                    <div class="classificacao ${(filme.vote_average > 5 && filme.vote_average < 7) ? 'yellow' : (filme.vote_average >= 7) && 'green'}"> ${parseFloat(filme.vote_average).toFixed(1)} </div>
                </div>
            </div>
        `)
    })
})

getTMDB(`person/${idPessoa}/tv_credits`, 1).then(data => {
    data.cast.forEach(filme => {
        console.log(filme)
        document.querySelector('#participacao-series').innerHTML += (`
            <div class="col-12 col-md-3" style="margin-bottom: 20px;">
                <div class="card">
                    <a href="/pages/pagina-serie/?idserie=${filme.id}">
                        <img src="${filme.poster_path ? getIMG(filme.poster_path, 'w500') : '/assets/img/imagemvazia.png'}" alt="..." class="card-img-top imagem">
                    </a>
                    <a href="/pages/pagina-serie/?idserie=${filme.id}">
                        <h5 class="card-title pt-2 px-2 titulo">${filme.title || filme.name}</h5>
                    </a>
                    <div class="classificacao ${(filme.vote_average > 5 && filme.vote_average < 7) ? 'yellow' : (filme.vote_average >= 7) && 'green'}"> ${parseFloat(filme.vote_average).toFixed(1)} </div>
                </div>
            </div>
        `)
    })
})