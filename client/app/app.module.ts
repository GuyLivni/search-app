import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {PeopleModule} from "./people/people.module";
import {PeopleComponent} from "./people/people.component";
import {SharedModule} from "./shared/shared.module";
@NgModule({
	imports: [
		BrowserModule,
		PeopleModule,
		SharedModule
	],
	declarations: [
		AppComponent,
		PeopleComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}