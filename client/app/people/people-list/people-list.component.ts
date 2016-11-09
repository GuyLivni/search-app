import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Person} from "../shared/person.model";
import {PagerModel} from "../shared/pager.model";

@Component({
	selector: 'people-list',
	templateUrl: './app/people/people-list/people-list.component.html',
	styleUrls: ['./app/people/people-list/people-list.component.css']
})

export class PeopleList{
	@Input() total: number;
	@Input() people: [Person];
	@Input() pager: PagerModel;
	@Output() pageChanged: EventEmitter<any> = new EventEmitter();
	page: number = 1;

	onPageChanged(event: number){
		this.page = event;
		this.pageChanged.emit(event);
	}
}