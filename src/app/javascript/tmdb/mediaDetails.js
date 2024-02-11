var IMG_URL_PROMINENCE = 'https://image.tmdb.org/t/p/original';
var IMG_URL = 'https://image.tmdb.org/t/p/w500';
var whereDisplay = '#film-page .container';
var FilmPageDisplay = '#film-page';
var episodeDetails = '#episode-details';
var trailerDisplay = '#trailer';

async function getAllMoviesDetails(filmeId, title, background) {
	console.log(filmeId)
	const detalhesUrl = `${BASE_URL}/movie/${filmeId}?${API_KEY}&language=pt-BR`;
	const correctId = filmeId;
	try {

		const response = await fetch(detalhesUrl);
		const data = await response.json();
		const Elements_series = document.querySelector(`${FilmPageDisplay} .series`);
		const Elements_movies = document.querySelector(`${FilmPageDisplay} .movies`);

		const dynamic = document.querySelectorAll(`${FilmPageDisplay} .dynamic`);

		dynamic.forEach(element => {
			element.innerHTML = "";
		});

		if (data) {
			if (title != data.title) {
				await mediaIsSeries(correctId);
				Elements_series.style.display = 'block';
				Elements_movies.style.display = 'none';

			} else {
				await mediaIsMovie(correctId);
				Elements_series.style.display = 'none';
				Elements_movies.style.display = 'block';
			}
		} else {
			await mediaIsSeries(correctId);
			Elements_series.style.display = 'block';
			Elements_movies.style.display = 'none';
		}
	} catch (error) {
		console.error('Ocorreu um erro:',
			error);
	}
}

