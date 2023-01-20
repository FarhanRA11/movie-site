const urlSegment = window.location.search;
const lst = urlSegment.substring(urlSegment.indexOf('?')+1).split('&');
const title = decodeURIComponent(lst[0].substring(lst[0].indexOf('=')+1));
const type = decodeURIComponent(lst[1].substring(lst[1].indexOf('=')+1));
const id = lst[2].substring(lst[2].indexOf('t'));

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '91f666ff61msh4545f09d7eb23ddp1eec0cjsn308767ebedc2',
		'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
	}
};

async function get_data(){
	let url = `https://imdb8.p.rapidapi.com/title/get-synopses?tconst=${id}`;

	const response = await fetch(url, options).catch(err => console.error(err));
	let data = await response.json();
	console.log(data);

	show(data);
}

function show(data) {
    if(data.length){
        for(let i=0; i<data.length; i++){
            let language = data[i].language;
            let profanity = '';
            let synopsis = data[i].text;

            if(data[i].hasProfanity){
                profanity = 'profanity warning!';
            }
            
            if(language == 'eng'){
                document.getElementById('syn_result').innerHTML += 
                    `<div id="body_tab">
                        <div id="warning">
                            <b>${profanity}</b>
                        </div>
                        <p id="syn_text">&emsp;&emsp;${synopsis}</p>
                    </div>
                    <hr>`;
            }
        }
    }
    
    if(document.getElementById('syn_result').innerHTML == ''){
        document.getElementById('syn_result').textContent = `synopsis for ${title} is not currently available`;
        document.getElementById('syn_result').style.textAlign = 'center';
        document.getElementById('syn_result').style.marginTop = '100px';
        document.getElementById('syn_result').style.color = 'rgb(255,0,0)'
    }
}

window.onload = function(){
	document.title = 'Synopsis: ' + title;
    document.getElementById('title').textContent = title;
    document.getElementById('type').textContent = type;

    get_data();
}