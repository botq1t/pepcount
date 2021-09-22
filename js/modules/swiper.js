const sliders = {
	mainSwiper: new Swiper('.content__cards', {
		pagination: {
			el: '.content__swiper-pagination',
			type: 'bullets',
			dynamicBullets: true,
			clickable: true,
		},
	}),

	secondSwiper: new Swiper('.cards__body', {
		direction: 'vertical',
		effect: 'flip',
		flipEffect: {
			slideShadows: false,
		},
	})
}

export const mainSwiper = sliders.mainSwiper;
export const secondSwiper = sliders.secondSwiper;