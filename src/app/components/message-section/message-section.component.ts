import { messageParticipantNamesSelector } from './messageParticipantSelector';
import { ApplicationState } from './../../store/application-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { messageSelector } from './messageSelector';

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

	constructor( private store: Store<ApplicationState>) {}

	ngOnInit() {
		this.participantName$ = this.store.select( messageParticipantNamesSelector );
		this.messages$ = this.store.select( messageSelector );
	}

}
