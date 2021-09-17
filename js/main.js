'use strict'
let parametersDefault = {
	timeBegin: 0,
	timePauseStart: 0,
	timePauseNow: 0,
	timePause: 0,
	timePassing: 0,
}

if (!localStorage['parameters']) localStorage['parameters'] = JSON.stringify(parametersDefault);
let parameters = JSON.parse(localStorage['parameters']);
console.log('Parameters', parameters);

let counterDefault = [];

$('.card').each(function () {
	counterDefault.push(0);
});

if (!localStorage['counter']) localStorage['counter'] = JSON.stringify(counterDefault);
let counter = JSON.parse(localStorage['counter']);
console.log('counter', counter);

if (!localStorage['mode']) localStorage['mode'] = 'stop';
console.log(localStorage);

let loggerDefault = [];

if (!localStorage['logger']) localStorage['logger'] = JSON.stringify(loggerDefault);
let logger = JSON.parse(localStorage['logger']);

let timeCurrent;
let timePassing;
let intervalTimer, intervalPause;

setCardsOrder(counter);
checkMode(localStorage['mode']);
displayLogger('launch');
setCounter();

$('.main__button_start').click(function () {
	localStorage['mode'] = 'start';
	timer();
	parameters.timeBegin = timeCurrent;
	localStorage['parameters'] = JSON.stringify(parameters);
	checkMode(localStorage['mode']);

	logger.push({
		time: timeCurrent,
		timeString: getTimeString(timeCurrent),
		meaning: 'start',
		action: 'start',
	});
	localStorage['logger'] = JSON.stringify(logger);
	console.log('logger', logger);
	$('.logger').empty();
	displayLogger('now');
});

$('.main__button_pause').click(function () {
	switch ($(this).html()) {
		case 'Пауза':
			localStorage['mode'] = 'pause';
			parameters.timePauseStart = timeCurrent;
			parameters.timePassing = timeCurrent - parameters.timeBegin - parameters.timePauseNow;
			localStorage['parameters'] = JSON.stringify(parameters);

			logger.push({
				time: timeCurrent,
				timeString: getTimeString(timeCurrent),
				meaning: 'pause',
				action: 'pause',
			});
			localStorage['logger'] = JSON.stringify(logger);
			console.log('logger', logger);
			displayLogger('now');
			break;
		case 'Продолжить':
			localStorage['mode'] = 'start';
			parameters.timePauseStart = 0;
			parameters.timePause = parameters.timePauseNow;
			localStorage['parameters'] = JSON.stringify(parameters);

			logger.push({
				time: timeCurrent,
				timeString: getTimeString(timeCurrent),
				meaning: 'resume',
				action: 'resume',
			});
			localStorage['logger'] = JSON.stringify(logger);
			console.log('logger', logger);
			displayLogger('now');
			break;
	}

	checkMode(localStorage['mode']);
});

$('.main__button_end').click(function () {
	localStorage['mode'] = 'stop';

	checkMode(localStorage['mode']);
	setCounter();
});
// ? ===================== Plus =======================
$('.card__button_plus').click(function () {
	let id = $(this).parent().parent().attr('id');
	id = id.split('_')[1];
	counter[id]++;
	localStorage['counter'] = JSON.stringify(counter);
	console.log(id);
	setCounter(id);

	logger.push({
		time: timeCurrent,
		counter: counter[id],
		timeString: getTimeString(timeCurrent),
		meaning: $(this).parent().prev().prev().html(),
		action: '+',
	});
	localStorage['logger'] = JSON.stringify(logger);
	displayLogger('now');
});

$('.card__displayer').click(function () {
	let id = $(this).parent().parent().attr('id');
	id = id.split('_')[1];
	counter[id]++;
	localStorage['counter'] = JSON.stringify(counter);
	console.log(id);
	setCounter(id);

	logger.push({
		time: timeCurrent,
		counter: counter[id],
		timeString: getTimeString(timeCurrent),
		meaning: $(this).parent().prev().prev().html(),
		action: '+',
	});
	localStorage['logger'] = JSON.stringify(logger);
	displayLogger('now');
});

$('.card__title').click(function () {
	let id = $(this).parent().attr('id');
	id = id.split('_')[1];
	counter[id]++;
	localStorage['counter'] = JSON.stringify(counter);
	console.log(id);
	setCounter(id);

	logger.push({
		time: timeCurrent,
		counter: counter[id],
		timeString: getTimeString(timeCurrent),
		meaning: $(this).html(),
		action: '+',
	});
	localStorage['logger'] = JSON.stringify(logger);
	displayLogger('now');
});

