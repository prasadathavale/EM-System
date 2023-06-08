import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private firstName$ = new BehaviorSubject<string>("");
  private lastName$ = new BehaviorSubject<string>("");
  constructor() { }

  public getFirsNameFromStore(){
    return this.firstName$.asObservable();
  }

  public setFirstNameForStore(firstName$:string){
    this.firstName$.next(firstName$);
  }

  public getLastNameFromStore(){
    return this.lastName$.asObservable();
  }

  public setLastNameForStore(lastName$:string){
    this.lastName$.next(lastName$);
  }
}
