function reset(){
	document.getElementById('result').innerHTML = '';
}

const data = 

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '91f666ff61msh4545f09d7eb23ddp1eec0cjsn308767ebedc2',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

async function get_data(q){
	let q_fix = String(q).replace(/\s/g, '%20');
	var url = `https://imdb8.p.rapidapi.com/title/find?q=${q_fix}`;

	const response = await fetch(url, options);
	var data = await response.json();
	console.log(data);

	show(data);
}

var title_id;
function show(data) {
	for(let i=0; i<=20; i++){
		if(String(data.results[i].id).includes('title') && 
			'image' in data.results[i]
		){
			title_id = String(data.results[i].id).slice(7,-1)
			
			var tab = 

				`<div id="tab">
					<div id="container">
						<img src="" alt="image" id="image${i}">
					</div>
					<div id="desc">
						<div id="title">${data.results[i].title}</div>
						<div id="type">${data.results[i].year} ${data.results[i].titleType}</div>
						
						<button>
							<a id="syn${i}" href="">
								synopsis
							</a>
						</button>

						<div id="id">id: ${title_id}</div>
					</div>
				</div>`

			document.getElementById('result').innerHTML += tab;
			document.getElementById(`image${i}`).src = data.results[i].image.url;
			document.getElementById(`syn${i}`).href = 'http://www.google.com'
		}
	}
}

window.onload = function(){
	let query = String(document.getElementById('input_query').value);
	get_data(query);

	var button = document.getElementById('submit_query');
	button.onclick = function(){
		let query = String(document.getElementById('input_query').value);
		reset();
		if(query.length){
			alert(`search ${query}`);
			get_data(query);
		}
	}
}