import {Component, Input} from "@angular/core";
import {PeopleService} from "../shared/people.service";
import {FormControl} from "@angular/forms";
import {SearchValidationService} from "../../shared/services/search-validation.service";

@Component({
    selector: 'people-search',
    templateUrl: './app/people/people-search/people-search.component.html'

})
export class PeopleSearch {
    @Input() isRequesting: boolean;
    term = new FormControl();
    errorMessage: string;

    constructor(private peopleService: PeopleService,
                private validateService: SearchValidationService){

    this.term.valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .map(term => this.validateService.validateTerm(term))
        .subscribe((term) => {
            if(term.valid){
                this.errorMessage = '';
                this.peopleService.searchEvent(term)
            } else {
                this.errorMessage = term.message;
            }
        })
    }
}