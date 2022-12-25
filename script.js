const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': atob('MDkzNzdiNzEyMW1zaDQ4ZTk2OWRjMGM1ZTBmNHAxM2RkMDJqc25jNjllNTI0YTBhZmU='),
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

function reset(){
	document.getElementById('result').innerHTML = '';
}

async function get_data(q){
	let q_fix = String(q).replace(/\s/g, '%20');
	var url = `https://imdb8.p.rapidapi.com/title/find?q=${q_fix}`;

	const response = await fetch(url, options);
	var data = await response.json();
	console.log(data);

	show(data);
}

function show(data) {
	for(let i=0; i<=20; i++){
		if(String(data.results[i].id).includes('title') && 
			'image' in data.results[i]
		){
			var tab = 

				`<div id="tab">
					<div id="container">
						<img src="" alt="image" id="image${i}">
					</div>
					<div id="desc">
						<div id="title">${data.results[i].title}</div>
						<div id="type">${data.results[i].year} ${data.results[i].titleType}</div>
						<div id="id">id: ${String(data.results[i].id).slice(7,-1)}</div>
					</div>
				</div>`

			document.getElementById('result').innerHTML += tab;
			document.getElementById(`image${i}`).src = data.results[i].image.url;
		}
	}
}

window.onload = function(){
	let query = String(document.getElementById('input_query').value);
	get_data(query);

	var button = document.getElementById('button');
	button.onclick = function(){
		let query = String(document.getElementById('input_query').value);
		reset();
		if(query.length){
			alert(`search ${query}`);
			get_data(query);
		}
	}
}