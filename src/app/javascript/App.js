document.addEventListener('DOMContentLoaded', function () {
	const navButtons = document.querySelectorAll('.option-bar');

		// Adiciona eventos de clique aos botões de navegação
		navButtons.forEach(button => {
			button.addEventListener('click', handleNavClick);
			updateHeaderVisibility();
		});


		// Inicialmente, mostra a página inicial
		showTab('home');
		updateHeaderVisibility();
	});

	// PAGINA SEARCH
	
	document.addEventListener('click', function(event) {
  // Verifica se o clique ocorreu em um link que abre em uma nova guia
  if (event.target.tagName === 'A' && event.target.getAttribute('target') === '_blank') {
    // Impede que a nova guia seja aberta
    event.preventDefault();
    
    // Se necessário, você pode realizar alguma ação adicional aqui
    // (por exemplo, abrir o link na mesma guia com window.open)
  }
});


	const searchBox = document.getElementById('search-box');
	let navBar = document.querySelector('nav');
	let suggest = document.querySelector('.suggest');
	const btnSuggest = document.getElementById('btn-suggest-movie');
	const clearInput = document.querySelector('.clear-input');

	searchBox.addEventListener("focus", ()=> {
		navBar.classList.add('keyboard-visible');
		suggest.classList.add('keyboard-visible');
	});

	searchBox.addEventListener("blur", ()=> {
		navBar.classList.remove('keyboard-visible');
		suggest.classList.remove('keyboard-visible');
	});


	btnSuggest.addEventListener("click", ()=> {
		searchBox.value = "Resgate 2";
	});

	clearInput.addEventListener('click', ()=> {
		let resultsContainer = document.querySelector('#search .results');
		let recommendations = document.querySelector('#search .recommendations');

		searchBox.value = "";
		resultsContainer.innerHTML = "";
		recommendations.classList.remove('hidden');
		clearInputDisplayOff();
	});

	searchBox.addEventListener('input', ()=> {
		if (searchBox.value != "") {
			clearInput.style.display = 'flex';
		} else {
			clearInputDisplayOff();
		}
	});

	function clearInputDisplayOff() {
		clearInput.style.display = 'none';
	}

	// DETECTAR TEMA

	const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

	function handleThemeChange(event) {
		if (event.matches) {
			// Tema escuro ativado
			console.log('Tema escuro ativado');
		} else {
			// Tema claro ativado
			console.log('Tema claro ativado');
		}
	}

	// Adiciona um ouvinte para a mudança de preferência de esquema de cores
	darkModeMediaQuery.addListener(handleThemeChange);

	// Executa a função de tratamento inicialmente para verificar o estado atual
	handleThemeChange(darkModeMediaQuery);

	const PgSearch = document.querySelector('#search .scroll')

	PgSearch.addEventListener('scroll', headerSearch);

	function headerSearch() {
		const ElementHeaderSearch = document.querySelector('#search .scroll .header');
		let top = PgSearch.scrollTop
		if (top == 0) {
			ElementHeaderSearch.classList.remove('active');
		} else if (top > 120) {
			ElementHeaderSearch.classList.add('active');
		}
	}

	function functionsRenderPages() {
		profileSelectorHeader();
	}

	function profileSelectorHeader() {
		let current = 'accets/default_profile_photo/fp_2.jpg';
		// let current = 'accets/default_profile_photo/fp_4.jpg';
		// let current = 'accets/default_profile_photo/fp_8.jpg';
		// let current = 'accets/default_profile_photo/fp_5.jpg';
		// let current = 'accets/default_profile_photo/fp_7.jpg';
		let picturesOfUsers = document.querySelectorAll('.header-more-options .options .users img')
		let all_imgUserProfile = document.querySelectorAll('.img-user-profile');

		all_imgUserProfile.forEach(imgUser => {
			imgUser.src = current
		});
		picturesOfUsers.forEach(users => {
			if (users.src.includes(current)) {
				users.classList.add('active')
			}
		})
	}