import {Component, Input} from "@angular/core";

@Component({
    selector: 'my-spinner',
    templateUrl: './app/shared/components/SpinnerComponent.html',
    styleUrls: ['./app/shared/components/SpinnerComponent.css']
})

export class SpinnerComponent{
    private currentTimeout: number;
    private isDelayedRunning: boolean = false;

    @Input()
    public delay: number = 300;

    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
            return;
        }

        if (this.currentTimeout) {
            return;
        }

        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }
}