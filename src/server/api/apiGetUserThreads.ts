import { Participant } from './../../../shared/model/participant';
import { map } from 'rxjs/operators';
import {Application,Request,Response} from 'express';
import {AllUserData} from "../../../shared/transfer-object/all-user-data";
import { Message } from "../../../shared/model/message";
var { findDbThreadsPerUser } = require('./../persistence/findDbThreadsPerUser');
var _ = require('lodash');
var { dbMessages, dbParticipants } = require('../db-data' );

module.exports = {
	apiGetUserThreads : function(app:Application) {
		app.route('/api/threads').get((req: Request, res: Response) => {

			const participantId = req.headers['userid'];
			const threadsPerUser = findDbThreadsPerUser(participantId);

			let messages: Message[] = [],
			participantIds: string[] = [];

			threadsPerUser.forEach(thread => {

				const threadMessages: Message[] = _.filter(dbMessages, (message:any) => message.threadId == thread.id);

				messages = messages.concat(threadMessages);

				participantIds  = participantIds.concat(_.keys(thread.participants));

			});

			const participants: Participant[] = [];
			for( let i=0; i<participantIds.length; i++ ){
				if( participantIds[i] in dbParticipants ){
					if( participants.indexOf(  dbParticipants[ participantIds[i] ]) == -1 ){
						participants.push( dbParticipants[ participantIds[i] ]);
					}
				}
			}

			const response: AllUserData = {
				participants,
				messages,
				threads: threadsPerUser
			};

			res.status(200).json(response);
		});
	}
}
