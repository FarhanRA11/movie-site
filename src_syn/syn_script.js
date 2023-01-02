var code = localStorage.getItem('syn_code');
var lst = code.split('|');

async function get_data(){
    const response = await fetch('./src_syn/src_data_syn.json').catch(err => console.error(err));
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
async function get_data(){
	let url = `https://imdb8.p.rapidapi.com/title/get-synopses?tconst=${lst[2]}`;

	const response = await fetch(url, options).catch(err => console.error(err));
	var data = await response.json();
	console.log(data);

	show(data);
}
*/
//fungsi di atas fix

function show(data) {
	for(let i=0; i>=0; i++){
        let language = data[i].language;
        var profanity = '';
        let synopsis = data[i].text;

        if(data[i].hasProfanity){
            profanity = 'profanity warning!';
        }
        
        let tab = 
            `<div id="body_tab">
                <div id="info">
                    <div>language: ${language}</div>
                    <div id="warning"><b>${profanity}</b></div>
                </div>
                <p id="syn_text">&emsp;&emsp;${synopsis}</p>
            </div>`;

        document.getElementById('syn_result').innerHTML += tab;
	}
}


window.onload = function(){
	document.title = 'Synopsis: ' + lst[0];
    document.getElementById('title').innerHTML = lst[0];
    document.getElementById('type').innerHTML = lst[1];
    document.getElementById('id').innerHTML = lst[2];

    console.log(lst);
    get_data();
}