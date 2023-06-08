import { Component, Inject, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators, AbstractControl,ValidatorFn } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  reactiveFormGroup!: FormGroup;
  action: string = 'save';

  constructor(
    private api: ApiService,
    private dialog: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private snackBarService:SnackbarService,
    ) { }

  ngOnInit(): void {
    this.getFormLoad();

    // console.log(this.editData);

    if (this.editData) {
      this.action = 'update';
      this.reactiveFormGroup.controls['firstName'].setValue(this.editData.firstName);
      this.reactiveFormGroup.controls['lastName'].setValue(this.editData.lastName);
      this.reactiveFormGroup.controls['address'].setValue(this.editData.address);
      this.reactiveFormGroup.controls['dob'].setValue(this.editData.dob);
      this.reactiveFormGroup.controls['mobile'].setValue(this.editData.mobile);
      this.reactiveFormGroup.controls['city'].setValue(this.editData.city);
    }
  }

  // get mobile(){
  //   return this.reactiveFormGroup.get('mobile');
  // }

  getFormLoad(){
    this.reactiveFormGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required,this.noSpaceAllowed]),
      lastName: new FormControl('', [Validators.required,this.noSpaceAllowed]),
      address: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required,this.mobileNumberValidator()]),
      city: new FormControl('', [Validators.required])
    });
  }

  addEmployee() {
    if (!this.editData) {
      if (this.reactiveFormGroup.valid) {
        this.api.postEmployee(this.reactiveFormGroup.value)
          .subscribe({
            next: (res) => {
              // alert('data added successfully');
              this.snackBarService.open('employee added successfully!!')
              this.api.getEmployee();
              this.reactiveFormGroup.reset();
              this.dialog.close('save');
            },
            error: () => {
              alert('Error while adding data');
            }
          })
      }
    } else {
      this.updateEmployee();
    }
  }
  
  updateEmployee() {
    this.api.putEmployee(this.reactiveFormGroup.value, this.editData.id).subscribe({
      next: (res) => {
        // alert('Update record successfully');
        this.snackBarService.open('update record sucessfully!')
        
        this.reactiveFormGroup.reset();
        this.dialog.close('update');
      },
      error: (err) => {
        alert(err.message);
      }
    })
  }

  //No space validator
  noSpaceAllowed(control:FormControl){
    if(control.value != null && control.value.indexOf(' ')!=-1) {
      // control.setValidators([Validators.pattern('[0-9]*'),Validators.required])
      // control.updateValueAndValidity();
      return {noSpaceAllowed:true}
    }
            return null;
  }

  mobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value as string;
      const isValid = /^\d{10}$/.test(value);
      return isValid ? null : { mobileNumber: true };
    };
  }
 

  //Number not allowed validation
  // numberNotAllowed(control:FormControl){
  //   if(control.value!=0&&control.value!=9){
  //     return {numberNotAllowed:true}
  //   }
  //   return null;
  // }

}
