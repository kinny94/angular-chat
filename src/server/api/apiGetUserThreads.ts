import {Application,Request,Response} from 'express';
import {AllUserData} from "../../../shared/transfer-object/all-user-data";
import { Message } from "../../../shared/model/message";
var { findDbThreadsPerUser } = require('./../persistence/findDbThreadsPerUser');
var _ = require('lodash');
var { dbMessages, dbParticipants } = require('../db-data' );

module.exports = {
	apiGetUserThreads : function(app:Application) {
			app.route('/api/threads').get((req: Request, res: Response) => {

				const participantId = 1;

				const threadsPerUser = findDbThreadsPerUser(participantId);

				let messages: Message[] = [],
					participantIds: string[] = [];

				threadsPerUser.forEach(thread => {

					const threadMessages: Message[] = _.filter(dbMessages, (message:any) => message.threadId == thread.id);

					messages = messages.concat(threadMessages);

					participantIds  = participantIds.concat(_.keys(thread.participants));

				});

				const participants = _.uniq(participantIds.map( pId => {
					dbParticipants[pId] }
				));

				const response: AllUserData = {
				  participants,
				  messages,
					threads: threadsPerUser
				};

				res.status(200).json(response);
			});
	}
}
