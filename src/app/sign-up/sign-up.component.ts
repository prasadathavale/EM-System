import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { ApiService } from '../services/api.service';
import { EmailValidationService } from '../services/email-validation.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  emailExists: boolean = false;
  manager: any;

  reactiveFormGroup!: FormGroup;
  constructor(
    private api: ApiService,
    private emailValidationService: EmailValidationService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.formInformation();
  }

  formInformation() {
    this.reactiveFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email], [this.emaillValidationService.bind(this)]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
    });
  }

  emaillValidationService(control: AbstractControl) {
    return this.emailValidationService.getManager().pipe(
      map(_managers => {
        const email = control.value;
        const emailExists = _managers.some((employee: { email: any; }) => employee.email === email);
        return emailExists ? { emailExists: true } : null;

      })
    )
  }

  addManager() {
    if (this.reactiveFormGroup.valid) {
      this.api.postManagerData(this.reactiveFormGroup.value).subscribe({
        next: (res) => {
          // console.log(res);
          // alert('data send successfully');
          this.snackbarService.open('Sign up succeesfully')

          this.reactiveFormGroup.reset();
        },
        error: (err) => {
          alert(err.message);
        }
      })
    }
  }

}
