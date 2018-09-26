import { Message } from 'shared/model/message';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AllUserData } from './../../../shared/transfer-object/all-user-data';
import { SendNewMessageActionPayload } from '../store/actions';

@Injectable({
	providedIn: 'root'
})
export class ThreadsService {

	constructor( private http: HttpClient) { }

	loadUserThreads( userId: number ) : Observable<AllUserData>{

		return this.http.get<AllUserData>( '/api/threads', this.commonHttpHeaders( userId ) );
	}

	saveNewMessage( payload: SendNewMessageActionPayload ): Observable<any>{

		return this.http.post(
			`/api/threads/${ payload.threadId }`,
			{ text: payload.text },
			this.commonHttpHeaders( payload.participantId )
		)
	}

	loadNewMessagesForUser(userId:number): Observable<Message[]> {
        return this.http.post<Message[]>('/api/notifications/messages', null, this.commonHttpHeaders(userId));
    }

	commonHttpHeaders( userId: number ){
		const headers = new HttpHeaders({
			'userid':  userId.toString()
		});
		return { headers };
	}
}
