import { Component } from "@angular/core";
import { Customer } from "../../../models/customer.interface";
import { ApiService } from "../../../services/api.service";
import { EditCustomerAccountRequest } from "../../../models/requests/editCustomerAccountRequest.interface";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
  })
  export class UserProfileComponent{

    customer: Customer | null = null;

    constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute){
      this.apiService.viewCustomerAccount().subscribe(
        (response) => {this.customer = response}
      );
      }

      updateCustomerInfo(event: {field: string, value: string}){
        const request : EditCustomerAccountRequest = {
          customerId: this.customer!.id!, 
          propertyName: event.field,
          newValue: event.value
        };
        this.apiService.editCustomerAccount(request).subscribe(
          (result) => {this.customer = result}
        );
      }

      viewAppointmentsPage(){
        this.router.navigate(['appointments'], {relativeTo: this.route});
      }
  }
  