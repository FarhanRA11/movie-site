let urlSegment = window.location.search
let lst = urlSegment.substring(urlSegment.indexOf('?')+1).split('&');
var title = decodeURIComponent(lst[0].substring(lst[0].indexOf('=')+1));
var type = decodeURIComponent(lst[1].substring(lst[1].indexOf('=')+1));
var id = lst[2].substring(lst[2].indexOf('=')+1);

async function get_data(){
    const response = await fetch('./src_syn/src_data_syn.json').catch(err => console.error(err));
	let data = await response.json();
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
	let url = `https://imdb8.p.rapidapi.com/title/get-synopses?tconst=${id}`;

	const response = await fetch(url, options).catch(err => console.error(err));
	let data = await response.json();
	console.log(data);

	show(data);
}
*/
//fungsi di atas fix

function show(data) {
    if(data.length){
        for(let i=0; i>=0; i++){
            let language = data[i].language;
            let profanity = '';
            let synopsis = data[i].text;

            if(data[i].hasProfanity){
                profanity = 'profanity warning!';
            }
            
            document.getElementById('syn_result').innerHTML += 
                `<div id="body_tab">
                    <div id="info">
                        <div>language: ${language}</div>
                        <div id="warning"><b>${profanity}</b></div>
                    </div>
                    <p id="syn_text">&emsp;&emsp;${synopsis}</p>
                </div>`;
        }
    }else{
        document.getElementById('syn_result').textContent = `synopsis for ${title} is not currently available`;
        document.getElementById('syn_result').style.textAlign = 'center';
        document.getElementById('syn_result').style.marginTop = '100px';
    }
}

window.onload = function(){
	document.title = 'Synopsis: ' + title;
    document.getElementById('title').textContent = title;
    document.getElementById('type').textContent = type;
    document.getElementById('id').textContent = id;

    get_data();
}