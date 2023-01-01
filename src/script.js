function reset(){
	document.getElementById('result').innerHTML = '\n';
}

async function get_data(){
	const response = await fetch('./src/src_data.json').catch(err => console.error(err));
	var data = await response.json();
	console.log(data);

	show(data);
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
async function get_data(q){
	let q_fix = String(q).replace(/\s/g, '%20');
	let url = `https://imdb8.p.rapidapi.com/title/find?q=${q_fix}`;

	const response = await fetch(url, options);
	var data = await response.json();
	console.log(data);

	show(data);
}
*/
//fungsi di atas fix

function show(data) {
	for(let i=0; i>=0; i++){
		if(String(data.results[i].id).includes('title') 
			&& 'image' in data.results[i]
		){
			let title = data.results[i].title;
			let type = `${data.results[i].year} ${data.results[i].titleType}`;
			let title_id = String(data.results[i].id).slice(7,-1);

			let tab = 

				`<div id="tab">
                    <div id="container">
                        <img src="" alt="image" id="image${i}">
                    </div>
					
					<div id="desc">
						<div id="title">${title}</div>
						<div id="type">${type}</div>
						
						<button onclick="
							localStorage.setItem('syn_code', '${title}|${type}|${title_id}');
						">
								<a href="./syn.html" target="_blank">
									synopsis
								</a>
						</button>

						<div id="id">id: ${title_id}</div>
					</div>
				</div>`;

			document.getElementById('result').innerHTML += tab;
			document.getElementById(`image${i}`).src = data.results[i].image.url;
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

	reset();
	get_data();
	//codeblock di atas percobaan
}