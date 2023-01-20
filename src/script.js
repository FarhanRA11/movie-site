const urlSegment = window.location.search;
const segmentQuery = decodeURIComponent(urlSegment.substring(urlSegment.indexOf('?')+1));

function empty(){
	document.getElementById('result').innerHTML = '';
}

async function get_data(){
	if(segmentQuery.length){
		document.getElementById('input_query').value = segmentQuery;
		const response = await fetch('./src/src_data.json').catch(err => console.error(err));
		const data = await response.json();

		console.log(segmentQuery); //data test
		console.log(data); //data test

		show(data.results);
	}else{
		empty();
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
*/
//fungsi di atas fix

function show(data) {
	if(data.length){
		for(let i=0; i<data.length; i++){
			if(String(data[i].id).includes('title')){
				let title = String(data[i].title);
				let type = `${data[i].year} ${data[i].titleType}`;
				let title_id = String(data[i].id).slice(7,-1);

				document.getElementById('result').innerHTML += 
					`<div id="tab">
						<div id="container" id="container${i}">
							<img src="" alt="image" id="image${i}">
						</div>
						
						<div id="desc">
							<div id="title">${title}</div>
							<div id="type">${type}</div>
							
							<a href="./syn.html?title=${title}&type=${type}&id=${title_id}" target="_blank" id="btn_select">
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
		document.getElementById('result').style.color = 'rgb(255,0,0)';
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
	empty();
	get_data(query);

	document.getElementById('result').textContent = '';
	document.getElementById('input_query').addEventListener('keydown', function(event){
		if(event.key === 'Enter'){
			event.preventDefault();
			document.getElementById('submit_query').click();
		}
	});
	//codeblock di atas fix+
}