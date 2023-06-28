// TMDB

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR&page=1';
const VOTE_AVERAGE = BASE_URL + '/discover/tv?sort_by=vote_average.desc&' + API_KEY + '&language=pt-BR&page=1';
const ANIMATIONS = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR&with_genres=16&page=1';
const today = new Date().toISOString().split('T')[0];
const API_URL_DESTAQUES = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR&page=1&release_date.lte=' + today;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const IMG_URL_PROMINENCE = 'https://image.tmdb.org/t/p/original';
const searchURL = BASE_URL + '/search/tv?' + API_KEY + '&language=pt-BR';

const genres = [{
  "id": 28,
  "name": "Ação"
},
  {
    "id": 12,
    "name": "Aventura"
  },
  {
    "id": 16,
    "name": "Animação"
  },
  {
    "id": 35,
    "name": "Comédia"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentário"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Família"
  },
  {
    "id": 14,
    "name": "Fantasia"
  },
  {
    "id": 36,
    "name": "História"
  },
  {
    "id": 27,
    "name": "Terror"
  },
  {
    "id": 10402,
    "name": "Música"
  },
  {
    "id": 9648,
    "name": "Mistério"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Ficção Científica"
  },
  {
    "id": 10770,
    "name": "Filme de TV"
  },
  {
    "id": 53,
    "name": "Suspense"
  },
  {
    "id": 10752,
    "name": "Guerra"
  },
  {
    "id": 37,
    "name": "Faroeste"
  }];

const carousel = $('.owl-carousel');
const searchForm = $('#search-form');
const searchInput = $('#search-input');
const searchResults = $('#search-results');
const backButton = $('#back-button');

// Função para obter filmes e atualizar o carrossel// Função para obter filmes e atualizar o carrossel
function getMoviesForCarousel(url, carousel) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.results.length !== 0) {
      updateCarousel(data.results, carousel);

      // Loop through each TV show result
      data.results.forEach(show => {
        const {
          id
        } = show;

      });
    }
  });
}
// Função para atualizar o carrossel com filmes

function updateCarousel(movies, carousel) {
  carousel.empty();

  movies.forEach(movie => {
    const {
      name,
      poster_path,
      backdrop_path,
      id,
      vote_count
    } = movie;


    const item = $('<div>').addClass('item');
    if (window.innerWidth > 780) {
      var image = $('<img>').attr('src', IMG_URL + backdrop_path).attr('alt', name);
      item.append(image);
    } else {
      var image = $('<img>').attr('src', IMG_URL + poster_path).attr('alt', name);
      item.append(image);
    }
    const voteCont = $('<i class="bx bxs-star voteCont">').text(" " + vote_count);
    const caption = $('<p>').text(name);

    const giving_play = $('<div class="giving_play">').on('click', function() {
      var DateId = id;
      var url = "html/serie_session.html";
      url += "?DateId=" + encodeURIComponent(DateId);
      window.location.href = url;
    });

    // ...

    item.append(voteCont);
    item.append(caption);
    item.append(giving_play);
    carousel.append(item);
  });

  // Inicializar o Owl Carousel
  carousel.owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: ['<i class="bx bx-chevron-left"></i>',
      '<i class="bx bx-chevron-right"></i>'],
    responsive: {
      0: {
        items: 2
      },
      480: {
        items: 3
      },
      600: {
        items: 4
      },
      780: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  });
}

// Função para obter filmes em destaque e atualizar o carrossel de destaque
function getMoviesForProminence(url, carousel) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.results.length !== 0) {
      updateProminence(data.results, carousel);

      // Loop through each TV show result
      data.results.forEach(show => {
        const {
          id
        } = show;
      });
    }
  });
}

