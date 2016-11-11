import {Component, Input} from "@angular/core";

@Component({
    selector: 'people-item',
    templateUrl: './app/people/people-item/people-item.component.html',
    styleUrls: ['./app/people/people-item/people-item.component.css']
})

export class PeopleItem {
    @Input() person;
}