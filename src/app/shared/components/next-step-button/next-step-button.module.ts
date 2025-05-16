import { NgModule } from "@angular/core";
import { NextStepButtonComponent } from "./next-step-button.component";
import { SharedModule } from "../../shared.module";

@NgModule({
    declarations: [
      NextStepButtonComponent
    ],
    imports: [
      SharedModule
    ],
    exports: [NextStepButtonComponent]
  })
  export class NextStepButtonModule { }