import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {
  data!: any;
  constructor(private http: HttpClient) { }
  // checkEmailExist(email:string): Observable<any[]>{
  //   this.data = this.http.get<boolean>('http://localhost:3000/managerList/' + email);
  //   console.log("check val : "+this.data);
  //   return this.http.get<boolean>('http://localhost:3000/managerList/?email='+email);

  getManager(): Observable<any> {
    // console.log(" --- API CALLING --- ")
    return this.http.get<any[]>('http://localhost:3000/managerList/');
  }
  // }
}
