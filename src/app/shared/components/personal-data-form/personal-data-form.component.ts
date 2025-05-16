import { Component, EventEmitter, input, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { Customer } from "../../../models/customer.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector:"app-personal-data-form",
    templateUrl: './personal-data-form.component.html',
  styleUrl: './personal-data-form.component.scss',
})
export class PersonalDataFormComponent implements OnInit, OnChanges{

    @Input()
    public withPassword: boolean = false;
    @Input()
    public customer : Customer | null = null;
    @Input()
    public userPhoneNumber : string | null = null;

    @Output()
    customerCreated = new EventEmitter<Customer>();
    @Output()
    fieldUpdated = new EventEmitter<{field: string, value: string}>();

    personalDataForm!: FormGroup;
    submitBtnActive: boolean = true;
    editModes: { [key: string]: boolean } = { firstName: false, lastName: false, phone: false, email: false};

    constructor(private fb: FormBuilder){}

    ngOnChanges(changes: SimpleChanges): void {
        if(this.customer)
        {
            this.personalDataForm.patchValue(this.customer);
            this.submitBtnActive = false;
        }
    }

    ngOnInit(){
        this.personalDataForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            phone:['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]]
        })
        
        if(this.withPassword)
        {
            this.personalDataForm.addControl(
                'password',
                this.fb.control('', [Validators.required])
              );
        }

        if(this.userPhoneNumber){
            this.personalDataForm.get('phone')?.setValue(this.userPhoneNumber);
        }
        
        if(this.customer)
        {
            this.personalDataForm.patchValue(this.customer);
            this.submitBtnActive = false;
        }
    }

    onSubmit(){
        if(this.personalDataForm.valid)
        {
            const createdCustomer : Customer = this.personalDataForm.value;
            this.customerCreated.emit(createdCustomer)
        }
    }

    toggleEditMode(field : string){
        if(this.editModes[field]){
            this.fieldUpdated.emit({field, value: this.personalDataForm.get(field)?.value});
        }
        this.editModes[field] = !this.editModes[field];
    }

}