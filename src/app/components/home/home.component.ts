import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authGuard/auth.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { } from '../employee/employee.component'
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'password','address','dob'];
  data:any;
  constructor( private auth:AuthService,private snackbarService:SnackbarService) { }

  ngOnInit(): void {
   ;
  //  this.loginUserName = this.auth.getFirstName();
  //  console.log("data "+this.loginUserName);
  }

  loginUserName:any =  this.auth.getFirstName();

  logout(){
    // if(confirm('Are you sure you want to logout?'))
    this.auth.logout();
    
    this.snackbarService.open('user logout successfully');
  }

  

}