async function mediaIsSeries(serieId) {
	const detalhesUrl = `${BASE_URL}/tv/${serieId}?${API_KEY}&language=pt-BR`;

	try {
		const response = await fetch(detalhesUrl);
		const data = await response.json();
		// const plataformas = data.production_companies.map(company => company.name);

		if (data.name != "" && data.backdrop_path != null) {
			console.log(data)
			// Elements
			let title = document.querySelector(`${whereDisplay} .title`);
			let EP_title = document.querySelector(`${episodeDetails} .title`);
			let background = document.querySelector(`${whereDisplay} .image-destaque`);
			let EP_background = document.querySelector(`${episodeDetails} .image-destaque`);
			let vote_count = document.querySelector(`${whereDisplay} .vote_count`);
			let EP_date = document.querySelector(`${episodeDetails} .date`);
			let runtime = document.querySelector(`${whereDisplay} .runtime`);
			let EP_runtime = document.querySelector(`${episodeDetails} .runtime`);
			let release_date = document.querySelector(`${whereDisplay} .release_date`);
			let Ep_episode_name = document.querySelector(`${episodeDetails} .episode-name`);
			let category = document.querySelector(`${whereDisplay} .category`);
			let synopsi = document.querySelector(`${whereDisplay} .synopsi`);
			let EP_synopsi = document.querySelector(`${episodeDetails} .synopsi`);
			let contentActorsActresses = document.querySelector(`${FilmPageDisplay} .actors-actresses`);
			const containment_btn_seasons = document.querySelector(`${FilmPageDisplay} .SelectSeasons`);
			const containment_seasons = document.querySelector(`${FilmPageDisplay} .seasons`);
			const dynamicElements = document.querySelector(`${FilmPageDisplay} .dynamic-elements`);
			const contentIframe = document.querySelector('#play .media');
			contentActorsActresses.innerHTML = '';
			containment_btn_seasons.innerHTML = '';
			containment_seasons.innerHTML = '';



			const TextTitle = data.name.split(' ');
			const maxWords = 6;
			let TitleFiltered = TextTitle.slice(0,
				maxWords).join(' ');

			if (TextTitle.length > maxWords) {
				TitleFiltered += '...';
			}

			let info = document.createElement('div');
			info.classList.add('info');

			title.innerText = TitleFiltered;
			// titleButtonplay.forEach(title => {
			//	title.innerText = TitleFiltered;
			// })
			background.setAttribute('src', IMG_URL_PROMINENCE + data.backdrop_path);
			vote_count.innerText = data.vote_average;

			if (data.episode_run_time.length >= 1) {
				let runtimeInMinutes = data.episode_run_time[0];
				let hours = Math.floor(runtimeInMinutes / 60);
				let minutes = runtimeInMinutes % 60;
				if (hours > 0) {
					runtime.innerText = `${hours}h ${minutes}min`;
				} else {
					runtime.innerText = `${minutes}min`;
				}
			} else {
				runtime.innerText = "";
			}

			let value_release_date = data.last_air_date.slice(0, 4)
			release_date.innerText = value_release_date;

			let movieGenres = data.genres

			category.innerHTML = '';

			if (data.genres.length = 1) {
				let genre_1 = document.createElement('div');
				genre_1.innerHTML = movieGenres[0].name;
				category.appendChild(genre_1);

			} else if (data.genres.length = 2) {
				let genre_1 = document.createElement('div');
				genre_1.innerHTML = movieGenres[0].name;
				category.appendChild(genre_1);

				let genre_2 = document.createElement('div');
				genre_2.innerHTML = movieGenres[1].name;
				category.appendChild(genre_2);

			} else if (data.genres.length > 2) {
				let genre_1 = document.createElement('div');
				genre_1.innerHTML = movieGenres[0].name;
				category.appendChild(genre_1);

				let genre_2 = document.createElement('div');
				genre_2.innerHTML = movieGenres[0].name;
				category.appendChild(genre_2);

				let genre_3 = document.createElement('div');
				genre_3.innerHTML = movieGenres[0].name;
				category.appendChild(genre_3);

			} else {
				category.innerHTML = '';
			}

			const TextOverview = data.overview.split(' ');
			let OverviewFiltered = TextOverview.slice(0,
				22).join(' ');

			if (TextOverview.length > 22) {
				OverviewFiltered += '...';
			}

			synopsi.innerText = OverviewFiltered;

			async function getEpisodeData(seriesId, seasonNumber) {
				// Get information for the specified season
				const episodesUrl = `${BASE_URL}/tv/${seriesId}/season/${seasonNumber}?${API_KEY}&language=pt-BR`;
				const episodesResponse = await fetch(episodesUrl);
				const episodesData = await episodesResponse.json();

				// Extract episode covers and names
				const episodes = episodesData.episodes.map((episode) => {
					const imageUrl = `${IMG_URL}${episode.still_path}`;
					const backgroundUrl = `${IMG_URL_PROMINENCE}${episode.still_path}`;
					const episodeName = episode.name;
					const episodeSynopsis = episode.overview;
					const episodeRuntime = episode.runtime;
					const episodeAirDate = episode.air_date;
					console.log(episode)
					return {
						imageUrl,
						backgroundUrl,
						episodeName,
						episodeSynopsis,
						episodeRuntime,
						episodeAirDate
					};
				});

				return episodes;
			}

			data.seasons.forEach(season => {
				var epz = `Série: ${data.name} | Temporada ${season.season_number}, ${season.episode_count} episódio(s)`;
				console.log(epz);

				const Content_Season = document.createElement('div');
				Content_Season.classList.add('Content-Season');
				Content_Season.innerText = ` Temporada ${season.season_number}`;
				Content_Season.addEventListener('click', ()=> {
					if (season.season_number != 0) {
						setActiveSeason(season.season_number);
					}
				});

				const content_episode = document.createElement('div');
				content_episode.classList.add('content-episode');


				getEpisodeData(data.id,
					season.season_number)
				.then((episodes) => {
					episodes.forEach((episode, index) => {
						const element_episode = document.createElement('div');
						element_episode.classList.add('episode')
						element_episode.addEventListener('click', () => {

							let selectedplay = 'episode-details';

							if (selectedplay === 'profile') {
								setTimeout(function() {
									// Stack tab
									showTab(selectedplay);
									updateHeaderVisibility();
									window.history.pushState({
										page: selectedplay
									}, null, `#${selectedplay}`);
								}, 200);
							} else {
								setTimeout(function() {
									// Bottom tab
									showTab(selectedplay);
									updateHeaderVisibility();
									window.history.pushState({
										page: selectedplay
									}, null, `#${selectedplay}`);
								}, 200);
							}
							const episodeNumber = index + 1;
							// alert(`oiii ${season.season_number} ${episodeNumber}`);
							// contentIframe.innerHTML = '';
							// 							const iframe = document.createElement('iframe');
							// 							iframe.src = `https://superembeds.com/embed2/${data.id}-${season.season_number}-${episodeNumber}`;
							//
							// 							contentIframe.appendChild(iframe);
							//

							Ep_episode_name.innerText = `Episódio ${episodeNumber}`;
							EP_title.innerText = `${episode.episodeName}`;
							console.log(episode.episodeAirDate.slice(0, 2))
							function formatDate(dateString) {
								const months = [
									"Janeiro",
									"Fevereiro",
									"Março",
									"Abril",
									"Maio",
									"Junho",
									"Julho",
									"Agosto",
									"Setembro",
									"Outubro",
									"Novembro",
									"Dezembro"
								];

								const [year,
									month,
									day] = dateString.split("-");
								const monthName = months[parseInt(month, 10) - 1];

								return `${day} ${monthName} ${year}`;
							}

							const originalDate = episode.episodeAirDate;
							const formattedDate = formatDate(originalDate);
							EP_date.innerText = formattedDate;




							let hours = Math.floor(episode.episodeRuntime / 60);
							let minutes = episode.episodeRuntime % 60;
							if (hours > 0) {
								EP_runtime.innerText = `${hours}h ${minutes}min`;
							} else {
								EP_runtime.innerText = `${minutes}min`;
							}


							EP_synopsi.innerText = `${episode.episodeSynopsis}`;
							EP_background.setAttribute('src', episode.backgroundUrl);

							let play_1 = document.querySelector(`${episodeDetails} .option-1`);
							let play_2 = document.querySelector(`${episodeDetails} .option-2`);
							let play_3 = document.querySelector(`${episodeDetails} .option-3`);
							let play_4 = document.querySelector(`${episodeDetails} .option-4`);


							play_1.addEventListener("click", ()=> {
								contentIframe.innerHTML = '';
								const iframe = document.createElement('iframe');
								iframe.src = `https://embedder.net/e/${data.id}/${season.season_number}/${episodeNumber}`;
								iframe.setAttribute('allowfullscreen', '');
								contentIframe.appendChild(iframe);
							});
							play_2.addEventListener("click", ()=> {
								contentIframe.innerHTML = '';
								const iframe = document.createElement('iframe');
								iframe.src = `https://v2.vidsrc.me/embed/${data.id}/${season.season_number}/${episodeNumber}-#1da1f2`;
								iframe.setAttribute('allowfullscreen', '');
								contentIframe.appendChild(iframe);
							});
							play_3.addEventListener("click", ()=> {
								contentIframe.innerHTML = '';
								const iframe = document.createElement('iframe');
								iframe.src = `https://superembeds.com/embed2/${data.id}-${season.season_number}-${episodeNumber}`;
								iframe.setAttribute('allowfullscreen', '');
								contentIframe.appendChild(iframe);

							});
							play_4.addEventListener("click", ()=> {
									contentIframe.innerHTML = '';
									const iframe = document.createElement('iframe');
									iframe.src = `https://multiembed.mov/?video_id=${data.imdb_id}`;
									iframe.setAttribute('allowfullscreen', '');
									contentIframe.appendChild(iframe);
								});

						});


						document.querySelector(`${FilmPageDisplay} .share`).addEventListener('click',
							()=> {
								toShare(data.id);
							});

						const contentImg = document.createElement('div');
						contentImg.classList.add('content-img');

						const Ep_number = document.createElement('p');
						Ep_number.classList.add('EP-number');
						Ep_number.innerText = `Ep ${index + 1}`;

						const image = document.createElement('img');
						image.classList.add('capa');
						image.src = episode.imageUrl;

						contentImg.appendChild(image);
						contentImg.appendChild(Ep_number);
						element_episode.appendChild(contentImg);
						content_episode.appendChild(element_episode);

						const info = document.createElement('div');
						info.classList.add('info');


						const title_namber = document.createElement('p');
						title_namber.classList.add('title');

						const episode_Synopsis = document.createElement('p');
						episode_Synopsis.classList.add('episode-synopsis');

						let EP_overview = episode.episodeSynopsis.split(' ');
						let EP_overview_filtered = EP_overview.slice(0,
							19).join(' ');

						if (EP_overview.length > 19) {
							EP_overview_filtered += '...';
						}
						episode_Synopsis.innerText = EP_overview_filtered;

						let episodeTitle = episode.episodeName.split(' ');
						let episodeTitle_Filtered = episodeTitle.slice(0,
							4).join(' ');

						if (episodeTitle.length > 4) {
							episodeTitle_Filtered += '...';
						}

						if (episode.episodeName == `Episódio ${index + 1}`) {
							title_namber.innerText = `Episódio ${index + 1}`;
						} else {
							title_namber.innerText = `${episodeTitle_Filtered}`;
						}

						info.appendChild(title_namber);
						info.appendChild(episode_Synopsis);
						element_episode.appendChild(info);

					});
				})
				.catch((error) => {
					console.log('Ocorreu um erro:',
						error);
				});


				if (season.name != "Especiais" && season.season_number != 0) {
					containment_btn_seasons.appendChild(Content_Season);
					containment_seasons.appendChild(content_episode);
				}

			});

			console.log(data)

			// Fetch movie show cast
			const castUrl = `${BASE_URL}/tv/${serieId}/credits?${API_KEY}`;
			fetch(castUrl)
			.then(res => res.json())
			.then(castData => {
			  if (castData.cast.length < 1) {
			    document.querySelector(`${FilmPageDisplay} .actors-actresses`).style.display = 'none';
			    document.querySelector(`${FilmPageDisplay} .cast-title`).style.display = 'none';
			  } else {
			    document.querySelector(`${FilmPageDisplay} .actors-actresses`).style.display = 'flex';
			    document.querySelector(`${FilmPageDisplay} .cast-title`).style.display = 'block';
			  }
				castData.cast.forEach(actor => {

					const actorsElement = document.createElement('div');
					actorsElement.classList.add('actors');

					const actorPhoto = document.createElement('img');
					if (actor.profile_path == null) {
					  actorPhoto.src = '../../../../accets/media-actors/no-cast.png';
					  actorPhoto.classList.add('no-cast');
					} else {
					  actorPhoto.src = IMG_URL + actor.profile_path;
					  actorPhoto.classList.remove('no-cast');
					}
					actorsElement.appendChild(actorPhoto);

					const actorName = document.createElement('p');
					actorName.classList.add('name');
					actorName.innerText = actor.name;
					actorsElement.appendChild(actorName);

					if (! (actor.profile_path == null)) {
						contentActorsActresses.appendChild(actorsElement);
					}

				});
			})
			.catch(error => console.error('Erro ao obter informações do elenco:',
				error));



		} else {
			contentHome();
		}

	} catch (error) {
		console.error('Ocorreu um erro:',
			error);
	}
}

