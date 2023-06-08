import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authGuard/auth.service';

enum passFieldType {
  TEXT = "text",
  PASSWORD = "password"
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  reactiveFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8)])
  });

  @ViewChild('pass') passField!: ElementRef;

  passType: typeof passFieldType = passFieldType;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/home/employee']);
    }
  }

  onSubmit() {
    if (this.reactiveFormGroup.valid) {
      this.auth.login(this.reactiveFormGroup.value).subscribe(
        (result) => {
          // console.log(result);
          this.router.navigate(['/home/employee']);
          this.reactiveFormGroup.reset();
        },
        (err: Error) => {
          // alert('error');
          alert(err.message + "no internet connection");
        }
      )
    }
  }


  public viewPass(show: boolean): void {
    show ? this.passField.nativeElement.type = passFieldType.TEXT : this.passField.nativeElement.type = passFieldType.PASSWORD;
  }

  public get password() {
    return this.reactiveFormGroup.get('password')
  }

  public get email() {
    return this.reactiveFormGroup.get('email')
  }

}
