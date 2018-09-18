import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadsService } from './services/threads.service';

@NgModule({
	declarations: [
		AppComponent,
		UserSelectionComponent,
		ThreadSectionComponent,
		MessageSectionComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule
	],
	providers: [
		ThreadsService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