function setActiveSeason(seasonNumber) {
	const allSeasons = document.querySelectorAll('.Content-Season');
	const allEpisodes = document.querySelectorAll('.content-episode');
	allSeasons.forEach(season => {
		season.classList.add('unchecked');
		season.classList.remove('marked');
	});
	allEpisodes.forEach(season => {
		season.classList.add('hidden');
		season.classList.remove('visible');
	});

	const selectedSeason = document.querySelector(`.Content-Season:nth-child(${seasonNumber})`);
	const selectedEpisodes = document.querySelector(`.content-episode:nth-child(${seasonNumber})`);
	if (selectedSeason) {
		selectedSeason.classList.add('marked');
		selectedSeason.classList.remove('unchecked');
	}
	if (selectedEpisodes) {
		selectedEpisodes.classList.add('visible');
		selectedEpisodes.classList.remove('hidden');
	}
}

async function mediaIsMovie(movieId) {
	const detalhesUrl = `${BASE_URL}/movie/${movieId}?${API_KEY}&language=pt-BR`;

	try {
		const response = await fetch(detalhesUrl);
		const data = await response.json();
		// const plataformas = data.production_companies.map(company => company.name);

		if (data.title != "" && data.backdrop_path != null && data.vote_count >= 100) {

			// Elements
			let title = document.querySelector(`${whereDisplay} .title`);
			let background = document.querySelector(`${whereDisplay} .image-destaque`);
			let vote_count = document.querySelector(`${whereDisplay} .vote_count`);
			let runtime = document.querySelector(`${whereDisplay} .runtime`);
			let release_date = document.querySelector(`${whereDisplay} .release_date`);
			let category = document.querySelector(`${whereDisplay} .category`);
			let synopsi = document.querySelector(`${whereDisplay} .synopsi`);
			let contentActorsActresses = document.querySelector(`${FilmPageDisplay} .actors-actresses`);
			// let titleButtonPlay = document.querySelectorAll(`${FilmPageDisplay} .options-play .title`);
			let Play_1 = document.querySelector(`${FilmPageDisplay} .options-play .option-1`);
			let Play_2 = document.querySelector(`${FilmPageDisplay} .options-play .option-2`);
			let Play_3 = document.querySelector(`${FilmPageDisplay} .options-play .option-3`);
			let Play_4 = document.querySelector(`${FilmPageDisplay} .options-play .option-4`);

			let contentIframe = document.querySelector('#play .media');
			contentActorsActresses.innerHTML = '';

			document.querySelector(`${FilmPageDisplay} .share`).addEventListener('click', ()=> {
				toShare(data.id);
			});

			getMovieTrailerLink(data.id);


			let TextTitle = data.title.split(' ');
			let maxWords = 6;
			let TitleFiltered = TextTitle.slice(0,
				maxWords).join(' ');

			if (TextTitle.length > maxWords) {
				TitleFiltered += '...';
			}

			let info = document.createElement('div');
			info.classList.add('info');

			title.innerText = TitleFiltered;
			// titleButtonPlay.forEach(title => {
			//	title.innerText = TitleFiltered;
			// })
			background.setAttribute('src',
				IMG_URL_PROMINENCE + data.backdrop_path);
			vote_count.innerText = data.vote_average;

			let runtimeInMinutes = data.runtime;
			let hours = Math.floor(runtimeInMinutes / 60);
			let minutes = runtimeInMinutes % 60;
			if (hours > 0) {
				runtime.innerText = `${hours}h ${minutes}min`;
			} else {
				runtime.innerText = `${minutes}min`;
			}

			let value_release_date = data.release_date.slice(0, 4)
			release_date.innerText = value_release_date;


			let movieGenres = data.genres

			category.innerHTML = '';

			if (data.genres.length = 1) {
				let genre_1 = document.createElement('div');
				genre_1.innerHTML = movieGenres[0].name;
				category.appendChild(genre_1);

			} else if (data.genres.length = 2) {
				let genre_1 = document.createElement('div');
				genre_1.innerHTML = movieGenres[0].name;
				category.appendChild(genre_1);

				let genre_2 = document.createElement('div');
				genre_2.innerHTML = movieGenres[1].name;
				category.appendChild(genre_2);

			} else if (data.genres.length > 2) {
				let genre_1 = document.createElement('div');
				genre_1.innerHTML = movieGenres[0].name;
				category.appendChild(genre_1);

				let genre_2 = document.createElement('div');
				genre_2.innerHTML = movieGenres[0].name;
				category.appendChild(genre_2);

				let genre_3 = document.createElement('div');
				genre_3.innerHTML = movieGenres[0].name;
				category.appendChild(genre_3);

			} else {
				category.innerHTML = '';
			}

			let TextOverview = data.overview.split(' ');
			let OverviewFiltered = TextOverview.slice(0,
				22).join(' ');

			if (TextOverview.length > 22) {
				OverviewFiltered += '...';
			}

			synopsi.innerText = OverviewFiltered;


			Play_1.addEventListener("click", ()=> {
				contentIframe.innerHTML = '';
				let iframe = document.createElement('iframe');
				iframe.src = `https://embedder.net/e/${data.imdb_id}`;
				iframe.setAttribute('allowfullscreen', '');
				contentIframe.appendChild(iframe);
			});
			Play_2.addEventListener("click", ()=> {
				contentIframe.innerHTML = '';
				let iframe = document.createElement('iframe');
				iframe.src = `https://v2.vidsrc.me/embed/${data.imdb_id}`;
				iframe.setAttribute('allowfullscreen', '');
				contentIframe.appendChild(iframe);
			});
			Play_3.addEventListener("click", ()=> {
				contentIframe.innerHTML = '';
				let iframe = document.createElement('iframe');
				iframe.src = `https://superembeds.com/embed2/${data.imdb_id}`;
				iframe.setAttribute('allowfullscreen', '');
				contentIframe.appendChild(iframe);
			});
			Play_4.addEventListener("click",
				()=> {
					contentIframe.innerHTML = '';
					const iframe = document.createElement('iframe');
					iframe.src = `https://multiembed.mov/?video_id=${data.imdb_id}`;
					iframe.setAttribute('allowfullscreen', '');
					contentIframe.appendChild(iframe);
				});

			console.log(data)

			// Fetch movie show cast
			const castUrl = `${BASE_URL}/movie/${movieId}/credits?${API_KEY}`;
			fetch(castUrl)
			.then(res => res.json())
			.then(castData => {
				if (castData.cast.length < 1) {
			    document.querySelector(`${FilmPageDisplay} .actors-actresses`).style.display = 'none';
			    document.querySelector(`${FilmPageDisplay} .cast-title`).style.display = 'none';
			  } else {
			    document.querySelector(`${FilmPageDisplay} .actors-actresses`).style.display = 'flex';
			    document.querySelector(`${FilmPageDisplay} .cast-title`).style.display = 'block';
			  }
				castData.cast.forEach(actor => {

					const actorsElement = document.createElement('div');
					actorsElement.classList.add('actors');

					const actorPhoto = document.createElement('img');
					if (actor.profile_path == null) {
					  actorPhoto.src = '../../../../accets/media-actors/no-cast.png';
					  actorPhoto.classList.add('no-cast');
					} else {
					  actorPhoto.src = IMG_URL + actor.profile_path;
					  actorPhoto.classList.remove('no-cast');
					}
					actorsElement.appendChild(actorPhoto);

					const actorName = document.createElement('p');
					actorName.classList.add('name');
					actorName.innerText = actor.name;
					actorsElement.appendChild(actorName);

					if (! (actor.profile_path == null)) {
						contentActorsActresses.appendChild(actorsElement);
					}

				});
			})
			.catch(error => console.error('Erro ao obter informações do elenco:',
				error));



		} else {
			contentHome();
		}

	} catch (error) {
		console.error('Ocorreu um erro:',
			error);
	}
}

