const api_origin = 'http://127.0.0.1:8042';
const main = document.getElementById('content');

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
								<img src=${house.url} alt=${house.code} />
								<h2><span>House Agent: </span>${house.agent}</h2>
								<h1>${house.address}</h1>
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


window.addEventListener('DOMContentLoaded', renderViewAll);