import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:"app-submit-button",
    templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.scss'
})
export class SubmitButtonComponent{
    @Input()
    public btnText!: string | null;
    @Input()
    public shortStyle: boolean = true;

    @Output()
    onClick = new EventEmitter();

    handleClick() {
      this.onClick.emit();
    }
}