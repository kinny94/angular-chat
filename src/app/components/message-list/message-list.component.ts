import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MessageVM } from '../message-section/message-section.component';
import * as _ from 'lodash';

@Component({
	selector: 'app-message-list',
	templateUrl: './message-list.component.html',
	styleUrls: ['./message-list.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements OnInit, OnChanges {

	@Input()
	messages: MessageVM[] = [];

	@ViewChild('list')
	list: ElementRef;

	constructor() { }

	ngOnInit() {
	}

	ngOnChanges( changes: SimpleChanges ){
		if( changes){
			const previousMessages = changes['messages'].previousValue;
			const newMessages = changes['messages'].currentValue;
			if( previousMessages && newMessages.length > previousMessages.length ){
				setTimeout(() => {
					this.scrollLastMessageIntoView();
				});
			}
		}
	}

	scrollLastMessageIntoView(){
		const items = this.list.nativeElement.querySelectorAll('li');
		const lastItem: any = _.last( items );
		if( lastItem ){
			lastItem.scrollIntoView();
		}
	}
}