function toShare(id) {
	const urlToShare = 'https://playflix-os.netlify.app/index.html?share=' + id;
	const url = urlToShare
	// window.postMessage(url);

	if (navigator.share) {
		navigator.share({
			title: 'Compartilhar filme',
			text: 'Compartilhe',
			url: urlToShare,
		})
		.then(() => console.log('URL compartilhada com sucesso'))
		.catch((error) => console.error('Erro ao compartilhar:', error));
	} else {

		let type = 'alert';
		let titleAlert = 'Opa! Algo deu errado';
		let textAlert = 'A funcionalidade de compartilhamento não é suportada neste navegador.';

		document.querySelector('#alert').classList.add('active');
		document.querySelectorAll('#alert .content').forEach(content => {
			content.classList.remove('active');
		});
		document.querySelector(`#alert .type-${type}`).classList.add('active');
		document.querySelector(`#alert .type-${type} .top h3`).innerText = titleAlert;
		document.querySelector(`#alert .type-${type} .top p`).innerText = textAlert;

		document.querySelector(`#alert .type-${type} .yes`).addEventListener('click', ()=> {
			document.querySelector('#alert').classList.remove('active');
		})
	}
}

async function getMovieTrailerLink(filmeId) {
	let trailerUrl = `${BASE_url}/movie/${filmeId}/videos?${API_key}&language=pt-BR`;

	try {
		let response = await fetch(trailerUrl);
		let data = await response.json();



		if (data.results && data.results.length > 0) {
			let trailerKey = data.results[0].key;
			let base = data.results[0];
			let trailerLink = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&hl=${base.iso_639_1}-${base.iso_3166_1}`;
			let buttonTrailer = document.querySelector(`${FilmPageDisplay} .trailer`);
			console.log(trailerLink)
			console.log(data.results[0]);

			buttonTrailer.addEventListener('click', ()=> {
				let mediaContent = document.querySelector(`${trailerDisplay} .media`);

				mediaContent.innerHTML = "";
				let trailer_iframe = document.createElement('iframe');
				trailer_iframe.classList.add('iframe');
				trailer_iframe.setAttribute('src', trailerLink);
				trailer_iframe.setAttribute('allowfullscreen', '');
				trailer_iframe.requestFullscreen();
				mediaContent.appendChild(trailer_iframe)
			});

			if (base.official == true) {
				document.querySelector(`${FilmPageDisplay} .label-btn-trailer`).innerText = "Assistir ao Trailer Oficial";
			}
		} else {
		  button_trailer = document.querySelector(`${FilmPageDisplay} .trailer`);
			button_trailer.addEventListener('click', ()=> {

				let type = 'alert';
				let titleAlert = 'Opa! Algo deu errado';
				let textAlert = 'Nenhum vídeo de trailer encontrado para este filme.';

				document.querySelector('#alert').classList.add('active');
				document.querySelectorAll('#alert .content').forEach(content => {
					content.classList.remove('active');
				});
				document.querySelector(`#alert .type-${type}`).classList.add('active');
				document.querySelector(`#alert .type-${type} .top h3`).innerText = titleAlert;
				document.querySelector(`#alert .type-${type} .top p`).innerText = textAlert;

				document.querySelector(`#alert .type-${type} .yes`).addEventListener('click', ()=> {
					document.querySelector('#alert').classList.remove('active');
				})
				console.log('Nenhum vídeo de trailer encontrado para este filme.');

			});
		}

	} catch (error) {
		console.error('Ocorreu um erro:', error);
	}
}

let floatPlay = document.querySelector(`${FilmPageDisplay} .float-btn-play`);
let options_play = document.querySelector(`${FilmPageDisplay} .options-play`);

floatPlay.addEventListener('click', ()=> {
  options_play.scrollIntoView({ behavior: 'smooth' });
});

