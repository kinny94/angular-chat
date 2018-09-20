import { ApplicationState } from './../../store/application-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-message-section',
	templateUrl: './message-section.component.html',
	styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {

	constructor( private store: Store<ApplicationState>) {
		store.subscribe();
	}

	ngOnInit() {
	}

}
