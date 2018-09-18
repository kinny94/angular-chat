import {Application} from 'express';
var _ = require('lodash');
import {Message} from "../../../shared/model/message";
var { dbMessages, dbMessagesQueuePerUser } = require('../db-data');
var { findThreadById } = require('./../persistence/findThreadById' );

module.exports = {
	apiSaveNewMessage: function(app: Application) {
		findThreadById();
		app.route('/api/threads/:id').post((req, res) => {

		});
	}
}

