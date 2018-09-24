import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AllUserData } from './../../../shared/transfer-object/all-user-data';

@Injectable({
	providedIn: 'root'
})
export class ThreadsService {

	constructor( private http: HttpClient) { }

	loadUserThreads( userId: number ) : Observable<AllUserData>{
		const headers = new HttpHeaders({
			'userid':  userId.toString()
		});
		return this.http.get<AllUserData>( '/api/threads', { headers } );
	}
}
