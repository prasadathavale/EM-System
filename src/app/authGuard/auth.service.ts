import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  // private userPayload:any;
  firstNameForProfile!: string;
  loginData: any;

  ngOnInit() {
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBarService: SnackbarService
  ) {
    // this.userPayload = this.decodedToken();
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getFirstName() {
    return localStorage.getItem('firstName');
  }

  login({ email, password }: any): Observable<any> {
    return this.http.get<any>('http://localhost:3000/managerList/').pipe(
      map((res) => {
        const user = res.find((a: any) => {
          return a.email === email && a.password === password;
        });
        if (user) {
          this.firstNameForProfile = user.firstName;
          localStorage.setItem('firstName', user.firstName);
          localStorage.setItem('email', user.email);
          // console.log("fname"+this.firstNameForProfile);
          this.setToken('qwertyuiop');
          this.snackBarService.open('Logged In Successfully')
          // alert('login successfull');
          // return of({ name: 'Prasad Athavale', email: 'prasad@gmail.com' });
        } else {
          // console.log(user);
          this.snackBarService.open('Please enter valid credentials...')
          // alert('please enter valid credentials');
        }
        // alert('Please enter valid creentials');
        // return throwError(new Error('Please enter valid credentials'));
      }),

      catchError((error) => throwError(error))
    );

    // if(email==='prasad@gmail.com'&&password==='12345'){
    //   this.setToken('asdfghjklzxcvbnm');
    //   return of({name:'Prasad Athavale',email:'prasad@gmail.com'})
    // }
    // return throwError(new Error('Please enter valid credentials'));
  }

  // decodedToken(){
  //   const jwtHelper = new JwtHelperService();
  //   const token = this.getToken()!;
  //   console.log(jwtHelper.decodeToken(token));
  //   return jwtHelper.decodeToken(token);
  // }

  // getFirstName(){
  //   if(this.userPayload)
  //   return this.userPayload.firstName;
  // }

  // getLastName(){
  //   if(this.userPayload)
  //   return this.userPayload.lastName;
  // }

}
