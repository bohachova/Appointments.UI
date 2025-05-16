import { NgModule } from "@angular/core";
import { AuthLabelComponent } from "./auth-label.component";
import { SharedModule } from "../../shared.module";

@NgModule({
    declarations: [
      AuthLabelComponent
    ],
    imports: [
      SharedModule
    ],
    exports: [AuthLabelComponent]
  })
  export class AuthLabelModule { }