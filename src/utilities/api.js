const BASE_API_URL = "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1"

function request(endpoint, verb = 'GET', data = null) {
    const requestUrl = `${BASE_API_URL}${endpoint}`

    const options = { method: verb, headers: { 'Content-Type' : 'application/JSON' }, body: data, }

    return fetch(requestUrl, options)
        .then((response) => {return response.json()})
        .catch((error) => {console.error('Something went wrong with the API request:', error)})
}

export const fetchMovies = () => request('/movies', 'GET')

export const updateMovieVotes = (id, vote_direction) => {
    return request(`/movies/${id}`, 'PATCH', JSON.stringify({ vote_direction: vote_direction }))
}