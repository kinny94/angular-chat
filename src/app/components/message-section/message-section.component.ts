import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UiState } from './../../store/ui-state';
import { messageParticipantNamesSelector } from './messageParticipantSelector';
import { ApplicationState } from './../../store/application-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { messageSelector } from '../thread-list/messageSelector';
import { SendNewMessageAction } from '../../store/actions';

export interface MessageVM {
    id:number;
    text:string;
    participantName:string;
    timestamp: number;
}

@Component({
	selector: 'app-message-section',
	templateUrl: './message-section.component.html',
	styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {

	participantName$: Observable<string>;
	messages$: Observable<MessageVM[]>;
	uiState: UiState;

	constructor( private store: Store<ApplicationState>) {}

	ngOnInit() {

		this.store.select( messageParticipantNamesSelector ).pipe(
			map( data => {
				if( !data ){
					this.participantName$ = of('Select a thread!');
				}else{
					this.participantName$ = of( data );
				}
			})
		).subscribe();

		this.store.select( messageSelector ).pipe(
			map( data => {
				if( data ){
					this.messages$ = of( data );
				}
			})
		).subscribe();

		this.store.subscribe( state => this.uiState = Object.assign({}, state.uiState ));
	}

	onNewMessage( input : any ){
		this.store.dispatch( new SendNewMessageAction({ text: input.value, threadId: this.uiState.currentThread, participantId: this.uiState.userId }));
		input.value = '';
	}
}
