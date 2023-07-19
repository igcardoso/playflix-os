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
      id,
      overview,
      release_date,
      vote_average,
      popularity,
      backdrop_path,
      vote_count
    } = movie;


    const item = $('<div>').addClass('item navigable');
    if (window.innerWidth > 780) {
      var image = $('<img>').attr('src', IMG_URL + backdrop_path).attr('alt', name);
      item.append(image);
    } else {
      var image = $('<img>').attr('src', IMG_URL + poster_path).attr('alt', name);
      item.append(image);
    }
    const voteCont = $('<i class="bx bxs-star voteCont">').text(" " + vote_count);
    // const caption = $('<p>').text(name);

    const giving_play = $('<button class="navigable giving_play">').text('').on('click', function() {
      var DateId = id;
      var url = "html/serie_session.html";
      url += "?DateId=" + encodeURIComponent(DateId);
      window.location.href = url;
    });

    function exibirInformacoesFilme(idFilme) {
      const url = `${BASE_URL}/tv/${idFilme}?${API_KEY}&language=pt-BR`;
      // Fetch TV show details
      fetch(`${BASE_URL}/tv/${idFilme}?${API_KEY}&language=pt-BR`)
      .then(res => res.json())
      .then(showData => {


        document.querySelector('.image_destaque2').src = 'https://image.tmdb.org/t/p/original' + showData.backdrop_path;
        document.querySelector('.caption_destaque2').innerText = showData.name
        document.querySelector('.popularity_destaque2').innerText = showData.vote_average + "%"

        document.querySelector('.voteCont_destaque2').innerText = showData.vote_count
        document.querySelector('.description_destaque2').innerText = showData.overview.substring(0, 200) + "..."


        async function exibirPlataformaStreaming(serieId) {
          const detalhesUrl = `${BASE_URL}/tv/${serieId}?${API_KEY}`;

          try {
            const response = await fetch(detalhesUrl);
            const data = await response.json();

            const plataformas = data.networks.map(network => network.name);

            document.querySelector('.date_destaque2').innerHTML = `<span>${plataformas[0]}</span><svg class="checked" viewBox="-14.16 -14.16 52.32 52.32" fill="red" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.007 8.27C22.194 9.125 23 10.45 23 12c0 1.55-.806 2.876-1.993 3.73.24 1.442-.134 2.958-1.227 4.05-1.095 1.095-2.61 1.459-4.046 1.225C14.883 22.196 13.546 23 12 23c-1.55 0-2.878-.807-3.731-1.996-1.438.235-2.954-.128-4.05-1.224-1.095-1.095-1.459-2.611-1.217-4.05C1.816 14.877 1 13.551 1 12s.816-2.878 2.002-3.73c-.242-1.439.122-2.955 1.218-4.05 1.093-1.094 2.61-1.467 4.057-1.227C9.125 1.804 10.453 1 12 1c1.545 0 2.88.803 3.732 1.993 1.442-.24 2.956.135 4.048 1.227 1.093 1.092 1.468 2.608 1.227 4.05Zm-4.426-.084a1 1 0 0 1 .233 1.395l-5 7a1 1 0 0 1-1.521.126l-3-3a1 1 0 0 1 1.414-1.414l2.165 2.165 4.314-6.04a1 1 0 0 1 1.395-.232Z"></path></g></svg><span></span>`;

          } catch (error) {
            console.error('Ocorreu um erro:', error);
          }
        }

        exibirPlataformaStreaming(id);

      })
      .catch(error => console.error('Erro ao obter informações do filme:', error));
    }
    exibirInformacoesFilme(id);
    giving_play.on('focus', function() {
      exibirInformacoesFilme(id)
    });

    item.append(voteCont);
    // item.append(caption);
    item.append(giving_play);
    carousel.append(item);
  });

  // Inicializar o Owl Carousel
  carousel.owlCarousel({
    loop: false,
    margin: 2,
    focusOnSelect: true,
    nav: true,
    navText: [`<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Arrow / Chevron_Left">
      <path id="Vector" d="M15 19L8 12L15 5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`,
      `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Arrow / Chevron_Right">
      <path id="Vector" d="M9 5L16 12L9 19" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`],
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

    async function exibirPlataformaStreaming(serieId) {
      const detalhesUrl = `${BASE_URL}/tv/${serieId}?${API_KEY}`;

      try {
        const response = await fetch(detalhesUrl);
        const data = await response.json();

        const plataformas = data.networks.map(network => network.name);

        var contentPopularity = $('<span class="popularity">').html(`<span>${plataformas[0]}</span><svg class="checked" viewBox="-14.16 -14.16 52.32 52.32" fill="red" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.007 8.27C22.194 9.125 23 10.45 23 12c0 1.55-.806 2.876-1.993 3.73.24 1.442-.134 2.958-1.227 4.05-1.095 1.095-2.61 1.459-4.046 1.225C14.883 22.196 13.546 23 12 23c-1.55 0-2.878-.807-3.731-1.996-1.438.235-2.954-.128-4.05-1.224-1.095-1.095-1.459-2.611-1.217-4.05C1.816 14.877 1 13.551 1 12s.816-2.878 2.002-3.73c-.242-1.439.122-2.955 1.218-4.05 1.093-1.094 2.61-1.467 4.057-1.227C9.125 1.804 10.453 1 12 1c1.545 0 2.88.803 3.732 1.993 1.442-.24 2.956.135 4.048 1.227 1.093 1.092 1.468 2.608 1.227 4.05Zm-4.426-.084a1 1 0 0 1 .233 1.395l-5 7a1 1 0 0 1-1.521.126l-3-3a1 1 0 0 1 1.414-1.414l2.165 2.165 4.314-6.04a1 1 0 0 1 1.395-.232Z"></path></g></svg><span></span>`);

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

    if (! (poster_path == "" || backdrop_path == "" || overview == "" || vote_count == "")) {
      carousel.append(item);
    }

    item.append(info);
    item.append(image);
    info.append(caption);
    info.append(date);
    info.append(voteCont);
    info.append(description);
    info.append(idButton);
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
  getMoviesForCarousel(API_URL + '&page=5',
    $('.owl-carousel:eq(4)'));
  getMoviesForCarousel(API_URL + '&page=6',
    $('.owl-carousel:eq(5)'));
  getMoviesForCarousel(API_URL + '&page=7',
    $('.owl-carousel:eq(6)'));
  getMoviesForCarousel(API_URL + '&page=8',
    $('.owl-carousel:eq(7)'));
}

// Função para pesquisar filmes
function searchMovies(event) {
  event.preventDefault();
  const searchTerm = searchInput.val();
  const searchQuery = searchURL + '&query=' + searchTerm;

  if (searchTerm !== '') {
    getMoviesForCarousel(searchQuery, searchResults);
    searchResults.show();
    carousel.hide();
  }
}

// Função para redefinir a pesquisa
function resetSearch() {
  searchResults.empty();
  searchResults.hide();
  searchInput.val('');
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