$('.card__frequency').click(function () {
	let id = $(this).parent().attr('id');
	id = id.split('_')[1];
	counter[id]++;
	localStorage['counter'] = JSON.stringify(counter);
	console.log(id);
	setCounter(id);

	logger.push({
		time: timeCurrent,
		counter: counter[id],
		timeString: getTimeString(timeCurrent),
		meaning: $(this).prev().html(),
		action: '+',
	});
	localStorage['logger'] = JSON.stringify(logger);
	displayLogger('now');
});
// ? =================================================

$('.card__button_minus').click(function () {
	let id = $(this).parent().parent().attr('id');
	id = id.split('_')[1];
	if (counter[id] == 0) return;

	counter[id]--;
	localStorage['counter'] = JSON.stringify(counter);
	console.log(id);
	setCounter(id);

	let meaning = $(this).parent().prev().prev().html();
	for (let i = logger.length - 1; i >= 0; i--) {
		if (logger[i]['meaning'] == meaning) {
			logger.splice(i, 1);
			break;
		}
	}
	/*logger.push({
		time: timeCurrent,
		counter: counter[id],
		timeString: getTimeString(timeCurrent),
		meaning: $(this).parent().prev().prev().html(),
		action: '-',
	});*/
	localStorage['logger'] = JSON.stringify(logger);
	displayLogger('launch');
});


function checkMode(mode) {
	switch (mode) {
		case 'stop':
			localStorage['parameters'] = JSON.stringify(parametersDefault);
			localStorage['counter'] = JSON.stringify(counterDefault);
			localStorage['logger'] = JSON.stringify(loggerDefault);
			parameters = JSON.parse(localStorage['parameters']);
			counter = JSON.parse(localStorage['counter']);
			logger = JSON.parse(localStorage['logger']);
			clearInterval(intervalTimer);
			clearInterval(intervalPause);
			$('.main__start').css('display', 'flex');
			break;
		case 'start':
			$('.main__start').css('display', 'none');
			$('.main__button_end').css('display', 'none');
			$('.main__button_pause').html('Пауза');
			$('.timer__begin').children('span').html(getTimeString(parameters.timeBegin));

			timer();
			intervalTimer = setInterval(timer, 1000);
			clearInterval(intervalPause);
			break;
		case 'pause':
			$('.main__start').css('display', 'none');
			$('.main__button_end').css('display', 'flex');
			$('.main__button_pause').html('Продолжить');
			$('.timer__begin').children('span').html(getTimeString(parameters.timeBegin));
			$('.timer__passing').children('span').html(getTimeString(parameters.timePassing));

			getPause();
			timer();
			getFrequency(parameters.timePassing);
			intervalPause = setInterval(getPause, 500);
			intervalTimer = setInterval(timer, 1000);
			break;

	}
}

function timer() {
	let date = new Date();
	timeCurrent = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
	timePassing = timeCurrent - parameters.timeBegin - parameters.timePauseNow;
	if (localStorage['mode'] == 'start') {
		$('.timer__passing').children('span').html(getTimeString(timePassing));
		getFrequency(timePassing);
	}
}

function getTimeString(time) {
	let timeString = '';
	let hours = Math.floor(time / 3600);
	let minutes = Math.floor((time - hours * 3600) / 60);
	let seconds = Math.floor(time - hours * 3600 - minutes * 60);

	if (hours < 10) timeString = timeString + '0';
	timeString = timeString + `${hours}:`;
	if (minutes < 10) timeString = timeString + '0';
	timeString = timeString + `${minutes}:`;
	if (seconds < 10) timeString = timeString + '0';
	timeString = timeString + `${seconds}`;
	return timeString;
}

function getPause() {
	parameters.timePauseNow = parameters.timePause + (timeCurrent - parameters.timePauseStart);
}

function setCounter(id) {
	if (!id) {
		$('.card').each(function () {
			let id = $(this).attr('id');
			id = id.split('_')[1];
			$(this).children('.card__controls').children('.card__displayer').html(counter[id]);
		})
	} else {
		$(`#card_${id}`).children('.card__controls').children('.card__displayer').html(counter[id]);
	}
}

function getFrequency(time) {
	$('.card').each(function () {
		let id = $(this).attr('id');
		id = id.split('_')[1];
		let freq = {
			h: 0,
			m: 0,
			s: 0,
		};
		freq.s = counter[id] / time;
		freq.m = freq.s * 60;
		freq.h = freq.m * 60;


		// console.log(freq);
		$(this).children('.frequency').children('.freq-hour').children('span').html(freq.h.toFixed(2));
		$(this).children('.frequency').children('.freq-minute').children('span').html(freq.m.toFixed(2));
		$(this).children('.frequency').children('.freq-second').children('span').html(freq.s.toFixed(2));
	});
}

