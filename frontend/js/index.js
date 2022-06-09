const api_origin = 'http://127.0.0.1:8042';
const main = document.getElementById('content');
const mobile_menu = document.querySelector('.mobile-menu');
const ul_menu = document.querySelector('nav ul');

mobile_menu.addEventListener('click', (event) => {
	if (window.getComputedStyle(ul_menu).display === '' || window.getComputedStyle(ul_menu).display === 'none'){
		ul_menu.classList.remove('remove-menu');
		setTimeout(()=>{
			ul_menu.classList.add('show-menu');
			setTimeout(()=>{
				ul_menu.classList.remove('hide-menu');
			}, 500);
		}, 20);
	}
	else if (window.getComputedStyle(ul_menu).display === 'flex'){
		ul_menu.classList.remove('show-menu');
		setTimeout(()=>{
			ul_menu.classList.add('hide-menu');
		}, 20);
		setTimeout(()=>{
			ul_menu.classList.add('remove-menu');
		}, 500);
	}
});

/*window.addEventListener('deviceorientation', (event) => {
	window.location.reload();
});

window.addEventListener('orientationchange', (event) => {
	window.location.reload();
});*/

let menuHandler = ()=>{
	if (window.getComputedStyle(mobile_menu).display === 'block'){
		ul_menu.classList.add('remove-menu');
		ul_menu.classList.add('hide-menu');
		ul_menu.classList.remove('show-menu');
	}
	else{
		ul_menu.classList.remove('remove-menu');
		ul_menu.classList.remove('hide-menu');
		ul_menu.classList.add('show-menu');
	}
};

screen.orientation.addEventListener('change', (event) => {
	/*if (window.getComputedStyle(mobile_menu).display === 'block'){
		menuHandler();
		window.location.reload();
	}*/

	menuHandler();
	window.location.reload();
});

async function getHouses(){
	try {
		const endpoint = 'api/houses';
		let response = await fetch(`${api_origin}/${endpoint}`);

		if (!response.ok) {  //or (response.status === 200)
			throw new Error(`HTTP error: ${response.status}`);
		}

		return await response.json();
	} catch(e) {
		//console.log('getHouses:', e);
		console.log(e);
	}
}

async function getHouse(id){
	try {
		const endpoint = 'api/houses/' + id;
		let response = await fetch(`${api_origin}/${endpoint}`);

		if (!response.ok) {  //or (response.status === 200)
			throw new Error(`HTTP error: ${response.status}`);
		}

		return await response.json();
	} catch(e) {
		//console.log('getHouses:', e);
		console.log(e);
	}
}

async function renderViewAll(){
	try {
		let houses = await getHouses();
		let html = '';

		houses.forEach((house) => {
			let house_html =`<div class='house'> 
								<a href="#"><img src=${house.url} width=100px height=100px alt=${house.code} /></a>
								<h2><span>House Agent: </span>${house.agent}</h2>
								<h3>${house.address}</h3>
							</div>`;

			html += house_html;
		});

		main.innerHTML = html;
	} catch(e) {
		console.log(e);
	}
}

async function renderView(id){
	try {
		let house = await getHouse(id);
		
		let html =`<div class='house'> 
						<h1>${house.address}</h1>
						<h2>${house.agent} <span>: ${house.code}</span></h2>
						<img src=${house.url} alt=${house.code} />
					</div>`;

		main.innerHTML = html;
	} catch(e) {
		console.log(e);
	}
}


function initPage(){
	renderViewAll();
	menuHandler();
}

//window.addEventListener('DOMContentLoaded', renderViewAll);
window.addEventListener('DOMContentLoaded', initPage);