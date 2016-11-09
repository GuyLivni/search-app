import {Component} from "@angular/core";
import {PeopleService} from "./shared/people.service";
import {Person} from "./shared/person.model";
import {PagerModel} from "./shared/pager.model";
import {PeopleResult} from "./shared/people-result.model";
import {Observable} from "rxjs";
import {SearchValidationService} from "../shared/services/search-validation.service";

@Component({
	selector: 'people-container',
	template: `
		<div class="search">
			<people-search></people-search>
			<div class="cui__selector--direct__title no-results" 
				 *ngIf="errorMessage">{{errorMessage}}
			</div>
			<div class="cui__selector--direct__title no-results" 
				 *ngIf="total === 0 && !errorMessage">No results, please review your search or try a different one
			</div>
			<div class="cui__selector--direct title">
				<people-list *ngIf="!errorMessage && total !== 0" 
				(pageChanged)="onPageChanged($event)" 
				[pager]="pager" [total]="total" [people]="people">
				</people-list>
			</div>
		</div>
	`,
	styleUrls: ['./app/people/people.component.css']
})

export class PeopleComponent {
	people: Person[];
	total:  number;
	term:   any;
	errorMessage: string;
	pager:  PagerModel;

	constructor(private peopleSearch: PeopleService,
				private validateService: SearchValidationService) {}

	searchUpdated = this.peopleSearch.currentSearchTerm$
		.map(term => this.validateService.validateTerm(term))
		.do(term => this.term = term)
		.do(() => this.pager.pageIndex = 1)
		.switchMap(term => {
			if(this.term.valid){
				//side effect should not be inside switchMap
				this.errorMessage = '';
				return this.peopleSearch.search(term, this.pager)
			}
			this.errorMessage = this.term.message;
			return Observable.empty();
		})
		.map((result: PeopleResult) => {
			this.total = result.totalCount;
			return result.result
		});

	ngOnInit(){
		this.pager = new PagerModel();
		this.searchUpdated.subscribe(
				result => this.people = result,
				error  => console.log('errors: ' , error)
			);
	}

	onPageChanged(page: number) {
		this.pager.pageIndex = page;
		this.peopleSearch.search(this.term ,this.pager)
			.map((result: PeopleResult) => result)
			.subscribe( result => {
				this.total = result.totalCount;
				this.people = result.result;
			});
	}
}