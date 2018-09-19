import { AllUserData } from './../../../shared/transfer-object/all-user-data';
import { Action } from "@ngrx/store";

export const LOAD_USER_THREADS_ACTION = 'LOAD_USER_THREADS_ACTION';

export class LoadUserThreadsActions implements Action{

	readonly type = LOAD_USER_THREADS_ACTION;

	constructor( public payload: AllUserData ){
	}
}
