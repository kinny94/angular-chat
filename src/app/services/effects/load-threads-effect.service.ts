import { LOAD_USER_THREADS_ACTION, UserThreadsLoadedActions, SELECT_USER_ACTION, LoadUserThreadActions, SelectUserAction } from './../../store/actions';
import { ThreadsService } from './../threads.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable({
	providedIn: 'root'
})
export class LoadThreadsEffectService {

	constructor( private actions$: Actions, private threadService: ThreadsService) {}

	@Effect() userThreads$: Observable<Action> = this.actions$.pipe(
		ofType<LoadUserThreadActions>( LOAD_USER_THREADS_ACTION ),
		tap( val => console.log( "action received", val )),
		switchMap( action => this.threadService.loadUserThreads( action.payload )),
		map( allUserData => new UserThreadsLoadedActions( allUserData ))
	)

	@Effect() newUserSelected$: Observable<Action> = this.actions$.pipe(
		ofType<SelectUserAction>( SELECT_USER_ACTION ),
		tap( val => console.log( "New User selected", val )),
		map( action => new LoadUserThreadActions( action.payload ))
	)
}
