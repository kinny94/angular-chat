import {Application} from 'express';
var { dbMessagesQueuePerUse, dbMessages, dbThreads } = require('../db-data');

module.exports = {
	apiMessageNotificationsPerUser: function(app: Application) {
		app.route('/api/notifications/messages').post((req, res) => {

		});
	}
}
