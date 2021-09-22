const functions = {
	createFirst: function (title, timePassed, timePassedString, words, container) {
		container.append(`<div class="cards__first first"></div>`);
		container = container.children();

		container.append(`<h1 class="first__date">${title}</h1>`);
		container.append(`<div class="first__passed">За время: ${timePassedString}</div>`)
		container.append(`<main class="first__stats"></main>`);
		container = container.children().last();
		console.log(words);

		for (let key in words) {
			container.append(`<div class="first__item"></div>`);
			let container2 = container.children().last();

			container2.append(`<h2 class="first__title">${key}: ${words[key]}</h2>`);


			let freq = [(words[key] / timePassed)];
			freq[1] = freq[0] * 60;
			freq[2] = freq[1] * 60;
			container2.append(`<div class="first__freqency">${freq[0].toFixed(2)}/сек, ${freq[1].toFixed(2)}/мин, ${freq[2].toFixed(2)}/час</div>`)
		}
	},

	createLog: function (container, log, cardIndex) {
		console.log('============');
		console.log(container);
		console.log(log);

		let container2;
		let groupIndex = 1;
		for (let i = 0; i < log.length; i++) {
			let logger = log[i];
			if (i == 0 || log[i].time > (log[i - 1].time + 10)) {
				container.append(`<div data-hash="c-${cardIndex}_g-${groupIndex}" class="cards__item group"></div>`);
				container2 = container.children().last();
				container2.append(`<h3 class="group__title">Комбинация #${groupIndex}</h3>`);

				groupIndex++;
			}
			switch (logger.action) {
				case '+':
					container2.append(`<p><span class="group__time">[${logger.timeString}]</span><span class="group__meaning">${logger.meaning}</span><span class="group__number">#${logger.counter}</span></p>`);
					break;
				case 'start':
					container2.append(`<p><span class="group__time">[${logger.timeString}]</span><span class="group__meaning">Подсчёт начался!</span></p>`);
					break;
				case 'pause':
					container2.append(`<p><span class="group__time">[${logger.timeString}]</span><span class="group__meaning">Пауза!</span></p>`);
					break;
				case 'resume':
					container2.append(`<p><span class="group__time">[${logger.timeString}]</span><span class="group__meaning">Продолжаем!</span></p>`);
					break;
			}

		}
	},

	fillUpperStats: function (log) {
		let upperStats = {};
		for (let i = 0; i < log.length; i++) {
			for (let key in log[i]) {
				if (!upperStats[key]) upperStats[key] = 0;
				upperStats[key] = upperStats[key] + log[i][key];
			}
		}


		$('#stats').empty();
		for (let key in upperStats) {
			$('#stats').append(`${key}: <span class="stats__number">${upperStats[key]}</span>; `)
		}
		let correction = $('#stats').html();
		correction = correction.slice(0, -2);
		console.log(correction);
		$('#stats').html(correction);
	}
}

export const createFirst = functions.createFirst;
export const createLog = functions.createLog;
export const fillUpperStats = functions.fillUpperStats;