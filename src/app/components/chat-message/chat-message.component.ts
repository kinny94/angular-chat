import { Component, OnInit, Input } from '@angular/core';
import { MessageVM } from '../message-section/message-section.component';

@Component({
	selector: 'app-chat-message',
	templateUrl: './chat-message.component.html',
	styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

	constructor() { }

	@Input()
	message: MessageVM;
	ngOnInit() {
	}

}
