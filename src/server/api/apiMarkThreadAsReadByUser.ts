import {Application} from 'express';
import {Thread} from "../../../shared/model/thread";
var { dbThreads } = require('../db-data');
var _ = require('lodash');

module.exports = {
	apiUpdateThread: function(app: Application) {
		app.route('/api/threads/:id').patch((req, res) => {

			const participantId = req.headers['userid'];

			const threadId = req.params['id'];

			const updatedProps = req.body;

			const allThreads: Thread[] = <any> _.values(dbThreads);

			const thread = _.find(allThreads, thread =>  thread.id == threadId );

			if (updatedProps.hasOwnProperty('read')) {
				thread.participants[parseInt( participantId.toString() )] = 0;
			}

			res.status(200).send();

		});
	}
}

