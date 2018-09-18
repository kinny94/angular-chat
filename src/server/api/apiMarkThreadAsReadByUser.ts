import {Application} from 'express';
import {Thread} from "../../../shared/model/thread";
var { dbThreads } = require('../db-data');
import * as _ from 'lodash';

module.exports = {
	apiUpdateThread: function(app: Application) {
		app.route('/api/threads/:id').patch((req, res) => {

		});
	}
}

