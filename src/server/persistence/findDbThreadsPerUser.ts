import {Thread} from "../../../shared/model/thread";
var { dbThreads } = require('../db-data');
var _ = require('lodash');

module.exports = {
	findDbThreadsPerUser: function(participantId:number) {

		const allThreads: Thread[] = _.values(dbThreads);


		return _.filter(allThreads, thread =>
			_.includes( _.keys(thread.participants), participantId.toString() )
		)
	}
}
