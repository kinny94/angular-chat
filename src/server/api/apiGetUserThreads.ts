import {Application,Request,Response} from 'express';
import {AllUserData} from "../../../shared/transfer-object/all-user-data";
var { findDbThreadsPerUser } = require('./../persistence/findDbThreadsPerUser');
import * as _ from 'lodash';
import {dbMessages, dbParticipants} from "../db-data";
import {Message} from "../../../shared/model/message";

module.exports = {
	apiGetUserThreads : function(app:Application) {
		app.route('/api/threads').get((req: Request, res: Response) => {

		});
	}
}
