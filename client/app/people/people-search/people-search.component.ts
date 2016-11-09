import {Component} from "@angular/core";
import {PeopleService} from "../shared/people.service";
import {FormControl} from "@angular/forms";

@Component({
	selector: 'people-search',
	template: `
			<div class="cui__input giant">
			<label [hidden]="term.value" class="cui__input__label">Type your search query</label>
			  <input type="text" 
			   		 class="cui__input__input"
			  		 [formControl]="term"/>
			</div>  
  `

})
export class PeopleSearch {

	term = new FormControl();

	constructor(private peopleService: PeopleService){
		this.term.valueChanges
			.debounceTime(500)
			.distinctUntilChanged()
			.subscribe((term) => this.peopleService.searchEvent(term))
	}
}