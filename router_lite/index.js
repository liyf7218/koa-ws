/* Main application routes */
const path = require('path');
const fs = require('fs');

let router = function(app) {
	let { db } = app.context;
	console.log('db',db)
};

export default router;
module.exports = router;