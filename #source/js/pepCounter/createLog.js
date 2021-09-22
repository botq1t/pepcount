function download() {
	let text = createLogText();

	let element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', 'log');

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function createLogText() {
	let text = `{\n`;
	text = text + `	words: {\n`;
	for (let i = 0; i < words.length; i++) {
		text = text + `		'${words[i]}': ${counter[i]},\n`
	}
	text = text + `	},\n`;

	text = text + `	timePassed: ${timePassing},\n`
	text = text + `	timePassedString: '${getTimeString(timePassing)}',\n`

	text = text + `	log: [\n`;
	for (let i = 0; i < logger.length; i++) {
		text = text + `		${JSON.stringify(logger[i])},\n`;
	}
	text = text + `	],\n`;


	text = text + `}`;
	console.log(text);
	return text;
}

document.querySelector('.logger').addEventListener('dblclick', download);
// $('.logger').click(download);