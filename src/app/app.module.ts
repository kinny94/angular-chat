import { MaterialModule } from './material-module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './components/user-selection/user-selection.component';
import { ThreadSectionComponent } from './components/thread-section/thread-section.component';
import { MessageSectionComponent } from './components/message-section/message-section.component';
import { ThreadsService } from './services/threads.service';
import { reducers } from './store/reducers';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { EffectsModule } from '@ngrx/effects';
import { LoadThreadsEffectService } from './services/effects/load-threads-effect.service';
import { StoreDevtoolsModule, StoreDevtools } from '@ngrx/store-devtools';
import { MessageListComponent } from './components/message-list/message-list.component';


@NgModule({
	declarations: [
		AppComponent,
		UserSelectionComponent,
		ThreadSectionComponent,
		MessageSectionComponent,
		ThreadListComponent,
		MessageListComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MaterialModule,
		EffectsModule.forRoot([LoadThreadsEffectService]),
		StoreModule.forRoot( reducers ),
		StoreDevtoolsModule.instrument()
	],
	providers: [
		ThreadsService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
