import {Component} from "@angular/core";
import {PeopleService} from "./shared/people.service";
import {Person} from "./shared/person.model";
import {PagerModel} from "./shared/pager.model";
import {PeopleResult} from "./shared/people-result.model";

@Component({
    selector: 'people-container',
    templateUrl: './app/people/people.component.html',
    styleUrls: ['./app/people/people.component.css']
})

export class PeopleComponent {
    people: Person[];
    total:  number;
    term:   any;
    pager:  PagerModel;
    isRequesting: boolean;

    constructor(private peopleSearch: PeopleService) {}

    searchUpdated = this.peopleSearch.currentSearchTerm$
        .do(term => this.term = term)
        .do(() => this.pager.pageIndex = 1)
        .do(() => this.isRequesting = true)
        .switchMap(term => this.peopleSearch.search(term, this.pager))
        .map((result: PeopleResult) => {
            this.total = result.totalCount;
            return result.result
        });

    ngOnInit(){
        this.pager = new PagerModel();
        this.searchUpdated.subscribe(
           result => {
               this.people = result;
               this.isRequesting = false;
           },
           error => console.log(error));
    }

    onPageChanged(page: number) {
        this.pager.pageIndex = page;
        this.isRequesting = true;
        this.peopleSearch.search(this.term ,this.pager)
            .map((result: PeopleResult) => result)
            .subscribe(
                result => {
                    this.isRequesting = false;
                    this.total = result.totalCount;
                    this.people = result.result;
            },
                error => console.log(error));
    }
}