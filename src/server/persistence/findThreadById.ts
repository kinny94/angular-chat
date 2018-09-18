var { dbThreads } = require('../db-data');
import {Thread} from "../../../shared/model/thread";
var _ = require('lodash');
module.exports = {
 	findThreadById: function(threadId:number) {

		const threads: Thread[] = <any> _.values(dbThreads);
		return _.find(threads,thread => thread.id === threadId);
	}
}