// Função para atualizar o carrossel com filmes
function updateProminence(movies, carousel) {
  carousel.empty();
  console.log(movies)
  movies.forEach(movie => {
    const {
      name,
      poster_path,
      id,
      overview,
      release_date,
      vote_average,
      popularity,
      backdrop_path,
      vote_count
    } = movie;


    // Fetch TV show details
    fetch(`${BASE_URL}/tv/${id}?${API_KEY}&language=pt-BR`)
    .then(res => res.json())
    .then(showData => {
      // Loop through each season and log the number of episodes
      showData.seasons.forEach(season => {
        var Hepz = `Série: ${showData.name} | Temporada ${season.season_number}, ${season.episode_count} episódio(s)`;
      });
    });
    const item = $('<div>').addClass('item');
    const info = $('<div>').addClass('info');
    const image = $('<img>').attr('src', IMG_URL_PROMINENCE + backdrop_path).attr('alt', name);
    const caption = $('<h3>').text(name);
    const description = $('<p class="description">').text(overview.substring(0, 230) + "...");

    async function exibirPlataformaStreaming(filmeId) {
      const detalhesUrl = `${BASE_URL}/movie/${filmeId}?${API_KEY}`;

      try {
        const response = await fetch(detalhesUrl);
        const data = await response.json();

        const plataformas = data.production_companies.map(company => company.name);

        var contentPopularity = $('<button class="popularity">').text(plataformas[0]);

        info.append(contentPopularity);

      } catch (error) {
        console.error('Ocorreu um erro:', error);
      }
    }

    exibirPlataformaStreaming(id);

    const voteCont = $('<i class="bx bxs-star voteCont">').text(" " + vote_count);
    const date = $('<span class="date">').text(release_date);
    const idButton = $('<button class="play">').text('Assistir').on('click', function() {
      var DateId = id;
      var url = "html/serie_session.html";
      url += "?DateId=" + encodeURIComponent(DateId);
      window.location.href = url;
    });

    item.append(info);
    item.append(image);
    info.append(caption);
    info.append(date);
    info.append(voteCont);
    info.append(description);
    info.append(idButton);
    carousel.append(item);
  });


}


// Função para mostrar destaques
function showHighlights() {
  getMoviesForCarousel(API_URL + '&page=1',
    $('.owl-carousel:eq(0)'));
  getMoviesForCarousel(ANIMATIONS + '&page=1',
    $('.owl-carousel:eq(1)'));
  getMoviesForCarousel(API_URL + '&page=3',
    $('.owl-carousel:eq(2)'));
  getMoviesForCarousel(API_URL + '&page=4',
    $('.owl-carousel:eq(3)'));
}

// Função para pesquisar filmes
function searchMovies(event) {
  event.preventDefault();
  const searchTerm = searchInput.val();
  const searchQuery = searchURL + '&query=' + searchTerm;

  if (searchTerm !== '') {
    getMoviesForCarousel(searchQuery, searchResults);
    searchInput.val('');
    searchResults.show();
    carousel.hide();
  }
}

// Função para redefinir a pesquisa
function resetSearch() {
  searchResults.empty();
  searchResults.hide();
  carousel.show();
  pageSearch.classList.toggle('visible');
}

// Vincular o evento de envio do formulário de pesquisa
searchForm.on('submit', searchMovies);

// Vincular o evento de clique do botão "Back"
backButton.on('click', resetSearch);

// Chamar a função para mostrar os destaques
showHighlights();

getMoviesForProminence(API_URL_DESTAQUES + '&page=1', $('#destaques'));
getMoviesForProminence(API_URL_DESTAQUES + '&page=2', $('#destaques_1'));




const watchMovies = document.querySelector('#watchMovies');

watchMovies.addEventListener('click', ()=> {
  pageSearch.classList.toggle('visible')
  window.location.href = "../index.html"
});

const bxSearch = document.querySelector('.bx.bx-search');
const bxSearch2 = document.querySelector('.op-search');
var pageSearch = document.querySelector('.pageSearch');

bxSearch.addEventListener('click', ()=> {
  pageSearch.classList.toggle('visible');
});

bxSearch2.addEventListener('click', ()=> {
  pageSearch.classList.toggle('visible');
});