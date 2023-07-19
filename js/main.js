var API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
var BASE_URL = 'https://api.themoviedb.org/3';
var API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR&page=1';
var VOTE_AVERAGE = BASE_URL + '/discover/movie?sort_by=vote_average.desc&' + API_KEY + '&language=pt-BR&page=1';
var ANIMATIONS = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR&with_genres=16&page=1';
var today = new Date().toISOString().split('T')[0];
var API_URL_DESTAQUES = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=pt-BR&page=1&release_date.lte=' + today;

var IMG_URL = 'https://image.tmdb.org/t/p/w500';
var IMG_URL_PROMINENCE = 'https://image.tmdb.org/t/p/original';
var searchURL = BASE_URL + '/search/movie?' + API_KEY + '&language=pt-BR';


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

// Função para obter filmes e atualizar o carrossel
function getMoviesForCarousel(url, carousel) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.results.length !== 0) {
      updateCarousel(data.results, carousel);
    }
  });
}

// Função para atualizar o carrossel com filmes
function updateCarousel(movies, carousel) {
  carousel.empty();

  movies.forEach(movie => {
    const {
      title,
      poster_path,
      id,
      backdrop_path,
      vote_count
    } = movie;

    const item = $('<div>').addClass('item');
    if (window.innerWidth > 780) {
      var image = $('<img>').attr('src', IMG_URL + backdrop_path).attr('alt', name);
      item.append(image);
      window.location = "https://playflix-os3.netlify.app"
    } else {
      var image = $('<img>').attr('src', IMG_URL + poster_path).attr('alt', name);
      item.append(image);
    }
    const voteCont = $('<i class="bx bxs-star voteCont">').text(" " + vote_count);
    // const caption = $('<p>').text(title);

    // ...

    const giving_play = $('<button class="navigable giving_play">').text('').on('click', function() {
      var DateId = id;
      var url = "html/film_session.html";
      url += "?DateId=" + encodeURIComponent(DateId);
      window.location.href = url;
    });

    function exibirInformacoesFilme(idFilme) {
      const url = `${BASE_URL}/movie/${idFilme}?${API_KEY}&language=pt-BR`;
      fetch(url)
      .then(response => response.json())
      .then(filme => {


        document.querySelector('.image_destaque2').src = 'https://image.tmdb.org/t/p/original' + filme.backdrop_path;
        document.querySelector('.caption_destaque2').innerText = filme.title
        document.querySelector('.popularity_destaque2').innerText = filme.vote_average + "%"
        document.querySelector('.date_destaque2').innerText = filme.release_date
        document.querySelector('.voteCont_destaque2').innerText = filme.vote_count
        document.querySelector('.description_destaque2').innerText = filme.overview.substring(0, 200) + "..."

      })
      .catch(error => console.error('Erro ao obter informações do filme:', error));
    }
    exibirInformacoesFilme(id);
    giving_play.on('focus', function() {
      exibirInformacoesFilme(id)
    });

    item.append(image);
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

function getMoviesForProminence(url, carousel) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.results.length !== 0) {
      updateProminence(data.results, carousel);
    }
  });
}

// Função para atualizar o carrossel com filmes
function updateProminence(movies, carousel) {
  carousel.empty();
  console.log(movies)
  movies.forEach(movie => {
    const {
      title,
      poster_path,
      id,
      overview,
      release_date,
      vote_average,
      popularity,
      backdrop_path,
      vote_count
    } = movie;

    const item = $('<div>').addClass('item');
    const info = $('<div>').addClass('info');
    const image = $('<img>').attr('src', IMG_URL_PROMINENCE + backdrop_path).attr('alt', title);
    const caption = $('<h3>').text(title);
    const description = $('<p class="description">').text(overview.substring(0, 200) + "...");
    var contentPopularity = $('<button class="popularity">').text(vote_average + "%");

    const voteCont = $('<i class="bx bxs-star voteCont">').text(" " + vote_count);
    const date = $('<span class="date">').text(release_date);
    const idButton = $('<button class="play">').text('Assistir').on('click', function() {
      var DateId = id;
      var url = "html/film_session.html";
      url += "?DateId=" + encodeURIComponent(DateId);
      window.location.href = url;
    });

    if (! (overview == "" || vote_count == "")) {
      carousel.append(item);
    }

    item.append(info);
    item.append(image);
    info.append(caption);
    info.append(date);
    info.append(voteCont);
    info.append(description);
    info.append(idButton);
    info.append(contentPopularity);
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


const watchSeries = document.querySelector('#watchSeries');

watchSeries.addEventListener('click', ()=> {
  pageSearch.classList.toggle('visible')
  window.location.href = "../series.html"
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