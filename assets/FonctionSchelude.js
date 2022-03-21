const _schedule = require("node-schedule");


var boucle = function schedule() {

	_schedule.scheduleJob('*/2 * * * *', () => {
		console.log("2 min");
	});
}   

exports.boucle = boucle;