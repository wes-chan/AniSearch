const form = document.getElementById('animeForm');


form.addEventListener('submit', function(event){
    event.preventDefault();
    const searchQuery = document.getElementById('searchInput').value.trim();

    if (searchQuery === ''){
        alert('Please enter a valid anime title');
        return;
    }

var query = `
    query ($title: String!){
        Media (search: $title, type: ANIME){
            id
            title{
                romaji
                english
                native
            }
            format
            description
            genres
            seasonYear
            coverImage{
                large
            }
            averageScore

            startDate{
                year
                month
                day
            }

            endDate{
                year
                month
                day
            }

            episodes

        }
    }

`;





var variables = {
    title: searchQuery
}

var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

    fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);


    function handleResponse(response){
        if (!response.ok){
            throw new Error('Failed to find anime')
        }
        return response.json();
    }

    function handleData(data){
        const anime = data.data.Media;
        const animeInfoDiv = document.getElementById('animeInfo');
        animeInfoDiv.innerHTML = `
            <h2>${anime.title.english || anime.title.romaji || anime.title.native}</h2>
            <p><strong>Format:</strong> ${anime.format}</p>
            <p><strong>Description:</strong> ${anime.description}</p>
            <p><strong>Genres:</strong> ${anime.genres.join(', ')}</p>
            <p><strong>Rating:</strong> ${anime.averageScore}%</p>
            <p><strong>Date:</strong> ${anime.startDate.day}/${anime.startDate.month}/${anime.startDate.year} to ${anime.endDate.day}/${anime.endDate.month}/${anime.endDate.year}</p>
            <p><strong>Episodes:</strong> ${anime.episodes}</p>
      
            <img src="${anime.coverImage.large}">
            
        `;
    }

    function handleError(error) {
        alert('Failed to find anime');
        console.error(error);
    }



}
);

















