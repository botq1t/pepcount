// ! ========================= Main code ========================================

let timeCurrent;
let timePassing;
let intervalTimer, intervalPause;

// setCardsOrder(counter);
checkMode(localStorage['pepcount_mode']);
displayLogger('launch');
setCounter();

// ? ========================= Start ========================================

$('.main__button_start').click(function () {
	localStorage['pepcount_mode'] = 'start';
	timer();
	parameters.timeBegin = timeCurrent;
	localStorage['pepcount_parameters'] = JSON.stringify(parameters);
	checkMode(localStorage['pepcount_mode']);

	logger.push({
		time: timeCurrent,
		timeString: getTimeString(timeCurrent),
		meaning: 'start',
		action: 'start',
	});
	localStorage['pepcount_logger'] = JSON.stringify(logger);
	console.log('logger', logger);
	$('.logger').empty();
	displayLogger('now');
});

// ? ========================= Pause ========================================

$('.main__button_pause').click(function () {
	switch ($(this).html()) {
		case 'Пауза':
			localStorage['pepcount_mode'] = 'pause';
			parameters.timePauseStart = timeCurrent;
			parameters.timePassing = timeCurrent - parameters.timeBegin - parameters.timePauseNow;
			localStorage['pepcount_parameters'] = JSON.stringify(parameters);

			logger.push({
				time: timeCurrent,
				timeString: getTimeString(timeCurrent),
				meaning: 'pause',
				action: 'pause',
			});
			localStorage['pepcount_logger'] = JSON.stringify(logger);
			console.log('logger', logger);
			displayLogger('now');
			break;
		case 'Продолжить':
			localStorage['pepcount_mode'] = 'start';
			parameters.timePauseStart = 0;
			parameters.timePause = parameters.timePauseNow;
			localStorage['pepcount_parameters'] = JSON.stringify(parameters);

			logger.push({
				time: timeCurrent,
				timeString: getTimeString(timeCurrent),
				meaning: 'resume',
				action: 'resume',
			});
			localStorage['pepcount_logger'] = JSON.stringify(logger);
			console.log('logger', logger);
			displayLogger('now');
			break;
	}

	checkMode(localStorage['pepcount_mode']);
});

// ? ========================= End ========================================

$('.main__button_end').click(function () {
	localStorage['pepcount_mode'] = 'stop';

	checkMode(localStorage['pepcount_mode']);
	setCounter();
});
// ? ===================== Plus =======================
$('.card__button_plus').click(function () {
	let id = $(this).parent().parent().attr('id');
	id = id.split('_')[1];
	counter[id]++;
	localStorage['pepcount_counter'] = JSON.stringify(counter);
	console.log(id);
	setCounter(id);

	logger.push({
		time: timeCurrent,
		counter: counter[id],
		timeString: getTimeString(timeCurrent),
		meaning: $(this).parent().prev().prev().html(),
		action: '+',
	});
	localStorage['pepcount_logger'] = JSON.stringify(logger);
	displayLogger('now');
});

$('.card__displayer').click(function () {
	let id = $(this).parent().parent().attr('id');
	id = id.split('_')[1];
	counter[id]++;
	localStorage['pepcount_counter'] = JSON.stringify(counter);
	console.log(id);
	setCounter(id);

	logger.push({
		time: timeCurrent,
		counter: counter[id],
		timeString: getTimeString(timeCurrent),
		meaning: $(this).parent().prev().prev().html(),
		action: '+',
	});
	localStorage['pepcount_logger'] = JSON.stringify(logger);
	displayLogger('now');
});

$('.card__title').click(function () {
	let id = $(this).parent().attr('id');
	id = id.split('_')[1];
	counter[id]++;
	localStorage['pepcount_counter'] = JSON.stringify(counter);
	console.log(id);
	setCounter(id);

	logger.push({
		time: timeCurrent,
		counter: counter[id],
		timeString: getTimeString(timeCurrent),
		meaning: $(this).html(),
		action: '+',
	});
	localStorage['pepcount_logger'] = JSON.stringify(logger);
	displayLogger('now');
});

$('.card__frequency').click(function () {
	let id = $(this).parent().attr('id');
	id = id.split('_')[1];
	counter[id]++;
	localStorage['pepcount_counter'] = JSON.stringify(counter);
	console.log(id);
	setCounter(id);

	logger.push({
		time: timeCurrent,
		counter: counter[id],
		timeString: getTimeString(timeCurrent),
		meaning: $(this).prev().html(),
		action: '+',
	});
	localStorage['pepcount_logger'] = JSON.stringify(logger);
	displayLogger('now');
});

// ? ===================== Minus =======================

$('.card__button_minus').click(function () {
	let id = $(this).parent().parent().attr('id');
	id = id.split('_')[1];
	if (counter[id] == 0) return;

	counter[id]--;
	localStorage['pepcount_counter'] = JSON.stringify(counter);
	console.log(id);
	setCounter(id);

	let meaning = $(this).parent().prev().prev().html();
	for (let i = logger.length - 1; i >= 0; i--) {
		if (logger[i]['meaning'] == meaning) {
			logger.splice(i, 1);
			break;
		}
	}

	localStorage['pepcount_logger'] = JSON.stringify(logger);
	displayLogger('launch');
});