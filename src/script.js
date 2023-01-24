const urlSegment = window.location.search;
const segmentQuery = decodeURIComponent(urlSegment.substring(urlSegment.indexOf('?')+1));
const types = ['movie', 'tvSeries', 'short', 'tvMiniSeries', 'tvMovie', 'tvSpecial', 'tvShort', 'podcastSeries'];

function empty(){
	document.getElementById('result').innerHTML = '';
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '91f666ff61msh4545f09d7eb23ddp1eec0cjsn308767ebedc2',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

async function get_data(){
	if(segmentQuery.length){
		document.getElementById('input_query').value = segmentQuery;

		const url = `https://imdb8.p.rapidapi.com/title/find?q=${segmentQuery}`;
		const response = await fetch(url, options).catch(err => console.error(err));
		const data = await response.json();

		console.log(segmentQuery);
		console.log(data);

		show(data.results);
	}else{
		empty();
	}
}

function show(data) {
	const quantity = data.length;
	if(quantity){
		for(let i=0; i<quantity; i++){
			if(String(data[i].id).includes('title') && types.includes(data[i].titleType) && 'year' in data[i]){
				let title_id = data[i].id.slice(7,-1);
				let title = data[i].title;
				let type = data[i].titleType;
				let year = data[i].year;

				document.getElementById('result').innerHTML += 
					`<div id="tab">
						<div class="container" id="container${i}">
							<img src="" alt="image" id="image${i}">
						</div>
						
						<div id="desc">
							<div id="title">${title}</div>
							<div id="type">${type} (${year})</div>
							
							<a href="./syn.html?title=${title}&type=${type}-${year}&id=${title_id}" target="_blank" id="btn_select">
								synopsis
							</a>
						</div>
					</div>`;

				if('image' in data[i]){
					document.getElementById(`image${i}`).src = data[i].image.url;
				}else{
					document.getElementById(`container${i}`).textContent = 'image is not currently available';
					document.getElementById(`container${i}`).style.minWidth = '180px';
				}
			}
		}
	}else{
		document.getElementById('result').textContent = 'no result';
		document.getElementById('result').style.textAlign = 'center';
		document.getElementById('result').style.fontSize = '30px';
		document.getElementById('result').style.color = 'rgb(218, 65, 65)';
	}
}

window.onload = function(){
	var query = String(document.getElementById('input_query').value);
	empty();
	get_data(query);

	document.getElementById('result').textContent = '';
	document.getElementById('input_query').addEventListener('keydown', function(event){
		if(event.key === 'Enter'){
			event.preventDefault();
			document.getElementById('submit_query').click();
		}
	});
}