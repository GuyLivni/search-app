import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {PeopleSearch} from "./people-search/people-search.component";
import {PeopleService} from "./shared/people.service";
import {HttpModule} from "@angular/http";
import {PeopleList} from "./people-list/people-list.component";
import {PeopleItem} from "./people-item/people-item.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2PaginationModule} from "ng2-pagination";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        Ng2PaginationModule,
        SharedModule
    ],
    declarations: [
        PeopleSearch,
        PeopleList,
        PeopleItem
    ],
    providers: [
        PeopleService
    ],
    exports: [
        PeopleSearch,
        PeopleList
    ]
})

export class PeopleModule {}