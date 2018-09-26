import { Store } from '@ngrx/store';
import { Effect } from '@ngrx/effects';
import { ThreadsService } from './../threads.service';
import { switchMap, map, withLatestFrom, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { NewMessagesReceivedAction } from '../../store/actions';
import { ApplicationState } from '../../store/application-state';

@Injectable()
export class ServerNotificationEffectService{

	constructor( private threadService: ThreadsService, private store: Store<ApplicationState> ){

	}

	@Effect() newMessage$ = interval( 3000 ).pipe(
		withLatestFrom( this.store.select("uiState")),
		map(([any,uiState]) => uiState),
		filter((uiState:any) => uiState.userId),
		switchMap(uiState => this.threadService.loadNewMessagesForUser(uiState.userId)),
		withLatestFrom(this.store.select("uiState")),
		map(([unreadMessages, uiState]: [any, any]) =>  new NewMessagesReceivedAction({
            unreadMessages,
            currentThreadId: uiState.currentThreadId,
            currentUserId: uiState.userId
        }))

	)
}
