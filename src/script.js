let urlSegment = window.location.search
var segmentQuery = decodeURIComponent(urlSegment.substring(urlSegment.indexOf('?')+1));

function clearing(){
	document.getElementById('result').innerHTML = '';
}

async function get_data(){
	if(segmentQuery.length){
		document.getElementById('input_query').value = segmentQuery;
		const response = await fetch('./src/src_data.json').catch(err => console.error(err));
		let data = await response.json();

		console.log(segmentQuery);
		console.log(data);

		show(data);
	}else{
		clearing();
	}
}
//fungsi di atas percobaan

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '91f666ff61msh4545f09d7eb23ddp1eec0cjsn308767ebedc2',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

/*
async function get_data(){
	if(segmentQuery.length){
		document.getElementById('input_query').value = segmentQuery;

		let url = `https://imdb8.p.rapidapi.com/title/find?q=${segmentQuery}`;
		const response = await fetch(url, options).catch(err => console.error(err));
		let data = await response.json();

		console.log(segmentQuery);
		console.log(data);

		show(data);
	}else{
		reset()
	}
}
*/
//fungsi di atas fix

function show(data) {
	for(let i=0; i>=0; i++){
		if(String(data.results[i].id).includes('title')){
			let title = String(data.results[i].title);
			let type = `${data.results[i].year} ${data.results[i].titleType}`;
			let title_id = String(data.results[i].id).slice(7,-1);

			document.getElementById('result').innerHTML += 
				`<div id="tab">
					<div class="container" id="container${i}">
						<img src="" alt="image" id="image${i}">
					</div>
					
					<div id="desc">
						<div id="title">${title}</div>
						<div id="type">${type}</div>
						
						<button>
								<a href="./syn.html?title=${title}&type=${type}&id=${title_id}" target="_blank">
									synopsis
								</a>
						</button>

						<div id="id">id: ${title_id}</div>
					</div>
				</div>`;

			if('image' in data.results[i]){
				document.getElementById(`image${i}`).src = data.results[i].image.url;
			}else{
				document.getElementById(`container${i}`).innerHTML = 'image is not currently available';
				document.getElementById(`container${i}`).style.minWidth = '180px';
			}
		}
	}
}

window.onload = function(){
	/*
	let query = String(document.getElementById('input_query').value);
	get_data(query);

	let submit_button = document.getElementById('submit_query');
	submit_button.onclick = function(){
		let query = String(document.getElementById('input_query').value);
		reset();
		if(query.length){
			alert(`search ${query}`);
			get_data(query);
		}
	}
	*/
	//codeblock di atas fix
	
	var query = String(document.getElementById('input_query').value);
	clearing()
	get_data(query);

	document.getElementById('result').textContent = ' ';
	document.getElementById('submit_query').onclick = function(){
		query = String(document.getElementById('input_query').value);
		
		if(query.replaceAll(' ', '').length){
			alert(`search "${query}" success`)
			window.location = `index.html?${query}`;
		}
	}
	//codeblock di atas fix*
}