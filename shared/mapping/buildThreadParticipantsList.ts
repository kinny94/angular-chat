import { Thread } from 'shared/model/thread';
import { ApplicationState } from './../../src/app/store/application-state';
import * as _ from 'lodash';

 export const buildThreadParticipantsList = ( state: ApplicationState, thread: Thread ): string => {
	const names = _.keys( thread.participants ).map(
		participantId => state.storeData.participant[ participantId ].name
	);

	return _.join( names, ", ");
 }
