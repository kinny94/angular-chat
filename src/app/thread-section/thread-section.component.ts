import { StoreData } from './../store/store-data';
import { UiState } from './../store/ui-state';
import { LoadUserThreadsActions } from './../store/actions';
import { ApplicationState } from './../store/application-state';
import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../services/threads.service';
import { Store } from '@ngrx/store';

export interface State {
	state: {
		uiState: UiState,
		storeData: StoreData
	}
}


@Component({
	selector: 'app-thread-section',
	templateUrl: './thread-section.component.html',
	styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

	userName: string;
	constructor(
		private threadsService: ThreadsService,
		private store: Store<State>
	) {
		store.subscribe( store =>  {
			console.log( store.state );
		});
	}

	ngOnInit() {
		this.threadsService.loadUserThreads()
		.subscribe(
			allUserData => {
				this.store.dispatch( new LoadUserThreadsActions( allUserData ));
			}
		);
	}
}
