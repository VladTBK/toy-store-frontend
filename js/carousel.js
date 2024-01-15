const allToys = document.querySelector('#all-toys');
const navbarCart = document.querySelector('.navbar-cart');
const cartContainer = document.querySelector('.cart-container');
let cartPressed = false;
let currCartCount = 0;
const global = {
	currentPage: window.location.pathname,

	api: {
		// Register your key at https://www.themoviedb.org/settings/api and enter here
		// Only use this for development or very small projects. You should store your key and make requests from a server
		apiKey: '34327d14bdd899011fc01f09d8358e5f',
		apiUrl: 'https://api.themoviedb.org/3/',
	},
};
// Display 20 toys
async function displayAllToys() {
	// const { results } = await fetchAPIData('');
	totalToys = 20;
	for (let i = 0; i < totalToys; i++) {
		const div = document.createElement('div');
		div.innerHTML = `
		<div class = "card cursor">
          <div>
            <img
              src="/src/imgs/no-toy.jpeg"
              class="card-img-top"
            />
        	</div>
          	<div class="card-body">
            	<h5 class="card-title">No toy shefilor</h5>
            	<p class="card-text"> </p>
          	</div>
		</div>
			<span class="close">&times;</span>	
			<div class="modal">
				<div class="image-container">
					<img  src="/src/imgs/no-toy.jpeg">
				</div>
				<div class="info-container">
  					<h2 class="title">Product Title</h2>
  					<p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum dui nec lectus commodo, et pretium massa convallis.</p>
 					<p class="price">${i}.99$</p>
 				       <button class="add-to-cart">Add to Cart</button>
     			</div>
			</div>
        `;
		const modal = div.querySelector('.modal');
		const closeModal = div.querySelector('.close');
		const card = div.querySelector('.card');
		const addToCart = div.querySelector('.add-to-cart');
		card.addEventListener('click', myZoom(modal, closeModal, 'flex'));
		closeModal.addEventListener('click', myZoom(modal, closeModal, 'none'));

		addToCart.addEventListener('click', () => {
			currCartCount++;
			const cartTotal = document.querySelector('.cart-total');
			cartTotal.textContent = currCartCount;
			const cartItem = document.createElement('li');
			cartItem.innerHTML = `<li class="cart-item ">
			<div class="product-image">
			  <img src="/src/imgs/no-toy.jpeg" alt="Product Image">
			</div>
			<div class="product-details">
			  <h3 class="product-name">Product Name</h3>
			  <p class="product-price">${currCartCount}.99$</p>
			</div>
		  </li>`;
			cartContainer.appendChild(cartItem);
			console.log(addToCart);
		});

		allToys.appendChild(div);
	}
}
const myZoom = (myModal, myCloseModal, type) => {
	return function () {
		myModal.style.display = type;
		myCloseModal.style.display = type;
	};
};

async function displaySlider() {
	const { results } = await fetchAPIData('movie/now_playing');

	results.forEach((movie) => {
		const div = document.createElement('div');
		div.classList.add('swiper-slide');

		div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="/src/imgs/no-toy.jpeg" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
    `;

		document.querySelector('.swiper-wrapper').appendChild(div);

		initSwiper();
	});
}

function initSwiper() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		freeMode: true,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		breakpoints: {
			500: {
				slidesPerView: 2,
			},
			700: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
}

function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}

// Show Alert
function showAlert(message, className = 'error') {
	const alertEl = document.createElement('div');
	alertEl.classList.add('alert', className);
	alertEl.appendChild(document.createTextNode(message));
	document.querySelector('#alert').appendChild(alertEl);

	setTimeout(() => alertEl.remove(), 3000);
}

// Init App
function init() {
	switch (global.currentPage) {
		case '/':
		case '/dist/html/carouselpage.html':
			// displaySlider();
			displayAllToys();
			break;
	}
}

const mainEvents = () => {
	document.addEventListener('DOMContentLoaded', init);
	navbarCart.addEventListener('click', (e) => {
		e.preventDefault();
		if (!cartPressed) {
			cartPressed = true;
			cartContainer.style.display = 'flex';
		} else {
			cartPressed = false;
			cartContainer.style.display = 'none';
		}
	});
};
mainEvents();
