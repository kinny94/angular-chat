import { AllUserData } from './../../../shared/transfer-object/all-user-data';
import { Action } from "@ngrx/store";

export const USER_THREAD_ACTIONS_LOADED = 'USER_THREAD_ACTIONS_LOADED';
export const LOAD_USER_THREADS_ACTION = 'LOAD_USER_THREADS_ACTION';

export class UserThreadsLoadedActions implements Action{

	readonly type = USER_THREAD_ACTIONS_LOADED;

	constructor( public payload: AllUserData ){
	}
}

export class LoadUserThreadActions implements Action{

	readonly type = "LOAD_USER_THREADS_ACTION";

}
