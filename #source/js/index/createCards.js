let words = [
	'Значиць',
	'Повторение',
	'В принципе да',
	'Кхе',
	'Внимание',
	'Это самое',
	'Скажем',
	'То есть',
	'Вот',
];

let counterDefault = [];

for (let i = 0; i < words.length; i++) {
	$('.main__content').append(`
		<div id="card_${i}" class="main__card card">
			<h2 class="card__title">${words[i]}</h2>
			<div class="card__frequency frequency">
				<p class="freq-hour"><span>0</span>/ч</p>
				<p class="freq-minute"><span>0</span>/м</p>
				<p class="freq-second"><span>0</span>/с</p>
			</div>
			<div class="card__controls">
				<div class="card__button card__button_plus">+</div>
				<div class="card__displayer">0</div>
				<div class="card__button card__button_minus">-</div>
			</div>
		</div>
	`);

	counterDefault.push(0);
}

if (!localStorage['pepcount_counter']) localStorage['pepcount_counter'] = JSON.stringify(counterDefault);
let counter = JSON.parse(localStorage['pepcount_counter']);
console.log('counter', counter);


