function download() {
	let text = `time: ${timePassing}\n\n`;
	for (let i = 0; i < counter.length; i++) {
		text = text + `'${$(`#card_${i}`).children('.card__title').html()}': ${counter[i]},\n`;
	}
	text = text + `\n`;
	for (let i = 0; i < logger.length; i++) {
		text = text + `${JSON.stringify(logger[i])},\n`;
	}
	let element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', 'log');

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

document.querySelector('.logger').addEventListener('dblclick', download);
// $('.logger').click(download);