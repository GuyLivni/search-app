import {NgModule} from "@angular/core";
import {SearchValidationService} from "./services/search-validation.service";
import {SpinnerComponent} from "./components/SpinnerComponent";

@NgModule({
    imports: [
    ],
    declarations: [
        SpinnerComponent
    ],
    providers: [
        SearchValidationService
    ],
    exports : [
        SpinnerComponent
    ]

})
export class SharedModule {}