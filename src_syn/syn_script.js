var code = localStorage.getItem('syn_code');
var lst = code.split('|');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '91f666ff61msh4545f09d7eb23ddp1eec0cjsn308767ebedc2',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

async function get_data(){
	let url = `https://imdb8.p.rapidapi.com/title/get-synopses?tconst=${lst[2]}`;

	const response = await fetch(url, options).catch(err => console.error(err));
	var data = await response.json();
	console.log(data);

	show(data);
}


function show(data) {
	for(let i=0; i>=0; i++){
        let synopsis = data[i].text;
        let language = data[i].language;
        let profanity = data[i].hasProfanity;
        let title = lst[0];
        let type = lst[1];
        let id = lst[2];

        let header_tab = 
            `<div></div>`;

        let body_tab = 
            `<div></div>`;

        document.getElementById('syn_desc').innerHTML += header_tab;
        document.getElementById('syn_result').innerHTML += header_tab;
        document.getElementById(`image${i}`).src = data.results[i].image.url;
	}
}


window.onload = function(){
	document.title += lst[0];
	document.getElementById('syn_result').innerHTML += code;

    console.log(lst);
    get_data();
}