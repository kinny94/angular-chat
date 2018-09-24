import { Message } from 'shared/model/message';
import { MessageVM } from '../message-section/message-section.component';
import { ApplicationState } from '../../store/application-state';
import * as _ from 'lodash';

export function messageSelector( state: ApplicationState ): MessageVM[]{
	const currentThreadId = state.uiState.currentThread;

	if( !currentThreadId ){
		return [];
	}

	const messageIds = state.storeData.threads[ state.uiState.currentThread ].messageIds;
	const messages = messageIds.map( messageId => state.storeData.messages[ messageId ]);
	return messages.map(_.partial( mapMessageToMessageVM, state ));
}

function mapMessageToMessageVM( state: ApplicationState, message: Message ): MessageVM{
	return {
		id: message.id,
		text: message.text,
		timestamp: message.timestamp,
		participantName: state.storeData.participant[ message.participantId ].name
	}
}
