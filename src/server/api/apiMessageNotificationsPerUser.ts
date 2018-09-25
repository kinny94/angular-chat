import {Application} from 'express';
var { dbMessagesQueuePerUser, dbMessages } = require('../db-data');

module.exports = {
	apiMessageNotificationsPerUser: function(app: Application) {
		app.route('/api/notifications/messages').post((req, res) => {

			const participantId = req.headers['userid'];

			if (!participantId) {
				res.status(200).json({payload:[]});
				return;
			}

			const unreadMessageIds = dbMessagesQueuePerUser[parseInt( participantId.toString() )];

			const unreadMessages = unreadMessageIds.map( messageId => dbMessages[messageId] );

			dbMessagesQueuePerUser[parseInt( participantId.toString() )] = [];

			res.status(200).json({payload: unreadMessages});

		});
	}
}
