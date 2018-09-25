import { SEND_NEW_MESSAGE_ACTION, SendNewMessageAction } from './../../store/actions';
import { Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { Action } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class WriteNewMessageEffecService{
	constructor( private actions$: Actions, private threadService: ThreadsService ){}

	@Effect({ dispatch: false }) newMessages$: Observable<any> = this.actions$.pipe(
		ofType<SendNewMessageAction>( SEND_NEW_MESSAGE_ACTION ),
		switchMap( action => this.threadService.saveNewMessage( action.payload ))
	)
}
