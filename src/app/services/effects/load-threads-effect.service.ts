import { LOAD_USER_THREADS_ACTION, UserThreadsLoadedActions } from './../../store/actions';
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

	constructor( private actions$: Actions, private threadService: ThreadsService) {

	}

	@Effect() userThreads$: Observable<Action> = this.actions$.pipe(
		ofType( LOAD_USER_THREADS_ACTION ),
		tap( val => console.log( "action received", val )),
		switchMap(() => this.threadService.loadUserThreads()),
		map( allUserData => new UserThreadsLoadedActions( allUserData ))
	)
}
