import { Message } from 'shared/model/message';
import { NewMessagesReceivedActionPayload } from './actions';
import { AllUserData } from './../../../shared/transfer-object/all-user-data';
import { Action } from "@ngrx/store";

export const USER_THREAD_ACTIONS_LOADED = 'USER_THREAD_ACTIONS_LOADED';
export const LOAD_USER_THREADS_ACTION = 'LOAD_USER_THREADS_ACTION';
export const THREAD_SELECTED_ACTION = 'THREAD_SELECTED_ACTION';
export const SELECT_USER_ACTION = 'SELECT_USER_ACTION';
export const SEND_NEW_MESSAGE_ACTION = 'SEND_NEW_MESSAGE_ACTION';
export const NEW_MESSAGES_RECEIVED_ACTION = 'NEW_MESSAGES_RECEIVED_ACTION';

export interface SendNewMessageActionPayload {
    text:string;
    threadId: number;
    participantId: number;
}


export interface NewMessagesReceivedActionPayload {
    unreadMessages: Message[];
    currentThreadId: number;
    currentUserId:number;
}

export class UserThreadsLoadedActions implements Action{
	readonly type = USER_THREAD_ACTIONS_LOADED;
	constructor( public payload?: AllUserData ){}
}

export class LoadUserThreadActions implements Action{
	readonly type = LOAD_USER_THREADS_ACTION;
	constructor( public  payload: number ){}
}


export class ThreadSelectedAction implements Action{
	readonly type = THREAD_SELECTED_ACTION;
	constructor( public payload?: number ){}
}

export class SelectUserAction implements Action{
	readonly type = SELECT_USER_ACTION;
	constructor( public payload?: number ){}

}

export class SendNewMessageAction implements Action{
	readonly type = SEND_NEW_MESSAGE_ACTION;
	constructor( public payload: SendNewMessageActionPayload ){}
}


export class NewMessagesReceivedAction implements Action {
    readonly type = NEW_MESSAGES_RECEIVED_ACTION;

    constructor(public payload?: NewMessagesReceivedActionPayload) {}
}