function displayLogger(mode) {
	let j, group;
	switch (mode) {
		case 'launch':
			$('.logger').empty();
			j = 1;
			$('.logger').prepend('<div class="logger__group" id="logger_1"></div>');
			group = $(`#logger_${j}`);
			group.addClass('logger__group_green');
			group.prepend(`<div class="logger__background">${j}</div>`)

			for (let i = 0; i < logger.length; i++) {
				if (i > 0 && (logger[i].time - logger[i - 1].time) >= 10) {
					j++;
					$('.logger').prepend(`<div class="logger__group" id="logger_${j}"></div>`);
					group = $(`#logger_${j}`);
					if (j % 2) {
						group.addClass('logger__group_green');
					} else {
						group.addClass('logger__group_yellow');
					}
					group.prepend(`<div class="logger__background">${j}</div>`);

					// $('.logger').prepend('<p class="logger__spacing"></p>');
				}

				addLogger(i, group);
				/*switch (logger[i].action) {
					case '+':
						// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> ${logger[i].meaning} (добавлено) <span class="logger__blue">[${logger[i].counter}]</span></p>`)
						group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> ${logger[i].meaning} (добавлено) <span class="logger__blue">[${logger[i].counter}]</span></p>`)
						break;
					// case '-':
					// 	$('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> ${logger[i].meaning} (Убрано) <span class="logger__blue">[${logger[i].counter}]</span></p>`)
					// 	break;
					case 'start':
						// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Отсчёт начался</span></p>`)
						group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Отсчёт начался</span></p>`)
						break;
					case 'pause':
						// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Пауза</span></p>`)
						group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Пауза</span></p>`)
						break;
					case 'resume':
						// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Продолжение отсчёта</span></p>`)
						group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Продолжение отсчёта</span></p>`)
						break;
				}*/
			}
			break;
		case 'now':
			let i = logger.length - 1;

			if (i == 0) {
				j = 1;
				$('.logger').prepend(`<div class="logger__group" id="logger_${j}"></div>`);
				group = $(`#logger_${j}`);
				group.addClass('logger__group_green');
				group.prepend(`<div class="logger__background">${j}</div>`)

			} else {
				j = $('.logger__group').first().attr('id');
				j = j.split('_')[1];
				group = $(`#logger_${j}`);
			}

			if (i > 0 && (logger[i].time - logger[i - 1].time) >= 10) {
				// $('.logger').prepend('<p class="logger__spacing"></p>');
				j++;
				$('.logger').prepend(`<div class="logger__group" id="logger_${j}"></div>`);
				group = $(`#logger_${j}`);
				if (j % 2) {
					group.addClass('logger__group_green');
				} else {
					group.addClass('logger__group_yellow');
				}
				group.prepend(`<div class="logger__background">${j}</div>`);

			}

			addLogger(i, group);
			/*switch (logger[i].action) {
				case '+':
					// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> ${logger[i].meaning} (добавлено) <span class="logger__blue">[${logger[i].counter}]</span></p>`)
					group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> ${logger[i].meaning} (добавлено) <span class="logger__blue">[${logger[i].counter}]</span></p>`)
					break;
				// case '-':
				// 	$('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> ${logger[i].meaning} (Убрано) <span class="logger__blue">[${logger[i].counter}]</span></p>`)
				// 	break;
				case 'start':
					// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Отсчёт начался</span></p>`)
					group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Отсчёт начался</span></p>`)
					break;
				case 'pause':
					// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Пауза</span></p>`)
					group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Пауза</span></p>`)
					break;
				case 'resume':
					// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Продолжение отсчёта</span></p>`)
					group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Продолжение отсчёта</span></p>`)
					break;
			}*/
			break;
	}
}

function addLogger(i, group) {
	switch (logger[i].action) {
		case '+':
			// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> ${logger[i].meaning} <span class="logger__blue">[${logger[i].counter}]</span></p>`)
			group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> ${logger[i].meaning} <span class="logger__blue">[${logger[i].counter}]</span></p>`)
			break;
		/*case '-':
			$('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> ${logger[i].meaning} (Убрано) <span class="logger__blue">[${logger[i].counter}]</span></p>`)
			break;*/
		case 'start':
			// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Отсчёт начался</span></p>`)
			group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Отсчёт начался</span></p>`)
			break;
		case 'pause':
			// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Пауза</span></p>`)
			group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Пауза</span></p>`)
			break;
		case 'resume':
			// $('.logger').prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Продолжение отсчёта</span></p>`)
			group.prepend(`<p><span class="logger__time">[${logger[i].timeString}]</span> <span class="logger__blue">Продолжение отсчёта</span></p>`)
			break;
	}
}

function setCardsOrder(input) {
	for (let i = 0; i < input.length; i++) {
		let order = input[i];
		$(`#card_${i}`).css('order', `${-order}`);
	}
}

