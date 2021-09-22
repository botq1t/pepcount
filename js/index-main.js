import { dataBase } from './modules/dataBase.js';
import { createFirst, createLog, fillUpperStats } from './modules/cardsCreation.js';

console.log(dataBase);

$('.cards').empty().append('<div class="swiper-wrapper"></div>');
$('.cards').children().empty();
let i = 1;
const container = $('.cards').children().first();
for (let key in dataBase) {
	console.log(dataBase[key]);
	container.append(`<section id="card_${i}" class="cards__body swiper-slide"></section>`);
	const container2 = $(`#card_${i}`);

	createFirst(key, dataBase[key].timePassed, dataBase[key].timePassedString, dataBase[key].words, container2);

	createLog(container2, dataBase[key].log, i);
	i++;
}

$('.cards').append(`<div class="swiper-pagination content_swiper-pagination"></div>`);
$('.cards').append(`<div class="swiper-button-next content_swiper-button-next"></div>`);
$('.cards').append(`<div class="swiper-button-prev content_swiper-button-prev"></div>`);

let upperStats = [];

for (let key in dataBase) {
	upperStats.push(dataBase[key].words);
}

fillUpperStats(upperStats);


const sliders = {
	mainSwiper: new Swiper('.content__cards', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.content_swiper-pagination',
			type: 'fraction',
			// dynamicBullets: true,
			clickable: false,
		},

		// effect: 'coverflow',
		// coverflowEffect: {
		// 	rotate: 30,
		// 	slideShadows: false,
		// },
	}),
}