let time, date, passed, passedInSeconds;
localStorage['start'] = localStorage['start'] ?? 'false';
localStorage['stop'] = localStorage['stop'] ?? 'false';
localStorage['card-1'] = localStorage['card-1'] ?? 0;
localStorage['card-2'] = localStorage['card-2'] ?? 0;
localStorage['card-3'] = localStorage['card-3'] ?? 0;

getTime();
setInterval(getTime, 500);

if (localStorage['start'] == 'true') {
	setBeginTimer();

	displayCounter('card-1');
	displayCounter('card-2');
	displayCounter('card-3');
	updateFrequency('card-1');
	updateFrequency('card-2');
	updateFrequency('card-3');
	updateTimer();
	setInterval(updateTimer, 1000);
	setInterval(updateFrequency, 1000, 'card-1');
	setInterval(updateFrequency, 1000, 'card-2');
	setInterval(updateFrequency, 1000, 'card-3');
} else {
	localStorage['beginTimer'] = null;
	localStorage['card-1'] = 0;
	localStorage['card-2'] = 0;
	localStorage['card-3'] = 0;
}
checkStart()

$('.main__button_start').click(function () {
	localStorage['start'] = 'true';
	localStorage['beginTimer'] = time;
	console.log('click start', localStorage['start']);
	$('.main__button_end').html('Закончить подсчёт!');

	setBeginTimer();

	displayCounter('card-1');
	displayCounter('card-2');
	displayCounter('card-3');

	updateTimer();
	setInterval(updateTimer, 1000);
	setInterval(updateFrequency, 1000, 'card-1');
	setInterval(updateFrequency, 1000, 'card-2');
	setInterval(updateFrequency, 1000, 'card-3');
	checkStart();
})

$('.main__button_end').click(function () {
	localStorage['start'] = 'false';
	console.log('click end', localStorage['start']);
	$(this).fadeOut(300);
	// checkStart();
})
// ? ======================================= Card 1 ==========================================
$('#card-1').children('.card__controls').children('.card__button_plus').click(function () {
	setCardPlus('card-1');
})
$('#card-1').children('.card__controls').children('.card__button_minus').click(function () {
	setCardMinus('card-1');
})

// ? ======================================= Card 2 ==========================================
$('#card-2').children('.card__controls').children('.card__button_plus').click(function () {
	setCardPlus('card-2');
})
$('#card-2').children('.card__controls').children('.card__button_minus').click(function () {
	setCardMinus('card-2');
})
// ? ======================================= Card 3 ==========================================
$('#card-3').children('.card__controls').children('.card__button_plus').click(function () {
	setCardPlus('card-3');
})
$('#card-3').children('.card__controls').children('.card__button_minus').click(function () {
	setCardMinus('card-3');
})
// ! ====================== Functions =====================================
function getTime() {
	date = new Date();
	time = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

}

function checkStart() {
	if (localStorage['start'] == "true") {
		$('.main__start').fadeOut(300);
		$('.card').css('display', 'flex');
		$('.main__controls').css('display', 'flex');
	} else {
		$('.main__start').fadeIn(300, function () {
			$(this).css('display', 'flex')
		});
		$('.card').css('display', 'none');
		$('.main__controls').css('display', 'none');
	}
}

function setBeginTimer() {
	let timer = getHMS(localStorage['beginTimer']);
	timer = getTimeString(timer['hours'], timer['minutes'], timer['seconds']);
	$('.timer__begin').children('span').html(timer);
}

function updateTimer() {
	if (localStorage['start'] == 'false') {
		passed = localStorage['passed'];
	} else {
		passed = time - localStorage['beginTimer'];
		localStorage['passed'] = passed;
	}
	passedInSeconds = passed;
	passed = getHMS(passed);
	let output = $('.timer__passing').children('span');
	output.empty();
	if (passed['hours'] > 0) {
		output.append(`${passed['hours']} ч, ${passed['minutes']} мин, ${passed['seconds']} сек`);
	} else if (passed['minutes'] > 0) {
		output.append(`${passed['minutes']} мин, ${passed['seconds']} сек`);

	} else {
		output.append(`${passed['seconds']} сек`);
	}
}

function setCardPlus(card) {
	localStorage[card]++;
	displayCounter(card);
}

function setCardMinus(card) {
	localStorage[card]--;
	displayCounter(card);
}

function displayCounter(card) {
	$(`#${card}`).children('.card__displayer').html(localStorage[card]);
}

function updateFrequency(card) {
	let frequency = $(`#${card}`).children('.frequency');
	let sec = localStorage[card] / passedInSeconds;

	frequency.children('.freq-second').children('span').html(sec.toFixed(2));
	frequency.children('.freq-minute').children('span').html((sec * 60).toFixed(2));
	frequency.children('.freq-hour').children('span').html((sec * 3600).toFixed(2));

}

function getHMS(time) {
	var time;
	var output = {
		'hours': 0,
		'minutes': 0,
		'seconds': 0
	}
	output['hours'] = Math.floor(time / 3600);
	output['minutes'] = Math.floor((time - (output['hours'] * 3600)) / 60);
	output['seconds'] = time - (output['hours'] * 3600) - (output['minutes'] * 60);
	return output;
}

function getTimeString(h, m, s) {
	var h, m, s;
	var timeString = ''
	if (h < 10) { timeString = timeString + '0' }
	timeString = timeString + h + ':';
	if (m < 10) { timeString = timeString + '0' }
	timeString = timeString + m + ':';
	if (s < 10) { timeString = timeString + '0' }
	timeString = timeString + s;
	return timeString;
}