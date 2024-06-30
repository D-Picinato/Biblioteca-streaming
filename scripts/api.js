const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjI0MzA1MTkwYTM1YmE5NjM4YzQ1ZDE2YWY5MmIxMiIsIm5iZiI6MTcxOTAzNjAxNS4zNTIwNzQsInN1YiI6IjY2NzYwZjUwMjViOGQzM2U0ODIzMTM5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.85fZIZ4jU-hBgSom2MmndQGNSR1NywZxFfTixWlBclA'
    }
}

const getTMDB = async (url, page, ano) => {
    const response = await fetch(`https://api.themoviedb.org/3/${url}?include_adult=false&page=${page}&language=pt-BR&region=br&year=${ano}`, options)
    const data = await response.json()
    return data
}

const getSearchTMDB = async (typeContent, query, page) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/${typeContent}?query=${query}&page=${page}&language=pt-BR&region=br`, options)
    const data = await response.json()
    return data
}

const getIMG = (imgPath, width) => {
    return `https://image.tmdb.org/t/p/${width}${imgPath}`
}