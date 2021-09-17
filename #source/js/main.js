'use strict'

// ! ================= Initialization =================================

let parametersDefault = {
	timeBegin: 0,
	timePauseStart: 0,
	timePauseNow: 0,
	timePause: 0,
	timePassing: 0,
}

if (!localStorage['pepcount_parameters']) localStorage['pepcount_parameters'] = JSON.stringify(parametersDefault);
let parameters = JSON.parse(localStorage['pepcount_parameters']);
console.log('Parameters', parameters);

/*let counterDefault = [];

$('.card').each(function () {
	counterDefault.push(0);
});

if (!localStorage['pepcount_counter']) localStorage['pepcount_counter'] = JSON.stringify(counterDefault);
let counter = JSON.parse(localStorage['pepcount_counter']);
console.log('counter', counter);*/

if (!localStorage['pepcount_mode']) localStorage['pepcount_mode'] = 'stop';
console.log(localStorage);

let loggerDefault = [];

if (!localStorage['pepcount_logger']) localStorage['pepcount_logger'] = JSON.stringify(loggerDefault);
let logger = JSON.parse(localStorage['pepcount_logger']);

// @prepros-append "index/createCards.js"
// @prepros-append "index/body.js"
// @prepros-append "index/createLog.js"
// @prepros-append "index/functions.js"